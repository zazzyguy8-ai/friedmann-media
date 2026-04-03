'use client'

import { useEffect } from 'react'
import confetti from 'canvas-confetti'

interface ConfettiProps {
  trigger: boolean
  onComplete?: () => void
}

export default function Confetti({ trigger, onComplete }: ConfettiProps) {
  useEffect(() => {
    if (!trigger) return

    const duration = 2500
    const end = Date.now() + duration

    const colors = ['#5b8bff', '#9b6fff', '#3de087', '#ffd166', '#ff5b5b']

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
        gravity: 0.8,
        scalar: 0.9,
      })
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
        gravity: 0.8,
        scalar: 0.9,
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      } else {
        onComplete?.()
      }
    }

    frame()
  }, [trigger, onComplete])

  return null
}
