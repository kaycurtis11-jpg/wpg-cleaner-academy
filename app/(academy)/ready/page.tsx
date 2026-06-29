'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const EMPLOYEE_ITEMS = [
  { id: 'jobber', label: 'I have downloaded Jobber and can log in to my account' },
  { id: 'kris', label: 'I have saved Kris Ann\'s number in my phone — 204-805-4249 (Communications Manager)' },
  { id: 'desiree', label: 'I have saved Desiree\'s number in my phone — 204-500-1894 (Operations Manager)' },
  { id: 'kayla', label: 'I have saved Kayla\'s emergency number — 647-762-0130 (Owner, emergencies only)' },
  { id: 'slack', label: 'I have joined the WPG Local Cleaners Slack group' },
  { id: 'email', label: 'I know the general support email — support@wpglocalcleaners.ca' },
  { id: 'schedule', label: 'I understand my schedule is set by management and I must confirm availability in advance' },
  { id: 'attendance', label: 'I understand I am responsible for finding a substitute if I cannot make an accepted job' },
  { id: 'checklist', label: 'I will complete every task on the client checklist before leaving — no shortcuts' },
  { id: 'damage', label: 'I will report all damage, injuries, and incidents to management immediately — never hide them' },
  { id: 'jobber-notes', label: 'I will read all Jobber job notes before every clean' },
  { id: 'whmis', label: 'I have reviewed all product safety information and know how to find SDS sheets in the app' },
  { id: 'professional', label: 'I understand I represent WPG Local Cleaners on every job and will conduct myself professionally' },
]

const CONTRACTOR_ITEMS = [
  { id: 'jobber', label: 'I have downloaded Jobber and can log in to my account' },
  { id: 'kris', label: 'I have saved Kris Ann\'s number in my phone — 204-805-4249 (Communications Manager)' },
  { id: 'desiree', label: 'I have saved Desiree\'s number in my phone — 204-500-1894 (Operations Manager)' },
  { id: 'kayla', label: 'I have saved Kayla\'s emergency number — 647-762-0130 (Owner, emergencies only)' },
  { id: 'slack', label: 'I have joined the WPG Local Cleaners Slack group' },
  { id: 'email', label: 'I know the general support email — support@wpglocalcleaners.ca' },
  { id: 'taxes', label: 'I understand I am responsible for remitting my own taxes to the CRA, including both portions of CPP' },
  { id: 'ei', label: 'I understand I am NOT eligible for Employment Insurance (EI) through WPG Local Cleaners' },
  { id: 'insurance', label: 'I understand that Commercial General Liability (CGL) insurance is required before my first job and I must provide a Certificate of Insurance to management' },
  { id: 'attendance', label: 'I understand I am responsible for finding a substitute if I cannot make an accepted job' },
  { id: 'checklist', label: 'I will complete every task on the client checklist before leaving — no shortcuts' },
  { id: 'damage', label: 'I will report all damage, injuries, and incidents to management immediately — never hide them' },
  { id: 'jobber-notes', label: 'I will read all Jobber job notes before every clean' },
  { id: 'whmis', label: 'I have reviewed all product safety information and know how to find SDS sheets in the app' },
  { id: 'professional', label: 'I understand I represent WPG Local Cleaners on every job and will conduct myself professionally' },
]

