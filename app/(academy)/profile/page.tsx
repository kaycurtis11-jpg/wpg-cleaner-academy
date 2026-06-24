import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { MODULES } from '@/lib/data/modules'
import Link from 'next/link'
import { TrackSelector } from '@/components/academy/track-selector'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: progress } = await supabase
    .from('academy_progress')
    .select('module_slug, lesson_slug, completed, quiz_score, completed_at')
    .eq('user_id', user.id)
    .eq('completed', true)
    .order('completed_at', { ascending: false })

  const { data: certifications } = await supabase
    .from('academy_certifications')
    .select('*')
    .eq('user_id', user.id)

  const { data: quizAttempts } = await supabase
    .from('academy_quiz_attempts')
    .select('module_slug, score, passed, attempted_at')
    .eq('user_id', user.id)
    .order('attempted_at', { ascending: false })
    .limit(10)

  const { data: profileData } = await supabase
    .from('academy_profiles')
    .select('cleaning_track')
    .eq('user_id', user.id)
    .maybeSingle()

  const cleaningTrack = (profileData?.cleaning_track ?? 'both') as 'both' | 'residential' | 'commercial'
  const name = user.user_metadata?.full_name ?? 'Cleaner'
  const completedModuleSlugs = new Set((progress ?? []).map((p: { module_slug: string }) => p.module_slug))
  const completedCount = completedModuleSlugs.size
  const isCertified = (certifications ?? []).some((c: { certification_type: string }) => c.certification_type === 'academy_completion')
  const certDate = (certifications ?? []).find((c: { certification_type: string }) => c.certification_type === 'academy_completion')?.issued_at

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500 mt-1">Your Academy record and certifications.</p>
      </div>

      {/* Profile card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{name}</h2>
            <p className="text-gray-500 text-sm">{user.email}</p>
            {isCertified && (
              <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full mt-1">
                🎓 WPG Academy Certified
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
          <p className="text-2xl font-bold text-blue-600">{completedCount}</p>
          <p className="text-xs text-gray-500 mt-1">Modules Done</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
          <p className="text-2xl font-bold text-blue-600">{(certifications ?? []).length}</p>
          <p className="text-xs text-gray-500 mt-1">Certifications</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
          <p className="text-2xl font-bold text-blue-600">{(quizAttempts ?? []).filter((a: { passed: boolean }) => a.passed).length}</p>
          <p className="text-xs text-gray-500 mt-1">Quizzes Passed</p>
        </div>
      </div>

      {/* Certification */}
      {isCertified && (
        <div className="bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl p-6 text-white text-center">
          <p className="text-4xl mb-2">🎓</p>
          <h2 className="text-xl font-bold">WPG Local Cleaners</h2>
          <p className="text-lg font-semibold mt-1">Academy Certification</p>
          <p className="font-bold text-lg mt-2">{name}</p>
          {certDate && (
            <p className="text-amber-100 text-sm mt-1">
              Issued {new Date(certDate).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          )}
        </div>
      )}

      {/* Cleaning track */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-1">Cleaning Track</h3>
        <p className="text-sm text-gray-500 mb-4">Set your track so optional modules are clearly marked in your module list.</p>
        <TrackSelector current={cleaningTrack} />
      </div>

      {/* Module progress */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Module Progress</h3>
        <div className="space-y-2">
          {MODULES.map(mod => {
            const done = completedModuleSlugs.has(mod.slug)
            return (
              <Link key={mod.slug} href={`/modules/${mod.slug}`} className="flex items-center gap-3 py-2 hover:text-blue-600 transition-colors">
                <span className="text-lg">{done ? '✅' : mod.icon}</span>
                <span className={`text-sm flex-1 ${done ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>{mod.title}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${done ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {done ? 'Done' : 'Pending'}
                </span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Recent quiz scores */}
      {(quizAttempts ?? []).length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Quiz Results</h3>
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
                    <span className={`text-sm font-bold ${attempt.passed ? 'text-green-600' : 'text-red-500'}`}>{attempt.score}%</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${attempt.passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
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
