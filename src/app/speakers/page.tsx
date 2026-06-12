import { SpeakerCard } from "@/components/speaker/speaker-card"
import { getSpeakers } from "@/lib/api"
import Link from "next/link"

export default async function SpeakersPage() {
  const speakers = await getSpeakers()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Intervenants</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {speakers.map((speaker) => (
          <Link key={speaker.id} href={`/speakers/${speaker.id}`}>
            <SpeakerCard speaker={speaker} />
          </Link>
        ))}
      </div>
    </div>
  )
}
