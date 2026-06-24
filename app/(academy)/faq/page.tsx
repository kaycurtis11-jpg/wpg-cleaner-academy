import { getModule } from '@/lib/data/modules'

export default function FaqPage() {
  const faqModule = getModule('faq')
  const lesson = faqModule?.lessons.find(l => l.slug === 'faq-main')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">FAQ Center</h1>
        <p className="text-gray-500 mt-1">Common questions answered. Can&apos;t find what you&apos;re looking for? Contact management.</p>
      </div>

      {lesson?.sections?.map((section, i) => (
        <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
            <h2 className="font-semibold text-blue-900">{section.heading}</h2>
          </div>
          <div className="px-6 py-4">
            <ul className="space-y-2">
              {section.bullets.map((b, bi) => (
                <li key={bi} className="flex gap-2 text-sm text-gray-700">
                  <span className="text-blue-400 mt-0.5 flex-shrink-0">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      {/* Contact card */}
      <div className="bg-blue-600 rounded-2xl p-6 text-white">
        <h2 className="font-bold text-lg mb-3">Still Have a Question?</h2>
        <div className="space-y-2 text-sm text-blue-100">
          <p>📞 Kris Ann (Communications): 204-805-4249</p>
          <p>📞 Desiree (Operations): 204-500-1894</p>
          <p>📧 info@wpglocalcleaners.ca</p>
          <p>📧 support@wpglocalcleaners.ca</p>
          <p className="text-blue-200 text-xs mt-3">Hours: 9am–5pm daily · After-hours emergencies: Kayla 647-762-0130</p>
        </div>
      </div>
    </div>
  )
}
