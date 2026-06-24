import { createClient } from '@/lib/supabase/server'
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

type CleaningTrack = 'both' | 'residential' | 'commercial'

function isOptional(modTrack: string, userTrack: CleaningTrack) {
  if (modTrack === 'all' || userTrack === 'both') return false
  return modTrack !== userTrack
}

export default async function ModulesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [{ data: progress }, { data: profileData }] = await Promise.all([
    supabase.from('academy_progress').select('module_slug').eq('user_id', user!.id).eq('completed', true),
    supabase.from('academy_profiles').select('cleaning_track').eq('user_id', user!.id).maybeSingle(),
  ])

  const completedSlugs = new Set((progress ?? []).map((p: { module_slug: string }) => p.module_slug))
  const cleaningTrack = (profileData?.cleaning_track ?? 'both') as CleaningTrack

  const trackLabel: Record<CleaningTrack, string> = {
    both: 'Residential & Commercial',
    residential: 'Residential Only',
    commercial: 'Commercial Only',
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">All Modules</h1>
        <p className="text-gray-500 mt-1">Complete all required modules to earn your WPG Local Cleaners Academy Certification.</p>
      </div>

      {/* Track banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-blue-900">Your Track: {trackLabel[cleaningTrack]}</p>
          <p className="text-xs text-blue-700 mt-0.5">
            {cleaningTrack === 'both'
              ? 'All modules are required for you.'
              : 'Modules outside your track are marked optional — you can still complete them.'}
          </p>
        </div>
        <Link href="/profile" className="text-xs text-blue-600 underline whitespace-nowrap">Change track</Link>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {MODULES.map((mod, i) => {
          const done = completedSlugs.has(mod.slug)
          const optional = isOptional(mod.track, cleaningTrack)
          const colorClass = COLOR_MAP[mod.color] ?? 'bg-gray-100 text-gray-700'
          return (
            <Link
              key={mod.slug}
              href={`/modules/${mod.slug}`}
              className={`bg-white rounded-xl p-5 shadow-sm border transition-all hover:shadow-md group ${
                done ? 'border-green-200' : optional ? 'border-gray-100 opacity-75 hover:opacity-100' : 'border-gray-100 hover:border-blue-200'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${done ? 'bg-green-100 text-green-700' : colorClass}`}>
                  {done ? '✅' : mod.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-medium text-gray-400">Module {i + 1}</span>
                    {done && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Complete</span>}
                    {optional && !done && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">Optional for you</span>}
                  </div>
                  <p className="font-semibold text-gray-900">{mod.title}</p>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{mod.description}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-gray-400">~{mod.estimatedMinutes} min</span>
                    <span className="text-xs text-gray-400">{mod.lessons.length} lessons</span>
                  </div>
                </div>
                <span className="text-gray-300 group-hover:text-blue-400 transition-colors ml-2">→</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
