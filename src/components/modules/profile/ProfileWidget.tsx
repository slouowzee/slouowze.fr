import { ProfileHeader } from "./ProfileHeader";
import { SocialLinks } from "./SocialLinks";
import { SupportLinks } from "./SupportLinks";
import { ViewCounter } from "./ViewCounter";
import { Separator } from "@/components/ui/Separator";

export function ProfileWidget() {
  return (
    <div className="flex flex-col gap-6">
      <ProfileHeader />

      <Separator />
      
      <div className="flex flex-col gap-4">
        <SocialLinks />
        <SupportLinks />
      </div>
      
      <Separator />

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <ViewCounter />
        <span>Visites</span>
      </div>
    </div>
  );
}
