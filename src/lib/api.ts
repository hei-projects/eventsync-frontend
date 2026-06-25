const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${url}`, {
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  })
  if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`)
  return res.json()
}

export type BackendEvent = {
  id: number
  title: string
  description: string
  startDate: string
  endDate: string
  location: string | null
  longDescription: string | null
  venue: string | null
  coverImage: string | null
  tags: string | null
  isLive: boolean
  status: string
}

export type BackendSession = {
  id: number
  title: string
  description: string
  startTime: string
  endTime: string
  capacity: number | null
  eventId: number
  roomName: string | null
  roomId: number | null
  speakerNames: string[]
  speakerIds: number[]
  live: boolean
  track: string | null
  level: string | null
  tags: string | null
  enrolled: number | null
}

export type BackendSpeaker = {
  id: number
  fullName: string
  biography: string
  profilePicture: string | null
  website: string | null
  linkedin: string | null
  github: string | null
  title: string | null
  company: string | null
  twitter: string | null
  tags: string | null
}

export type BackendRoom = {
  id: number
  name: string
}

export type BackendQuestion = {
  id: number
  content: string
  authorName: string | null
  upvotes: number
  createdAt: string
  isAnswered: boolean | null
  sessionId: number
}

export function getEvents(): Promise<BackendEvent[]> {
  return fetchJson("/events")
}

export function getEvent(id: number): Promise<BackendEvent> {
  return fetchJson(`/events/${id}`)
}

export function getSessions(): Promise<BackendSession[]> {
  return fetchJson("/sessions")
}

export function getSession(id: number): Promise<BackendSession> {
  return fetchJson(`/sessions/${id}`)
}

export function getSessionSpeakers(sessionId: number): Promise<BackendSpeaker[]> {
  return fetchJson(`/sessions/${sessionId}/speakers`)
}

export function getEventSessions(eventId: number): Promise<BackendSession[]> {
  return fetchJson(`/events/${eventId}/schedule`)
}

export function getLiveSessions(eventId: number): Promise<BackendSession[]> {
  return fetchJson(`/events/${eventId}/live-sessions`)
}

export function getSpeakers(): Promise<BackendSpeaker[]> {
  return fetchJson("/speakers")
}

export function getSpeaker(id: number): Promise<BackendSpeaker> {
  return fetchJson(`/speakers/${id}`)
}

export function getRooms(): Promise<BackendRoom[]> {
  return fetchJson("/rooms")
}

export function getRoom(id: number): Promise<BackendRoom> {
  return fetchJson(`/rooms/${id}`)
}

export function getRoomSessions(roomId: number): Promise<BackendSession[]> {
  return fetchJson(`/rooms/${roomId}/sessions`)
}

export function getQuestions(sessionId: number): Promise<BackendQuestion[]> {
  return fetchJson(`/sessions/${sessionId}/questions`)
}

export function createQuestion(
  sessionId: number,
  data: { content: string; authorName?: string }
): Promise<BackendQuestion> {
  return fetchJson(`/sessions/${sessionId}/questions`, {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export function upvoteQuestion(questionId: number): Promise<BackendQuestion> {
  return fetchJson(`/questions/${questionId}/upvote`, { method: "POST" })
}

export function isSessionLive(id: number): Promise<boolean> {
  return fetchJson(`/sessions/${id}/live`)
}
