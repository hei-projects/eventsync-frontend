"use client"

import { useFavorites } from "@/hooks/use-favorites"
import { useEffect, useState } from "react"
import type { Session } from "@/lib/types"
import { getSession } from "@/lib/api"
import Link from "next/link"
import { SessionCard } from "../session/session-card"

export const FavoriteSessions = () => {
  const { favorites, removeFavorite } = useFavorites()
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const results = await Promise.allSettled(
        favorites.map((id) => getSession(id))
      )
      setSessions(results
        .filter((r) => r.status === "fulfilled")
        .map((r) => (r as PromiseFulfilledResult<Session>).value)
      )
      setLoading(false)
    }
    if (favorites.length > 0) load()
    else setLoading(false)
  }, [favorites])

  if (loading) return <p className="text-muted-foreground">Chargement...</p>

  if (sessions.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg">Aucun favori pour le moment.</p>
        <p className="text-sm mt-1">Ajoutez des sessions à vos favoris depuis le planning.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {sessions.map((session) => (
        <div key={session.id} className="relative">
          <Link href={`/events/${session.eventId}/sessions/${session.id}`}>
            <SessionCard session={session} />
          </Link>
          <button
            onClick={() => removeFavorite(session.id)}
            className="absolute top-3 right-3 text-xs text-muted-foreground hover:text-destructive underline"
          >
            Retirer
          </button>
        </div>
      ))}
    </div>
  )
}
