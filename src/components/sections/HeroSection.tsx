'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Play, Zap, Radio, Users, Calendar } from 'lucide-react'

const floaters = [
  { icon: Radio, label: 'Live Now', value: '3 Sessions', color: 'text-red-400', border: 'border-red-500/30', style: { top: '28%', left: '4%' }, delay: 0 },
  { icon: Users, label: 'Attendees', value: '5,000+', color: 'text-cyan-light', border: 'border-cyan-accent/30', style: { top: '56%', right: '4%' }, delay: 1.5 },
  { icon: Calendar, label: 'Sessions', value: '48 Tracks', color: 'text-purple-light', border: 'border-purple-neon/30', style: { bottom: '22%', left: '6%' }, delay: 0.8 },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-neon/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-accent/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-neon/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      {floaters.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, -12, 0] }}
          transition={{ delay: card.delay, opacity: { duration: 0.6 }, y: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut' } }}
          className={`absolute hidden lg:flex items-center gap-3 glass px-4 py-3 rounded-xl ${card.border} z-10`}
          style={card.style}
        >
          <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center ${card.color}`}>
            <card.icon className="w-4 h-4" />
          </div>
          <div>
            <p className="text-white/40 text-[10px] font-mono">{card.label}</p>
            <p className={`text-sm font-display font-bold ${card.color}`}>{card.value}</p>
          </div>
        </motion.div>
      ))}

      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 glass border border-purple-neon/30 rounded-full px-4 py-2 mb-8">
          <motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 bg-red-500 rounded-full" />
          <span className="text-xs font-mono text-white/60">NEON SUMMIT 2025 — NOW LIVE</span>
          <ArrowRight className="w-3 h-3 text-purple-light" />
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
          className="page-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6">
          <span className="gradient-text">Synchronize</span><br />
          <span className="text-white">Events in</span><br />
          <span className="gradient-text-2">Real Time</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }}
          className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          The most immersive event platform ever built. Track live sessions, Q&amp;A in real time,
          build your personal schedule — all in a cyberpunk interface designed for the future.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/events" className="btn-primary text-sm py-3 px-7">
            <Zap className="w-4 h-4" /> Explore Events
          </Link>
          <Link href="/events/neon-summit-2025" className="btn-secondary text-sm py-3 px-7">
            <Play className="w-4 h-4" /> View Live Sessions
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 flex items-center justify-center gap-8 sm:gap-16">
          {[{ value: '48+', label: 'Sessions' }, { value: '32', label: 'Speakers' }, { value: '5K', label: 'Attendees' }, { value: '5', label: 'Tracks' }].map(s => (
            <div key={s.label} className="text-center">
              <p className="font-display font-black text-2xl sm:text-3xl gradient-text">{s.value}</p>
              <p className="text-white/30 text-xs font-mono mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20">
        <p className="text-[10px] font-mono tracking-widest">SCROLL</p>
        <div className="w-px h-8 bg-gradient-to-b from-purple-neon/50 to-transparent" />
      </motion.div>
    </section>
  )
}
