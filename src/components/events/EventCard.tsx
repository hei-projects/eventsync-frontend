'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Calendar, Layers, Users, ArrowRight } from 'lucide-react'
import { LiveBadge, Tag } from '@/components/ui'
import { formatDateRange, cn } from '@/lib/utils'
import type { Event } from '@/types'

const statusColors: Record<string, string> = {
  live: 'bg-red-500/10 text-red-400 border-red-500/20',
  upcoming: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  past: 'bg-white/5 text-white/30 border-white/10',
}

export function EventCard({ event, index = 0 }: { event: Event; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group relative glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:border-purple-500/30"
      style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top, rgba(139,92,246,0.08), transparent 60%)' }} />

      <div className="relative h-44 overflow-hidden">
        <Image src={event.coverImage} alt={event.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="400px" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          {event.isLive && <LiveBadge />}
        </div>
        <div className="absolute top-3 right-3">
          <span className={cn('px-2 py-0.5 rounded text-xs font-mono border', statusColors[event.status])}>
            {event.status}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-display font-bold text-base text-white group-hover:text-purple-light transition-colors line-clamp-1 mb-2">
          {event.title}
        </h3>
        <p className="text-white/40 text-sm leading-relaxed line-clamp-2 mb-4">{event.description}</p>

        <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-white/40">
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-purple-400" />{formatDateRange(event.startDate, event.endDate)}</span>
          <span className="flex items-center gap-1.5 truncate"><MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" /><span className="truncate">{event.venue}</span></span>
          <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-cyan-400" />{event.sessionCount} sessions</span>
          <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-pink-400" />{event.attendeeCount.toLocaleString()}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {event.tags.slice(0, 3).map(tag => <Tag key={tag} color="purple">{tag}</Tag>)}
        </div>

        <Link href={`/events/${event.id}`}
          className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-light text-sm font-medium hover:bg-purple-500/20 hover:border-purple-500/40 transition-all group/btn">
          <span>View Event</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  )
}
