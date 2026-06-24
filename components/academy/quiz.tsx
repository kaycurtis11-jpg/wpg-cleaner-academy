'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { QuizQuestion } from '@/lib/data/modules'

interface QuizProps {
  moduleSlug: string
  lessonSlug: string
  questions: QuizQuestion[]
  passingScore?: number
  isFinal?: boolean
}

export function Quiz({ moduleSlug, lessonSlug, questions, passingScore = 80, isFinal = false }: QuizProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  const allAnswered = questions.every(q => answers[q.id] !== undefined)

  function selectAnswer(qId: string, idx: number) {
    if (submitted) return
    setAnswers(a => ({ ...a, [qId]: idx }))
  }

  function score() {
    const correct = questions.filter(q => answers[q.id] === q.correct).length
    return Math.round((correct / questions.length) * 100)
  }

  async function submit() {
    if (!allAnswered) return
    setSaving(true)
    const s = score()
    const passed = s >= passingScore

    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ moduleSlug, lessonSlug, quizScore: s, passed }),
    })

    setSaving(false)
    setSubmitted(true)
    if (passed) router.refresh()
  }

  if (submitted) {
    const s = score()
    const passed = s >= passingScore
    return (
      <div className="space-y-6">
        <div className={`rounded-2xl p-6 text-center ${passed ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <p className="text-4xl mb-2">{passed ? '🎉' : '📚'}</p>
          <h3 className="text-xl font-bold text-gray-900">{passed ? 'Great work!' : 'Keep studying'}</h3>
          <p className="text-3xl font-bold mt-2 mb-1" style={{ color: passed ? '#16a34a' : '#dc2626' }}>{s}%</p>
          <p className="text-sm text-gray-600">
            {passed ? `You passed! (${passingScore}% required)` : `You need ${passingScore}% to pass. Try again after reviewing the material.`}
          </p>
        </div>

        {/* Review */}
        <div className="space-y-4">
          {questions.map((q, i) => {
            const chosen = answers[q.id]
            const correct = chosen === q.correct
            return (
              <div key={q.id} className={`bg-white rounded-xl p-4 border ${correct ? 'border-green-200' : 'border-red-200'}`}>
                <div className="flex gap-2 mb-3">
                  <span className="text-lg">{correct ? '✅' : '❌'}</span>
                  <p className="font-medium text-gray-900 text-sm">{i + 1}. {q.question}</p>
                </div>
                {!correct && (
                  <p className="text-sm text-green-700 bg-green-50 rounded-lg px-3 py-2 mb-2">
                    ✓ Correct answer: {q.options[q.correct]}
                  </p>
                )}
                <p className="text-sm text-gray-600 italic">{q.explanation}</p>
              </div>
            )
          })}
        </div>

        {!passed && (
          <button
            onClick={() => { setAnswers({}); setSubmitted(false) }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
        <p className="text-sm text-blue-700 font-medium">
          {questions.length} questions · {passingScore}% required to pass{isFinal ? ' · This is the Final Certification Exam' : ''}
        </p>
      </div>

      {questions.map((q, i) => (
        <div key={q.id} className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="font-semibold text-gray-900 mb-4 text-sm">{i + 1}. {q.question}</p>
          <div className="space-y-2">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => selectAnswer(q.id, idx)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm border transition-all ${
                  answers[q.id] === idx
                    ? 'border-blue-500 bg-blue-50 text-blue-800 font-medium'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                }`}
              >
                <span className="font-medium mr-2">{String.fromCharCode(65 + idx)}.</span>{opt}
              </button>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={submit}
        disabled={!allAnswered || saving}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors"
      >
        {saving ? 'Submitting…' : allAnswered ? 'Submit Answers' : `Answer all ${questions.length} questions to submit`}
      </button>
    </div>
  )
}
