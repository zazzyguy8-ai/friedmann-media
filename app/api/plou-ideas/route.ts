import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createServerClient } from '@/lib/supabase-server'
import { buildIdeasSystemPrompt } from '@/lib/plou'
import type { BusinessProfile } from '@/types'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

export async function POST() {
  try {
    const supabase = createServerClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('goal')
      .eq('id', user.id)
      .single()

    if (!profile?.goal) {
      return NextResponse.json({ error: 'Business profile not found' }, { status: 404 })
    }

    const businessProfile: BusinessProfile = JSON.parse(profile.goal)
    const systemPrompt = buildIdeasSystemPrompt(businessProfile)

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      system: systemPrompt,
      messages: [{ role: 'user', content: 'Generate 6 tailored content ideas for my business.' }],
    })

    const content = response.content[0]
    if (content.type !== 'text') {
      return NextResponse.json({ error: 'Unexpected response' }, { status: 500 })
    }

    const ideas = JSON.parse(content.text)
    return NextResponse.json({ ideas })
  } catch (error) {
    console.error('Plou ideas error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

