import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { role } = await request.json()

  await supabase.from('academy_certifications').upsert({
    user_id: user.id,
    certification_type: 'ready_to_work',
    issued_at: new Date().toISOString(),
    notes: role ?? null,
  }, { onConflict: 'user_id,certification_type' })

  return NextResponse.json({ ok: true })
}

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data } = await supabase
    .from('academy_certifications')
    .select('certification_type, issued_at, notes')
    .eq('user_id', user.id)
    .eq('certification_type', 'ready_to_work')
    .maybeSingle()

  return NextResponse.json(data)
}
