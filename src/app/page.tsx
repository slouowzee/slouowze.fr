import { ContentWidget } from "@/components/modules/content/ContentWidget";
import { ProfileWidget } from "@/components/modules/profile/ProfileWidget";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="flex h-screen w-full flex-col md:flex-row overflow-hidden bg-background text-foreground">
      {/* Left Column - Profile (Sidebar) */}
      <aside className="w-full md:w-[350px] shrink-0 overflow-y-auto border-r border-border p-6 md:p-8 scrollbar-thin">
        <ProfileWidget />
      </aside>

      {/* Right Column - Content */}
      <section className="flex-1 flex flex-col h-full overflow-hidden bg-background">
        <ContentWidget />
      </section>
    </main>
  );
}
