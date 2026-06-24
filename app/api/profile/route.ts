import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data } = await supabase
    .from('academy_profiles')
    .select('cleaning_track')
    .eq('user_id', user.id)
    .maybeSingle()

  return NextResponse.json({ cleaning_track: data?.cleaning_track ?? null })
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { cleaning_track } = await request.json()

  await supabase.from('academy_profiles').upsert({
    user_id: user.id,
    cleaning_track,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id' })

  return NextResponse.json({ ok: true })
}
