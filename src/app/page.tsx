"use client";

import { useState } from "react";
import { ContentWidget } from "@/components/modules/content/ContentWidget";
import { ProfileWidget } from "@/components/modules/profile/ProfileWidget";
import { PrivacyPolicyContent } from "@/components/layout/PrivacyPolicy";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const handleTogglePrivacy = () => {
    setShowPrivacy(!showPrivacy);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <main className="flex h-dvh w-full flex-col md:flex-row overflow-hidden bg-background text-foreground">
        {/* Sidebar/Profile - Desktop only */}
        <aside className="hidden md:flex w-87.5 shrink-0 border-r border-border p-8 overflow-y-auto scrollbar-thin">
          <ProfileWidget />
        </aside>

        {/* Main Content Area */}
        <section className="flex-1 flex flex-col h-full overflow-hidden bg-background">
          <ContentWidget 
            isProfileExpanded={isProfileExpanded} 
            onToggleProfile={() => setIsProfileExpanded(!isProfileExpanded)} 
            onShowPrivacy={handleTogglePrivacy}
            isPrivacyVisible={showPrivacy}
          />
        </section>
      </main>

      {/* Global Fullscreen Privacy Section */}
      <AnimatePresence>
        {showPrivacy && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-100 bg-background flex flex-col pt-0"
          >
            <div className="flex-1 overflow-y-auto scrollbar-thin px-4 md:px-16 pt-12">
              <div className="max-w-5xl mx-auto py-12 relative">
                <div className="absolute top-0 right-0 z-10">
                  <button 
                    onClick={handleTogglePrivacy}
                    className="p-3 rounded-full border border-border bg-card hover:bg-muted transition-colors shadow-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </button>
                </div>
                <PrivacyPolicyContent />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
