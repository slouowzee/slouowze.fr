"use client";

import { useState } from "react";
import { ContentWidget } from "@/components/modules/content/ContentWidget";
import { ProfileWidget } from "@/components/modules/profile/ProfileWidget";

export default function Home() {
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);

  return (
    <main className="flex h-dvh w-full flex-col md:flex-row overflow-hidden bg-background text-foreground">
      {/* Sidebar/Profile - Desktop only */}
      <aside className="hidden md:flex w-87.5 shrink-0 border-r border-border p-8 overflow-y-auto scrollbar-thin">
        <ProfileWidget />
      </aside>

      {/* Main Content Area */}
      <section className="flex-1 flex flex-col h-full overflow-hidden bg-background">
        <ContentWidget isProfileExpanded={isProfileExpanded} onToggleProfile={() => setIsProfileExpanded(!isProfileExpanded)} />
      </section>
    </main>
  );
}
