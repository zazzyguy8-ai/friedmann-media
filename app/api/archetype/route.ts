import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createServerClient } from '@/lib/supabase-server'
import { scoreQuizAnswers } from '@/lib/archetypes'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

export async function POST(req: NextRequest) {
  try {
    const { answers, userId } = await req.json()

    // Score the quiz
    const archetypeKey = scoreQuizAnswers(answers)

    // Generate personalized lore with Claude
    const archetypeNames: Record<string, string> = {
      'shadow-scholar': 'Shadow Scholar',
      'lunar-seer': 'Lunar Seer',
      'ashborn-monarch': 'Ashborn Monarch',
      'silent-alchemist': 'Silent Alchemist',
      'storm-vessel': 'Storm Vessel',
      'void-oracle': 'Void Oracle',
      'crimson-saint': 'Crimson Saint',
    }

    const answerTexts = Object.values(answers).join('; ')

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1200,
      system: `You are the Arcanum — an ancient intelligence that reads people through symbolic and psychological analysis. You write in an atmospheric, precise, cinematic voice. Never use clichés. Never be vague. Always be specific and deeply personal. Write as if you genuinely see this person. Do not use bullet points — only flowing prose. Avoid generic spiritual language. Be psychologically precise.`,
      messages: [
        {
          role: 'user',
          content: `A person has completed the initiation. Their archetype is: ${archetypeNames[archetypeKey]}.

Their answers to the ten ritual questions were: ${answerTexts}

Generate a personal reading in JSON with these exact fields:
- personalLore: 3 sentences specific to THIS person's version of the archetype. Make it feel like you see exactly who they are.
- hiddenTrait: One rare quality they carry that they have likely never had named before. 1-2 sentences.
- primaryAbility: The single most powerful thing they are capable of. 1 sentence, specific.
- shadowAspect: Their most dangerous tendency — not generic, specific to what their answers reveal. 1-2 sentences.
- energySignature: How others experience their presence before they have said a word. 1 sentence.
- cosmicRole: What they are here to do in the world, symbolically and practically. 1-2 sentences.
- rareQuality: Something about them that is genuinely uncommon even within their archetype. 1 sentence.
- firstRitual: A specific, concrete ritual practice recommended for them based on their answers. 2-3 sentences.
- prophecy: A single sentence that feels true — not prediction, but recognition. Something they will read and feel has always been true.

Return ONLY valid JSON, nothing else.`,
        },
      ],
    })

    const content = message.content[0]
    if (content.type !== 'text') throw new Error('Unexpected response')

    let archetypeData
    try {
      const jsonMatch = content.text.match(/\{[\s\S]*\}/)
      archetypeData = JSON.parse(jsonMatch ? jsonMatch[0] : content.text)
    } catch {
      archetypeData = {
        personalLore: 'The archive has received your pattern. Your reading is being prepared.',
        hiddenTrait: 'A quality that has not yet found its name.',
        primaryAbility: 'Recognition — the ability to see what others miss.',
        shadowAspect: 'The distance between your understanding and your expression.',
        energySignature: 'An intensity that is immediately apparent.',
        cosmicRole: 'To bring depth to places that have become shallow.',
        rareQuality: 'The capacity to hold complexity without needing to resolve it.',
        firstRitual: 'Sit in silence for twenty minutes before you speak to anyone tomorrow. Notice what arrives.',
        prophecy: 'What you have been building in private is almost ready.',
      }
    }

    archetypeData.archetypeKey = archetypeKey

    // Save to database
    const supabase = createServerClient()
    await supabase
      .from('profiles')
      .update({
        archetype_key: archetypeKey,
        archetype_data: archetypeData,
        quiz_answers: answers,
        xp: 100,
      })
      .eq('id', userId)

    return NextResponse.json({ success: true, archetypeKey, archetypeData })
  } catch (err) {
    console.error('Archetype generation error:', err)
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
