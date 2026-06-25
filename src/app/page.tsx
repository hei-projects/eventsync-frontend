import { HeroSection } from '@/components/sections/HeroSection'
import { LiveSessionsPreview } from '@/components/sections/LiveSessionsPreview'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { EventsPreview } from '@/components/sections/EventsPreview'
import { SpeakersPreview } from '@/components/sections/SpeakersPreview'
import { CTASection } from '@/components/sections/CTASection'
import { getEvents, getSessions, getSpeakers } from '@/lib/api'
import { toFrontendEvent, toFrontendSession, toFrontendSpeaker } from '@/lib/adapters'

export default async function HomePage() {
  const [beEvents, beSessions, beSpeakers] = await Promise.all([
    getEvents(),
    getSessions(),
    getSpeakers(),
  ])

  const events = beEvents.map(toFrontendEvent)
  const sessions = beSessions.map(toFrontendSession)
  const speakers = beSpeakers.map(toFrontendSpeaker)

  return (
    <div className="min-h-screen">
      <HeroSection />
      <LiveSessionsPreview sessions={sessions} speakers={speakers} />
      <FeaturesSection />
      <EventsPreview events={events} />
      <SpeakersPreview speakers={speakers} />
      <CTASection />
    </div>
  )
}
