"use client";

import { motion } from "framer-motion";
import { PROJECTS, SERVICES } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";
import { ExternalLink, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function ProjectsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="space-y-12"
    >
      <section>
        <h2 className="mb-6 text-xl font-semibold border-b border-border pb-2">
          Projects
        </h2>
        <div className="divide-y divide-border">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="py-6 first:pt-0"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Link href={project.link} target="_blank" className="text-lg font-semibold text-primary hover:underline">
                      {project.title}
                    </Link>
                    <Badge variant="outline" className="text-[10px] font-normal uppercase tracking-wide">
                      Public
                    </Badge>
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
                      <ExternalLink className="h-3 w-3" /> Visit
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
