import { Event } from '@/types/event'
import React from 'react'

type EventCardProps = {
 event: Event
}

export const EventCard = ({event}:EventCardProps) => {
  return (
    <div
            className="border rounded-2xl p-5 shadow-sm bg-white"
          >
            <h2 className="text-xl font-semibold mb-2">
              {event.title}
            </h2>

            <p className="text-gray-600 mb-4">
              {event.description}
            </p>

            <div className="space-y-1 text-sm text-gray-700">
              <p>
                <span className="font-medium">Début :</span>{" "}
                {event.startDate.toLocaleDateString()}
              </p>

              <p>
                <span className="font-medium">Fin :</span>{" "}
                {event.endDate.toLocaleDateString()}
              </p>

              <p>
                <span className="font-medium">Lieu :</span>{" "}
                {event.location}
              </p>

              <p>
                <span className="font-medium">Sessions :</span>{" "}
                {event.sessionIds.length}
              </p>
            </div>
          </div>
  )
}
