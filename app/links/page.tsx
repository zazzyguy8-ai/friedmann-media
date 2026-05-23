'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

const LINKS = [
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/friedmann.media/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
    gradient: 'from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888]',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    href: 'https://www.tiktok.com/@friedmann.media',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z" />
      </svg>
    ),
    gradient: 'from-[#010101] to-[#333]',
    textGradient: true,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    href: 'https://wa.me/421910610544',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
    gradient: 'from-[#25d366] to-[#128c7e]',
  },
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:leonard.friedmann@icloud.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    gradient: 'from-[#5b8bff] to-[#9b6fff]',
  },
]

function AnimatedFollowers() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="flex items-center gap-1 text-sm font-mono text-[var(--muted)]"
    >
      <span className="text-[var(--text)] font-semibold text-base">350</span>
      <span>Total Followers</span>
    </motion.div>
  )
}

export default function LinksPage() {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-start px-4 pt-16 pb-12">
      <div className="w-full max-w-sm flex flex-col items-center gap-6">

        {/* Profile photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-[var(--border)] shadow-lg shadow-black/40 bg-[var(--surface2)] flex items-center justify-center">
            {!imgError ? (
              <Image
                src="/profile.jpg"
                alt="Friedmann Media"
                width={112}
                height={112}
                className="w-full h-full object-cover"
                style={{ transform: 'rotate(-90deg) scale(1.4)' }}
                onError={() => setImgError(true)}
                priority
              />
            ) : (
              <span className="font-display font-bold text-3xl gradient-text">F</span>
            )}
          </div>
          {/* Glow ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] opacity-20 blur-md -z-10" />
        </motion.div>

        {/* Name & handle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-center flex flex-col items-center gap-1"
        >
          <h1 className="font-display font-bold text-2xl text-[var(--text)] tracking-tight">
            Friedmann Media
          </h1>
          <p className="font-mono text-sm text-[var(--muted)]">@friedmann.media</p>
          <AnimatedFollowers />
        </motion.div>

        {/* Links */}
        <div className="w-full flex flex-col gap-3 mt-2">
          {LINKS.map((link, i) => (
            <motion.a
              key={link.id}
              href={link.href}
              target={link.id !== 'email' ? '_blank' : undefined}
              rel={link.id !== 'email' ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.08, duration: 0.4 }}
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-4 w-full px-5 py-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)]/40 transition-all duration-200 group"
            >
              {/* Icon bubble */}
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${link.gradient} flex items-center justify-center text-white shadow-md flex-shrink-0`}>
                {link.icon}
              </div>
              <span className="font-display font-semibold text-[var(--text)] text-base group-hover:text-white transition-colors">
                {link.label}
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-[var(--muted)] ml-auto group-hover:translate-x-0.5 transition-transform"
              >
                <path d="M7 17 17 7M17 7H7M17 7v10" />
              </svg>
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="font-mono text-xs text-[var(--muted)]/50 mt-4"
        >
          © 2026 Friedmann Media
        </motion.p>
      </div>
    </div>
  )
}
