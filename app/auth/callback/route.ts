import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, createAdminClient } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin

  if (code) {
    const supabase = createServerClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      const admin = createAdminClient()

      // Ensure profile exists
      const { data: existing } = await admin
        .from('profiles')
        .select('id')
        .eq('id', data.user.id)
        .single()

      if (!existing) {
        await admin.from('profiles').insert({
          id: data.user.id,
          email: data.user.email,
          credits: 5,
          plan: 'free',
        })
        await admin.from('credit_transactions').insert({
          user_id: data.user.id,
          amount: 5,
          reason: 'signup_bonus',
        })
      }

      return NextResponse.redirect(`${appUrl}/dashboard`)
    }
  }

  return NextResponse.redirect(`${appUrl}/login?error=auth_failed`)
}
