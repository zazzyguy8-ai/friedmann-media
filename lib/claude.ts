import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

export async function generateChallenge(
  name: string,
  goal: string,
  timeAvailable: string
): Promise<string> {
  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 150,
    system:
      'You are Plou, a daily challenge generator for young people aged 15-25. Your job is to generate exactly 1 small, specific, actionable challenge. The challenge must create a tiny feeling of discomfort that leads to growth. It must be realistic and completable. Return ONLY the challenge text. No intro, no explanation, no quotes. Maximum 2 sentences.',
    messages: [
      {
        role: 'user',
        content: `Generate a challenge for someone named ${name} whose goal is ${goal} and has ${timeAvailable} available today. Make it specific and slightly uncomfortable but achievable.`,
      },
    ],
  })

  const content = message.content[0]
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Claude')
  }

  return content.text.trim()
}
