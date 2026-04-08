import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json() as { email: string }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // Graceful — if the waitlist table doesn't exist yet, still return success
    try {
      const supabase = createServerClient()
      await supabase.from('waitlist').insert({ email: email.toLowerCase().trim() })
    } catch {
      // Table may not exist yet — log server-side but don't block the user
      console.log('[waitlist] email captured (table may not exist yet):', email)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Waitlist error:', error)
    return NextResponse.json({ success: true }) // always return success to the user
  }
}
