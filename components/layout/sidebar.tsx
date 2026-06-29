'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MODULES } from '@/lib/data/modules'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const NAV = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/modules', label: 'All Modules', icon: '📚' },
  { href: '/checklists', label: 'Checklists', icon: '☑️' },
  { href: '/sds', label: 'Safety Data Sheets', icon: '⚠️' },
  { href: '/ready', label: 'Pre-Work Sign-Off', icon: '✅' },
  { href: '/faq', label: 'FAQ', icon: '❓' },
  { href: '/profile', label: 'My Profile', icon: '👤' },
]

type CleaningTrack = 'both' | 'residential' | 'commercial'

function isOptional(modTrack: string, userTrack: CleaningTrack) {
  if (modTrack === 'all' || userTrack === 'both') return false
  return modTrack !== userTrack
}

export function Sidebar({ completedSlugs, cleaningTrack = 'both' }: { completedSlugs: string[]; cleaningTrack?: CleaningTrack }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const requiredModules = MODULES.filter(m => m.track === 'all' || cleaningTrack === 'both' || m.track === cleaningTrack)
  const completedCount = requiredModules.filter(m => completedSlugs.includes(m.slug)).length
  const progressPct = requiredModules.length > 0 ? Math.round((completedCount / requiredModules.length) * 100) : 0

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-white fixed left-0 top-0 z-10" style={{ borderRight: '1px solid #e8eaff' }}>
      {/* Logo — brand blue top accent */}
      <div className="px-5 pt-5 pb-4" style={{ borderBottom: '2px solid #2121b5' }}>
        <img src="/logo.png" alt="WPG Local Cleaners" className="h-10 w-auto object-contain" />
        <p className="text-[11px] font-bold text-brand-600 mt-1.5 uppercase tracking-widest">Cleaner Academy</p>
      </div>

      {/* Nav */}
      <nav className="px-3 pt-4 pb-2 space-y-0.5">
        {NAV.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
              pathname === item.href
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-brand-50 hover:text-brand-700'
            }`}
          >
            <span className="text-base leading-none">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Overall progress */}
      <div className="mx-4 my-3 px-3 py-3 rounded-xl bg-brand-50 border border-brand-100">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[11px] font-semibold text-brand-700 uppercase tracking-wider">Your Progress</p>
          <p className="text-sm font-bold text-brand-700">{progressPct}%</p>
        </div>
        <div className="w-full bg-brand-100 rounded-full h-1.5">
          <div
            className="bg-brand-600 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <p className="text-[10px] text-brand-500 mt-1.5">{completedCount} of {requiredModules.length} modules done</p>
      </div>

      {/* Module list */}
      <div className="px-4 pb-2 flex-1 overflow-y-auto scrollbar-hide">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2 px-3">Modules</p>
        <div className="space-y-0.5">
          {MODULES.map(mod => {
            const done = completedSlugs.includes(mod.slug)
            const active = pathname.includes(`/modules/${mod.slug}`)
            const optional = isOptional(mod.track, cleaningTrack)
            return (
              <Link
                key={mod.slug}
                href={`/modules/${mod.slug}`}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
                  active
                    ? 'bg-brand-50 text-brand-700 border-l-2 border-brand-600'
                    : done
                    ? 'text-gray-500 hover:bg-gray-50'
                    : 'text-gray-600 hover:bg-brand-50/60'
                }`}
              >
                <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
                  {done
                    ? <span className="text-green-500 text-sm">✓</span>
                    : optional
                    ? <span className="text-gray-300 text-base">{mod.icon}</span>
                    : <span className="text-base">{mod.icon}</span>
                  }
                </span>
                <span className={`truncate flex-1 ${done ? 'line-through opacity-60' : ''}`}>{mod.title}</span>
                {optional && !done && (
                  <span className="text-gray-300 text-[10px] flex-shrink-0">opt</span>
                )}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Sign out */}
      <div className="p-4" style={{ borderTop: '1px solid #e8eaff' }}>
        <button
          onClick={signOut}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <span>🚪</span> Sign out
        </button>
      </div>
    </aside>
  )
}
