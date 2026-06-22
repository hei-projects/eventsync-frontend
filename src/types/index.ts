export interface Speaker {
  id: string
  name: string
  title: string
  company: string
  bio: string
  avatar: string
  twitter?: string
  linkedin?: string
  github?: string
  website?: string
  sessions: string[]
  tags: string[]
}

export interface Session {
  id: string
  title: string
  description: string
  eventId: string
  speakerIds: string[]
  room: string
  startTime: string
  endTime: string
  track: string
  tags: string[]
  capacity: number
  enrolled: number
  isLive: boolean
  level: 'Beginner' | 'Intermediate' | 'Advanced'
}

export interface Event {
  id: string
  title: string
  description: string
  longDescription: string
  startDate: string
  endDate: string
  location: string
  venue: string
  coverImage: string
  tags: string[]
  sessionCount: number
  speakerCount: number
  attendeeCount: number
  isLive: boolean
  status: 'upcoming' | 'live' | 'past'
  tracks: string[]
  rooms: string[]
}

export interface Question {
  id: string
  sessionId: string
  text: string
  author: string
  isAnonymous: boolean
  votes: number
  timestamp: string
  isAnswered: boolean
  userVoted?: boolean
}
