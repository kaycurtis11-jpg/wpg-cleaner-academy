import { createClient } from '@/lib/supabase/server'
import { MODULES, getModule } from '@/lib/data/modules'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Quiz } from '@/components/academy/quiz'
import { LessonMarkComplete } from '@/components/academy/lesson-mark-complete'

const COLOR_MAP: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-700 border-blue-200',
  purple: 'bg-purple-100 text-purple-700 border-purple-200',
  green: 'bg-green-100 text-green-700 border-green-200',
  red: 'bg-red-100 text-red-700 border-red-200',
  yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  teal: 'bg-teal-100 text-teal-700 border-teal-200',
  indigo: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  orange: 'bg-orange-100 text-orange-700 border-orange-200',
  pink: 'bg-pink-100 text-pink-700 border-pink-200',
  gray: 'bg-gray-100 text-gray-700 border-gray-200',
  gold: 'bg-amber-100 text-amber-700 border-amber-200',
}

export async function generateStaticParams() {
  return MODULES.map(m => ({ slug: m.slug }))
}

export default async function ModulePage({ params }: { params: { slug: string } }) {
  const mod = getModule(params.slug)
  if (!mod) notFound()

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: progress } = await supabase
    .from('academy_progress')
    .select('lesson_slug, completed, quiz_score')
    .eq('user_id', user!.id)
    .eq('module_slug', params.slug)

  const completedLessons = new Set((progress ?? []).filter((p: { completed: boolean }) => p.completed).map((p: { lesson_slug: string }) => p.lesson_slug))
  const colorClass = COLOR_MAP[mod.color] ?? 'bg-gray-100 text-gray-700 border-gray-200'
  const moduleComplete = completedLessons.size >= mod.lessons.length

  const moduleIndex = MODULES.findIndex(m => m.slug === params.slug)
  const nextModule = MODULES[moduleIndex + 1]
  const prevModule = MODULES[moduleIndex - 1]

  return (
    <div className="space-y-8">
      {/* Module Header */}
      <div>
        <Link href="/modules" className="text-sm text-blue-600 hover:underline mb-3 inline-block">← All Modules</Link>
        <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-xl border ${colorClass} mb-4`}>
          <span className="text-2xl">{mod.icon}</span>
          <div>
            <p className="font-bold text-sm">{mod.title}</p>
            <p className="text-xs opacity-70">Module {moduleIndex + 1} · ~{mod.estimatedMinutes} min</p>
          </div>
        </div>
        <p className="text-gray-600">{mod.description}</p>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{completedLessons.size} of {mod.lessons.length} lessons completed</span>
            {moduleComplete && <span className="text-green-600 font-medium">✅ Module Complete</span>}
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${Math.round((completedLessons.size / mod.lessons.length) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Lessons */}
      <div className="space-y-6">
        {mod.lessons.map((lesson, idx) => {
          const done = completedLessons.has(lesson.slug)
          const quizResult = (progress ?? []).find((p: { lesson_slug: string }) => p.lesson_slug === lesson.slug)

          return (
            <div key={lesson.slug} className={`bg-white rounded-2xl shadow-sm border overflow-hidden ${done ? 'border-green-200' : 'border-gray-100'}`}>
              {/* Lesson header */}
              <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${done ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {done ? '✓' : idx + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{lesson.title}</p>
                    <p className="text-xs text-gray-400 capitalize">{lesson.type}{quizResult?.quiz_score != null ? ` · ${quizResult.quiz_score}%` : ''}</p>
                  </div>
                </div>
                {done && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Done</span>}
              </div>

              {/* Lesson content */}
              <div className="px-6 py-5">
                {lesson.type === 'lesson' && (
                  <div className="space-y-4">
                    {lesson.content && <p className="text-gray-700 leading-relaxed">{lesson.content}</p>}
                    {lesson.sections?.map((section, si) => (
                      <div key={si}>
                        <h3 className="font-semibold text-gray-900 mb-2">{section.heading}</h3>
                        <ul className="space-y-2">
                          {section.bullets.map((b, bi) => (
                            <li key={bi} className="flex gap-2 text-sm text-gray-700">
                              <span className="text-blue-400 mt-0.5 flex-shrink-0">•</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    {lesson.bullets && (
                      <ul className="space-y-2">
                        {lesson.bullets.map((b, bi) => (
                          <li key={bi} className="flex gap-2 text-sm text-gray-700">
                            <span className="text-blue-400 mt-0.5 flex-shrink-0">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {lesson.warning && (
                      <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex gap-3">
                        <span className="text-red-500 flex-shrink-0">⚠️</span>
                        <p className="text-red-700 text-sm font-medium">{lesson.warning}</p>
                      </div>
                    )}
                    {lesson.tip && (
                      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 flex gap-3">
                        <span className="flex-shrink-0">💡</span>
                        <p className="text-blue-700 text-sm">{lesson.tip}</p>
                      </div>
                    )}
                    {!done && (
                      <LessonMarkComplete moduleSlug={mod.slug} lessonSlug={lesson.slug} />
                    )}
                  </div>
                )}

                {lesson.type === 'checklist' && (
                  <div className="space-y-4">
                    {lesson.warning && (
                      <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex gap-3">
                        <span className="flex-shrink-0">⚠️</span>
                        <p className="text-red-700 text-sm font-medium">{lesson.warning}</p>
                      </div>
                    )}
                    {lesson.tip && (
                      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 flex gap-3">
                        <span className="flex-shrink-0">💡</span>
                        <p className="text-blue-700 text-sm">{lesson.tip}</p>
                      </div>
                    )}
                    <div className="space-y-2">
                      {lesson.items?.map((item, ii) => (
                        <div key={ii} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-5 h-5 border-2 border-gray-300 rounded flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-800">{item.label}</p>
                            {item.note && <p className="text-xs text-gray-500 mt-0.5">{item.note}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                    {!done && (
                      <LessonMarkComplete moduleSlug={mod.slug} lessonSlug={lesson.slug} label="I have reviewed this checklist" />
                    )}
                  </div>
                )}

                {lesson.type === 'quiz' && (
                  <Quiz
                    moduleSlug={mod.slug}
                    lessonSlug={lesson.slug}
                    questions={lesson.questions!}
                    passingScore={mod.slug === 'certification' ? 80 : 70}
                    isFinal={mod.slug === 'certification'}
                  />
                )}

                {lesson.type === 'video' && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">Watch these training videos to see professional cleaning techniques in action.</p>
                    <div className="grid gap-4">
                      {lesson.videos?.map((video, vi) => (
                        <div key={vi} className="bg-gray-50 rounded-xl p-4">
                          <p className="font-medium text-sm text-gray-800 mb-3">{video.title}</p>
                          <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
                            <iframe
                              src={`https://www.youtube.com/embed/${video.embedId}`}
                              title={video.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="absolute inset-0 w-full h-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                      <p className="text-amber-800 text-sm">📝 <strong>Note:</strong> Video links need to be updated with the actual YouTube video IDs. Contact management to add the correct videos.</p>
                    </div>
                    {!done && (
                      <LessonMarkComplete moduleSlug={mod.slug} lessonSlug={lesson.slug} label="I have watched these videos" />
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Module navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        {prevModule ? (
          <Link href={`/modules/${prevModule.slug}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600">
            ← {prevModule.title}
          </Link>
        ) : <div />}
        {nextModule ? (
          <Link href={`/modules/${nextModule.slug}`} className="flex items-center gap-2 text-sm bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700">
            {nextModule.title} →
          </Link>
        ) : <div />}
      </div>
    </div>
  )
}
