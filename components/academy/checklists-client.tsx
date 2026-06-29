'use client'

import { useState } from 'react'

type CleaningTrack = 'both' | 'residential' | 'commercial'

const CHECKLISTS = [
  {
    id: 'customizable',
    title: 'Customizable Residential Checklist',
    description: 'Used for recurring clients. A unique version is created per home.',
    track: 'residential' as const,
    file: '/checklist-customizable.pdf',
    icon: '🏡',
  },
  {
    id: 'move-in-out',
    title: 'Move In / Move Out Checklist',
    description: 'Full deep-clean standard required for vacant homes.',
    track: 'residential' as const,
    file: '/checklist-move-in-out.pdf',
    icon: '📦',
  },
  {
    id: 'commercial',
    title: 'Commercial Cleaning Checklist',
    description: 'Standard for all commercial and office cleans.',
    track: 'commercial' as const,
    file: '/checklist-commercial.pdf',
    icon: '🏢',
  },
]

export function ChecklistsClient({ cleaningTrack }: { cleaningTrack: CleaningTrack }) {
  const [filter, setFilter] = useState<'all' | 'residential' | 'commercial'>(
    cleaningTrack === 'both' ? 'all' : cleaningTrack
  )
  const [expanded, setExpanded] = useState<string | null>(null)

  const visible = CHECKLISTS.filter(c => filter === 'all' || c.track === filter)

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cleaning Checklists</h1>
          <p className="text-gray-500 mt-1">Download or view your checklists before each job.</p>
        </div>
      </div>

      {cleaningTrack === 'both' && (
        <div className="flex gap-2">
          {(['all', 'residential', 'commercial'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => { setFilter(tab); setExpanded(null) }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                filter === tab
                  ? 'bg-brand-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {tab === 'all' ? 'All' : tab === 'residential' ? '🏡 Residential' : '🏢 Commercial'}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-5">
        {visible.map(checklist => (
          <div key={checklist.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Card header */}
            <div className="px-5 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{checklist.icon}</span>
                <div>
                  <h2 className="font-bold text-gray-900">{checklist.title}</h2>
                  <p className="text-sm text-gray-500 mt-0.5">{checklist.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={checklist.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
                >
                  ↗ Open
                </a>
                <a
                  href={checklist.file}
                  download
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
                >
                  ⬇ Download
                </a>
                <button
                  onClick={() => setExpanded(expanded === checklist.id ? null : checklist.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  {expanded === checklist.id ? '✕ Close' : '👁 View'}
                </button>
              </div>
            </div>

            {/* PDF viewer */}
            {expanded === checklist.id && (
              <div className="border-t border-gray-100">
                <object
                  data={checklist.file}
                  type="application/pdf"
                  className="w-full"
                  style={{ height: '80vh' }}
                >
                  <div className="flex flex-col items-center justify-center h-64 gap-4 text-gray-500">
                    <p className="text-sm">Your browser can&apos;t display this PDF inline.</p>
                    <a
                      href={checklist.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-brand-600 text-white text-sm font-medium rounded-lg hover:bg-brand-700 transition-colors"
                    >
                      Open PDF in new tab
                    </a>
                  </div>
                </object>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
