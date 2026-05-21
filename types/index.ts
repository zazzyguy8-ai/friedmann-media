export type ArchetypeKey =
  | 'shadow-scholar'
  | 'lunar-seer'
  | 'ashborn-monarch'
  | 'silent-alchemist'
  | 'storm-vessel'
  | 'void-oracle'
  | 'crimson-saint'

export type ElementKey = 'air' | 'water' | 'fire' | 'earth' | 'void' | 'storm' | 'blood'

export interface Archetype {
  key: ArchetypeKey
  name: string
  title: string
  element: ElementKey
  symbol: string
  color: string
  glowColor: string
  lore: string
  loreDeep: string
  abilities: Ability[]
  weaknesses: string[]
  traits: string[]
  emotionalProfile: string
  progressionPath: ProgressionStage[]
  ritualRecommendations: string[]
  symbolicObjects: string[]
  rareEvolution: RareEvolution
  powerWords: string[]
}

export interface Ability {
  name: string
  description: string
  tier: 'innate' | 'awakened' | 'mastered'
}

export interface ProgressionStage {
  level: number
  title: string
  description: string
  unlocks: string[]
}

export interface RareEvolution {
  name: string
  triggerCondition: string
  description: string
}

export interface QuizAnswer {
  questionId: number
  answerId: string
  archetypeScores: Partial<Record<ArchetypeKey, number>>
}

export interface UserProfile {
  id: string
  name: string | null
  archetype_key: ArchetypeKey | null
  archetype_data: GeneratedArchetypeData | null
  quiz_answers: QuizAnswer[] | null
  xp: number
  level: number
  streak: number
  last_ritual_at: string | null
  is_premium: boolean
  stripe_customer_id: string | null
  created_at: string
}

export interface GeneratedArchetypeData {
  archetypeKey: ArchetypeKey
  personalLore: string
  hiddenTrait: string
  primaryAbility: string
  shadowAspect: string
  energySignature: string
  cosmicRole: string
  rareQuality: string
  firstRitual: string
  prophecy: string
}

export interface RitualLog {
  id: string
  user_id: string
  ritual_key: string
  completed_at: string
  notes: string | null
}

export interface Ritual {
  key: string
  name: string
  duration: string
  category: 'discipline' | 'focus' | 'emotional' | 'creative' | 'reflection' | 'power' | 'shadow'
  description: string
  steps: RitualStep[]
  elements: string[]
  intention: string
  archetype_affinities: ArchetypeKey[]
}

export interface RitualStep {
  order: number
  instruction: string
  duration?: string
}

export interface LoreEntry {
  id: string
  title: string
  subtitle: string
  category: 'elemental' | 'archetype' | 'order' | 'manuscript' | 'philosophy' | 'ritual-theory'
  content: string
  isLocked: boolean
  isPremium: boolean
  symbol: string
  tags: string[]
}

export interface EnergyReading {
  id: string
  user_id: string
  reading_type: string
  content: string
  created_at: string
}

// Legacy types for backward compatibility with existing components
export interface DayStatus {
  date: string
  completed: boolean
  is_today: boolean
  label: string
}

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

export type GoalOption =
  | '🎯 Focus & productivity'
  | '💪 Fitness & health'
  | '👥 Social confidence'
  | '🎨 Creativity'
  | '📚 Learning'
  | '⚡ Energy & motivation'

export type TimeOption = '5 minutes' | '15 minutes' | '30 minutes'
