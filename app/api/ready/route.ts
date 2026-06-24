import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

function getServiceClient() {
  return createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { role } = await request.json()
  const admin = getServiceClient()

  await admin.from('academy_certifications').upsert({
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

  const admin = getServiceClient()
  const { data } = await admin
    .from('academy_certifications')
    .select('certification_type, issued_at, notes')
    .eq('user_id', user.id)
    .eq('certification_type', 'ready_to_work')
    .maybeSingle()

  return NextResponse.json(data)
}
