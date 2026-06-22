import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Clock, MapPin, Users, ArrowLeft, Layers } from 'lucide-react'
import { GlassCard, Tag, LiveBadge } from '@/components/ui'
import { SpeakerCard } from '@/components/speakers/SpeakerCard'
import { QASystem } from '@/components/qa/QASystem'
import { FavoriteButton } from '@/components/sessions/FavoriteButton'
import { CapacityBar } from '@/components/sessions/CapacityBar'
import { LiveGlow } from '@/components/ui/LiveGlow'
import { sessions, speakers, questions } from '@/data'
import { formatTime, getTrackColor, cn } from '@/lib/utils'

export function generateStaticParams() {
  return sessions.map(s => ({ id: s.id }))
}

export default function SessionDetailPage({ params }: { params: { id: string } }) {
  const session = sessions.find(s => s.id === params.id)
  if (!session) notFound()

  const sessionSpeakers = speakers.filter(sp => session.speakerIds.includes(sp.id))
  const sessionQuestions = questions.filter(q => q.sessionId === session.id)
  const color = getTrackColor(session.track)
  const capacityPct = Math.round((session.enrolled / session.capacity) * 100)

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6">
      {session.isLive && <LiveGlow />}

      <div className="max-w-5xl mx-auto relative z-10">
        <Link href={`/events/${session.eventId}`} className="inline-flex items-center gap-1.5 text-white/40 hover:text-white text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Event
        </Link>

        <GlassCard className={cn('p-8 mb-8 relative overflow-hidden', session.isLive && 'border-red-500/30')}>
          <div className="flex items-start justify-between gap-4 mb-4 flex-wrap relative">
            <div className="flex items-center gap-3 flex-wrap">
              {session.isLive && <LiveBadge />}
              <span className="text-xs font-mono text-white/40 uppercase tracking-wider px-2 py-0.5 rounded border border-white/10">
                {session.level}
              </span>
              <Tag color={color}>{session.track}</Tag>
            </div>
            <FavoriteButton sessionId={session.id} />
          </div>

          <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white mb-4 relative">{session.title}</h1>
          <p className="text-white/50 leading-relaxed mb-6 relative">{session.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
            {[
              { icon: Clock, label: 'Time', value: `${formatTime(session.startTime)} – ${formatTime(session.endTime)}`, c: 'text-purple-400' },
              { icon: MapPin, label: 'Room', value: session.room, c: 'text-blue-400' },
              { icon: Users, label: 'Capacity', value: `${session.enrolled}/${session.capacity}`, c: 'text-cyan-400' },
              { icon: Layers, label: 'Level', value: session.level, c: 'text-pink-400' },
            ].map(({ icon: Icon, label, value, c }) => (
              <div key={label} className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06]">
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon className={cn('w-3.5 h-3.5', c)} />
                  <span className="text-xs text-white/30 font-mono uppercase">{label}</span>
                </div>
                <div className="text-sm font-semibold text-white">{value}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 relative">
            <div className="flex justify-between text-xs text-white/30 font-mono mb-1.5">
              <span>Capacity</span><span>{capacityPct}% filled</span>
            </div>
            <CapacityBar percent={capacityPct} />
          </div>
        </GlassCard>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="font-display font-bold text-xl gradient-text mb-5">Live Q&amp;A</h2>
            <QASystem sessionId={session.id} initialQuestions={sessionQuestions} />
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-display font-bold text-lg text-white mb-4">
                Speaker{sessionSpeakers.length > 1 ? 's' : ''}
              </h3>
              <div className="space-y-3">
                {sessionSpeakers.map((sp, i) => <SpeakerCard key={sp.id} speaker={sp} index={i} compact />)}
              </div>
            </div>

            <GlassCard className="p-4">
              <h4 className="font-display font-semibold text-sm text-white/40 uppercase tracking-wider mb-3">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {session.tags.map(tag => <Tag key={tag} color={color}>{tag}</Tag>)}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  )
}
