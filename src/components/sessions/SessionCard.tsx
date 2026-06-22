'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, MapPin, Users, Heart } from 'lucide-react'
import { LiveBadge } from '@/components/ui'
import { formatTime, getTrackColor, trackColors, cn } from '@/lib/utils'
import { useFavorites } from '@/hooks/useFavorites'
import type { Session, Speaker } from '@/types'

interface Props {
  session: Session
  speakers: Speaker[]
  index?: number
  compact?: boolean
  isFavorite?: boolean
  onToggleFavorite?: (id: string) => void
}

export function SessionCard({ session, speakers, index = 0, compact = false, isFavorite: favProp, onToggleFavorite }: Props) {
  const { isFavorite: hookFav, toggle: hookToggle } = useFavorites()
  const fav = favProp !== undefined ? favProp : hookFav(session.id)
  const toggle = onToggleFavorite ?? hookToggle
  const color = getTrackColor(session.track)
  const colors = trackColors[color] ?? trackColors.purple
  const fill = Math.round((session.enrolled / session.capacity) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      whileHover={{ y: -3, scale: 1.01 }}
      className={cn(
        'group glass-card rounded-2xl transition-all duration-300 relative overflow-hidden',
        session.isLive ? 'border-red-500/30 hover:border-red-400/50' : 'hover:border-purple-500/30',
        compact ? 'p-4' : 'p-5'
      )}
      style={session.isLive ? { boxShadow: '0 0 24px rgba(239,68,68,0.1), 0 8px 32px rgba(0,0,0,0.4)' } : {}}
    >
      {session.isLive && (
        <motion.div animate={{ opacity: [0.15, 0.04, 0.15] }} transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-red-500/10 pointer-events-none" />
      )}

      <div className="relative">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {session.isLive && <LiveBadge />}
            <span className={cn('px-2 py-0.5 rounded text-xs font-mono border', colors.bg, colors.border, colors.text)}>
              {session.track.split(' ')[0]}
            </span>
          </div>
          <button onClick={e => { e.preventDefault(); e.stopPropagation(); toggle(session.id) }}
            className={cn('p-1.5 rounded-lg transition-all duration-200 flex-shrink-0',
              fav ? 'text-pink-400 bg-pink-500/10' : 'text-white/30 hover:text-pink-400 hover:bg-pink-500/10')}>
            <Heart className={cn('w-4 h-4', fav && 'fill-current')} />
          </button>
        </div>

        <Link href={`/sessions/${session.id}`}>
          <h3 className={cn('font-display font-bold mb-2 group-hover:text-purple-light transition-colors leading-snug',
            compact ? 'text-sm' : 'text-base')}>
            {session.title}
          </h3>
        </Link>

        {!compact && (
          <p className="text-white/40 text-sm leading-relaxed line-clamp-2 mb-4">{session.description}</p>
        )}

        <div className="flex flex-wrap gap-3 text-xs text-white/40 mb-3">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-purple-400" />
            {formatTime(session.startTime)} – {formatTime(session.endTime)}</span>
          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-blue-400" />{session.room}</span>
          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-cyan-400" />{session.enrolled}/{session.capacity}</span>
        </div>

        <div className="h-1 bg-white/5 rounded-full mb-3 overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${fill}%` }} transition={{ duration: 0.8, ease: 'easeOut' }}
            className={cn('h-full rounded-full', fill > 90 ? 'bg-red-500' : fill > 70 ? 'bg-yellow-500' : 'bg-purple-neon')} />
        </div>

        {speakers.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {speakers.slice(0, 3).map(sp => (
                <div key={sp.id} className="relative w-6 h-6 rounded-full border border-bg overflow-hidden">
                  <Image src={sp.avatar} alt={sp.name} fill className="object-cover" sizes="24px" />
                </div>
              ))}
            </div>
            <span className="text-xs text-white/40 truncate">{speakers[0]?.name}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
