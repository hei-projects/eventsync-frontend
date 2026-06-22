'use client'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Clock, Heart } from 'lucide-react'
import { formatTime, getTrackColor, trackColors, cn } from '@/lib/utils'
import { useFavorites } from '@/hooks/useFavorites'
import type { Session, Speaker } from '@/types'

const HOUR_WIDTH = 180
const ROOM_HEIGHT = 108
const START_MIN = 8 * 60
const END_MIN = 20 * 60
const TOTAL_MIN = END_MIN - START_MIN
const hours = Array.from({ length: 13 }, (_, i) => i + 8)

const TRACK_COLORS: Record<string, string> = {
  'AI & Machine Learning': '#8B5CF6',
  'Quantum Computing': '#06B6D4',
  'Cybersecurity': '#3B82F6',
  'Web3 & DeFi': '#60A5FA',
  'Neural Interfaces': '#EC4899',
}

function toMin(iso: string) { const d = new Date(iso); return d.getHours() * 60 + d.getMinutes() }

export function PlanningGrid({ sessions, speakers }: { sessions: Session[]; speakers: Speaker[] }) {
  const { isFavorite, toggle } = useFavorites()
  const ref = useRef<HTMLDivElement>(null)
  const rooms = Array.from(new Set(sessions.map(s => s.room)))
  const tracks = Array.from(new Set(sessions.map(s => s.track))).slice(0, 4)
  const getSp = (ids: string[]) => speakers.filter(s => ids.includes(s.id))

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-white/[0.06] flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="font-display font-bold text-white">Multi-Track Schedule</h3>
          <p className="text-white/40 text-xs mt-0.5">Hover session cards for details</p>
        </div>
        <div className="hidden sm:flex flex-wrap items-center gap-3">
          {tracks.map(t => (
            <div key={t} className="flex items-center gap-1.5 text-xs text-white/40 font-mono">
              <div className="w-2 h-2 rounded-full" style={{ background: TRACK_COLORS[t] || '#8B5CF6', boxShadow: `0 0 6px ${TRACK_COLORS[t] || '#8B5CF6'}80` }} />
              {t.split(' ')[0]}
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto" ref={ref}>
        <div style={{ minWidth: `${hours.length * HOUR_WIDTH + 144}px` }}>
          <div className="flex border-b border-white/[0.06] bg-white/[0.02] sticky top-0 z-20">
            <div className="w-36 shrink-0 p-3 border-r border-white/[0.06]">
              <span className="text-xs text-white/30 font-mono uppercase tracking-wider">Room</span>
            </div>
            {hours.map(h => (
              <div key={h} style={{ width: HOUR_WIDTH }} className="shrink-0 border-r border-white/[0.04] p-2">
                <span className="text-xs font-mono text-white/30">
                  {h === 12 ? '12:00 PM' : h > 12 ? `${h - 12}:00 PM` : `${h}:00 AM`}
                </span>
              </div>
            ))}
          </div>

          {rooms.map(room => {
            const rs = sessions.filter(s => s.room === room)
            return (
              <div key={room} className="flex border-b border-white/[0.06]" style={{ height: ROOM_HEIGHT }}>
                <div className="w-36 shrink-0 border-r border-white/[0.06] p-3 flex items-center bg-white/[0.01]">
                  <span className="text-xs font-display font-bold text-white leading-tight">{room}</span>
                </div>
                <div className="relative flex-1">
                  {hours.map(h => (
                    <div key={h} className="absolute top-0 bottom-0 border-r border-white/[0.03]" style={{ left: (h - 8) * HOUR_WIDTH, width: HOUR_WIDTH }} />
                  ))}
                  {rs.map(session => {
                    const left = ((toMin(session.startTime) - START_MIN) / TOTAL_MIN) * (hours.length * HOUR_WIDTH)
                    const width = ((toMin(session.endTime) - toMin(session.startTime)) / TOTAL_MIN) * (hours.length * HOUR_WIDTH) - 4
                    const color = getTrackColor(session.track)
                    const c = trackColors[color] || trackColors.purple
                    const fav = isFavorite(session.id)
                    const sp = getSp(session.speakerIds)
                    return (
                      <motion.div key={session.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.02, zIndex: 20 }}
                        className={cn('absolute top-2 bottom-2 rounded-xl border p-2 cursor-pointer overflow-hidden group', c.bg,
                          session.isLive ? 'border-red-500/50' : c.border)}
                        style={{ left: left + 2, width: Math.max(width, 60), boxShadow: session.isLive ? '0 0 16px rgba(239,68,68,0.25)' : undefined }}>
                        {session.isLive && (
                          <motion.div animate={{ opacity: [0.2, 0.04, 0.2] }} transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-red-500/10 rounded-xl" />
                        )}
                        <div className="relative h-full flex flex-col justify-between">
                          <div className="flex items-start gap-1">
                            {session.isLive && <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="mt-0.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />}
                            <Link href={`/sessions/${session.id}`}>
                              <span className={cn('text-xs font-semibold leading-tight hover:underline', c.text)}>
                                {session.title.length > 38 ? session.title.slice(0, 38) + '…' : session.title}
                              </span>
                            </Link>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-xs text-white/40">
                              <Clock className="w-2.5 h-2.5" />
                              <span className="font-mono">{formatTime(session.startTime)}</span>
                              {sp[0] && <span className="hidden sm:inline">· {sp[0].name.split(' ')[0]}</span>}
                            </div>
                            <button onClick={e => { e.preventDefault(); e.stopPropagation(); toggle(session.id) }}
                              className={cn('p-0.5 rounded', fav ? 'text-pink-400' : 'text-white/30 hover:text-pink-400')}>
                              <Heart className={cn('w-3 h-3', fav && 'fill-current')} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
