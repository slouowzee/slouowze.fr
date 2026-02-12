import { ProfileHeader } from "./ProfileHeader";
import { SocialLinks } from "./SocialLinks";
import { ViewCounter } from "./ViewCounter";
import { MapPin, Mail } from "lucide-react";
import { PROFILE } from "@/lib/data";
import { Separator } from "@/components/ui/Separator";

export function ProfileWidget() {
  return (
    <div className="flex flex-col gap-6">
      <ProfileHeader />
      
      <div className="flex flex-col gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 shrink-0" />
          <span>{PROFILE.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 shrink-0" />
          <a href={`mailto:${PROFILE.email}`} className="hover:text-primary transition-colors truncate">
            {PROFILE.email}
          </a>
        </div>
      </div>

      <Separator />
      
      <SocialLinks />
      
      <Separator />

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <ViewCounter />
        <span>profile views</span>
      </div>
    </div>
  );
}
