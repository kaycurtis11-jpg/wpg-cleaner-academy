import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { moduleSlug, lessonSlug, quizScore, passed } = await request.json()

  // Upsert lesson progress
  const { error: progressError } = await supabase.from('academy_progress').upsert({
    user_id: user.id,
    module_slug: moduleSlug,
    lesson_slug: lessonSlug,
    completed: passed !== false,
    quiz_score: quizScore ?? null,
    completed_at: new Date().toISOString(),
  }, { onConflict: 'user_id,module_slug,lesson_slug' })

  if (progressError) {
    console.error('Progress upsert error:', progressError)
    return NextResponse.json({ error: progressError.message }, { status: 500 })
  }

  // Record quiz attempt if score provided
  if (quizScore !== undefined) {
    await supabase.from('academy_quiz_attempts').insert({
      user_id: user.id,
      module_slug: moduleSlug,
      score: quizScore,
      passed: passed ?? quizScore >= 80,
      attempted_at: new Date().toISOString(),
    })
  }

  // Check if final certification
  if (moduleSlug === 'certification' && passed) {
    await supabase.from('academy_certifications').upsert({
      user_id: user.id,
      certification_type: 'academy_completion',
      issued_at: new Date().toISOString(),
    }, { onConflict: 'user_id,certification_type' })
  }

  return NextResponse.json({ ok: true })
}

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data } = await supabase
    .from('academy_progress')
    .select('*')
    .eq('user_id', user.id)

  return NextResponse.json(data ?? [])
}
