"use client";

import dynamic from 'next/dynamic';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card } from "@/components/ui/Card";

const ContributionGraph = dynamic(() => import('./ContributionGraph').then(mod => mod.ContributionGraph), {
  loading: () => <Card className="p-4 border border-border bg-card h-40 animate-pulse" />,
  ssr: false
});

export function LazyContributionGraph() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });
  const shouldLoad = isInView;

  return (
    <div ref={ref} className="min-h-40">
      {shouldLoad ? <ContributionGraph /> : <Card className="p-4 border border-border bg-card h-40" />}
    </div>
  );
}
