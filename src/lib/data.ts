export interface Profile {
  name: string;
  handle: string;
  role: string;
  bio: string;
  avatar: string; // URL or path to image
}

export interface Social {
  platform: "GitHub" | "Twitter" | "LinkedIn" | "Instagram";
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
  name: "slouowze",
  handle: "@slouowzee",
  role: "Développeur Web",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
  avatar: "/avatar.svg", // Local generic placeholder
};

export const SOCIALS: Social[] = [
  { platform: "GitHub", url: "https://github.com/slouowzee", username: "@slouowzee" },
  { platform: "Twitter", url: "https://x.com/slouowze", username: "@slouowze" },
  { platform: "Instagram", url: "https://www.instagram.com/slouowze/", username: "@slouowze"},
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/slouowzee/", username: "@slouowzee" },
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
		role: "Développeur Full Stack",
		company: "Anjou Web, Montreuil-Bellay",
		period: "Mai-Juin 2025 / Mars-Avril 2026",
		description: "Stages réalisés dans le cadre de mon BTS. J'ai pu développer une application web entière, consacrée à la création de documents GDocs.",
	},
];

export const EDUCATION: Education[] = [
	{
		degree: "BTS SIO",
		institution: "Lycée Polyvalent Chevrollier, Angers",
		period: "2024 - 2026",
		description: "Spécialisation SLAM (Solutions Logicielles et Applications Métiers), apprentissage web, mobile, logiciel, data, cybersécurité.",
	}
];

export const SUPPORT = {
  kofi: "https://ko-fi.com/slouu"
};
