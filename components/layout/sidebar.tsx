'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MODULES } from '@/lib/data/modules'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const NAV = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/modules', label: 'All Modules', icon: '📚' },
  { href: '/sds', label: 'Safety Data Sheets', icon: '⚠️' },
  { href: '/ready', label: 'Pre-Work Sign-Off', icon: '✅' },
  { href: '/faq', label: 'FAQ', icon: '❓' },
  { href: '/profile', label: 'My Profile', icon: '👤' },
]

export function Sidebar({ completedSlugs }: { completedSlugs: string[] }) {
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
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-lg">🏠</span>
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm leading-tight">WPG Local Cleaners</p>
            <p className="text-xs text-blue-600 font-medium">Cleaner Academy</p>
          </div>
        </div>
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
            return (
              <Link
                key={mod.slug}
                href={`/modules/${mod.slug}`}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  active ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="text-base leading-none">{done ? '✅' : mod.icon}</span>
                <span className="truncate">{mod.title}</span>
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
