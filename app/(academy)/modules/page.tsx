import { createClient } from '@/lib/supabase/server'
import { MODULES } from '@/lib/data/modules'
import Link from 'next/link'

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

export default async function ModulesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: progress } = await supabase
    .from('academy_progress')
    .select('module_slug')
    .eq('user_id', user!.id)
    .eq('completed', true)

  const completedSlugs = new Set((progress ?? []).map((p: { module_slug: string }) => p.module_slug))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">All Modules</h1>
        <p className="text-gray-500 mt-1">Complete all modules to earn your WPG Local Cleaners Academy Certification.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {MODULES.map((mod, i) => {
          const done = completedSlugs.has(mod.slug)
          const colorClass = COLOR_MAP[mod.color] ?? 'bg-gray-100 text-gray-700'
          return (
            <Link
              key={mod.slug}
              href={`/modules/${mod.slug}`}
              className={`bg-white rounded-xl p-5 shadow-sm border transition-all hover:shadow-md group ${done ? 'border-green-200' : 'border-gray-100 hover:border-blue-200'}`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${colorClass}`}>
                  {done ? '✅' : mod.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-gray-400">Module {i + 1}</span>
                    {done && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Complete</span>}
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
