import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { MODULES } from '@/lib/data/modules'
import Link from 'next/link'
import { TrackSelector } from '@/components/academy/track-selector'

export const dynamic = 'force-dynamic'

const COLOR_MAP: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-700',
  purple: 'bg-purple-100 text-purple-700',
  green: 'bg-green-100 text-green-700',
  red: 'bg-red-100 text-red-700',
  yellow: 'bg-yellow-100 text-yellow-700',
  teal: 'bg-teal-100 text-teal-700',
  indigo: 'bg-indigo-100 text-indigo-700',
  orange: 'bg-orange-100 text-orange-700',
  pink: 'bg-pink-100 text-pink-700',
  gray: 'bg-gray-100 text-gray-700',
  gold: 'bg-amber-100 text-amber-700',
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [
    { data: progress },
    { data: certifications },
    { data: quizAttempts },
    { data: profileData },
  ] = await Promise.all([
    supabase.from('academy_progress').select('module_slug, lesson_slug, completed, quiz_score, completed_at').eq('user_id', user.id),
    supabase.from('academy_certifications').select('*').eq('user_id', user.id),
    supabase.from('academy_quiz_attempts').select('module_slug, score, passed, attempted_at').eq('user_id', user.id).order('attempted_at', { ascending: false }).limit(10),
    supabase.from('academy_profiles').select('cleaning_track').eq('user_id', user.id).maybeSingle(),
  ])

  const cleaningTrack = (profileData?.cleaning_track ?? 'both') as 'both' | 'residential' | 'commercial'

  function isRequired(modTrack: string) {
    if (modTrack === 'all' || cleaningTrack === 'both') return true
    return modTrack === cleaningTrack
  }

  const completedModules = new Set(
    (progress ?? []).filter((p: { completed: boolean }) => p.completed).map((p: { module_slug: string }) => p.module_slug)
  )

  const name = user.user_metadata?.full_name ?? 'Cleaner'
  const firstName = name.split(' ')[0]
  const initials = name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()

  const requiredModules = MODULES.filter(m => isRequired(m.track))
  const totalModules = requiredModules.length
  const completedCount = requiredModules.filter(m => completedModules.has(m.slug)).length
  const progressPct = Math.round((completedCount / totalModules) * 100)

  const isCertified = (certifications ?? []).some((c: { certification_type: string }) => c.certification_type === 'academy_completion')
  const certDate = (certifications ?? []).find((c: { certification_type: string }) => c.certification_type === 'academy_completion')?.issued_at
  const isReadyToWork = (certifications ?? []).some((c: { certification_type: string }) => c.certification_type === 'ready_to_work')

  const nextModule = requiredModules.find(m => !completedModules.has(m.slug))
  const quizzesPassed = (quizAttempts ?? []).filter((a: { passed: boolean }) => a.passed).length

  return (
    <div className="space-y-6">

      {/* Profile header */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-brand-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-gray-900">Welcome back, {firstName}</h1>
            <p className="text-sm text-gray-400 mt-0.5">{user.email}</p>
          </div>
          {isCertified && (
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1.5 rounded-full">
              🎓 Certified
            </span>
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-sm font-medium text-gray-500">Overall Progress</p>
            <p className="text-sm font-bold text-brand-600">{progressPct}%</p>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-brand-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1.5">{completedCount} of {totalModules} modules completed</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Modules Done', value: completedCount, color: 'text-brand-600' },
          { label: 'Remaining', value: totalModules - completedCount, color: 'text-gray-700' },
          { label: 'Quizzes Passed', value: quizzesPassed, color: 'text-green-600' },
          { label: 'Certifications', value: (certifications ?? []).length, color: 'text-amber-600' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
            <p className={`text-2xl font-bold tabular-nums ${stat.color}`} style={{ letterSpacing: '-0.02em' }}>{stat.value}</p>
            <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Certification banner */}
      {isCertified && (
        <div className="bg-gradient-to-r from-amber-400 to-yellow-400 rounded-2xl p-6 text-white text-center shadow-sm">
          <p className="text-3xl mb-1">🎓</p>
          <p className="font-bold text-lg">WPG Local Cleaners Academy</p>
          <p className="text-amber-100 text-sm font-semibold mt-0.5">{name}</p>
          {certDate && (
            <p className="text-amber-100 text-xs mt-1">
              Certified {new Date(certDate).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          )}
          {isReadyToWork && (
            <p className="mt-3 inline-flex items-center gap-1 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
              ✓ Pre-Work Sign-Off Complete
            </p>
          )}
        </div>
      )}

      {/* Next module CTA */}
      {nextModule && (
        <div className="bg-brand-600 rounded-2xl p-6 text-white shadow-sm">
          <p className="text-brand-200 text-xs font-semibold uppercase tracking-wider mb-2">Continue where you left off</p>
          <h2 className="text-lg font-bold">{nextModule.icon} {nextModule.title}</h2>
          <p className="text-brand-200 text-sm mt-1 mb-4">{nextModule.description}</p>
          <Link
            href={`/modules/${nextModule.slug}`}
            className="inline-flex items-center gap-2 bg-white text-brand-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-50 transition-colors text-sm"
          >
            Start Module →
          </Link>
        </div>
      )}

      {/* Cleaning track */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="font-semibold text-gray-900 mb-0.5">Cleaning Track</h2>
        <p className="text-sm text-gray-400 mb-4">Optional modules will be marked based on your track.</p>
        <TrackSelector current={cleaningTrack} />
      </div>

      {/* All modules grid */}
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-3" style={{ letterSpacing: '-0.015em' }}>All Modules</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {MODULES.map(mod => {
            const done = completedModules.has(mod.slug)
            const colorClass = COLOR_MAP[mod.color] ?? 'bg-gray-100 text-gray-700'
            return (
              <Link
                key={mod.slug}
                href={`/modules/${mod.slug}`}
                className={`bg-white rounded-xl p-4 border transition-all hover:shadow-md ${done ? 'border-green-200' : 'border-gray-100 hover:border-brand-200'}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${colorClass}`}>
                    {done ? '✅' : mod.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">{mod.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{mod.description}</p>
                    <p className="text-xs text-gray-300 mt-1">~{mod.estimatedMinutes} min</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Recent quiz scores */}
      {(quizAttempts ?? []).length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-semibold text-gray-900 mb-4" style={{ letterSpacing: '-0.015em' }}>Recent Quiz Results</h2>
          <div className="space-y-2">
            {(quizAttempts ?? []).map((attempt: { module_slug: string; score: number; passed: boolean; attempted_at: string }, i: number) => {
              const mod = MODULES.find(m => m.slug === attempt.module_slug)
              return (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-2">
                    <span>{mod?.icon ?? '📝'}</span>
                    <span className="text-sm text-gray-700">{mod?.title ?? attempt.module_slug}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold tabular-nums ${attempt.passed ? 'text-green-600' : 'text-red-500'}`}>{attempt.score}%</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${attempt.passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      {attempt.passed ? 'Passed' : 'Failed'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
