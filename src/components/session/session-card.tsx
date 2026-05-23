import { Session } from "@/types/session";
import React from "react";

type SessionCardProps = {
  session: Session;
};

export const SessionCard = ({ session }: SessionCardProps) => {
  return (
    <div className="border rounded-2xl p-5 shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-2">
        {session.title}
      </h2>

      <p className="text-gray-600 mb-4">
        {session.description}
      </p>

      <div className="space-y-1 text-sm text-gray-700">
        <p>
          <span className="font-medium">Début :</span>{" "}
          {session.startTime.toLocaleString()}
        </p>

        <p>
          <span className="font-medium">Fin :</span>{" "}
          {session.endTime.toLocaleString()}
        </p>

        <p>
          <span className="font-medium">Salle :</span>{" "}
          {session.roomId}
        </p>

        <p>
          <span className="font-medium">Capacité :</span>{" "}
          {session.capacity}
        </p>

        <p>
          <span className="font-medium">Intervenants :</span>{" "}
          {session.speakerIds.length}
        </p>

        <p>
          <span className="font-medium">Questions :</span>{" "}
          {session.questionIds.length}
        </p>
      </div>
    </div>
  );
};