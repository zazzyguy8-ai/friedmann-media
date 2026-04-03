import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') || '/dashboard'
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin

  if (code) {
    const supabase = createServerClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      // Check if profile exists, if not create one
      const { data: profile } = await supabase
        .from('profiles')
        .select('onboarding_completed, trial_start_date, is_premium')
        .eq('id', data.user.id)
        .single()

      if (!profile) {
        // Create new profile for OAuth users
        await supabase.from('profiles').insert({
          id: data.user.id,
          trial_start_date: new Date().toISOString(),
        })
        return NextResponse.redirect(`${appUrl}/onboarding`)
      }

      if (!profile.onboarding_completed) {
        return NextResponse.redirect(`${appUrl}/onboarding`)
      }

      const trialStart = new Date(profile.trial_start_date)
      const daysSinceTrial = (Date.now() - trialStart.getTime()) / (1000 * 60 * 60 * 24)
      if (!profile.is_premium && daysSinceTrial > 7) {
        return NextResponse.redirect(`${appUrl}/paywall`)
      }

      return NextResponse.redirect(`${appUrl}${next}`)
    }
  }

  return NextResponse.redirect(`${appUrl}/login?error=auth_failed`)
}
