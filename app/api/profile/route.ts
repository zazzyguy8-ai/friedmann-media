import { NextResponse } from 'next/server'
import { createServerClient, createAdminClient } from '@/lib/supabase-server'

export async function POST() {
  try {
    const supabase = createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const admin = createAdminClient()

    const { data: existing } = await admin
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .single()

    if (existing) {
      return NextResponse.json({ ok: true, created: false })
    }

    await admin.from('profiles').insert({
      id: user.id,
      email: user.email,
      credits: 5,
      plan: 'free',
    })

    await admin.from('credit_transactions').insert({
      user_id: user.id,
      amount: 5,
      reason: 'signup_bonus',
    })

    return NextResponse.json({ ok: true, created: true })
  } catch (err) {
    console.error('Profile creation error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
