import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/layout/sidebar'
import { MobileNav } from '@/components/layout/mobile-nav'

export default async function AcademyLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const [{ data: progress }, { data: profileData }] = await Promise.all([
    supabase.from('academy_progress').select('module_slug').eq('user_id', user.id).eq('completed', true),
    supabase.from('academy_profiles').select('cleaning_track').eq('user_id', user.id).maybeSingle(),
  ])

  const completedSlugs = Array.from(new Set((progress ?? []).map((p: { module_slug: string }) => p.module_slug)))
  const cleaningTrack = (profileData?.cleaning_track ?? 'both') as 'both' | 'residential' | 'commercial'
  const userName = user.user_metadata?.full_name?.split(' ')[0] ?? 'Cleaner'

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar completedSlugs={completedSlugs} cleaningTrack={cleaningTrack} />
      <MobileNav completedSlugs={completedSlugs} userName={userName} cleaningTrack={cleaningTrack} />
      <main className="lg:pl-64 pt-14 lg:pt-0">
        <div className="max-w-4xl mx-auto px-4 py-6 lg:py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
