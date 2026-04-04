export interface Profile {
  id: string
  name: string | null
  goal: string | null
  time_available: string | null
  onboarding_completed: boolean
  created_at: string
}

export interface Challenge {
  id: string
  user_id: string
  date: string
  challenge_text: string
  completed: boolean
  completed_at: string | null
  created_at: string
}

export interface StreakData {
  current_streak: number
  last_7_days: DayStatus[]
}

export interface DayStatus {
  date: string
  completed: boolean
  is_today: boolean
  label: string
}

export type GoalOption =
  | '🎯 Focus & productivity'
  | '💪 Fitness & health'
  | '👥 Social confidence'
  | '🎨 Creativity'
  | '📚 Learning'
  | '⚡ Energy & motivation'

export type TimeOption = '5 minutes' | '15 minutes' | '30 minutes'
