import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Twitter, Github, Linkedin, Globe } from 'lucide-react'
import { GlassCard, Tag } from '@/components/ui'
import { SessionCard } from '@/components/sessions/SessionCard'
import { getSessions, getSpeaker, getSpeakers } from '@/lib/api'
import { toFrontendSpeaker, toFrontendSession } from '@/lib/adapters'

export const dynamic = 'force-dynamic'

export default async function SpeakerProfilePage({ params }: { params: { id: string } }) {
  const id = Number(params.id)
  const [beSpeaker, beAllSessions, beAllSpeakers] = await Promise.all([
    getSpeaker(id).catch(() => null),
    getSessions().catch(() => []),
    getSpeakers().catch(() => []),
  ])
  const speaker = beSpeaker ? toFrontendSpeaker(beSpeaker) : null
  if (!speaker) notFound()
  const allSessions = beAllSessions.map(toFrontendSession)
  const speakerSessions = allSessions.filter(s => s.speakerIds.includes(speaker.id))
  const allSpeakers = beAllSpeakers.map(toFrontendSpeaker)

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <div className="absolute inset-0 grid-bg opacity-[0.04] pointer-events-none" />
      <div className="absolute top-32 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        <Link href="/speakers" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> All Speakers
        </Link>

        <GlassCard className="overflow-hidden mb-10">
          <div className="h-2 bg-gradient-to-r from-purple-neon via-blue-electric to-cyan-accent" />
          <div className="p-6 sm:p-10">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="relative shrink-0 w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-2 border-purple-500/20">
                <Image src={speaker.avatar} alt={speaker.name} fill className="object-cover" sizes="144px" priority />
              </div>
              <div className="flex-1">
                <h1 className="font-display font-black text-3xl sm:text-4xl text-white mb-1">{speaker.name}</h1>
                <p className="text-purple-light font-mono text-sm mb-1">{speaker.title}</p>
                <p className="text-white/40 text-sm mb-4">{speaker.company}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {speaker.tags.map(tag => <Tag key={tag} color="purple">{tag}</Tag>)}
                </div>

                <div className="flex gap-2">
                  {speaker.twitter && <a href={`https://twitter.com/${speaker.twitter}`} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-blue-400 hover:border-blue-500/30 transition-all"><Twitter className="w-4 h-4" /></a>}
                  {speaker.github && <a href={`https://github.com/${speaker.github}`} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-purple-light hover:border-purple-500/30 transition-all"><Github className="w-4 h-4" /></a>}
                  {speaker.linkedin && <a href={`https://linkedin.com/in/${speaker.linkedin}`} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-cyan-light hover:border-cyan-500/30 transition-all"><Linkedin className="w-4 h-4" /></a>}
                  {speaker.website && <a href={`https://${speaker.website}`} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-pink-light hover:border-pink-500/30 transition-all"><Globe className="w-4 h-4" /></a>}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/[0.06]">
              <h2 className="font-display font-bold text-white/40 uppercase text-xs tracking-wider mb-3">About</h2>
              <p className="text-white/60 leading-relaxed">{speaker.bio}</p>
            </div>
          </div>
        </GlassCard>

        <div>
          <h2 className="font-display font-bold text-2xl gradient-text mb-6">
            Sessions ({speakerSessions.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {speakerSessions.map((session, i) => (
              <SessionCard key={session.id} session={session} index={i}
                speakers={allSpeakers.filter(sp => session.speakerIds.includes(sp.id))} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
