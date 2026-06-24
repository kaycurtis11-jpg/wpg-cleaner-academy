'use client'

import { useState } from 'react'

type CleaningTrack = 'both' | 'residential' | 'commercial'

interface ChecklistItem {
  label: string
  note?: string
}

interface ChecklistSection {
  title: string
  icon: string
  items: ChecklistItem[]
  tip?: string
  warning?: string
}

interface Checklist {
  id: string
  title: string
  track: 'residential' | 'commercial'
  sections: ChecklistSection[]
}

const CHECKLISTS: Checklist[] = [
  {
    id: 'residential-standard',
    title: 'Standard Residential Clean',
    track: 'residential',
    sections: [
      {
        title: 'General Areas',
        icon: '🏠',
        items: [
          { label: 'Dust all surfaces: furniture, shelves, decor, door frames & vents' },
          { label: 'Dust all light fixtures & clean ceiling fan' },
          { label: 'Straighten up and organize all living spaces' },
          { label: 'Disinfect all high-touch surfaces: doorknobs & light switches' },
          { label: 'Clean windows/window sills & mirrors' },
          { label: 'Dust blinds & curtains' },
          { label: 'Sweep/Vacuum & mop all floors', note: 'Always pick up floor mats and clean underneath' },
        ],
        tip: 'Work top-to-bottom, back-to-front in each room. Dry tasks before wet tasks.',
      },
      {
        title: 'Kitchen',
        icon: '🍳',
        items: [
          { label: 'Clean & sanitize all surfaces' },
          { label: 'Wipe cupboards & backsplash' },
          { label: 'Clean inside microwave' },
          { label: 'Wash dishes & clean sink' },
          { label: 'Empty all garbages' },
          { label: 'Wipe down all appliance exteriors', note: 'Stove top, oven, microwave, and refrigerator exterior' },
        ],
        tip: 'Use Weiman Stainless Steel Cleaner on stainless exteriors. Use Weiman Cooktop Cream on glass/ceramic cooktops.',
      },
      {
        title: 'Bedrooms',
        icon: '🛏️',
        items: [
          { label: 'Dust all surfaces' },
          { label: 'Make beds' },
          { label: 'Change bedsheets', note: 'Only if sheets are left out by the client' },
          { label: 'Clean mirrors & windows' },
          { label: 'Vacuum and/or mop' },
        ],
      },
      {
        title: 'Bathrooms',
        icon: '🚿',
        items: [
          { label: 'Clean & sanitize toilets, sinks & showers/bathtubs', note: 'Always clean sides AND behind the toilet' },
          { label: 'Clean mirrors, windows & other surfaces' },
          { label: 'Empty & clean trash can' },
          { label: 'Clean light fixtures' },
          { label: 'Clean baseboards' },
        ],
        warning: 'Never forget to clean the sides and BEHIND the toilet. Most common client complaint.',
        tip: 'Use Lysol Toilet Bowl Cleaner for bowl interior only. Use Lysol All Purpose for toilet exterior, sinks, and surfaces.',
      },
    ],
  },
  {
    id: 'residential-deep',
    title: 'Deep Clean Extras',
    track: 'residential',
    sections: [
      {
        title: 'Deep Clean Tasks',
        icon: '🔍',
        items: [
          { label: 'Clean inside oven', note: 'Use EasyOff — gloves and eye protection required' },
          { label: 'Clean inside fridge' },
          { label: 'Clean baseboards (wet wipe)' },
          { label: 'Wash & fold laundry', note: 'Only if included in estimate' },
          { label: 'Vacuum/mop under beds & furniture' },
          { label: 'Vacuum under couch cushions' },
          { label: 'Wash walls' },
          { label: 'Clean exterior & interior of garbage bin' },
          { label: 'Wash doors' },
        ],
        warning: 'Deep clean extras are only performed when marked as "Included in estimate" on the client checklist. Never do these unless confirmed.',
      },
    ],
  },
  {
    id: 'residential-moveout',
    title: 'Move In / Move Out Clean',
    track: 'residential',
    sections: [
      {
        title: 'All Areas',
        icon: '📦',
        items: [
          { label: 'Dust/wet wipe fans & blinds' },
          { label: 'Clean INSIDE window sills' },
          { label: 'Wash windows' },
          { label: 'Dust all light fixtures' },
          { label: 'Clean inside all closets' },
          { label: 'Dust & wet wipe all shelving' },
          { label: 'Dust & wet wipe all doors' },
          { label: 'Clean & disinfect light switches' },
          { label: 'Dust all baseboards' },
          { label: 'Vacuum all floors & mop all hard surfaces' },
        ],
      },
      {
        title: 'Kitchen',
        icon: '🍳',
        items: [
          { label: 'Dust on top of cabinets' },
          { label: 'Clean exterior of all appliances' },
          { label: 'Clean exterior & interior of cabinets' },
          { label: 'Vacuum & wet wipe INSIDE all drawers & cabinets' },
          { label: 'Clean backsplash' },
          { label: 'Clean inside & outside of microwave' },
          { label: 'Polish all stainless steel' },
          { label: 'Clean & polish sink' },
          { label: 'Clean INTERIOR of oven' },
          { label: 'Clean INTERIOR of fridge' },
          { label: 'Clean BEHIND oven & fridge', note: 'Only if moved by client' },
        ],
      },
      {
        title: 'Bathrooms',
        icon: '🚿',
        items: [
          { label: 'Dust & spot clean walls' },
          { label: 'Dust & wet wipe light fixtures' },
          { label: 'Clean exterior & interior of cabinets' },
          { label: 'Clean & disinfect toilet — GET BEHIND' },
          { label: 'Clean & scrub shower head, hose, walls, doors & bathtub' },
          { label: 'Clean & disinfect sinks & counters' },
        ],
      },
    ],
  },
  {
    id: 'commercial-standard',
    title: 'Standard Commercial Clean',
    track: 'commercial',
    sections: [
      {
        title: 'General Areas',
        icon: '🏢',
        items: [
          { label: 'Empty garbage & recycling', note: 'Use client-supplied liners' },
          { label: 'Vacuum carpets and carpet tiles' },
          { label: 'Sweep & damp mop hard floors' },
          { label: 'Dust horizontal surfaces', note: 'Up to 5 ft or as far as duster can reach' },
          { label: 'Wipe desks, tables, and counters', note: 'Clear surfaces only — do NOT move paperwork' },
          { label: 'Clean interior glass on doors & partitions' },
          { label: 'Spot clean light marks on walls & doors' },
          { label: 'Straighten furniture', note: 'No lifting or moving items over 25 lbs' },
          { label: 'Light dusting of accessible vents, ledges & baseboards' },
          { label: 'Check for any spills or visible safety hazards' },
        ],
      },
      {
        title: 'Washrooms',
        icon: '🚻',
        items: [
          { label: 'Empty garbage & replace liners' },
          { label: 'Clean & disinfect toilets, sinks & high-touch surfaces' },
          { label: 'Clean mirrors' },
          { label: 'Dust light fixtures' },
          { label: 'Dust & spot clean walls, baseboards & accessible vents' },
          { label: 'Spot clean partitions & doors' },
          { label: 'Sweep & mop all floors' },
          { label: 'Refill soap/paper', note: 'Supplies are provided on-site by the client' },
        ],
      },
      {
        title: 'Kitchenettes & Breakrooms',
        icon: '☕',
        items: [
          { label: 'Clean exterior surfaces of appliances' },
          { label: 'Wipe counters & tables' },
          { label: 'Clean sinks & faucets' },
          { label: 'Empty garbage & recycling' },
          { label: 'Spot clean backsplash' },
          { label: 'Sweep or vacuum & mop floors' },
        ],
      },
    ],
  },
]

