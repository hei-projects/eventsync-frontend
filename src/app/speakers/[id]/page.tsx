type SpeakersPageProps = {
  params: Promise<{ id: string }>
}

export default async function SpeakersPage({params}:SpeakersPageProps ) {
    const {id} = await params
    return (
        <h1>Speakers, {id} </h1>
    );
}