import type { Event, Session, Speaker, Room, Question } from "./types"

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${url}`, {
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  })
  if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`)
  return res.json()
}

export function getEvents(): Promise<Event[]> {
  return fetchJson("/events")
}

export function getEvent(id: number): Promise<Event> {
  return fetchJson(`/events/${id}`)
}

export function getEventSchedules(eventId: number): Promise<Session[]> {
  return fetchJson(`/events/${eventId}/schedule`)
}

export function getLiveSessions(eventId: number): Promise<Session[]> {
  return fetchJson(`/events/${eventId}/live-sessions`)
}

export function getSessions(): Promise<Session[]> {
  return fetchJson("/sessions")
}

export function getSession(id: number): Promise<Session> {
  return fetchJson(`/sessions/${id}`)
}

export function isSessionLive(id: number): Promise<boolean> {
  return fetchJson(`/sessions/${id}/live`)
}

export function getSpeakers(): Promise<Speaker[]> {
  return fetchJson("/speakers")
}

export function getSpeaker(id: number): Promise<Speaker> {
  return fetchJson(`/speakers/${id}`)
}

export function getRooms(): Promise<Room[]> {
  return fetchJson("/rooms")
}

export function getRoom(id: number): Promise<Room> {
  return fetchJson(`/rooms/${id}`)
}

export function getRoomSessions(roomId: number): Promise<Session[]> {
  return fetchJson(`/rooms/${roomId}/sessions`)
}

export function getQuestions(sessionId: number): Promise<Question[]> {
  return fetchJson(`/sessions/${sessionId}/questions`)
}

export function createQuestion(sessionId: number, data: { content: string; authorName?: string }): Promise<Question> {
  return fetchJson(`/sessions/${sessionId}/questions`, {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export function upvoteQuestion(questionId: number): Promise<Question> {
  return fetchJson(`/questions/${questionId}/upvote`, { method: "POST" })
}
