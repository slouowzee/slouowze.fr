export interface Profile {
  name: string;
  handle: string;
  role: string;
  location: string;
  email: string;
  bio: string;
  avatar: string; // URL or path to image
}

export interface Social {
  platform: "GitHub" | "Twitter" | "LinkedIn" | "Instagram" | "Website" | "Email";
  url: string;
  username: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  featured: boolean; // "Pins"
}

export interface Skill {
  category: "Languages" | "Frameworks" | "Tools" | "Design";
  items: string[];
}

export interface Service {
  title: string;
  description: string;
  price?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export const PROFILE: Profile = {
  name: "John Doe",
  handle: "@username",
  role: "Développeur Full Stack",
  location: "Ville, Pays",
  email: "hello@example.com",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
  avatar: "/avatar.svg", // Local generic placeholder
};

export const SOCIALS: Social[] = [
  { platform: "GitHub", url: "#", username: "username" },
  { platform: "Twitter", url: "#", username: "username" },
  { platform: "LinkedIn", url: "#", username: "username" },
];

export const PROJECTS: Project[] = [
  {
    title: "Project A",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    tags: ["Next.js", "Tailwind"],
    link: "#",
    featured: true,
  },
  {
    title: "Project B",
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tags: ["React", "Node.js"],
    link: "#",
    featured: true,
  },
  {
    title: "Project C",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    tags: ["Vue.js", "Firebase"],
    link: "#",
    featured: false,
  },
];

export const SKILLS: Skill[] = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL", "HTML/CSS"],
  },
  {
    category: "Frameworks",
    items: ["Next.js", "React", "Vue.js", "Express", "Tailwind CSS"],
  },
  {
    category: "Tools",
    items: ["Git", "Docker", "Figma", "PostgreSQL", "VS Code"],
  },
];

export const SERVICES: Service[] = [
  {
    title: "Service A",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: "À partir de 500€",
  },
  {
    title: "Service B",
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    price: "Sur devis",
  },
];

export const EXPERIENCE: Experience[] = [
  {
    role: "Senior Dev",
    company: "Entreprise",
    period: "2021 - Present",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    role: "Web Developer",
    company: "Agence",
    period: "2019 - 2021",
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export const EDUCATION: Education[] = [
  {
    degree: "Master en Informatique",
    institution: "Université",
    period: "2019 - 2021",
    description: "Spécialisation en développement logiciel.",
  },
  {
    degree: "Licence Informatique",
    institution: "Université",
    period: "2016 - 2019",
    description: "Bases de l'informatique et algorithmique.",
  },
];
