import type { Event } from "@/lib/types"

type Props = { event: Event }

export const EventCard = ({ event }: Props) => (
  <div className="border rounded-2xl p-5 shadow-sm bg-card">
    <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
    <p className="text-muted-foreground mb-4">{event.description}</p>
    <div className="space-y-1 text-sm text-muted-foreground">
      <p><span className="font-medium text-foreground">Début :</span> {new Date(event.startDate).toLocaleDateString()}</p>
      <p><span className="font-medium text-foreground">Fin :</span> {new Date(event.endDate).toLocaleDateString()}</p>
      <p><span className="font-medium text-foreground">Lieu :</span> {event.location}</p>
    </div>
  </div>
)
