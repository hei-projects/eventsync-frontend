'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { EventCard } from '@/components/events/EventCard'
import type { Event } from '@/types'

type Props = { events: Event[] }

export function EventsPreview({ events }: Props) {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-label mb-2">Upcoming</p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="font-display font-bold text-3xl md:text-4xl text-white">
              Featured <span className="gradient-text">Events</span>
            </motion.h2>
          </div>
          <Link href="/events" className="hidden sm:flex items-center gap-1.5 text-purple-light text-sm font-mono hover:text-white transition-colors">
            All Events →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {events.map((event, i) => <EventCard key={event.id} event={event} index={i} />)}
        </div>
      </div>
    </section>
  )
}
