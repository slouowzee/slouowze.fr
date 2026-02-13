"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BookOpen, Code, Layers } from "lucide-react";

const TABS = [
  { id: "overview", label: "Aperçu", icon: BookOpen },
  { id: "skills", label: "Compétences", icon: Layers },
  { id: "projects", label: "Projets", icon: Code },
] as const;

export type TabId = (typeof TABS)[number]["id"];

interface TabNavigationProps {
  activeTab: TabId;
  onTabChange: (id: TabId) => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex w-full gap-8 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-6 md:px-12 pt-6 sticky top-0 z-50">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "group relative flex items-center gap-2 py-4 text-sm font-medium transition-colors hover:bg-muted/50 rounded-md px-3 -mb-px",
              isActive ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground/80"
            )}
          >
            <Icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground/80")} />
            <span>{tab.label}</span>
            
            {isActive && (
              <motion.div
                layoutId="active-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
