'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Radio } from 'lucide-react'
import { EventCard } from '@/components/events/EventCard'
import { SectionHeader } from '@/components/ui'
import { getEvents } from '@/lib/api'
import { toFrontendEvent } from '@/lib/adapters'
import type { Event } from '@/types'

const statuses = ['All', 'live', 'upcoming', 'past']

export default function EventsPage() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getEvents()
      .then(be => setEvents(be.map(toFrontendEvent)))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = events.filter(e => {
    const matchesSearch = !search ||
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase()) ||
      e.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    const matchesStatus = status === 'All' || e.status === status
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <div className="absolute inset-0 grid-bg opacity-[0.04] pointer-events-none" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 right-1/4 w-64 h-64 bg-cyan-500/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <SectionHeader title="All Events" subtitle="Discover world-class conferences, summits, and workshops" gradient />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events, tags..."
              className="w-full pl-11 pr-4 py-3 glass-card rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/40 transition-colors" />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-white/30 shrink-0" />
            {statuses.map(s => (
              <button key={s} onClick={() => setStatus(s)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  status === s ? 'bg-purple-500/20 border border-purple-500/40 text-purple-light' : 'glass-card text-white/40 hover:text-white hover:border-purple-500/20'
                }`}>
                {s === 'live' && <Radio className="w-3 h-3 text-red-400" />}
                {s === 'All' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/30 text-sm mb-6 font-mono">
          {loading ? 'Loading...' : `${filtered.length} event${filtered.length !== 1 ? 's' : ''} found`}
        </motion.p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass-card rounded-2xl p-5 animate-pulse">
                <div className="h-4 bg-white/5 rounded w-1/3 mb-3" />
                <div className="h-6 bg-white/5 rounded w-2/3 mb-4" />
                <div className="h-3 bg-white/5 rounded w-full mb-2" />
                <div className="h-3 bg-white/5 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((event, i) => <EventCard key={event.id} event={event} index={i} />)}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="font-display text-4xl mb-3 opacity-20">⚡</div>
            <p className="text-white/40">No events match your search</p>
          </div>
        )}
      </div>
    </div>
  )
}
