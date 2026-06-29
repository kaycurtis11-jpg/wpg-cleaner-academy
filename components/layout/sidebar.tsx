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

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-white border-r border-gray-200 fixed left-0 top-0 z-10">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-gray-100">
        <img src="/logo.png" alt="WPG Local Cleaners" className="h-10 w-auto object-contain" />
        <p className="text-xs text-brand-600 font-semibold mt-1">Cleaner Academy</p>
      </div>

      {/* Nav */}
      <nav className="p-4 space-y-1">
        {NAV.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === item.href
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Module Progress */}
      <div className="px-4 pb-2 pt-4 border-t border-gray-100 mt-2">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Modules</p>
        <div className="space-y-1 max-h-80 overflow-y-auto scrollbar-hide">
          {MODULES.map(mod => {
            const done = completedSlugs.includes(mod.slug)
            const active = pathname.includes(`/modules/${mod.slug}`)
            const optional = isOptional(mod.track, cleaningTrack)
            return (
              <Link
                key={mod.slug}
                href={`/modules/${mod.slug}`}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  active ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="text-base leading-none flex-shrink-0">{done ? '✅' : optional ? '⏭️' : mod.icon}</span>
                <span className="truncate flex-1">{mod.title}</span>
                {optional && !done && (
                  <span className="text-gray-400 text-xs flex-shrink-0">opt</span>
                )}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Sign out */}
      <div className="mt-auto p-4 border-t border-gray-100">
        <button
          onClick={signOut}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <span>🚪</span> Sign Out
        </button>
      </div>
    </aside>
  )
}
