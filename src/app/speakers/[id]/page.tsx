import { Button } from "@/components/ui/button";
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
            <div className="relative w-32 aspect-square rounded-full overflow-hidden bg-muted">
                <img src={speaker.imageUrl} alt={speaker.name} className="absolute inset-0 w-full h-full object-cover" />
            </div>
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