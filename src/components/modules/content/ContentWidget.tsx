"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TabNavigation, type TabId } from "./TabNavigation";
import { OverviewSection } from "./OverviewSection";
import { SkillsSection } from "./SkillsSection";
import { ProjectsSection } from "./ProjectsSection";
import { ServicesSection } from "./ServicesSection";
import { Footer } from "@/components/layout/Footer";

interface ContentWidgetProps {
  isProfileExpanded: boolean;
  onToggleProfile: () => void;
  onShowPrivacy?: () => void;
  isPrivacyVisible?: boolean;
}

export function ContentWidget({ 
  isProfileExpanded, 
  onToggleProfile, 
  onShowPrivacy,
}: ContentWidgetProps) {
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
      <div className="flex-1 overflow-y-auto scrollbar-thin scroll-smooth main-content-scroll">
        <div className="mx-auto max-w-5xl px-4 md:px-16 py-6 md:py-12 pb-20 space-y-8 md:space-y-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "overview" && <OverviewSection />}
              {activeTab === "skills" && <SkillsSection />}
              {activeTab === "projects" && <ProjectsSection />}
              {activeTab === "services" && <ServicesSection />}
            </motion.div>
          </AnimatePresence>

          <div className="mt-20 border-t border-border pt-8 footer-divider">
            <Footer onShowPrivacy={onShowPrivacy} />
          </div>
        </div>
      </div>
    </div>
  );
}
