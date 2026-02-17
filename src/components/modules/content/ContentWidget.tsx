"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { TabNavigation, type TabId } from "./TabNavigation";
import { OverviewSection } from "./OverviewSection";
import { SkillsSection } from "./SkillsSection";
import { ProjectsSection } from "./ProjectsSection";
import { ServicesSection } from "./ServicesSection";
import { Footer } from "@/components/layout/Footer";

interface ContentWidgetProps {
  isProfileExpanded: boolean;
  onToggleProfile: () => void;
}

export function ContentWidget({ isProfileExpanded, onToggleProfile }: ContentWidgetProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <div className="flex h-full w-full flex-col relative">
      {/* Integrated Navigation + Profile Bar */}
      <TabNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        isProfileExpanded={isProfileExpanded}
        onToggleProfile={onToggleProfile}
      />
      
      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scroll-smooth">
        <div className="mx-auto max-w-5xl px-4 md:px-16 py-6 md:py-12 pb-20 space-y-8 md:space-y-12">
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
            {activeTab === "services" && (
              <ServicesSection key="services" />
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
