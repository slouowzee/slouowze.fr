import { SOCIALS } from "@/lib/data";
import { Github, Twitter, Linkedin, Mail, Globe, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

// Map platform names to Lucide icons
const iconMap = {
  GitHub: Github,
  Twitter: Twitter,
  LinkedIn: Linkedin,
  Email: Mail,
  Website: Globe,
  Instagram: ExternalLink, // Placeholder as Instagram isn't standard in lucide
};

export function SocialLinks() {
  return (
    <div className="flex flex-col gap-2">
      {SOCIALS.map((social) => {
        const Icon = iconMap[social.platform as keyof typeof iconMap] || ExternalLink;
        
        return (
          <Button
            key={social.platform}
            variant="ghost"
            size="sm"
            asChild
            className="w-full justify-start gap-2 px-2 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
          >
            <Link href={social.url} target="_blank" rel="noopener noreferrer">
              <Icon className="h-4 w-4" />
              <span>{social.username}</span>
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
