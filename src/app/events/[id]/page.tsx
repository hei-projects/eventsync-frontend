import { BackButton } from "@/components/bloc/back-button"
import { SessionCard } from "@/components/session/session-card"
import { getEvent, getEventSchedules, getLiveSessions } from "@/lib/api"
import Link from "next/link"
import { LiveBadge } from "@/components/session/live-badge"
import { CalendarIcon } from "lucide-react"

type Props = { params: Promise<{ id: string }> }

export default async function EventPage({ params }: Props) {
  const { id } = await params
  const event = await getEvent(Number(id))
  const sessions = await getEventSchedules(event.id)
  const liveSessions = await getLiveSessions(event.id)

  return (
    <div>
      <BackButton />
      <div className="mb-6">
        <h1 className="text-3xl font-bold mt-2">{event.title}</h1>
        <p className="text-muted-foreground mt-1">{event.description}</p>
        <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground items-center">
          <span>📍 {event.location}</span>
          <span>📅 {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</span>
          <Link
            href={`/events/${event.id}/schedule`}
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            <CalendarIcon className="size-4" />
            Vue planning
          </Link>
        </div>
      </div>

      {liveSessions.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <LiveBadge /> En ce moment
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {liveSessions.map((s) => (
              <Link key={s.id} href={`/events/${event.id}/sessions/${s.id}`}>
                <SessionCard session={s} />
              </Link>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-xl font-semibold mb-3">Planning</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {sessions.map((session) => (
            <Link key={session.id} href={`/events/${event.id}/sessions/${session.id}`}>
              <SessionCard session={session} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