export default function ReadyPage() {
  const [role, setRole] = useState<'employee' | 'contractor' | null>(null)
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [submitting, setSubmitting] = useState(false)
  const [alreadySigned, setAlreadySigned] = useState(false)
  const [signedDate, setSignedDate] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/ready').then(r => r.json()).then(d => {
      if (d?.certification_type === 'ready_to_work') {
        setAlreadySigned(true)
        setSignedDate(d.issued_at)
        setRole(d.notes ?? null)
      }
    })
  }, [])

  const items = role === 'employee' ? EMPLOYEE_ITEMS : role === 'contractor' ? CONTRACTOR_ITEMS : []
  const allChecked = items.length > 0 && items.every(item => checked.has(item.id))

  function toggle(id: string) {
    setChecked(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  async function submit() {
    if (!allChecked || !role) return
    setSubmitting(true)
    await fetch('/api/ready', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role }),
    })
    setAlreadySigned(true)
    setSignedDate(new Date().toISOString())
    setSubmitting(false)
    router.refresh()
  }

  if (alreadySigned) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pre-Work Sign-Off</h1>
          <p className="text-gray-500 mt-1">Your readiness confirmation is on file.</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
          <p className="text-5xl mb-3">✅</p>
          <h2 className="text-xl font-bold text-green-800">You&apos;re Cleared to Work</h2>
          <p className="text-green-700 mt-2 text-sm">
            Sign-off submitted as <strong>{role === 'employee' ? 'Employee' : 'Independent Contractor'}</strong>
          </p>
          {signedDate && (
            <p className="text-green-600 text-xs mt-1">
              {new Date(signedDate).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          )}
          <p className="text-green-600 text-sm mt-4">Management has been notified. You can now be assigned to jobs.</p>
        </div>
        <Link href="/dashboard" className="block text-center text-blue-600 hover:underline text-sm">
          ← Back to Dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pre-Work Sign-Off</h1>
        <p className="text-gray-500 mt-1">Complete this before your first job. Management will be notified when you submit.</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
        <strong>This is your official readiness confirmation.</strong> By submitting, you are confirming that you have completed Academy training, understood your role obligations, and are prepared to work professionally on behalf of WPG Local Cleaners.
      </div>

      {/* Management team */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Your Management Team</h2>
        <img src="/management-photos.jpg" alt="Management team — Desiree, Kayla, and Kris Ann" className="w-full rounded-xl object-cover mb-4" />
        <div className="grid grid-cols-3 gap-3 text-center text-xs text-gray-600">
          <div>
            <p className="font-semibold text-gray-900">Desiree</p>
            <p className="text-gray-500">Operations Manager</p>
            <p className="text-brand-600 font-medium mt-1">204-500-1894</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Kayla</p>
            <p className="text-gray-500">Founder & CEO</p>
            <p className="text-brand-600 font-medium mt-1">647-762-0130</p>
            <p className="text-gray-400 text-[10px]">emergencies only</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Kris Ann</p>
            <p className="text-gray-500">Communications Manager</p>
            <p className="text-brand-600 font-medium mt-1">204-805-4249</p>
          </div>
        </div>
      </div>

      {/* Role selection */}
      {!role && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Step 1 — Confirm your role type</h2>
          <p className="text-sm text-gray-500">This determines which obligations apply to you. If you are unsure, ask management before proceeding.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <button
              onClick={() => setRole('employee')}
              className="border-2 border-gray-200 hover:border-blue-400 rounded-xl p-4 text-left transition-all group"
            >
              <p className="font-semibold text-gray-900 group-hover:text-blue-700">✅ Employee</p>
              <p className="text-xs text-gray-500 mt-1">Regular payroll, CPP/EI deducted, covered under company insurance</p>
            </button>
            <button
              onClick={() => setRole('contractor')}
              className="border-2 border-gray-200 hover:border-blue-400 rounded-xl p-4 text-left transition-all group"
            >
              <p className="font-semibold text-gray-900 group-hover:text-blue-700">🔀 Independent Contractor</p>
              <p className="text-xs text-gray-500 mt-1">Self-employed, responsible for own taxes and insurance</p>
            </button>
          </div>
        </div>
      )}

      {/* Checklist */}
      {role && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">
                Step 2 — {role === 'employee' ? 'Employee' : 'Independent Contractor'} Sign-Off Checklist
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">Check every box to confirm you understand and agree</p>
            </div>
            <button
              onClick={() => { setRole(null); setChecked(new Set()) }}
              className="text-xs text-gray-400 hover:text-gray-600 underline"
            >
              Change role
            </button>
          </div>

          <div className="p-6 space-y-3">
            {items.map(item => (
              <button
                key={item.id}
                onClick={() => toggle(item.id)}
                className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all border ${
                  checked.has(item.id)
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-100 hover:border-gray-200'
                }`}
              >
                <div className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                  checked.has(item.id) ? 'bg-green-500 border-green-500' : 'border-gray-300 bg-white'
                }`}>
                  {checked.has(item.id) && <span className="text-white text-xs font-bold">✓</span>}
                </div>
                <p className={`text-sm leading-snug ${checked.has(item.id) ? 'text-green-800' : 'text-gray-700'}`}>
                  {item.label}
                </p>
              </button>
            ))}
          </div>

          <div className="px-6 pb-6">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
              <span>{checked.size} of {items.length} confirmed</span>
              {allChecked && <span className="text-green-600 font-medium">All items confirmed ✓</span>}
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
              <div
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{ width: `${items.length > 0 ? Math.round((checked.size / items.length) * 100) : 0}%` }}
              />
            </div>
            <button
              onClick={submit}
              disabled={!allChecked || submitting}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-colors"
            >
              {submitting ? 'Submitting…' : allChecked ? 'Submit Sign-Off — I\'m Ready to Work' : `${items.length - checked.size} items remaining`}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
