"use client";

import { motion, AnimatePresence } from "framer-motion";
import { format, parseISO, subDays, eachDayOfInterval, getDay } from "date-fns";
import { fr } from "date-fns/locale";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ApiResponse {
  total: {
    [key: string]: number;
  };
  contributions: ContributionDay[];
}

export function ContributionGraph() {
  const [data, setData] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://github-contributions-api.jogruber.de/v4/slouowzee?y=last');
        if (!res.ok) throw new Error('Failed to fetch');
        const json: ApiResponse = await res.json();
        setData(json.contributions);
      } catch (error) {
        console.error("Error loading contributions:", error);
        const today = new Date();
        const days = eachDayOfInterval({ start: subDays(today, 365), end: today });
        setData(days.map(d => ({ date: format(d, 'yyyy-MM-dd'), count: 0, level: 0 })));
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const getColor = (level: number) => {
    if (level === 0) return "bg-muted/40"; 
    // Levels 1-4: combining color intensity with opacity
    // Less activity = More transparent + Darker/Lighter base
    const lightColors = ["bg-violet-300/40", "bg-violet-400/60", "bg-violet-500/80", "bg-violet-600"];
    const darkColors = ["bg-violet-900/30", "bg-violet-800/50", "bg-violet-600/70", "bg-violet-400"];
    const index = Math.min(Math.max(level - 1, 0), 3);
    return theme === "dark" ? darkColors[index] : lightColors[index];
  };

  // Group data by weeks starting on SUNDAY
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];
  
  if (data.length > 0) {
    const firstDate = parseISO(data[0].date);
    const dayOfWeek = getDay(firstDate); // 0 = Sunday
    
    for (let i = 0; i < dayOfWeek; i++) {
        currentWeek.push({ date: "", count: 0, level: -1 });
    }
  }

  data.forEach((day) => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  
  if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
          currentWeek.push({ date: "", count: 0, level: -1 });
      }
      weeks.push(currentWeek);
  }

  // Month labels logic
  const monthLabels: { label: string; weekIndex: number }[] = [];
  let lastMonth = "";
  weeks.forEach((week, index) => {
    const firstDay = week.find(d => d.level !== -1);
    if (firstDay && firstDay.date) {
        let month = format(parseISO(firstDay.date), "MMM", { locale: fr });
        // Capitalize first letter
        month = month.charAt(0).toUpperCase() + month.slice(1);
        
        if (month !== lastMonth) {
            monthLabels.push({ label: month, weekIndex: index });
            lastMonth = month;
        }
    }
  });

  if (loading) {
    return (
      <Card className="p-4 border border-border bg-card/50 animate-pulse h-40" />
    );
  }

  return (
    <Card className="p-4 border border-border bg-card/50 overflow-hidden relative">
      <div className="overflow-x-auto pb-2 scrollbar-thin">
        <div className="min-w-175 w-full flex flex-col gap-2">
            
            {/* Header Row: Month labels aligned with grid columns */}
            <div className="flex gap-0.5 w-full">
                {/* Spacer for Day Labels column */}
                <div className="w-6 shrink-0" />
                
                {/* Month Labels Grid */}
                <div className="flex-1 flex gap-0.5 min-w-0">
                    {weeks.map((week, index) => {
                        const labelObj = monthLabels.find(m => m.weekIndex === index);
                        return (
                            <div key={index} className="flex-1 relative h-4">
                                {labelObj && (
                                    <span className="absolute left-0 bottom-0 text-[10px] text-muted-foreground truncate">
                                        {labelObj.label}
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Main Content Row: Day Labels + Grid */}
            <div className="flex gap-0.5 w-full items-stretch">
                {/* Day labels (Mon, Wed, Fri) - Sunday at top */}
                <div className="flex flex-col justify-between text-[9px] text-muted-foreground w-6 text-right pb-0.5 shrink-0">
                    <div className="flex-1"></div> {/* Sun */}
                    <div className="flex-1 flex items-center justify-end">Lun</div>
                    <div className="flex-1"></div>
                    <div className="flex-1 flex items-center justify-end">Mer</div>
                    <div className="flex-1"></div>
                    <div className="flex-1 flex items-center justify-end">Ven</div>
                    <div className="flex-1"></div>
                </div>

                {/* Grid */}
                <div className="flex flex-1 gap-0.5 w-full min-w-0">
                    {weeks.map((week, wIndex) => (
                        <div key={wIndex} className="flex flex-col gap-0.5 flex-1 min-w-0">
                            {week.map((day, dIndex) => {
                                if (day.level === -1) return <div key={dIndex} className="w-full aspect-square" />;
                                return (
                                    <div 
                                        key={day.date}
                                        className="relative w-full aspect-square"
                                        onMouseEnter={() => setHoveredDay(day)}
                                        onMouseLeave={() => setHoveredDay(null)}
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: (wIndex * 7 + dIndex) * 0.0005 }}
                                            className={`w-full h-full rounded-xs cursor-pointer ${getColor(day.level)} hover:ring-1 hover:ring-primary transition-shadow`}
                                        />
                                        
                                        <AnimatePresence>
                                            {hoveredDay === day && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 5 }}
                                                    animate={{ opacity: 1, y: -5 }}
                                                    exit={{ opacity: 0 }}
                                                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black px-2 py-1 rounded text-[10px] whitespace-nowrap shadow-xl pointer-events-none"
                                                >
                                                    <span className="font-semibold">{day.count === 0 ? 'Aucune' : day.count} contribution{day.count > 1 ? 's' : ''}</span>
                                                    {' '}le {format(parseISO(day.date), "d MMMM", { locale: fr })}
                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-900 dark:border-t-zinc-100" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-2 flex items-center justify-end">
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <span className="mr-1">Moins</span>
                    <div className="w-2.5 h-2.5 rounded-xs bg-muted/40" />
                    <div className={`w-2.5 h-2.5 rounded-xs ${theme === 'dark' ? "bg-violet-900/30" : "bg-violet-300/40"}`} />
                    <div className={`w-2.5 h-2.5 rounded-xs ${theme === 'dark' ? "bg-violet-800/50" : "bg-violet-400/60"}`} />
                    <div className={`w-2.5 h-2.5 rounded-xs ${theme === 'dark' ? "bg-violet-600/70" : "bg-violet-500/80"}`} />
                    <div className={`w-2.5 h-2.5 rounded-xs ${theme === 'dark' ? "bg-violet-400" : "bg-violet-600"}`} />
                    <span className="ml-1">Plus</span>
                </div>
            </div>
        </div>
      </div>
    </Card>
  );
}
