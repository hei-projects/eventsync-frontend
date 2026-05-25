import { Speaker } from '@/types/speaker'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { getInitials } from '@/lib/name'
import Link from 'next/link'

type SpeakerCardProps = {
    speaker: Speaker
}

export const SpeakerCard = ({speaker}:SpeakerCardProps) => {
  return (
    <Card >
        <CardContent className='flex flex-row items-center'>
        <Avatar size='lg'>
            <AvatarImage src={speaker.imageUrl}/>
            <AvatarFallback>{getInitials(speaker.name)}</AvatarFallback>
        </Avatar>
        <CardHeader className='w-full'>
            <CardTitle>{speaker.name}</CardTitle>
            <CardDescription className='line-clamp-1'>{speaker.bio}</CardDescription>
        </CardHeader>
        </CardContent>
    </Card>
  )
}
