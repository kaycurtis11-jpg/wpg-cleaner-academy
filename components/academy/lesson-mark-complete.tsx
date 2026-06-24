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
  const router = useRouter()

  async function mark() {
    setLoading(true)
    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ moduleSlug, lessonSlug, passed: true }),
    })
    setLoading(false)
    router.refresh()
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
