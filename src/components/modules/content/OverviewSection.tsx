"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Separator } from "@/components/ui/Separator";
import { PROFILE, PROJECTS, EXPERIENCE, EDUCATION } from "@/lib/data";
import { ContributionGraph } from "../profile/ContributionGraph";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import Link from "next/link";
import { SiGithub } from "react-icons/si";

export function OverviewSection() {
  const pinnedProjects = PROJECTS.filter((p) => p.featured);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="space-y-8"
    >
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            README.md
          </h3>
        </div>
        <article className="border border-border rounded-lg p-6 bg-card/50">
          <h2 className="text-xl font-semibold mb-4">Hi, I&apos;m {PROFILE.name} 👋</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {PROFILE.bio}
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Currently open to work</Badge>
            <Badge variant="outline">Based in {PROFILE.location}</Badge>
          </div>
        </article>
      </div>

      <Separator className="my-8" />

      <div className="grid gap-8 md:grid-cols-2">
        <section>
          <h3 className="mb-4 text-lg font-semibold flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Parcours Pro
          </h3>
          <div className="space-y-4">
            {EXPERIENCE.map((job, index) => (
              <Card key={index} className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-base">{job.role}</CardTitle>
                    <span className="text-xs text-muted-foreground shrink-0">{job.period}</span>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">{job.company}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{job.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-4 text-lg font-semibold flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Parcours Scolaire
          </h3>
          <div className="space-y-4">
            {EDUCATION.map((edu, index) => (
              <Card key={index} className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-base">{edu.degree}</CardTitle>
                    <span className="text-xs text-muted-foreground shrink-0">{edu.period}</span>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">{edu.institution}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{edu.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <Separator className="my-8" />

      <section>
        <h3 className="mb-4 text-base font-semibold flex items-center gap-2">
          Pinned
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {pinnedProjects.map((project) => (
            <Link 
              key={project.title} 
              href={project.link}
              target="_blank"
              className="group block"
            >
              <div className="h-full rounded-md border border-border bg-background p-4 transition-all hover:border-primary/50 hover:shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-primary group-hover:underline">{project.title}</span>
                  <div className="text-muted-foreground">
                    <SiGithub className="h-4 w-4" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs text-muted-foreground flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-primary/20" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Separator className="my-8" />

      <div className="mb-0">
        <ContributionGraph />
      </div>
    </motion.div>
  );
}
