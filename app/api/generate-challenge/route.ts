import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { generateChallenge } from '@/lib/claude'

export async function POST() {
  try {
    const supabase = createServerClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const today = new Date().toISOString().split('T')[0]

    // Check if challenge already exists for today
    const { data: existingChallenge } = await supabase
      .from('challenges')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', today)
      .single()

    if (existingChallenge) {
      return NextResponse.json({ challenge: existingChallenge })
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('name, goal, time_available')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    const name = profile.name || 'friend'
    const goal = profile.goal || 'personal growth'
    const timeAvailable = profile.time_available || '15 minutes'

    // Generate challenge with Claude
    const challengeText = await generateChallenge(name, goal, timeAvailable)

    // Save to database
    const { data: newChallenge, error: insertError } = await supabase
      .from('challenges')
      .insert({
        user_id: user.id,
        date: today,
        challenge_text: challengeText,
        completed: false,
      })
      .select()
      .single()

    if (insertError) {
      return NextResponse.json({ error: 'Failed to save challenge' }, { status: 500 })
    }

    return NextResponse.json({ challenge: newChallenge })
  } catch (error) {
    console.error('Generate challenge error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