function ChecklistCard({ checklist }: { checklist: Checklist }) {
  const [checked, setChecked] = useState<Set<string>>(new Set())

  function toggle(key: string) {
    setChecked(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  function reset() {
    setChecked(new Set())
  }

  const totalItems = checklist.sections.reduce((sum, s) => sum + s.items.length, 0)
  const doneCount = checked.size
  const pct = totalItems > 0 ? Math.round((doneCount / totalItems) * 100) : 0

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden print:shadow-none print:border-gray-300 print:break-inside-avoid">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
        <h2 className="font-bold text-gray-900">{checklist.title}</h2>
        <div className="flex items-center gap-3 print:hidden">
          <span className="text-sm text-gray-500">{doneCount}/{totalItems}</span>
          {doneCount > 0 && (
            <button onClick={reset} className="text-xs text-gray-400 hover:text-red-500 underline transition-colors">
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-gray-100 print:hidden">
        <div
          className={`h-1.5 transition-all ${pct === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Sections */}
      <div className="p-5 space-y-6">
        {checklist.sections.map((section, si) => (
          <div key={si}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{section.icon}</span>
              <h3 className="font-semibold text-gray-800">{section.title}</h3>
            </div>

            <div className="space-y-2">
              {section.items.map((item, ii) => {
                const key = `${checklist.id}-${si}-${ii}`
                const done = checked.has(key)
                return (
                  <div key={ii}>
                    <button
                      onClick={() => toggle(key)}
                      className={`w-full flex items-start gap-3 p-2.5 rounded-lg text-left transition-all print:pointer-events-none ${
                        done ? 'bg-green-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all print:border-gray-400 ${
                        done ? 'bg-green-500 border-green-500' : 'border-gray-300 bg-white'
                      }`}>
                        {done && <span className="text-white text-xs font-bold">✓</span>}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm leading-snug ${done ? 'text-green-800 line-through' : 'text-gray-800'} print:no-underline print:text-gray-900`}>
                          {item.label}
                        </p>
                        {item.note && (
                          <p className="text-xs text-gray-400 mt-0.5 italic">{item.note}</p>
                        )}
                      </div>
                    </button>
                  </div>
                )
              })}
            </div>

            {section.warning && (
              <div className="mt-3 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                <p className="text-xs text-red-700 font-medium">⚠ {section.warning}</p>
              </div>
            )}
            {section.tip && (
              <div className="mt-3 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                <p className="text-xs text-blue-700">💡 {section.tip}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Done state */}
      {pct === 100 && (
        <div className="mx-5 mb-5 bg-green-50 border border-green-200 rounded-xl p-3 text-center print:hidden">
          <p className="text-green-700 font-semibold text-sm">✓ All items completed</p>
        </div>
      )}
    </div>
  )
}

export function ChecklistsClient({ cleaningTrack }: { cleaningTrack: CleaningTrack }) {
  const [filter, setFilter] = useState<'all' | 'residential' | 'commercial'>(
    cleaningTrack === 'both' ? 'all' : cleaningTrack
  )

  const visible = CHECKLISTS.filter(c =>
    filter === 'all' || c.track === filter
  )

  return (
    <>
      {/* Print styles */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print-area, .print-area * { visibility: visible; }
          .print-area { position: absolute; left: 0; top: 0; width: 100%; }
          .print\\:hidden { display: none !important; }
          .print\\:break-inside-avoid { break-inside: avoid; }
        }
      `}</style>

      <div className="space-y-6 print-area">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 print:hidden">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Cleaning Checklists</h1>
            <p className="text-gray-500 mt-1">Use these on the job. Tap items to check them off, then reset when done.</p>
          </div>
          <button
            onClick={() => window.print()}
            className="flex-shrink-0 flex items-center gap-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-xl shadow-sm transition-colors"
          >
            🖨️ Print
          </button>
        </div>

        {/* Filter tabs */}
        {cleaningTrack === 'both' && (
          <div className="flex gap-2 print:hidden">
            {(['all', 'residential', 'commercial'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  filter === tab
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {tab === 'all' ? 'All' : tab === 'residential' ? '🏡 Residential' : '🏢 Commercial'}
              </button>
            ))}
          </div>
        )}

        {/* Checklists */}
        <div className="space-y-6">
          {visible.map(checklist => (
            <ChecklistCard key={checklist.id} checklist={checklist} />
          ))}
        </div>

        {/* Print tip */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-500 print:hidden">
          <p><strong>Tip:</strong> Tap any item to check it off as you go. Hit <strong>Reset</strong> at the top of each checklist to start fresh. Use the <strong>Print</strong> button to generate a paper copy.</p>
        </div>
      </div>
    </>
  )
}
