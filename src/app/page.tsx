import Link from "next/link"
import { getEvents } from "@/lib/api"
import { EventCard } from "@/components/event/event-card"

export default async function HomePage() {
  const events = await getEvents()
  const upcoming = events
    .filter((e) => new Date(e.endDate) > new Date())
    .slice(0, 3)

  return (
    <div className="space-y-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Bienvenue sur EventSync</h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Découvrez des événements, explorez le planning, et interagissez avec les sessions en direct.
        </p>
        <div className="flex gap-4 justify-center mt-6">
          <Link
            href="/events"
            className="inline-flex items-center justify-center rounded-lg bg-foreground text-background px-6 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Voir les événements
          </Link>
          <Link
            href="/speakers"
            className="inline-flex items-center justify-center rounded-lg border px-6 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
          >
            Découvrir les intervenants
          </Link>
        </div>
      </section>

      {upcoming.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Événements à venir</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event) => (
              <Link key={event.id} href={`/events/${event.id}`}>
                <EventCard event={event} />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
