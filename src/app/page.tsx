import { HeroSection } from '@/components/sections/HeroSection'
import { LiveSessionsPreview } from '@/components/sections/LiveSessionsPreview'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { EventsPreview } from '@/components/sections/EventsPreview'
import { SpeakersPreview } from '@/components/sections/SpeakersPreview'
import { CTASection } from '@/components/sections/CTASection'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <LiveSessionsPreview />
      <FeaturesSection />
      <EventsPreview />
      <SpeakersPreview />
      <CTASection />
    </div>
  )
}
