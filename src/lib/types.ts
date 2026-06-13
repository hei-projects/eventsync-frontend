export type Event = {
  id: number
  title: string
  description: string
  startDate: string
  endDate: string
  location: string
}

export type Session = {
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
  live: boolean
}

export type Speaker = {
  id: number
  fullName: string
  biography: string
  profilePicture: string | null
  website: string | null
  linkedin: string | null
  github: string | null
}

export type Room = {
  id: number
  name: string
}

export type Question = {
  id: number
  content: string
  authorName: string | null
  upvotes: number
  createdAt: string
}
