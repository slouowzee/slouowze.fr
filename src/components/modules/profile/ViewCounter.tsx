"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export function ViewCounter() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    async function updateViews() {
      try {
        const res = await fetch('/api/views', { method: 'POST' });
        if (res.ok) {
          const data = await res.json();
          setViews(data.count);
        }
      } catch (error) {
        console.error("Failed to fetch views", error);
        setViews(0);
      }
    }
    
    updateViews();
  }, []);

  if (views === null) {
    return <div className="h-4 w-12 animate-pulse rounded bg-muted" />;
  }

  return (
    <div className="flex items-center gap-1 text-xs text-muted-foreground transition-all hover:text-primary" title="Unique Profile Views">
      <Eye className="h-3 w-3" />
      <span>{views.toLocaleString()}</span>
    </div>
  );
}
