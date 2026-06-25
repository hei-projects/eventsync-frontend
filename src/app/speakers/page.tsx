'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { SpeakerCard } from '@/components/speakers/SpeakerCard'
import { SectionHeader } from '@/components/ui'
import { getSpeakers } from '@/lib/api'
import { toFrontendSpeaker } from '@/lib/adapters'
import type { Speaker } from '@/types'

export default function SpeakersPage() {
  const [search, setSearch] = useState('')
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSpeakers()
      .then(be => setSpeakers(be.map(toFrontendSpeaker)))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = speakers.filter(sp =>
    !search ||
    sp.name.toLowerCase().includes(search.toLowerCase()) ||
    sp.company.toLowerCase().includes(search.toLowerCase()) ||
    sp.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <div className="absolute inset-0 grid-bg opacity-[0.04] pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-cyan-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <SectionHeader title="World-Class Speakers" subtitle="Meet the visionaries shaping the future of technology" gradient />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative mb-10 max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search speakers, companies, topics..."
            className="w-full pl-11 pr-4 py-3 glass-card rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/40 transition-colors" />
        </motion.div>

        <p className="text-white/30 text-sm mb-6 font-mono text-center">
          {loading ? 'Loading...' : `${filtered.length} speaker${filtered.length !== 1 ? 's' : ''}`}
        </p>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="glass-card rounded-2xl p-5 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/5" />
                  <div className="flex-1">
                    <div className="h-4 bg-white/5 rounded w-2/3 mb-2" />
                    <div className="h-3 bg-white/5 rounded w-1/2" />
                  </div>
                </div>
                <div className="h-3 bg-white/5 rounded w-full mt-4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((sp, i) => <SpeakerCard key={sp.id} speaker={sp} index={i} />)}
          </div>
        )}
      </div>
    </div>
  )
}
