"use client";

import { motion, AnimatePresence } from "framer-motion";
import { format, parseISO, subDays, eachDayOfInterval, getDay } from "date-fns";
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
    const lightColors = ["bg-violet-200", "bg-violet-400", "bg-violet-600", "bg-violet-800"];
    const darkColors = ["bg-violet-900/40", "bg-violet-700/60", "bg-violet-500/80", "bg-violet-400"];
    return theme === "dark" ? darkColors[Math.min(level, 3)] : lightColors[Math.min(level, 3)];
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
        const month = format(parseISO(firstDay.date), "MMM");
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
        <div className="min-w-175">
            {/* Month labels */}
            <div className="flex text-[10px] text-muted-foreground mb-2 relative h-4 ml-8">
                {monthLabels.map((m, i) => (
                    <span 
                        key={i} 
                        style={{ left: `${m.weekIndex * 13}px`, position: "absolute" }}
                    >
                        {m.label}
                    </span>
                ))}
            </div>

            <div className="flex gap-0.75">
                {/* Day labels (Mon, Wed, Fri) - Sunday at top */}
                <div className="flex flex-col gap-0.75 text-[9px] text-muted-foreground mr-2 w-6 text-right pt-px">
                    <div className="h-2.5"></div> {/* Sun */}
                    <div className="h-2.5 leading-2.5">Mon</div>
                    <div className="h-2.5"></div>
                    <div className="h-2.5 leading-2.5">Wed</div>
                    <div className="h-2.5"></div>
                    <div className="h-2.5 leading-2.5">Fri</div>
                    <div className="h-2.5"></div>
                </div>

                {/* Grid */}
                <div className="flex gap-0.75">
                    {weeks.map((week, wIndex) => (
                        <div key={wIndex} className="flex flex-col gap-0.75">
                            {week.map((day, dIndex) => {
                                if (day.level === -1) return <div key={dIndex} className="w-2.5 h-2.5" />;
                                return (
                                    <div 
                                        key={day.date}
                                        className="relative"
                                        onMouseEnter={() => setHoveredDay(day)}
                                        onMouseLeave={() => setHoveredDay(null)}
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: (wIndex * 7 + dIndex) * 0.0005 }}
                                            className={`w-2.5 h-2.5 rounded-xs cursor-pointer ${getColor(day.level)} hover:ring-1 hover:ring-primary transition-shadow`}
                                        />
                                        
                                        <AnimatePresence>
                                            {hoveredDay === day && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 5 }}
                                                    animate={{ opacity: 1, y: -5 }}
                                                    exit={{ opacity: 0 }}
                                                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black px-2 py-1 rounded text-[10px] whitespace-nowrap shadow-xl pointer-events-none"
                                                >
                                                    <span className="font-semibold">{day.count === 0 ? 'No' : day.count} contributions</span>
                                                    {' '}on {format(parseISO(day.date), "MMMM do")}
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

            <div className="mt-4 flex items-center justify-between">
                <a href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile" target="_blank" className="text-[10px] text-muted-foreground hover:text-primary underline-offset-2 hover:underline">
                    Learn how we count contributions
                </a>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <span className="mr-1">Less</span>
                    <div className="w-2.5 h-2.5 rounded-xs bg-muted/40" />
                    <div className={`w-2.5 h-2.5 rounded-xs ${theme === 'dark' ? "bg-violet-900/40" : "bg-violet-200"}`} />
                    <div className={`w-2.5 h-2.5 rounded-xs ${theme === 'dark' ? "bg-violet-500/80" : "bg-violet-600"}`} />
                    <div className={`w-2.5 h-2.5 rounded-xs ${theme === 'dark' ? "bg-violet-400" : "bg-violet-800"}`} />
                    <span className="ml-1">More</span>
                </div>
            </div>
        </div>
      </div>
    </Card>
  );
}
