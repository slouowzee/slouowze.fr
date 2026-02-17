import { SOCIALS } from "@/lib/data";
import { Mail, Globe, Link } from "lucide-react";
import LinkComponent from "next/link";
import { Button } from "@/components/ui/Button";
import { FaDiscord, FaInstagram } from 'react-icons/fa';
import { SiLinktree, SiGithub, SiX, SiLinkedin } from 'react-icons/si';

const iconMap = {
	GitHub: SiGithub,
	Twitter: SiX,
	LinkedIn: SiLinkedin,
	Email: Mail,
	Website: Globe,
	Instagram: FaInstagram,
  	Linktree: SiLinktree,
	Discord: FaDiscord
};

const iconColors: Record<string, string> = {
  GitHub: "group-hover:text-foreground",
  Twitter: "group-hover:text-[#1DA1F2]",
  LinkedIn: "group-hover:text-[#0A66C2]",
  Instagram: "group-hover:text-[#E1306C]",
  Linktree: "group-hover:text-[#43E660]",
  Discord: "group-hover:text-[#5865F2]",
  Email: "group-hover:text-foreground",
  Website: "group-hover:text-foreground",
};

export function SocialLinks() {
  return (
    <div className="flex flex-col gap-2">
      {SOCIALS.map((social) => {
        const Icon = iconMap[social.platform as keyof typeof iconMap] || Link;
        const colorClass = iconColors[social.platform] || "group-hover:text-foreground";
        
        return (
          <Button
            key={social.platform}
            variant="ghost"
            size="sm"
            asChild
            className="w-full justify-start gap-2 px-2 text-muted-foreground hover:bg-muted/50 hover:text-foreground group"
          >
            <LinkComponent href={social.url} target="_blank" rel="noopener noreferrer">
              <Icon className={`h-4 w-4 transition-colors ${colorClass}`} />
              <span>{social.username}</span>
            </LinkComponent>
          </Button>
        );
      })}
    </div>
  );
}
