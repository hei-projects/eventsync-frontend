import { BackButton } from "@/components/bloc/back-button"
import { LiveBadge } from "@/components/session/live-badge"
import { getEvent, getEventSchedules, getRooms } from "@/lib/api"
import Link from "next/link"

type Props = { params: Promise<{ id: string }> }

export default async function SchedulePage({ params }: Props) {
  const { id } = await params
  const event = await getEvent(Number(id))
  const sessions = await getEventSchedules(event.id)
  const rooms = await getRooms()

  const times = [...new Set(sessions.map((s) => s.startTime))].sort()

  return (
    <div>
      <BackButton />
      <h1 className="text-2xl font-bold mt-2 mb-6">Planning — {event.title}</h1>

      {rooms.length === 0 ? (
        <div className="grid gap-4">
          {sessions.map((s) => (
            <Link key={s.id} href={`/events/${event.id}/sessions/${s.id}`} className="border rounded-xl p-4 bg-card hover:shadow transition-shadow">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground w-24">
                  {new Date(s.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
                <div className="flex-1">
                  <p className="font-medium">{s.title}</p>
                  <p className="text-sm text-muted-foreground">{s.speakerNames.join(", ")}</p>
                </div>
                {s.live && <LiveBadge />}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 pr-4 text-sm font-medium text-muted-foreground w-28">Horaire</th>
                {rooms.map((room) => (
                  <th key={room.id} className="text-left py-3 px-3 text-sm font-medium text-muted-foreground border-l min-w-[200px]">
                    {room.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {times.map((time) => {
                const sessionsAtTime = sessions.filter((s) => s.startTime === time)
                return (
                  <tr key={time} className="border-b last:border-0">
                    <td className="py-4 pr-4 text-sm text-muted-foreground align-top">
                      {new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </td>
                    {rooms.map((room) => {
                      const s = sessionsAtTime.find((sess) => sess.roomName === room.name)
                      return (
                        <td key={room.id} className="py-2 px-3 border-l align-top">
                          {s ? (
                            <Link
                              href={`/events/${event.id}/sessions/${s.id}`}
                              className="block rounded-lg border p-3 bg-card hover:shadow transition-shadow"
                            >
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-sm">{s.title}</p>
                                {s.live && <LiveBadge />}
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">{s.speakerNames.join(", ")}</p>
                            </Link>
                          ) : null}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
