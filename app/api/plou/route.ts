import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createServerClient } from '@/lib/supabase-server'
import { buildPlouSystemPrompt } from '@/lib/plou'
import type { BusinessProfile, Message } from '@/types'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { messages } = await req.json() as { messages: Message[] }

    const { data: profile } = await supabase
      .from('profiles')
      .select('goal, name')
      .eq('id', user.id)
      .single()

    if (!profile?.goal) {
      return NextResponse.json({ error: 'Business profile not found' }, { status: 404 })
    }

    const businessProfile: BusinessProfile = JSON.parse(profile.goal)
    const systemPrompt = buildPlouSystemPrompt(businessProfile)

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    })

    const content = response.content[0]
    if (content.type !== 'text') {
      return NextResponse.json({ error: 'Unexpected response' }, { status: 500 })
    }

    return NextResponse.json({ content: content.text })
  } catch (error) {
    console.error('Plou chat error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
