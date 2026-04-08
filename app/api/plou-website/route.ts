import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { buildWebsiteSystemPrompt } from '@/lib/plou'
import type { BusinessProfile } from '@/types'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

export async function POST(req: NextRequest) {
  try {
    const { siteType, style, businessProfile } = await req.json() as { siteType: string; style: string; businessProfile: BusinessProfile }

    if (!businessProfile) {
      return NextResponse.json({ error: 'Business profile not found' }, { status: 400 })
    }

    const systemPrompt = buildWebsiteSystemPrompt(businessProfile, siteType, style)

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 8000,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: `Build the complete ${siteType} website for ${businessProfile.businessName} in the ${style} style. Make it stunning and professional.`,
        },
      ],
    })

    const content = response.content[0]
    if (content.type !== 'text') {
      return NextResponse.json({ error: 'Unexpected response' }, { status: 500 })
    }

    let html = content.text.trim()
    if (html.startsWith('```')) {
      html = html.replace(/^```[a-z]*\n?/, '').replace(/\n?```$/, '').trim()
    }

    return NextResponse.json({ html })
  } catch (error) {
    console.error('Plou website error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
