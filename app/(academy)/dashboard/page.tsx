import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { MODULES } from '@/lib/data/modules'
import Link from 'next/link'

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

  const { data: progress } = await supabase
    .from('academy_progress')
    .select('module_slug, completed')
    .eq('user_id', user.id)

  const completedModules = new Set(
    (progress ?? []).filter((p: { completed: boolean }) => p.completed).map((p: { module_slug: string }) => p.module_slug)
  )

  const { data: certifications } = await supabase
    .from('academy_certifications')
    .select('certification_type, issued_at')
    .eq('user_id', user.id)

  const name = user.user_metadata?.full_name?.split(' ')[0] ?? 'Cleaner'
  const totalModules = MODULES.length
  const completedCount = completedModules.size
  const progressPct = Math.round((completedCount / totalModules) * 100)
  const isCertified = (certifications ?? []).some((c: { certification_type: string }) => c.certification_type === 'academy_completion')

  const nextModule = MODULES.find(m => !completedModules.has(m.slug))

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {name} 👋</h1>
        <p className="text-gray-500 mt-1">Your training progress at WPG Local Cleaners Academy</p>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Overall Progress</p>
            <p className="text-3xl font-bold text-gray-900">{progressPct}%</p>
          </div>
          {isCertified && (
            <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              🎓 Certified
            </div>
          )}
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">{completedCount} of {totalModules} modules completed</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <p className="text-2xl font-bold text-blue-600">{completedCount}</p>
          <p className="text-xs text-gray-500 mt-1">Modules Done</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <p className="text-2xl font-bold text-blue-600">{totalModules - completedCount}</p>
          <p className="text-xs text-gray-500 mt-1">Remaining</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <p className="text-2xl font-bold text-blue-600">{(certifications ?? []).length}</p>
          <p className="text-xs text-gray-500 mt-1">Certifications</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <p className="text-2xl font-bold text-blue-600">{isCertified ? '✅' : '⏳'}</p>
          <p className="text-xs text-gray-500 mt-1">Ready to Work</p>
        </div>
      </div>

      {/* Next up */}
      {nextModule && (
        <div className="bg-blue-600 rounded-2xl p-6 text-white">
          <p className="text-blue-200 text-sm font-medium mb-1">Continue Where You Left Off</p>
          <h2 className="text-xl font-bold mb-1">{nextModule.icon} {nextModule.title}</h2>
          <p className="text-blue-200 text-sm mb-4">{nextModule.description}</p>
          <Link
            href={`/modules/${nextModule.slug}`}
            className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Start Module →
          </Link>
        </div>
      )}

      {isCertified && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
          <p className="text-4xl mb-2">🎓</p>
          <h2 className="text-xl font-bold text-amber-800">Academy Complete!</h2>
          <p className="text-amber-700 text-sm mt-1">You have earned your WPG Local Cleaners Certification. You are ready to work!</p>
        </div>
      )}

      {/* All Modules */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">All Modules</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {MODULES.map(mod => {
            const done = completedModules.has(mod.slug)
            const colorClass = COLOR_MAP[mod.color] ?? 'bg-gray-100 text-gray-700'
            return (
              <Link
                key={mod.slug}
                href={`/modules/${mod.slug}`}
                className={`bg-white rounded-xl p-4 shadow-sm border transition-all hover:shadow-md hover:border-blue-200 ${done ? 'border-green-200' : 'border-gray-100'}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${colorClass}`}>
                    {done ? '✅' : mod.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">{mod.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{mod.description}</p>
                    <p className="text-xs text-gray-400 mt-1">~{mod.estimatedMinutes} min</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
