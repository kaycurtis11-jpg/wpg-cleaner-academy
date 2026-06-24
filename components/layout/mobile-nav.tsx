'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MODULES } from '@/lib/data/modules'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

type CleaningTrack = 'both' | 'residential' | 'commercial'

function isOptional(modTrack: string, userTrack: CleaningTrack) {
  if (modTrack === 'all' || userTrack === 'both') return false
  return modTrack !== userTrack
}

export function MobileNav({ completedSlugs, userName, cleaningTrack = 'both' }: {
  completedSlugs: string[]
  userName: string
  cleaningTrack?: CleaningTrack
}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <>
      {/* Top bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🏠</span>
          <div>
            <p className="font-bold text-gray-900 text-sm">WPG Academy</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">{userName}</span>
          <button onClick={() => setOpen(true)} className="p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-30">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🏠</span>
                <p className="font-bold text-gray-900">Cleaner Academy</p>
              </div>
              <button onClick={() => setOpen(false)} className="p-1 text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <nav className="p-4 space-y-1">
              {[
                { href: '/dashboard', label: 'Dashboard', icon: '📊' },
                { href: '/modules', label: 'All Modules', icon: '📚' },
                { href: '/checklists', label: 'Checklists', icon: '☑️' },
                { href: '/sds', label: 'Safety Data Sheets', icon: '⚠️' },
                { href: '/ready', label: 'Pre-Work Sign-Off', icon: '✅' },
                { href: '/faq', label: 'FAQ', icon: '❓' },
                { href: '/profile', label: 'My Profile', icon: '👤' },
              ].map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    pathname === item.href ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{item.icon}</span>{item.label}
                </Link>
              ))}
            </nav>

            <div className="px-4 border-t pt-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Modules</p>
              <div className="space-y-1 max-h-72 overflow-y-auto">
                {MODULES.map(mod => {
                  const done = completedSlugs.includes(mod.slug)
                  const optional = isOptional(mod.track, cleaningTrack)
                  return (
                    <Link
                      key={mod.slug}
                      href={`/modules/${mod.slug}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-600 hover:bg-gray-50"
                    >
                      <span className="flex-shrink-0">{done ? '✅' : optional ? '⏭️' : mod.icon}</span>
                      <span className="truncate flex-1">{mod.title}</span>
                      {optional && !done && <span className="text-gray-400 flex-shrink-0">opt</span>}
                    </Link>
                  )
                })}
              </div>
            </div>

            <div className="mt-auto p-4 border-t">
              <button onClick={signOut} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                <span>🚪</span> Sign Out
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}
