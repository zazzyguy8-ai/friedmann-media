import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, createAdminClient } from '@/lib/supabase-server'

const HIGGSFIELD_API_URL = 'https://api.higgsfield.ai/v1/generation'

const STYLE_PROMPTS: Record<string, string> = {
  streetwear: 'dark urban streetwear aesthetic, gritty city environment, moody lighting, graffiti walls, cinematic',
  luxury: 'high-end luxury fashion, clean minimal background, elegant lighting, premium quality, editorial',
  y2k: 'Y2K aesthetic, vibrant colors, retro futuristic, nostalgic 2000s fashion, bright and playful',
  minimalist: 'minimalist editorial, white space, clean background, studio lighting, fashion editorial',
}

const FORMAT_PROMPTS: Record<string, string> = {
  hook_ad: 'video ad starting with bold text overlay, quick cuts, high energy, attention-grabbing opening',
  lifestyle_clip: 'lifestyle fashion video, model wearing the clothing, natural movement, authentic feel',
  product_showcase: 'product showcase video, dynamic camera movement around clothing item, hero shot, dramatic lighting',
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { productImageUrl, style, format } = await request.json()

    if (!productImageUrl || !style || !format) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const admin = createAdminClient()

    // Check and deduct credits atomically
    const { data: profile, error: profileError } = await admin
      .from('profiles')
      .select('credits')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    if (profile.credits < 1) {
      return NextResponse.json({ error: 'Insufficient credits' }, { status: 402 })
    }

    // Deduct 1 credit
    const { error: creditError } = await admin
      .from('profiles')
      .update({ credits: profile.credits - 1 })
      .eq('id', user.id)
      .eq('credits', profile.credits) // optimistic lock

    if (creditError) {
      return NextResponse.json({ error: 'Failed to deduct credit' }, { status: 500 })
    }

    // Log transaction
    await admin.from('credit_transactions').insert({
      user_id: user.id,
      amount: -1,
      reason: 'generation',
    })

    // Create generation record
    const { data: generation, error: genError } = await admin
      .from('generations')
      .insert({
        user_id: user.id,
        product_image_url: productImageUrl,
        style,
        format,
        status: 'processing',
        video_urls: [],
      })
      .select()
      .single()

    if (genError || !generation) {
      // Refund credit on failure
      await admin.from('profiles').update({ credits: profile.credits }).eq('id', user.id)
      return NextResponse.json({ error: 'Failed to create generation' }, { status: 500 })
    }

    // Trigger Higgsfield API in background (don't await)
    triggerGeneration(generation.id, productImageUrl, style, format).catch(async (err) => {
      console.error('Generation error:', err)
      await admin
        .from('generations')
        .update({ status: 'failed' })
        .eq('id', generation.id)
      // Refund credit
      await admin.from('profiles').update({ credits: profile.credits }).eq('id', user.id)
    })

    return NextResponse.json({ generationId: generation.id })
  } catch (err) {
    console.error('Generate API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function triggerGeneration(
  generationId: string,
  imageUrl: string,
  style: string,
  format: string
) {
  const admin = createAdminClient()
  const apiKey = process.env.HIGGSFIELD_API_KEY

  if (!apiKey) {
    throw new Error('HIGGSFIELD_API_KEY not configured')
  }

  const prompt = `Fashion clothing brand video ad. Product photo: ${imageUrl}. ${STYLE_PROMPTS[style] || ''}. ${FORMAT_PROMPTS[format] || ''}. Professional video advertisement, 8 seconds, high quality.`

  // Generate 3 variants
  const videoUrls: string[] = []

  for (let i = 0; i < 3; i++) {
    const response = await fetch(HIGGSFIELD_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `${prompt} Variant ${i + 1}.`,
        image_url: imageUrl,
        duration: 8,
        aspect_ratio: '9:16',
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Higgsfield API error: ${response.status} — ${errorText}`)
    }

    const data = await response.json()

    // Higgsfield may return a job ID that needs polling, or a direct URL
    // Handle both cases
    if (data.video_url) {
      videoUrls.push(data.video_url)
    } else if (data.id) {
      // Poll for completion
      const videoUrl = await pollForCompletion(data.id, apiKey)
      videoUrls.push(videoUrl)
    } else {
      throw new Error('Unexpected Higgsfield response format')
    }
  }

  await admin
    .from('generations')
    .update({ status: 'completed', video_urls: videoUrls })
    .eq('id', generationId)
}

async function pollForCompletion(jobId: string, apiKey: string, maxAttempts = 60): Promise<string> {
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise((r) => setTimeout(r, 5000))

    const res = await fetch(`${HIGGSFIELD_API_URL}/${jobId}`, {
      headers: { 'Authorization': `Bearer ${apiKey}` },
    })

    if (!res.ok) continue

    const data = await res.json()

    if (data.status === 'completed' && data.video_url) {
      return data.video_url
    }

    if (data.status === 'failed') {
      throw new Error(`Job ${jobId} failed`)
    }
  }

  throw new Error('Generation timed out')
}
