export interface AcademyProfile {
  id: string
  email: string
  full_name: string
  cleaner_type: 'employee' | 'contractor' | null
  created_at: string
  updated_at: string
}

export interface Module {
  id: string
  slug: string
  title: string
  description: string
  icon: string
  order_index: number
  estimated_minutes: number
  is_required: boolean
  track: 'all' | 'employee' | 'contractor'
}

export interface Lesson {
  id: string
  module_slug: string
  slug: string
  title: string
  order_index: number
  content_type: 'lesson' | 'quiz' | 'checklist' | 'video'
}

export interface Progress {
  id: string
  user_id: string
  module_slug: string
  lesson_slug: string | null
  completed: boolean
  completed_at: string | null
  quiz_score: number | null
  created_at: string
}

export interface QuizAttempt {
  id: string
  user_id: string
  module_slug: string
  score: number
  passed: boolean
  answers: Record<string, string>
  attempted_at: string
}

export interface Certification {
  id: string
  user_id: string
  certification_type: string
  issued_at: string
  expires_at: string | null
}
