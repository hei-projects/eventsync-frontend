'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { SessionCard } from '@/components/sessions/SessionCard'
import type { Session, Speaker } from '@/types'

type Props = { sessions: Session[]; speakers: Speaker[] }

export function LiveSessionsPreview({ sessions, speakers }: Props) {
  const live = sessions.filter(s => s.isLive).slice(0, 3)
  if (live.length === 0) return null
  return (
    <section className="relative py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <motion.span animate={{ opacity: [1,0.3,1] }} transition={{ duration: 1.5, repeat: Infinity }}
              className="w-3 h-3 rounded-full bg-red-500" style={{ boxShadow: '0 0 10px rgba(239,68,68,.8)' }} />
            <h2 className="font-display font-bold text-2xl text-white">
              Happening <span className="neon-text-pink">Right Now</span>
            </h2>
          </div>
          <Link href="/events/neon-summit-2025" className="text-sm text-purple-light hover:text-white transition-colors font-mono">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {live.map((session, i) => (
            <SessionCard key={session.id} session={session} index={i}
              speakers={speakers.filter(sp => session.speakerIds.includes(sp.id))} />
          ))}
        </div>
      </div>
    </section>
  )
}
