import { Speaker } from "@/types/speaker";

export const speakers: Speaker[] = [
  {
    id: "SP1",
    name: "Alice Martin",
    imageUrl: "/speakers/alice-martin.jpg",
    bio: "Experte en développement frontend et UX.",
    socialLinks: [
      { label: "LinkedIn", link: "https://linkedin.com/in/alicemartin" },
      { label: "Twitter", link: "https://twitter.com/alicemartin" },
    ],
    sessionIds: ["S1", "S2"],
  },
  {
    id: "SP2",
    name: "Jean Dupont",
    imageUrl: "/speakers/jean-dupont.jpg",
    bio: "Architecte logiciel spécialisé en microservices.",
    socialLinks: [
      { label: "LinkedIn", link: "https://linkedin.com/in/jeandupont" },
    ],
    sessionIds: ["S3", "S4"],
  },
  {
    id: "SP3",
    name: "Sophie Bernard",
    imageUrl: "/speakers/sophie-bernard.jpg",
    bio: "Passionnée par l’intelligence artificielle.",
    socialLinks: [
      { label: "GitHub", link: "https://github.com/sophiebernard" },
    ],
    sessionIds: ["S5", "S6"],
  },
  {
    id: "SP4",
    name: "Lucas Moreau",
    imageUrl: "/speakers/lucas-moreau.jpg",
    bio: "Ingénieur DevOps et cloud computing.",
    socialLinks: [
      { label: "LinkedIn", link: "https://linkedin.com/in/lucasmoreau" },
    ],
    sessionIds: ["S7", "S8"],
  },
  {
    id: "SP5",
    name: "Emma Laurent",
    imageUrl: "/speakers/emma-laurent.jpg",
    bio: "Designer UI/UX avec 8 ans d’expérience.",
    socialLinks: [
      { label: "Dribbble", link: "https://dribbble.com/emmalaurent" },
    ],
    sessionIds: ["S9", "S10"],
  },
  {
    id: "SP6",
    name: "Thomas Petit",
    imageUrl: "/speakers/thomas-petit.jpg",
    bio: "Développeur backend spécialisé en Java.",
    socialLinks: [
      { label: "GitHub", link: "https://github.com/thomaspetit" },
    ],
    sessionIds: ["S11", "S12"],
  },
  {
    id: "SP7",
    name: "Camille Robert",
    imageUrl: "/speakers/camille-robert.jpg",
    bio: "Consultante en cybersécurité.",
    socialLinks: [
      { label: "LinkedIn", link: "https://linkedin.com/in/camillerobert" },
    ],
    sessionIds: ["S13", "S14"],
  },
  {
    id: "SP8",
    name: "Nathan Leroy",
    imageUrl: "/speakers/nathan-leroy.jpg",
    bio: "Expert React et Next.js.",
    socialLinks: [
      { label: "Twitter", link: "https://twitter.com/nathanleroy" },
    ],
    sessionIds: ["S15", "S16"],
  },
  {
    id: "SP9",
    name: "Chloé Simon",
    imageUrl: "/speakers/chloe-simon.jpg",
    bio: "Spécialiste mobile Flutter et React Native.",
    socialLinks: [
      { label: "GitHub", link: "https://github.com/chloesimon" },
    ],
    sessionIds: ["S17"],
  },
  {
    id: "SP10",
    name: "Hugo Garcia",
    imageUrl: "/speakers/hugo-garcia.jpg",
    bio: "Ingénieur data et Big Data.",
    socialLinks: [
      { label: "LinkedIn", link: "https://linkedin.com/in/hugogarcia" },
    ],
    sessionIds: ["S18", "S19"],
  },
  {
    id: "SP11",
    name: "Lina Rousseau",
    imageUrl: "/speakers/lina-rousseau.jpg",
    bio: "Formatrice en tests automatisés.",
    socialLinks: [
      { label: "Twitter", link: "https://twitter.com/linarousseau" },
    ],
    sessionIds: ["S20"],
  },
  {
    id: "SP12",
    name: "Maxime Noel",
    imageUrl: "/speakers/maxime-noel.jpg",
    bio: "Spécialiste Kubernetes et Docker.",
    socialLinks: [
      { label: "GitHub", link: "https://github.com/maximenoel" },
      { label: "LinkedIn", link: "https://linkedin.com/in/maximenoel" },
    ],
    sessionIds: ["S21", "S22"],
  },
];