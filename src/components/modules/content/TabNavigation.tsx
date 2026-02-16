"use client";

import { cn } from "@/lib/utils";
import { BookOpen, Code, Layers, Pin } from "lucide-react";
import { ModeToggle } from "@/components/layout/ModeToggle";

const TABS = [
  { id: "overview", label: "README.md", icon: BookOpen },
  { id: "skills", label: "skills.json", icon: Layers },
  { id: "projects", label: "projets.json", icon: Code },
  { id: "services", label: "services.json", icon: Pin },
] as const;

export type TabId = (typeof TABS)[number]["id"];

interface TabNavigationProps {
  activeTab: TabId;
  onTabChange: (id: TabId) => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex w-full overflow-x-auto">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "group relative border-r border-border px-6 py-4 text-sm font-normal transition-colors hover:bg-muted/50 flex items-center gap-2 min-w-40",
                isActive 
                  ? "bg-background text-foreground border-t-2 border-t-primary" 
                  : "bg-muted/30 text-muted-foreground hover:text-foreground border-t-2 border-t-transparent"
              )}
            >
              <Icon className="h-3.5 w-3.5 opacity-70" />
              <span>{tab.label}</span>
              
              {/* Optional: Close icon effect for realism */}
              {/* <span className="ml-auto opacity-0 group-hover:opacity-50 hover:!opacity-100 p-0.5 rounded-md hover:bg-muted-foreground/20">×</span> */}
            </button>
          );
        })}
      </div>
      
      <div className="px-4 flex items-center border-l border-border h-full bg-background/50">
        <ModeToggle />
      </div>
    </div>
  );
}
