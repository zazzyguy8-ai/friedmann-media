export interface BusinessProfile {
  businessName: string
  ownerName: string
  industry: string
  targetAudience: string
  goals: string[]
  platforms: string[]
  brandVoice: string[]
  competitors: string
  contentThemes: string
}

export interface Profile {
  id: string
  name: string | null         // owner name
  goal: string | null         // JSON-stringified BusinessProfile
  time_available: string | null
  onboarding_completed: boolean
  created_at: string
}

export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export interface ContentIdea {
  platform: string
  type: string
  title: string
  hook: string
  description: string
}

// Kept for compatibility with existing UI components
export interface DayStatus {
  date: string
  completed: boolean
  is_today: boolean
  label: string
}
