"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { PROFILE, EXPERIENCE, EDUCATION, RESUME_URL, Project } from "@/lib/data";
import { ContributionGraph } from "../profile/ContributionGraph";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Download } from "lucide-react";
import Link from "next/link";
import { SiGithub } from "react-icons/si";
import { useEffect, useState } from "react";

export function OverviewSection() {
  const [pinnedProjects, setPinnedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/pinned-repos');
        if (res.ok) {
           const data = await res.json();
           if (data && data.length > 0) {
             setPinnedProjects(data);
           } else {
             setPinnedProjects([]);
           }
        } else {
           setPinnedProjects([]);
        }
      } catch (e) {
        console.error("Failed to fetch pinned repos", e);
        setPinnedProjects([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="space-y-8"
    >
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <article className="border border-border rounded-2xl md:rounded-lg p-5 md:p-6 bg-card/50">
          <h2 className="text-xl font-semibold mb-4">Hey, moi c&apos;est {PROFILE.name}</h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 whitespace-pre-wrap">
            {PROFILE.about}
          </p>
          <div>
            <Button asChild size="sm" className="gap-2 rounded-full font-medium transition-all hover:scale-105 active:scale-95">
              <Link href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4" />
                <span>Télécharger mon CV</span>
              </Link>
            </Button>
          </div>
        </article>
      </div>

      <Separator className="my-8 md:my-10" />

      <div className="grid gap-6 md:grid-cols-2">
        <section>
          <h3 className="mb-4 text-base md:text-lg font-semibold flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Parcours Pro
          </h3>
          <div className="space-y-4">
            {EXPERIENCE.map((job, index) => (
              <Card key={index} className="h-full rounded-xl md:rounded-md">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-sm md:text-base">{job.role}</CardTitle>
                    <span className="text-[10px] md:text-xs text-muted-foreground shrink-0 mt-1">{job.period}</span>
                  </div>
                  <p className="text-xs md:text-sm font-medium text-muted-foreground">{job.company}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-4 md:line-clamp-none">{job.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-4 text-base md:text-lg font-semibold flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Parcours Scolaire
          </h3>
          <div className="space-y-4">
            {EDUCATION.map((edu, index) => (
              <Card key={index} className="h-full rounded-xl md:rounded-md">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-sm md:text-base">{edu.degree}</CardTitle>
                    <span className="text-[10px] md:text-xs text-muted-foreground shrink-0 mt-1">{edu.period}</span>
                  </div>
                  <p className="text-xs md:text-sm font-medium text-muted-foreground">{edu.institution}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-4 md:line-clamp-none">{edu.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <Separator className="my-8 md:my-10" />

      <section>
        <h3 className="mb-4 text-sm md:text-base font-semibold flex items-center gap-2">
          Projets Épinglés
        </h3>
        {loading ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {[1, 2].map((i) => (
              <div key={i} className="h-32 rounded-lg border border-border bg-background/50 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {pinnedProjects.map((project) => (
              <Link 
                key={project.title} 
                href={project.link}
                target="_blank"
                className="group block active:scale-[0.98] transition-all"
              >
              <div className="h-full flex flex-col rounded-xl md:rounded-md border border-border bg-background/50 p-4 transition-all hover:border-primary/50 hover:shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-primary group-hover:underline truncate">{project.title}</span>
                  <div className="text-muted-foreground opacity-50">
                    <SiGithub className="h-4 w-4" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3 md:line-clamp-none grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t border-border/30">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
            ))}
          </div>
        )}
      </section>

      <Separator className="my-8 md:my-10" />

      <div className="mb-0">
		<h3 className="mb-4 text-sm md:text-base font-semibold flex items-center gap-2">
          Mon activité récente
        </h3>
        <ContributionGraph />
      </div>
    </motion.div>
  );
}
