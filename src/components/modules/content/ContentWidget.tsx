"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { TabNavigation, type TabId } from "./TabNavigation";
import { OverviewSection } from "./OverviewSection";
import { SkillsSection } from "./SkillsSection";
import { ProjectsSection } from "./ProjectsSection";
import { Footer } from "@/components/layout/Footer";

export function ContentWidget() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <div className="flex h-full w-full flex-col relative">
      {/* Navigation Bar - Sticky Top */}
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scroll-smooth">
        <div className="mx-auto max-w-5xl p-6 md:p-12 pb-20 space-y-12">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <OverviewSection key="overview" />
            )}
            {activeTab === "skills" && (
              <SkillsSection key="skills" />
            )}
            {activeTab === "projects" && (
              <ProjectsSection key="projects" />
            )}
          </AnimatePresence>

          <div className="mt-20 border-t border-border pt-8">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
