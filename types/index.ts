export type VideoStyle = 'streetwear' | 'luxury' | 'y2k' | 'minimalist'
export type VideoFormat = 'hook_ad' | 'lifestyle_clip' | 'product_showcase'
export type GenerationStatus = 'pending' | 'processing' | 'completed' | 'failed'
export type Plan = 'free' | 'starter' | 'growth' | 'agency'

export interface Profile {
  id: string
  email: string
  credits: number
  plan: Plan
  created_at: string
}

export interface Generation {
  id: string
  user_id: string
  product_image_url: string
  style: VideoStyle
  format: VideoFormat
  video_urls: string[]
  status: GenerationStatus
  created_at: string
}

export interface CreditTransaction {
  id: string
  user_id: string
  amount: number
  reason: string
  created_at: string
}

export const STYLE_LABELS: Record<VideoStyle, string> = {
  streetwear: 'Streetwear',
  luxury: 'Luxury',
  y2k: 'Y2K',
  minimalist: 'Minimalist',
}

export const STYLE_DESCRIPTIONS: Record<VideoStyle, string> = {
  streetwear: 'Dark, urban, gritty',
  luxury: 'Clean, minimal, high-end',
  y2k: 'Vibrant, retro, nostalgic',
  minimalist: 'White space, editorial',
}

export const FORMAT_LABELS: Record<VideoFormat, string> = {
  hook_ad: 'Hook Ad',
  lifestyle_clip: 'Lifestyle Clip',
  product_showcase: 'Product Showcase',
}

export const FORMAT_DESCRIPTIONS: Record<VideoFormat, string> = {
  hook_ad: 'Bold text overlay, 8 sec',
  lifestyle_clip: 'Model wearing product, 8 sec',
  product_showcase: 'Product hero shot with motion, 8 sec',
}

export const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 19,
    credits: 30,
    features: ['30 video credits/month', 'All 4 styles', 'All 3 formats', 'HD download'],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID || '',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 49,
    credits: 100,
    features: ['100 video credits/month', 'All 4 styles', 'All 3 formats', 'HD download', 'Priority generation'],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_GROWTH_PRICE_ID || '',
    popular: true,
  },
  {
    id: 'agency',
    name: 'Agency',
    price: 149,
    credits: 300,
    features: ['300 video credits/month', 'All 4 styles', 'All 3 formats', 'HD download', 'Priority generation', 'API access'],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_AGENCY_PRICE_ID || '',
  },
]
