'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Bookmark, CalendarX, ArrowRight } from 'lucide-react'
import { SessionCard } from '@/components/sessions/SessionCard'
import { useFavorites } from '@/hooks/useFavorites'
import { LiveDot } from '@/components/ui/LiveDot'
import { getSessions, getSpeakers } from '@/lib/api'
import { toFrontendSession, toFrontendSpeaker } from '@/lib/adapters'
import type { Session, Speaker } from '@/types'

export default function FavoritesPage() {
  const { favorites, toggle, isFavorite } = useFavorites()
  const [sessions, setSessions] = useState<Session[]>([])
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getSessions().catch(() => []),
      getSpeakers().catch(() => []),
    ]).then(([beSess, beSp]) => {
      setSessions(beSess.map(toFrontendSession))
      setSpeakers(beSp.map(toFrontendSpeaker))
    }).finally(() => setLoading(false))
  }, [])

  const favSessions = sessions.filter(s => favorites.includes(s.id))
  const live = favSessions.filter(s => s.isLive)
  const upcoming = favSessions.filter(s => !s.isLive)

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <div className="absolute inset-0 grid-bg opacity-[0.04] pointer-events-none" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
              <Bookmark className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-xs font-mono text-purple-400 tracking-widest uppercase">Personal Schedule</p>
              <h1 className="font-display font-black text-3xl text-white">My Sessions</h1>
            </div>
          </div>
          <p className="text-white/40 text-sm mt-2 pl-[52px]">
            {loading ? 'Loading...' : `${favSessions.length} session${favSessions.length !== 1 ? 's' : ''} bookmarked`}
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="glass-card rounded-2xl p-5 animate-pulse">
                <div className="h-4 bg-white/5 rounded w-1/4 mb-3" />
                <div className="h-5 bg-white/5 rounded w-2/3 mb-4" />
                <div className="h-3 bg-white/5 rounded w-full mb-2" />
                <div className="h-3 bg-white/5 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : favSessions.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-3xl p-16 text-center">
            <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
              <CalendarX className="w-10 h-10 text-white/20" />
            </div>
            <h2 className="font-display font-bold text-2xl text-white mb-3">No Sessions Saved</h2>
            <p className="text-white/40 text-sm mb-8 max-w-sm mx-auto">
              Browse sessions and click the heart icon to save them to your personal schedule.
            </p>
            <Link href="/events/neon-summit-2025" className="btn-primary inline-flex">
              Browse Sessions <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-10">
            <AnimatePresence>
              {live.length > 0 && (
                <motion.div key="live" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="flex items-center gap-2 mb-5">
                    <LiveDot />
                    <h2 className="font-display font-bold text-red-400 text-sm tracking-wider uppercase">Live Right Now</h2>
                    <span className="ml-1 px-2 py-0.5 bg-red-500/10 border border-red-500/20 rounded text-xs font-mono text-red-400">{live.length}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {live.map((session, i) => (
                      <SessionCard key={session.id} session={session} index={i}
                        speakers={speakers.filter(sp => session.speakerIds.includes(sp.id))}
                        isFavorite={isFavorite(session.id)} onToggleFavorite={toggle} />
                    ))}
                  </div>
                </motion.div>
              )}

              {upcoming.length > 0 && (
                <motion.div key="upcoming" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <div className="flex items-center gap-2 mb-5">
                    <h2 className="font-display font-bold text-white/60 text-sm tracking-wider uppercase">Upcoming Sessions</h2>
                    <span className="ml-1 px-2 py-0.5 bg-white/5 border border-white/10 rounded text-xs font-mono text-white/30">{upcoming.length}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {upcoming.map((session, i) => (
                      <SessionCard key={session.id} session={session} index={i}
                        speakers={speakers.filter(sp => session.speakerIds.includes(sp.id))}
                        isFavorite={isFavorite(session.id)} onToggleFavorite={toggle} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}
