import { EventCard } from "@/components/event/event-card"
import { getEvents } from "@/lib/api"
import Link from "next/link"

export default async function EventsPage() {
  const events = await getEvents()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Événements</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Link key={event.id} href={`/events/${event.id}`}>
            <EventCard event={event} />
          </Link>
        ))}
      </div>
    </div>
  )
}
