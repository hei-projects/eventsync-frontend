import type { Session } from "@/lib/types"
import { LiveBadge } from "./live-badge"

type Props = { session: Session }

export const SessionCard = ({ session }: Props) => (
  <div className="border rounded-2xl p-5 shadow-sm bg-card relative">
    {session.live && (
      <div className="absolute top-3 right-3">
        <LiveBadge />
      </div>
    )}
    <h2 className="text-xl font-semibold mb-2">{session.title}</h2>
    <p className="text-muted-foreground mb-4 line-clamp-2">{session.description}</p>
    <div className="space-y-1 text-sm text-muted-foreground">
      <p><span className="font-medium text-foreground">Horaire :</span> {new Date(session.startTime).toLocaleTimeString()} - {new Date(session.endTime).toLocaleTimeString()}</p>
      {session.roomName && <p><span className="font-medium text-foreground">Salle :</span> {session.roomName}</p>}
      {session.speakerNames.length > 0 && (
        <p><span className="font-medium text-foreground">Intervenants :</span> {session.speakerNames.join(", ")}</p>
      )}
    </div>
  </div>
)
