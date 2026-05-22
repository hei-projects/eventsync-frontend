import { BackButton } from '@/components/bloc/back-button'
import { SpeakerCard } from '@/components/speaker/speaker-card'
import { sessions } from '@/mocks/session'
import { speakers } from '@/mocks/speaker'

type SessionPageProps = {
  params: Promise<{ session_id: string }>
}

export default async function SessionPage({ params }: SessionPageProps) {
  const { session_id } = await params

  const session = sessions.find(s => s.id.toLowerCase() === session_id.toLowerCase())

  if (!session) {
    return <p>Session not found</p>
  }

  return (
    <div className='h-full w-full grid grid-cols-[1fr_320px] gap-4'>
      <div className='flex flex-col gap-6'>
        <div className='h-fit'>
          <BackButton/>
          <h1 className='text-2xl font-bold'>{session.title}</h1>
          <p className='text-muted-foreground'>{session.description}</p>
        </div>

        <div className='h-full'>
          <h2 className='text-xl font-semibold'>Questions</h2>
        </div>
      </div>


      <div className='h-full'>
        <h2 className='text-xl font-semibold'>Speakers</h2>
        <div>
          {session.speakerIds.map(speakerId => {
            const speaker = speakers.find(s => s.id === speakerId)
            return speaker ? <SpeakerCard key={speaker.id} speaker={speaker} /> : null
          })}
        </div>
      </div>
    </div>
  )
}
