export type SocialLink = {
    label: string;
    link: string;
}

export type Speaker = {
    id: string;
    name: string;
    imageUrl: string;
    bio: string;
    socialLinks: SocialLink[];
    sessionIds: string[]
}