export interface Profile {
  name: string;
  handle: string;
  role: string;
  bio: string;
  about: string;
  avatar: string;
}

export interface Social {
  platform: "GitHub" | "Twitter" | "LinkedIn" | "Instagram" | "Linktree" | "Discord" ;
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
  category: "Languages" | "Frameworks" | "Tools" | "Design" | "Cloud" | "Soft Skills";
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
  bio: "",
  about: "",
  avatar: "/lou.png",
};

export const SOCIALS: Social[] = [
  { platform: "GitHub", url: "https://github.com/slouowzee", username: "@slouowzee" },
  { platform: "Linktree", url: "https://link.slouowze.fr", username: "link.slouowze.fr" },
  { platform: "Discord", url: "https://discord.gg/DBMEGwHXDq", username: "Le monde de Slou" },
  { platform: "Twitter", url: "https://x.com/slouowze", username: "@slouowze" },
  { platform: "Instagram", url: "https://www.instagram.com/slouowze/", username: "@slouowze"},
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/slouowzee/", username: "@slouowzee" },
];

export const SKILLS: Skill[] = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "HTML", "CSS", "PHP", "GO", "C", "C#","Python", "SQL"],
  },
  {
    category: "Frameworks",
    items: ["Next.js", "React", "Vue.js", "Node.js", "Bun", "Express", "Expo", "Laravel", "Symfony", "Tailwind CSS", "Bootstrap"],
  },
  {
    category: "Tools",
    items: ["Git", "Docker", "Canva","Figma", "MariaDB", "PostgreSQL", "Supabase", "VS Code"],
  },
  {
    category: "Cloud",
    items: ["VPS", "Dokploy", "Vercel", "Firebase"],
  },
  {
    category: "Soft Skills",
    items: ["Architecture", "UI/UX Design", "Agile", "Teamwork"],
  },
];

export const SERVICES: Service[] = [
	{
		title: "Création de site web",
		description: "Site web entièrement personnalisé adapté à vos besoins. Une consultation initiale permettra de définir les spécifications du projet.",
		price: "Sur devis",
	},
	{
		title: "Optimisation de site web",
		description: "Amélioration et optimisation de votre site actuel. Nous définirons ensemble les axes d'amélioration lors d'une consultation.",
		price: "Sur devis",
	},
	{
		title: "Développement d'application mobile",
		description: "Application mobile sur mesure conçue selon vos besoins spécifiques. Un cahier des charges sera établi lors d'une première consultation.",
		price: "Sur devis",
	},
	{
		title: "Divers conseils",
		description: "Adressez moi une message via discord, je prendrais le temps de vous répondre.",
		price: "Gratuit",
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

export const RESUME_URL = "/cv_pg_slouowze.pdf"; // Placeholder, file needs to be added to public/ folder
