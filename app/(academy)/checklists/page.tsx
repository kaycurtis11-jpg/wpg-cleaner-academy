import { createClient } from '@/lib/supabase/server'
import { ChecklistsClient } from '@/components/academy/checklists-client'

export default async function ChecklistsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profileData } = await supabase
    .from('academy_profiles')
    .select('cleaning_track')
    .eq('user_id', user!.id)
    .maybeSingle()

  const cleaningTrack = (profileData?.cleaning_track ?? 'both') as 'both' | 'residential' | 'commercial'

  return <ChecklistsClient cleaningTrack={cleaningTrack} />
}
