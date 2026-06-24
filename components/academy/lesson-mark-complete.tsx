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
  const [error, setError] = useState(false)
  const router = useRouter()

  async function mark() {
    setLoading(true)
    setError(false)
    try {
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleSlug, lessonSlug, passed: true }),
      })
      if (res.ok) {
        setDone(true)
        router.refresh()
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    }
    setLoading(false)
  }

  if (done) {
    return (
      <div className="w-full bg-green-500 text-white font-semibold py-3 rounded-xl mt-2 flex items-center justify-center gap-2">
        <span>✓</span> Completed
      </div>
    )
  }

  return (
    <div className="space-y-2 mt-2">
      <button
        onClick={mark}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
      >
        {loading ? 'Saving…' : `✓ ${label}`}
      </button>
      {error && (
        <p className="text-xs text-red-500 text-center">Failed to save — check your connection and try again.</p>
      )}
    </div>
  )
}
