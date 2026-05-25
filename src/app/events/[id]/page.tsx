import { BackButton } from "@/components/bloc/back-button";
import { EventCard } from "@/components/event/event-card";
import { SessionCard } from "@/components/session/session-card";
import { events } from "@/mocks/event";
import { sessions } from "@/mocks/session";
import Link from "next/link";
import React from "react";

type EventPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EventPage({
  params,
}: EventPageProps) {
  const { id } = await params;

  // Chercher l'événement correspondant à l'id
  const event = events.find((event) => event.id === id);

  // Si aucun événement trouvé
  if (!event) {
    return (
      <div className="p-6 text-red-500">
        Événement introuvable
      </div>
    );
  }
 // récupérer les sessions liées à cet event
  const eventSessions = sessions.filter((session) =>
    event.sessionIds?.includes(session.id)
  );

  return (
    <div className="p-6">
      <BackButton/>
      <h1 className="text-2xl font-bold mb-4">
        {event.title}
      </h1>

      <EventCard event={event} />

      {/* SESSIONS */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">
          Sessions
        </h2>

         <div className="grid gap-4 md:grid-cols-2">
          {eventSessions.map((session) => (
            <Link key={session.id} href={`/events/${event.id}/sessions/${session.id}`} >
              <SessionCard session={session} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}