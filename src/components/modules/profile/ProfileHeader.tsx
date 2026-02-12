import { PROFILE } from "@/lib/data";
import Image from "next/image";
import { ModeToggle } from "@/components/layout/ModeToggle";

export function ProfileHeader() {
  return (
    <div className="flex flex-col gap-4 relative">
      <div className="absolute top-0 right-0 md:hidden">
        <ModeToggle />
      </div>
      <div className="relative h-64 w-64 overflow-hidden rounded-full border border-border shadow-sm mx-auto">
        <Image
          src={PROFILE.avatar}
          alt={PROFILE.name}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{PROFILE.name}</h1>
        <p className="text-xl font-light text-muted-foreground">{PROFILE.handle}</p>
      </div>
      <p className="text-base text-foreground leading-relaxed">
        {PROFILE.bio}
      </p>
    </div>
  );
}
