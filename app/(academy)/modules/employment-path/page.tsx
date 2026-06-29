'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  CheckCircle, AlertTriangle, ChevronLeft,
  Briefcase, UserCheck, Scale, DollarSign, Clock, Shield,
  FileText, TrendingUp, Car, Package
} from 'lucide-react'

export default function EmploymentPathPage() {
  const [markDone, setMarkDone] = useState(false)
  const [markLoading, setMarkLoading] = useState(false)
  const [markError, setMarkError] = useState<string | null>(null)

  async function markComplete() {
    setMarkLoading(true)
    setMarkError(null)
    try {
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleSlug: 'employment-path', lessonSlug: 'overview', passed: true }),
      })
      if (res.ok) setMarkDone(true)
      else { const d = await res.json().catch(() => ({})); setMarkError(d.error ?? `Error ${res.status}`) }
    } catch (e) {
      setMarkError(e instanceof Error ? e.message : 'Network error')
    }
    setMarkLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Back */}
      <Link href="/modules" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition">
        <ChevronLeft className="w-4 h-4" /> All Modules
      </Link>

      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-lg">⚖️</div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Employee vs. Independent Contractor</h1>
            <p className="text-sm text-gray-500">Understanding your working arrangement with WPG Local Cleaners</p>
          </div>
        </div>
      </div>

      {/* Intro banner */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl px-6 py-5">
        <div className="flex items-start gap-3">
          <Scale className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-gray-900">Neither option is better — both are valuable.</p>
            <p className="text-sm text-gray-600 mt-1">
              The best choice depends on your personal goals, desired flexibility, and long-term plans.
              Read through both paths, then see the side-by-side comparison.
            </p>
          </div>
        </div>
      </div>

      {/* ── EMPLOYEE SECTION ── */}
      <div className="space-y-4">
        <div className="bg-blue-600 rounded-xl px-6 py-5 text-white">
          <div className="flex items-center gap-3 mb-2">
            <UserCheck className="w-5 h-5" />
            <h2 className="text-base font-bold">Employee Path</h2>
          </div>
          <p className="text-sm text-blue-100">
            As an employee, you are protected by the Manitoba Employment Standards Code. Your
            schedule is set by management, taxes are deducted at source, and you receive
            full employment benefits.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoCard icon={DollarSign} color="blue" title="Pay & Payroll">
            <ul className="space-y-1.5 text-sm text-gray-600">
              <li>• Paid on a regular biweekly schedule</li>
              <li>• Competitive hourly rate, set by management</li>
              <li>• Overtime at <strong>1.5× after 40 hours/week</strong></li>
              <li>• All deductions handled by payroll</li>
              <li>• T4 slip issued at year-end</li>
            </ul>
          </InfoCard>

          <InfoCard icon={Shield} color="blue" title="CPP & EI">
            <ul className="space-y-1.5 text-sm text-gray-600">
              <li>• <strong>CPP:</strong> 5.95% deducted from your pay — employer matches it</li>
              <li>• <strong>EI:</strong> 1.66% deducted — employer pays 2.32%</li>
              <li>• EI qualifies you for maternity, illness &amp; unemployment benefits</li>
              <li>• CPP builds your retirement pension</li>
            </ul>
            <p className="text-xs text-gray-400 mt-2 italic">
              Rates reflect current CRA regulations and are subject to change.
            </p>
          </InfoCard>

          <InfoCard icon={Clock} color="blue" title="Vacation & Time Off">
            <ul className="space-y-1.5 text-sm text-gray-600">
              <li>• <strong>Vacation pay: 4%</strong> of wages, paid out each pay period</li>
              <li>• <strong>8 general holidays</strong> in Manitoba</li>
              <li>• Holiday pay when required to work on a stat</li>
              <li>• Unpaid leaves available (medical, family)</li>
            </ul>
          </InfoCard>

          <InfoCard icon={Shield} color="blue" title="WCB & Safety">
            <ul className="space-y-1.5 text-sm text-gray-600">
              <li>• <strong>WCB coverage provided</strong> by the company</li>
              <li>• Workplace injury claims handled through WCB Manitoba</li>
              <li>• Safe work environment is the employer&apos;s legal obligation</li>
              <li>• All PPE provided by the company</li>
            </ul>
          </InfoCard>

          <InfoCard icon={Package} color="blue" title="Supplies & Equipment">
            <ul className="space-y-1.5 text-sm text-gray-600">
              <li>• All cleaning supplies provided by the company</li>
              <li>• Equipment provided and maintained by the company</li>
              <li>• You are responsible for proper care of company equipment</li>
            </ul>
          </InfoCard>

          <InfoCard icon={TrendingUp} color="blue" title="Schedule & Growth">
            <ul className="space-y-1.5 text-sm text-gray-600">
              <li>• Schedule assigned by management</li>
              <li>• Consistent hours and client assignments</li>
              <li>• Growth path: Senior Cleaner → Trainer → Team Lead</li>
              <li>• Notice required for termination (per Employment Standards)</li>
            </ul>
          </InfoCard>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h3 className="text-sm font-bold text-blue-900 mb-3">Manitoba Employment Standards — Key Protections</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-blue-800">
            {[
              'Minimum wage guaranteed by law',
              'Overtime pay after 40 hours/week',
              'At least 8 paid general holidays/year',
              'Vacation pay of 4%, paid each pay period',
              'Termination notice or pay in lieu',
              'Protection from unjust dismissal',
              'Right to a safe workplace',
              'Unpaid leaves of absence (medical, family)',
            ].map(p => (
              <div key={p} className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTRACTOR SECTION ── */}
      <div className="space-y-4 pt-2">
        <div className="bg-purple-600 rounded-xl px-6 py-5 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Briefcase className="w-5 h-5" />
            <h2 className="text-base font-bold">Independent Contractor Path</h2>
          </div>
          <p className="text-sm text-purple-100">
            As an independent contractor, you operate as your own business. You have greater
            flexibility and the ability to deduct business expenses — but you are responsible
            for managing your own taxes, insurance, and retirement contributions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoCard icon={DollarSign} color="purple" title="Pay & Invoicing">
            <ul className="space-y-1.5 text-sm text-gray-600">
              <li>• Higher gross rate than employees — reflects your responsibilities as a self-employed individual</li>
              <li>• More frequent payouts than employees</li>
              <li>• Paid per job or per hour as agreed</li>
              <li>• Submit invoices <strong>or</strong> log jobs directly in the company system</li>
              <li>• <strong>No tax deducted at source</strong> — you remit your own</li>
              <li>• T4A slip issued at year-end (not T4)</li>
              <li>• Register for GST/HST when revenue exceeds <strong>$30,000/year</strong></li>
            </ul>
          </InfoCard>

          <InfoCard icon={Shield} color="purple" title="CPP — Your Responsibility">
            <ul className="space-y-1.5 text-sm text-gray-600">
              <li>• You pay <strong>both</strong> the employee AND employer portions</li>
              <li>• Total CPP: <strong>11.9%</strong> of net self-employment income</li>
              <li>• Maximum 2025 CPP contribution: ~$4,034</li>
              <li>• Reported on Schedule 8 of your T1 return</li>
              <li>• Still builds your CPP retirement pension</li>
            </ul>
          </InfoCard>

          <InfoCard icon={FileText} color="purple" title="Taxes & Installments">
            <ul className="space-y-1.5 text-sm text-gray-600">
              <li>• File taxes as self-employed (T1 + T2125)</li>
              <li>• Recommended: set aside <strong>25–30% of income</strong> for taxes</li>
            </ul>
          </InfoCard>

          <InfoCard icon={TrendingUp} color="purple" title="Deductible Expenses">
            <ul className="space-y-1.5 text-sm text-gray-600">
              <li>• <strong>Vehicle:</strong> business-use mileage or actual expenses</li>
              <li>• <strong>Cleaning supplies &amp; equipment</strong> you purchase</li>
              <li>• <strong>Phone:</strong> business-use portion</li>
              <li>• <strong>Liability insurance</strong> premiums (~$50/month via Zensurance)</li>
              <li>• Professional development &amp; certifications</li>
            </ul>
          </InfoCard>

          <InfoCard icon={Package} color="purple" title="Supplies & Equipment">
            <ul className="space-y-1.5 text-sm text-gray-600">
              <li>• As agreed</li>
            </ul>
          </InfoCard>

          <InfoCard icon={Car} color="purple" title="Mileage Tracking">
            <ul className="space-y-1.5 text-sm text-gray-600">
              <li>• Keep a mileage log for every business trip</li>
              <li>• 2025 CRA rate: <strong>$0.72/km</strong> (first 5,000 km), $0.66 after</li>
              <li>• Recommended apps: <strong>MileIQ, Driversnote, Everlance</strong></li>
              <li>• Log date, destination, purpose, and km driven</li>
            </ul>
          </InfoCard>

          <InfoCard icon={Shield} color="purple" title="Insurance Requirements">
            <ul className="space-y-1.5 text-sm text-gray-600">
              <li>• <strong>Liability insurance is required</strong> to work with us</li>
              <li>• Minimum $2,000,000 general liability coverage</li>
              <li>• Proof of insurance must be kept on file</li>
              <li>• WCB: carry your own, or WPG covers it if you don&apos;t</li>
              <li>• Consider disability/accident insurance for income protection</li>
            </ul>
          </InfoCard>
        </div>

      </div>

      {/* ── SIDE-BY-SIDE COMPARISON ── */}
      <div className="space-y-4 pt-2">
        <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <FileText className="w-4 h-4 text-gray-500" /> Side-by-Side Comparison
        </h2>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide w-2/5">Topic</th>
                <th className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <div className="w-5 h-5 rounded bg-blue-100 flex items-center justify-center">
                      <UserCheck className="w-3 h-3 text-blue-600" />
                    </div>
                    <span className="text-xs font-bold text-blue-700">Employee</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <div className="w-5 h-5 rounded bg-purple-100 flex items-center justify-center">
                      <Briefcase className="w-3 h-3 text-purple-600" />
                    </div>
                    <span className="text-xs font-bold text-purple-700">Contractor</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Pay frequency', 'Biweekly', 'More frequent payouts'],
                ['Tax deductions', 'Employer deducts & remits automatically', 'You manage and remit your own'],
                ['CPP contributions', 'Split 50/50 with employer (5.95% each)', 'You pay both portions (11.9%)'],
                ['EI eligibility', 'Yes — full access to EI benefits', 'Limited (can opt in for special benefits)'],
                ['Vacation pay', '4% paid out each pay period', 'Not applicable'],
                ['Statutory holidays', '8 paid holidays per year', 'Not guaranteed — your responsibility'],
                ['Schedule', 'Set by management', 'Flexible — you control availability'],
                ['Outside work', 'Generally not while employed', 'You can work independently or for other companies'],
                ['Supplies & equipment', 'Provided by company', 'As agreed'],
                ['WCB coverage', 'Provided by WPG', 'Carry your own, or WPG covers it'],
                ['Liability insurance', 'Company holds policy', 'Required — you must carry your own'],
                ['Business expense deductions', 'Not available', 'Yes — vehicle, supplies, phone, etc.'],
                ['GST/HST registration', 'Not required', 'Required if revenue > $30,000/year'],
                ['Termination protection', 'Employment Standards Code applies', 'Per contract terms'],
                ['T-slip at year end', 'T4 slip', 'T4A slip'],
                ['Year-end tax form', 'Simple T1 — employer reports income', 'T1 + T2125 (business income)'],
              ].map(([topic, emp, con], i) => (
                <tr key={topic} className={`border-b border-gray-100 ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                  <td className="px-5 py-3 text-xs font-medium text-gray-700">{topic}</td>
                  <td className="px-4 py-3 text-xs text-center text-blue-800 bg-blue-50/40">{emp}</td>
                  <td className="px-4 py-3 text-xs text-center text-purple-800 bg-purple-50/40">{con}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
        <p className="text-xs text-gray-500">
          <strong className="text-gray-700">Tax &amp; Legal Disclaimer:</strong> The information in this module is provided
          for general educational purposes only and reflects Canadian federal regulations and Manitoba provincial law as
          of 2025. It does not constitute legal, tax, or financial advice. We strongly recommend consulting a qualified
          accountant, tax professional, or employment lawyer before making decisions about your working arrangement.
        </p>
      </div>

      {/* Mark complete */}
      <div className="space-y-2">
        {markDone ? (
          <div className="w-full bg-green-500 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" /> Module Complete
          </div>
        ) : (
          <button onClick={markComplete} disabled={markLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition">
            {markLoading ? 'Saving…' : '✓ Mark Module as Complete'}
          </button>
        )}
        {markError && <p className="text-xs text-red-500 text-center">Failed to save: {markError}</p>}
      </div>
    </div>
  )
}

function InfoCard({ icon: Icon, color, title, children }: {
  icon: React.ElementType; color: 'blue' | 'purple'; title: string; children: React.ReactNode
}) {
  return (
    <div className={`bg-white border rounded-xl p-5 ${color === 'blue' ? 'border-blue-100' : 'border-purple-100'}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${color === 'blue' ? 'bg-blue-100' : 'bg-purple-100'}`}>
          <Icon className={`w-4 h-4 ${color === 'blue' ? 'text-blue-600' : 'text-purple-600'}`} />
        </div>
        <h3 className="text-sm font-bold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  )
}
