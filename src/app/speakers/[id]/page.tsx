import { BackButton } from "@/components/bloc/back-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/name";
import { speakers } from "@/mocks/speaker";

type SpeakersPageProps = {
  params: Promise<{ id: string }>
}

export default async function SpeakersPage({params}:SpeakersPageProps ) {
    const {id} = await params

    //TODO: fetch speaker data
    const speaker = speakers.find(s => s.id === id)

    if (!speaker) {
        return (
            <h1>Speaker not found</h1>
        );
    }

    return (
        <div className="space-y-4">
            <BackButton />
            <Avatar className="size-32">
                <AvatarImage src={speaker.imageUrl} alt={speaker.name}/>
                <AvatarFallback>{getInitials(speaker.name)}</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold mt-2">{speaker.name}</h1>
            <p className="text-muted-foreground">{speaker.bio}</p>

            <div>
                {speaker.socialLinks.map(link => (
                    <Button key={link.label} variant="link" asChild>
                        <a href={link.link} target="_blank">
                            {link.label}
                        </a>
                    </Button>
                ))}
            </div>

            
        </div>
    );
}