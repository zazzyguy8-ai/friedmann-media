import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

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

    const { data: challenge, error: fetchError } = await supabase
      .from('challenges')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', today)
      .single()

    if (fetchError || !challenge) {
      return NextResponse.json({ error: 'Challenge not found' }, { status: 404 })
    }

    if (challenge.completed) {
      return NextResponse.json({ error: 'Already completed' }, { status: 400 })
    }

    const { error: updateError } = await supabase
      .from('challenges')
      .update({
        completed: true,
        completed_at: new Date().toISOString(),
      })
      .eq('id', challenge.id)
      .eq('user_id', user.id)

    if (updateError) {
      return NextResponse.json({ error: 'Failed to complete challenge' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Complete challenge error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
