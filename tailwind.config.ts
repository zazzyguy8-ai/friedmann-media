import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#050507',
        surface: '#0a0a12',
        'surface-2': '#0f0f1a',
        'surface-3': '#141422',
        silver: '#c8cfe0',
        'silver-dim': '#7a8299',
        gold: '#c9a96e',
        'gold-bright': '#e8c87a',
        'gold-dim': '#8a6e3a',
        crimson: '#6a0018',
        'crimson-glow': '#9a1a32',
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        'cinzel-decorative': ['Cinzel Decorative', 'serif'],
        garamond: ['EB Garamond', 'serif'],
        mono: ['DM Mono', 'monospace'],
      },
      letterSpacing: {
        arcane: '0.25em',
        ritual: '0.18em',
        ancient: '0.35em',
      },
      animation: {
        'rune-rotate': 'runeRotate 25s linear infinite',
        'rune-counter': 'runeCounterRotate 18s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        float: 'floatUpDown 7s ease-in-out infinite',
        'veil-in': 'veilIn 1.2s ease-out forwards',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config
