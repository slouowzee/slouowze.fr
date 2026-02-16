"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { PROFILE, EXPERIENCE, EDUCATION, RESUME_URL } from "@/lib/data";
import { ContributionGraph } from "../profile/ContributionGraph";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Download } from "lucide-react";
import Link from "next/link";
import { SiGithub } from "react-icons/si";
import { useEffect, useState } from "react";

// Defined locally to match the structure we want, extending the one from data.ts if needed
interface Project {
  title: string;
  description: string;
  link: string;
  tags: string[];
  featured?: boolean;
}

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
        <article className="border border-border rounded-lg p-6 bg-card/50">
          <h2 className="text-xl font-semibold mb-4">Hey, moi c&apos;est {PROFILE.name}</h2>
          <p className="text-muted-foreground leading-relaxed mb-6 whitespace-pre-wrap">
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
          Projets Épinglés
        </h3>
        {loading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2].map((i) => (
              <div key={i} className="h-32 rounded-md border border-border bg-background/50 animate-pulse" />
            ))}
          </div>
        ) : (
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
                <p className="text-muted-foreground mb-4">
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
        )}
      </section>

      <Separator className="my-8" />

      <div className="mb-0">
		<h3 className="mb-4 text-base font-semibold flex items-center gap-2">
          Mon activité récente
        </h3>
        <ContributionGraph />
      </div>
    </motion.div>
  );
}
