import { BackButton } from "@/components/bloc/back-button"
import { QuestionArea } from "@/components/session/question-area"
import { SpeakerCard } from "@/components/speaker/speaker-card"
import { LiveBadge } from "@/components/session/live-badge"
import { getSession, getSpeakers, getQuestions } from "@/lib/api"
import Link from "next/link"

type Props = { params: Promise<{ session_id: string }> }

export default async function SessionPage({ params }: Props) {
  const { session_id } = await params
  const session = await getSession(Number(session_id))
  const speakers = (await getSpeakers()).filter((s) =>
    session.speakerNames.includes(s.fullName)
  )
  const questions = session.live ? await getQuestions(session.id) : []

  return (
    <div className="grid grid-cols-[1fr_320px] gap-6">
      <div className="space-y-6">
        <BackButton />
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{session.title}</h1>
            {session.live && <LiveBadge />}
          </div>
          <p className="text-muted-foreground mt-1">{session.description}</p>
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
            <span>🕐 {new Date(session.startTime).toLocaleTimeString()} - {new Date(session.endTime).toLocaleTimeString()}</span>
            {session.roomName && <span>📍 {session.roomName}</span>}
            {session.capacity != null && <span>👥 Capacité : {session.capacity}</span>}
          </div>
        </div>

        {session.live && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Questions</h2>
            <QuestionArea sessionId={session.id} initialQuestions={questions} />
          </section>
        )}

        {!session.live && session.startTime && new Date(session.startTime) > new Date() && (
          <p className="text-muted-foreground text-sm">
            Les questions seront disponibles quand la session commencera.
          </p>
        )}
      </div>

      <aside className="space-y-4">
        <h2 className="text-xl font-semibold">Intervenants</h2>
        <div className="flex flex-col gap-4">
          {speakers.map((speaker) => (
            <Link key={speaker.id} href={`/speakers/${speaker.id}`}>
              <SpeakerCard speaker={speaker} />
            </Link>
          ))}
        </div>
      </aside>
    </div>
  )
}
