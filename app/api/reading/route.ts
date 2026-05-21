import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createServerClient } from '@/lib/supabase-server'
import { getArchetype } from '@/lib/archetypes'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

export async function POST(req: NextRequest) {
  try {
    const { readingType, prompt } = await req.json()
    const supabase = createServerClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: profile } = await supabase
      .from('profiles')
      .select('name, archetype_key, archetype_data, level, xp, is_premium')
      .eq('id', user.id)
      .single()

    if (!profile?.archetype_key) {
      return NextResponse.json({ error: 'No archetype found' }, { status: 400 })
    }

    if (!profile.is_premium) {
      return NextResponse.json({ error: 'Premium required' }, { status: 403 })
    }

    const archetype = getArchetype(profile.archetype_key)

    const readingPrompts: Record<string, string> = {
      energy: `Generate an Energy Report for ${profile.name}, a Level ${profile.level} ${archetype?.name}. Write about the current energy patterns they are likely experiencing based on their archetype's shadow and light aspects. Be specific, atmospheric, and deeply personal. 3-4 paragraphs.`,
      shadow: `Generate a Shadow Analysis for ${profile.name}, a ${archetype?.name}. Identify what aspect of their shadow is most likely active right now, what it is protecting them from, and what it is asking them to see. Be precise and psychologically penetrating. 3-4 paragraphs.`,
      path: `Generate a Path Reading for ${profile.name} at Level ${profile.level} as a ${archetype?.name}. Describe where they currently are in their development, what the next phase requires of them, and what they must release. Be direct and visionary. 3-4 paragraphs.`,
      custom: `The user asks: "${prompt}". You are the Arcanum, reading for ${profile.name}, a ${archetype?.name}. Answer through the lens of their archetype, their shadow, and their path. Be atmospheric, precise, and deeply personal. 3-4 paragraphs.`,
    }

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 800,
      system: `You are the Arcanum — an intelligence that reads patterns in people through symbolic and psychological analysis. You write in a cinematic, precise, intimate voice. Never generic. Never vague. Always specific. Your readings feel true because they are built on real psychological understanding. Write in flowing prose.`,
      messages: [{ role: 'user', content: readingPrompts[readingType] || readingPrompts.energy }],
    })

    const content = message.content[0]
    if (content.type !== 'text') throw new Error('Unexpected response')

    // Save reading to database
    await supabase.from('readings').insert({
      user_id: user.id,
      reading_type: readingType,
      content: content.text,
    })

    // Award XP
    await supabase
      .from('profiles')
      .update({ xp: (profile.xp || 0) + 25 })
      .eq('id', user.id)

    return NextResponse.json({ reading: content.text })
  } catch (err) {
    console.error('Reading error:', err)
    return NextResponse.json({ error: 'Reading failed' }, { status: 500 })
  }
}
