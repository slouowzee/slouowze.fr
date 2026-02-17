import { PROFILE } from "@/lib/data";
import Image from "next/image";

export function ProfileHeader() {
  return (
    <div className="flex flex-col gap-4 relative">
      <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-4">
        <div className="relative h-20 w-20 md:h-64 md:w-64 shrink-0 overflow-hidden rounded-full border border-border">
          <Image
            src={PROFILE.avatar}
            alt={PROFILE.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="flex flex-col gap-0.5 md:gap-1">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
            {PROFILE.name}
          </h1>
          <p className="text-lg md:text-xl font-light text-muted-foreground">
            {PROFILE.handle}
          </p>
        </div>
      </div>
      <p className="text-sm md:text-base text-foreground leading-relaxed whitespace-pre-wrap">
        {PROFILE.bio}
      </p>
    </div>
  );
}
