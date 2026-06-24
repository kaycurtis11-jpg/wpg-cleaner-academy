'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type CleaningTrack = 'both' | 'residential' | 'commercial'

const OPTIONS: { value: CleaningTrack; label: string; desc: string; icon: string }[] = [
  { value: 'both', label: 'Both', desc: 'You do residential and commercial jobs', icon: '🏠🏢' },
  { value: 'residential', label: 'Residential Only', desc: 'You clean homes and apartments only', icon: '🏡' },
  { value: 'commercial', label: 'Commercial Only', desc: 'You clean offices and businesses only', icon: '🏢' },
]

export function TrackSelector({ current }: { current: CleaningTrack }) {
  const [selected, setSelected] = useState<CleaningTrack>(current)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const router = useRouter()

  async function save() {
    setSaving(true)
    await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cleaning_track: selected }),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
    router.refresh()
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        {OPTIONS.map(opt => (
          <button
            key={opt.value}
            onClick={() => { setSelected(opt.value); setSaved(false) }}
            className={`border-2 rounded-xl p-3 text-left transition-all ${
              selected === opt.value
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <p className="text-lg mb-1">{opt.icon}</p>
            <p className={`text-sm font-semibold ${selected === opt.value ? 'text-blue-800' : 'text-gray-900'}`}>{opt.label}</p>
            <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
          </button>
        ))}
      </div>

      <button
        onClick={save}
        disabled={saving || selected === current}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
      >
        {saved ? '✓ Saved' : saving ? 'Saving…' : selected === current ? 'No changes' : 'Save Track'}
      </button>

      {saved && (
        <p className="text-xs text-green-600 text-center">Track updated — your module list will reflect this.</p>
      )}
    </div>
  )
}
