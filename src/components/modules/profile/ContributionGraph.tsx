"use client";

import { motion } from "framer-motion";
import { subDays, eachDayOfInterval, format } from "date-fns";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";

export function ContributionGraph() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  
  // Generating fake contribution data
  const today = new Date();
  const startDate = subDays(today, 365); // Last year
  const days = eachDayOfInterval({ start: startDate, end: today });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Function to get random contribution level (0-4)
  // In a real app, this would come from an API
  const getLevel = (date: Date) => {
    // Deterministic random based on date string to avoid hydration mismatch if possible,
    // but here we use client-side only rendering via useEffect/mounted check.
    const seed = date.getDate() + date.getMonth() * 30;
    const rand = Math.sin(seed) * 10000;
    const val = Math.floor((rand - Math.floor(rand)) * 10); // 0-9
    
    if (val > 8) return 4; // High
    if (val > 6) return 3;
    if (val > 4) return 2;
    if (val > 2) return 1;
    return 0; // None
  };

  const getColor = (level: number) => {
    // GitHub-like greens or Purple theme? User asked for purple highlights.
    // Let's stick to purple/violet for the theme.
    if (level === 0) return "bg-muted"; // Empty
    
    // Light mode purple levels
    const lightColors = ["bg-violet-200", "bg-violet-400", "bg-violet-600", "bg-violet-800"];
    // Dark mode purple levels
    const darkColors = ["bg-violet-900/40", "bg-violet-700/60", "bg-violet-500/80", "bg-violet-400"];

    return theme === "dark" ? darkColors[level - 1] : lightColors[level - 1];
  };

  return (
    <Card className="p-4 border border-border bg-card/50">
      <h3 className="text-sm font-semibold mb-3">Contributions (Last Year)</h3>
      <div className="flex flex-wrap gap-1 justify-center md:justify-start overflow-hidden h-[120px] md:h-auto">
         {/* Simplified grid for mobile/desktop responsive - just a flex wrap of squares */}
         {/* For a true GitHub graph we need a grid by weeks, but a flex wrap is a good approximation for a "vibe" */}
         {days.slice(-160).map((day, i) => { // Limit to last ~5 months to fit nicely
            const level = getLevel(day);
            return (
              <motion.div
                key={day.toISOString()}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.002 }}
                className={`h-3 w-3 rounded-sm ${getColor(level)}`}
                title={`${format(day, "MMM d, yyyy")}: ${level === 0 ? "No" : level} contributions`}
              />
            );
         })}
      </div>
      <div className="mt-2 flex items-center justify-end gap-2 text-xs text-muted-foreground">
        <span>Less</span>
        <div className="h-3 w-3 rounded-sm bg-muted" />
        <div className={`h-3 w-3 rounded-sm ${theme === 'dark' ? "bg-violet-900/40" : "bg-violet-200"}`} />
        <div className={`h-3 w-3 rounded-sm ${theme === 'dark' ? "bg-violet-500/80" : "bg-violet-600"}`} />
        <div className={`h-3 w-3 rounded-sm ${theme === 'dark' ? "bg-violet-400" : "bg-violet-800"}`} />
        <span>More</span>
      </div>
    </Card>
  );
}
