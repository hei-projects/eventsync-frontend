import { BackButton } from "@/components/bloc/back-button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { getInitials } from "@/lib/utils"
import { getSpeaker, getSessions } from "@/lib/api"
import { Globe, Linkedin, Code2 } from "lucide-react"
import Link from "next/link"
import { SessionCard } from "@/components/session/session-card"

type Props = { params: Promise<{ id: string }> }

export default async function SpeakerPage({ params }: Props) {
  const { id } = await params
  const speaker = await getSpeaker(Number(id))
  const allSessions = await getSessions()
  const sessions = allSessions.filter((s) => s.speakerNames.includes(speaker.fullName))

  return (
    <div className="space-y-6">
      <BackButton />
      <div className="flex items-start gap-6">
        <Avatar className="size-32">
          <AvatarImage src={speaker.profilePicture || undefined} alt={speaker.fullName} />
          <AvatarFallback className="text-2xl">{getInitials(speaker.fullName)}</AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{speaker.fullName}</h1>
          <p className="text-muted-foreground max-w-xl">{speaker.biography}</p>
          <div className="flex gap-2">
            {speaker.website && (
              <Button variant="outline" size="sm" asChild>
                <a href={speaker.website} target="_blank" rel="noopener noreferrer">
                  <Globe className="size-4 mr-1" /> Site
                </a>
              </Button>
            )}
            {speaker.linkedin && (
              <Button variant="outline" size="sm" asChild>
                <a href={speaker.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="size-4 mr-1" /> LinkedIn
                </a>
              </Button>
            )}
            {speaker.github && (
              <Button variant="outline" size="sm" asChild>
                <a href={speaker.github} target="_blank" rel="noopener noreferrer">
                  <Code2 className="size-4 mr-1" /> GitHub
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4">Sessions</h2>
        {sessions.length === 0 ? (
          <p className="text-muted-foreground text-sm">Aucune session associée.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {sessions.map((session) => (
              <Link key={session.id} href={`/events/${session.eventId}/sessions/${session.id}`}>
                <SessionCard session={session} />
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
