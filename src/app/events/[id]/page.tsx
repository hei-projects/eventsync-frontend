import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Calendar, Users, Layers, ArrowLeft, ExternalLink } from 'lucide-react'
import { LiveBadge, GlassCard, StatCard, Tag, LiveDot } from '@/components/ui'
import { SessionCard } from '@/components/sessions/SessionCard'
import { SpeakerCard } from '@/components/speakers/SpeakerCard'
import { PlanningGrid } from '@/components/sessions/PlanningGrid'
import { formatDateRange } from '@/lib/utils'
import { getEvent, getEventSessions, getSpeakers } from '@/lib/api'
import { toFrontendEvent, toFrontendSession, toFrontendSpeaker } from '@/lib/adapters'

export const dynamic = 'force-dynamic'

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const [beEvent, beSessions, beSpeakers] = await Promise.all([
    getEvent(Number(id)).catch(() => null),
    getEventSessions(Number(id)).catch(() => []),
    getSpeakers().catch(() => []),
  ])

  const event = beEvent ? toFrontendEvent(beEvent) : null
  if (!event) notFound()

  const sessions = beSessions.map(toFrontendSession)
  const speakers = beSpeakers.map(toFrontendSpeaker)
  const eventSessions = sessions
  const liveSessions = eventSessions.filter(s => s.isLive)
  const speakerIds = Array.from(new Set(eventSessions.flatMap(s => s.speakerIds)))
  const eventSpeakers = speakers.filter(sp => speakerIds.includes(sp.id))

  return (
    <div className="min-h-screen">
      <div className="relative h-72 md:h-96 overflow-hidden">
        <Image src={event.coverImage} alt={event.title} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070B14]/40 to-transparent" />

        <div className="absolute bottom-8 left-0 right-0 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <Link href="/events" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white text-sm mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" /> All Events
            </Link>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  {event.isLive && <LiveBadge />}
                  <span className="text-xs font-mono text-white/50 uppercase tracking-wider px-2 py-1 glass rounded-lg border border-white/10">
                    {event.status}
                  </span>
                </div>
                <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white">{event.title}</h1>
              </div>
              <button className="btn-primary mt-2 text-xs py-2">Register Now</button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <StatCard value={event.sessionCount} label="Sessions" color="purple" />
          <StatCard value={event.speakerCount} label="Speakers" color="blue" />
          <StatCard value={event.attendeeCount.toLocaleString()} label="Attendees" color="cyan" />
          <StatCard value={liveSessions.length} label="Live Now" color="pink" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h2 className="font-display font-bold text-2xl gradient-text mb-4">About</h2>
            {event.longDescription.split('\n\n').map((para, i) => (
              <p key={i} className="text-white/50 leading-relaxed mb-4">{para}</p>
            ))}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <GlassCard className="p-4 flex items-center gap-3">
                <Calendar className="w-5 h-5 text-purple-400 shrink-0" />
                <div>
                  <div className="text-xs text-white/40 uppercase font-mono mb-0.5">Dates</div>
                  <div className="text-sm font-semibold text-white">{formatDateRange(event.startDate, event.endDate)}</div>
                </div>
              </GlassCard>
              <GlassCard className="p-4 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-400 shrink-0" />
                <div>
                  <div className="text-xs text-white/40 uppercase font-mono mb-0.5">Venue</div>
                  <div className="text-sm font-semibold text-white truncate">{event.venue}</div>
                  <div className="text-xs text-white/30 truncate">{event.location}</div>
                </div>
              </GlassCard>
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold text-white/40 uppercase text-xs tracking-wider mb-3">Topics</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {event.tags.map(tag => <Tag key={tag} color="purple">{tag}</Tag>)}
            </div>
            <button className="btn-primary w-full mb-3 justify-center">
              <Users className="w-4 h-4" /> Register for Event
            </button>
            <button className="btn-secondary w-full justify-center">
              <ExternalLink className="w-4 h-4" /> Official Website
            </button>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="font-display font-bold text-2xl gradient-text mb-6 flex items-center gap-2">
            <Layers className="w-6 h-6" /> Schedule Overview
          </h2>
          <PlanningGrid sessions={eventSessions} speakers={speakers} />
        </div>

        {liveSessions.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <LiveDot />
              <h2 className="font-display font-bold text-2xl text-white">Live Now</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {liveSessions.map((session, i) => (
                <SessionCard key={session.id} session={session} index={i}
                  speakers={speakers.filter(sp => session.speakerIds.includes(sp.id))} />
              ))}
            </div>
          </div>
        )}

        <div className="mb-12">
          <h2 className="font-display font-bold text-2xl gradient-text mb-6">All Sessions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {eventSessions.map((session, i) => (
              <SessionCard key={session.id} session={session} index={i}
                speakers={speakers.filter(sp => session.speakerIds.includes(sp.id))} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display font-bold text-2xl gradient-text mb-6">Speakers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {eventSpeakers.map((sp, i) => <SpeakerCard key={sp.id} speaker={sp} index={i} compact />)}
          </div>
        </div>
      </div>
    </div>
  )
}
