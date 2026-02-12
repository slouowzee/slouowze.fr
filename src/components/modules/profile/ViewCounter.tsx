"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export function ViewCounter() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    // Check if we have a count in localStorage
    const savedViews = localStorage.getItem("profile_views");
    const currentViews = savedViews ? parseInt(savedViews, 10) : 0; // Start at 0
    
    // Simulate API increment
    // In production, you'd fetch('/api/views', { method: 'POST' })
    const newViews = currentViews + 1;
    localStorage.setItem("profile_views", newViews.toString());
    setViews(newViews);
  }, []);

  if (views === null) {
    return <div className="h-4 w-12 animate-pulse rounded bg-muted" />;
  }

  return (
    <div className="flex items-center gap-1 text-xs text-muted-foreground transition-all hover:text-primary" title="Profile Views">
      <Eye className="h-3 w-3" />
      <span>{views.toLocaleString()}</span>
    </div>
  );
}
