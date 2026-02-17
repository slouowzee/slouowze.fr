"use client";

import { cn } from "@/lib/utils";
import { BookOpen, Code, Layers, Pin, ChevronDown } from "lucide-react";
import { ModeToggle } from "@/components/layout/ModeToggle";
import { PROFILE } from "@/lib/data";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ProfileHeader } from "../profile/ProfileHeader";
import { SocialLinks } from "../profile/SocialLinks";
import { SupportLinks } from "../profile/SupportLinks";
import { ViewCounter } from "../profile/ViewCounter";
import { Separator } from "@/components/ui/Separator";

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
  isProfileExpanded?: boolean;
  onToggleProfile?: () => void;
}

export function TabNavigation({ activeTab, onTabChange, isProfileExpanded, onToggleProfile }: TabNavigationProps) {
  return (
    <div className="sticky top-0 z-50 flex w-full flex-col border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      {/* Header Row - Mobile Only */}
      <div className="flex md:hidden items-center justify-between px-3 py-2 h-13">
        <div className="flex items-center gap-3">
          <AnimatePresence initial={false}>
            {!isProfileExpanded && (
              <motion.div 
                key="compact-info"
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative h-8 w-8 rounded-full overflow-hidden border border-primary/20 p-0.5 shadow-sm">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image src={PROFILE.avatar} alt={PROFILE.name} fill className="object-cover" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xs leading-none tracking-tight text-foreground">{PROFILE.name}</span>
                  <span className="text-[9px] text-muted-foreground font-medium">{PROFILE.handle}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="flex items-center gap-2">
          <ModeToggle />
          <button 
            onClick={onToggleProfile}
            className="p-1.5 hover:bg-muted active:scale-95 rounded-xl border border-border/60 bg-background/50 transition-all flex items-center justify-center cursor-pointer"
            aria-label={isProfileExpanded ? "Collapse profile" : "Expand profile"}
          >
            <motion.div 
              animate={{ rotate: isProfileExpanded ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ChevronDown size={18} className="text-primary" />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Expanded Content */}
      <div className="md:hidden">
        <AnimatePresence>
          {isProfileExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-6 p-4 pb-8">
                <ProfileHeader />
                <Separator />
                <div className="flex flex-col gap-4">
                  <SocialLinks />
                  <SupportLinks />
                </div>
                <Separator />
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <ViewCounter />
                  <span>Visites</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center justify-between w-full overflow-x-hidden border-t md:border-t-0 border-border/40">
        <div className="flex flex-1 md:flex-none">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "group relative border-r border-border px-3 md:px-6 py-3 md:py-4 text-[10px] sm:text-xs md:text-sm font-normal transition-colors hover:bg-muted/50 flex items-center justify-center md:justify-start gap-1.5 md:gap-2 flex-1 md:flex-none md:min-w-40",
                  isActive 
                    ? "bg-background text-foreground border-t-2 border-t-primary md:border-t-0 md:bg-muted/20" 
                    : "bg-muted/30 text-muted-foreground hover:text-foreground border-t-2 border-t-transparent md:border-t-0"
                )}
              >
                <Icon className="h-3 md:h-3.5 w-3 md:w-3.5 opacity-70" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>
        
        <div className="hidden md:flex items-center px-4 border-l border-border h-full min-h-13">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
