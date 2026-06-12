import type { Speaker } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { getInitials } from "@/lib/utils"

type Props = { speaker: Speaker }

export const SpeakerCard = ({ speaker }: Props) => (
  <Card>
    <CardContent className="flex flex-row items-center">
      <Avatar size="lg">
        <AvatarImage src={speaker.profilePicture || undefined} />
        <AvatarFallback>{getInitials(speaker.fullName)}</AvatarFallback>
      </Avatar>
      <CardHeader className="w-full">
        <CardTitle>{speaker.fullName}</CardTitle>
        <CardDescription className="line-clamp-1">{speaker.biography}</CardDescription>
      </CardHeader>
    </CardContent>
  </Card>
)
