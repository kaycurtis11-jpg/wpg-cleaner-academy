'use client'

import { useState } from 'react'
import { SDS_SHEETS, type SDSEntry } from '@/lib/data/sds'

function SDSCard({ entry }: { entry: SDSEntry }) {
  const [open, setOpen] = useState(false)
  const isDanger = entry.hazardSymbols.some(h => h.includes('CORROSIVE') || h.includes('Toxic') || h.includes('Flammable'))

  return (
    <div className={`bg-white rounded-2xl shadow-sm border overflow-hidden ${isDanger ? 'border-red-200' : 'border-gray-100'}`}>
      {/* Header */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full text-left px-5 py-4 flex items-start justify-between gap-3 hover:bg-gray-50 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            {entry.hazardSymbols.map((sym, i) => (
              <span key={i} className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                sym.includes('CORROSIVE') || sym.includes('Toxic') ? 'bg-red-100 text-red-700' :
                sym.includes('Flammable') ? 'bg-orange-100 text-orange-700' :
                sym.includes('Eye Damage') || sym.includes('Eye Irritant') ? 'bg-yellow-100 text-yellow-700' :
                'bg-gray-100 text-gray-600'
              }`}>
                {sym}
              </span>
            ))}
          </div>
          <p className="font-semibold text-gray-900">{entry.productName}</p>
          <p className="text-xs text-gray-500 mt-0.5">{entry.manufacturer}</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {entry.supabasePath ? (
            <a
              href={entry.supabasePath}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
            >
              📄 View SDS
            </a>
          ) : (
            <span className="text-xs text-gray-400 italic">PDF coming</span>
          )}
          <span className="text-gray-400 text-lg">{open ? '▲' : '▼'}</span>
        </div>
      </button>

      {/* Expanded content */}
      {open && (
        <div className="px-5 pb-5 border-t border-gray-100 space-y-4 pt-4">

          {/* Hazards */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Hazard Summary</h3>
            <ul className="space-y-1">
              {entry.hazards.map((h, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-700">
                  <span className="text-red-400 flex-shrink-0">⚠</span>{h}
                </li>
              ))}
            </ul>
          </div>

          {/* PPE */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Required PPE</h3>
            <div className="flex flex-wrap gap-2">
              {entry.ppe.map((p, i) => (
                <span key={i} className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                  🛡 {p}
                </span>
              ))}
            </div>
          </div>

          {/* First Aid */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">First Aid</h3>
            <div className="grid sm:grid-cols-2 gap-2">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs font-semibold text-gray-700 mb-1">👁 Eye Contact</p>
                <p className="text-xs text-gray-600">{entry.firstAid.eyes}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs font-semibold text-gray-700 mb-1">🤚 Skin Contact</p>
                <p className="text-xs text-gray-600">{entry.firstAid.skin}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs font-semibold text-gray-700 mb-1">💨 Inhaled</p>
                <p className="text-xs text-gray-600">{entry.firstAid.inhaled}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs font-semibold text-gray-700 mb-1">⚠ Ingested</p>
                <p className="text-xs text-gray-600">{entry.firstAid.ingested}</p>
              </div>
            </div>
          </div>

          {/* Do not mix */}
          {entry.doNotMix.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <h3 className="text-xs font-bold text-red-700 uppercase tracking-wide mb-2">⛔ Do Not Mix</h3>
              <ul className="space-y-1">
                {entry.doNotMix.map((d, i) => (
                  <li key={i} className="text-sm text-red-700 font-medium">{d}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Use on / Storage */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Approved Surfaces</h3>
              <p className="text-sm text-gray-700">{entry.surfaces}</p>
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Storage</h3>
              <p className="text-sm text-gray-700">{entry.storageNotes}</p>
            </div>
          </div>

          {/* PDF link or upload note */}
          {entry.supabasePath ? (
            <a
              href={entry.supabasePath}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              📄 Open Full Safety Data Sheet (PDF)
            </a>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
              <p className="text-amber-800 text-sm">PDF not yet uploaded. Contact management if you need the full SDS sheet immediately.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function SDSPage() {
  const [search, setSearch] = useState('')
  const filtered = SDS_SHEETS.filter(s =>
    s.productName.toLowerCase().includes(search.toLowerCase()) ||
    s.manufacturer.toLowerCase().includes(search.toLowerCase())
  )

  const highRisk = filtered.filter(s =>
    s.hazardSymbols.some(h => h.includes('CORROSIVE') || h.includes('Toxic') || h.includes('Flammable'))
  )
  const standard = filtered.filter(s =>
    !s.hazardSymbols.some(h => h.includes('CORROSIVE') || h.includes('Toxic') || h.includes('Flammable'))
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Safety Data Sheets</h1>
        <p className="text-gray-500 mt-1">
          All approved cleaning products — hazards, PPE requirements, first aid, and official SDS PDFs.
        </p>
      </div>

      {/* Emergency callout */}
      <div className="bg-red-600 text-white rounded-2xl p-4">
        <p className="font-bold text-sm mb-1">🚨 In a Chemical Emergency</p>
        <p className="text-red-100 text-sm">Follow first aid instructions below. For serious exposure: call 911 and contact Poison Control at <strong>1-800-268-9017</strong> (Ontario) or <strong>1-855-764-7661</strong> (Manitoba). Notify management immediately.</p>
      </div>

      {/* Injury coverage notice */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
        <h2 className="font-semibold text-gray-900">⚕️ Injury Coverage — Know Your Status</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="font-semibold text-green-800 text-sm mb-1">✅ Employees</p>
            <p className="text-green-700 text-sm">Covered under WPG Local Cleaners&apos; WCB (Workers&apos; Compensation Board) for work-related injuries. Report any injury to management immediately.</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="font-semibold text-blue-800 text-sm mb-1">🔀 Independent Contractors</p>
            <p className="text-blue-700 text-sm">You are required to carry Commercial General Liability (CGL) insurance — proof must be provided to management before your first job. WPG covers WCB on your behalf if you do not carry your own; inform management if you do.</p>
          </div>
        </div>
        <p className="text-xs text-gray-500">Regardless of your status — all chemical exposures, injuries, and near-misses must be reported to management immediately.</p>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search products…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
      />

      {/* High risk section */}
      {highRisk.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-red-500">⚠️</span>
            <h2 className="font-semibold text-gray-900">High-Risk Products — Extra Caution Required</h2>
          </div>
          <div className="space-y-3">
            {highRisk.map(entry => <SDSCard key={entry.id} entry={entry} />)}
          </div>
        </div>
      )}

      {/* Standard section */}
      {standard.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span>🧴</span>
            <h2 className="font-semibold text-gray-900">Standard Products</h2>
          </div>
          <div className="space-y-3">
            {standard.map(entry => <SDSCard key={entry.id} entry={entry} />)}
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-10 text-gray-400">
          <p className="text-2xl mb-2">🔍</p>
          <p>No products match &quot;{search}&quot;</p>
        </div>
      )}

      {/* WHMIS reminder */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
        <h3 className="font-semibold text-blue-900 mb-2">📚 WHMIS Reminder</h3>
        <p className="text-blue-800 text-sm">You are required to review and understand the SDS for every product you use. Never use a product you cannot identify. If a product is unlabelled or its SDS is unavailable, do not use it and report it to management.</p>
      </div>
    </div>
  )
}
