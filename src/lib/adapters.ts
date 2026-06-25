import type { Event, Session, Speaker, Question } from "@/types"
import type {
  BackendEvent,
  BackendSession,
  BackendSpeaker,
  BackendQuestion,
} from "./api"

function splitTags(tags: string | null): string[] {
  return tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : []
}

export function toFrontendEvent(be: BackendEvent): Event {
  return {
    id: String(be.id),
    title: be.title,
    description: be.description || "",
    longDescription: be.longDescription || "",
    startDate: be.startDate,
    endDate: be.endDate,
    location: be.location || "",
    venue: be.venue || "",
    coverImage: be.coverImage || "",
    tags: splitTags(be.tags),
    sessionCount: 0,
    speakerCount: 0,
    attendeeCount: 0,
    isLive: be.isLive,
    status: be.status as Event["status"],
    tracks: [],
    rooms: [],
  }
}

export function toFrontendSession(bs: BackendSession): Session {
  const level = bs.level || "Intermediate"
  const validLevel: Session["level"] =
    level === "Beginner" || level === "Advanced" ? level : "Intermediate"

  return {
    id: String(bs.id),
    title: bs.title,
    description: bs.description || "",
    eventId: String(bs.eventId),
    speakerIds: bs.speakerIds.map(String),
    room: bs.roomName || "",
    startTime: bs.startTime,
    endTime: bs.endTime,
    track: bs.track || "",
    tags: splitTags(bs.tags),
    capacity: bs.capacity || 0,
    enrolled: bs.enrolled || 0,
    isLive: bs.live,
    level: validLevel,
  }
}

export function toFrontendSpeaker(bs: BackendSpeaker): Speaker {
  return {
    id: String(bs.id),
    name: bs.fullName,
    title: bs.title || "",
    company: bs.company || "",
    bio: bs.biography || "",
    avatar: bs.profilePicture || "",
    twitter: bs.twitter || undefined,
    linkedin: bs.linkedin || undefined,
    github: bs.github || undefined,
    website: bs.website || undefined,
    sessions: [],
    tags: splitTags(bs.tags),
  }
}

export function toFrontendQuestion(bq: BackendQuestion): Question {
  return {
    id: String(bq.id),
    sessionId: String(bq.sessionId),
    text: bq.content,
    author: bq.authorName || "Anonymous",
    isAnonymous: !bq.authorName,
    votes: bq.upvotes,
    timestamp: bq.createdAt,
    isAnswered: bq.isAnswered || false,
    userVoted: false,
  }
}
