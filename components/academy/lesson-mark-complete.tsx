'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  moduleSlug: string
  lessonSlug: string
  label?: string
}

export function LessonMarkComplete({ moduleSlug, lessonSlug, label = 'Mark as Complete' }: Props) {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const router = useRouter()

  async function mark() {
    setLoading(true)
    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ moduleSlug, lessonSlug, passed: true }),
    })
    setLoading(false)
    setDone(true)
    router.refresh()
  }

  if (done) {
    return (
      <div className="w-full bg-green-500 text-white font-semibold py-3 rounded-xl mt-2 flex items-center justify-center gap-2">
        <span>✓</span> Completed
      </div>
    )
  }

  return (
    <button
      onClick={mark}
      disabled={loading}
      className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors mt-2"
    >
      {loading ? 'Saving…' : `✓ ${label}`}
    </button>
  )
}
