"use client";

import { motion } from "framer-motion";
import { SERVICES } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";
import { Star, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { SiGithub } from "react-icons/si";

interface Project {
  title: string;
  description: string;
  link: string;
  tags: string[];
  featured?: boolean;
  stars?: number;
}

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch('/api/repos');
        if (res.ok) {
           const data = await res.json();
           setProjects(data);
        } else {
           setProjects([]);
        }
      } catch (e) {
        console.error("Failed to fetch repos", e);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="space-y-12"
    >
      <section>
        <div className="flex items-center justify-between mb-6 border-b border-border pb-2">
          <h2 className="text-xl font-semibold">
            Projects
          </h2>
          {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
        </div>
        
        <div className="divide-y divide-border">
          {projects.map((project, index) => (
            <motion.div
              key={project.title + index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="py-6 first:pt-0"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Link href={project.link} target="_blank" className="text-lg font-semibold text-primary hover:underline">
                      {project.title}
                    </Link>
                    {project.featured && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                  </div>
                  <p className="text-muted-foreground max-w-2xl">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    {project.tags.map((tag) => (
                      <div key={tag} className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="shrink-0">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={project.link} target="_blank" className="gap-2">
                      <SiGithub className="h-3 w-3" /> Visit
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-xl font-semibold border-b border-border pb-2">
          Services
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="rounded-lg border border-border p-6 hover:border-primary/50 transition-colors bg-card/30"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold">{service.title}</h3>
                  {service.price && (
                    <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                      {service.price}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
