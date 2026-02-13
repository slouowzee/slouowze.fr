"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { SKILLS } from "@/lib/data";
import { Terminal, Database, Globe, Figma, Github as GithubIcon, Layers, Code2 } from "lucide-react";

// Helper function to map skills to icons
const getIcon = (skill: string) => {
  const s = skill.toLowerCase();
  if (s.includes("react") || s.includes("next") || s.includes("vue") || s.includes("web") || s.includes("html") || s.includes("css")) return Globe;
  if (s.includes("sql") || s.includes("data") || s.includes("mongo") || s.includes("postgre")) return Database;
  if (s.includes("design") || s.includes("figma") || s.includes("ui")) return Figma;
  if (s.includes("git") || s.includes("docker")) return GithubIcon;
  if (s.includes("node") || s.includes("python") || s.includes("java") || s.includes("script")) return Code2;
  return Terminal;
};

export function SkillsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Compétences & Stack Technique</h2>
        <p className="text-muted-foreground mt-1">
          Mon expertise technique à travers l&apos;ensemble du développement.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {SKILLS.map((skillGroup, index) => (
          <motion.div
            key={skillGroup.category}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full border-border bg-card/50 hover:border-primary/50 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-primary flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  {skillGroup.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill) => {
                  const Icon = getIcon(skill);
                  return (
                    <Badge key={skill} variant="secondary" className="bg-background hover:bg-primary hover:text-primary-foreground transition-colors cursor-default py-1.5 px-3 border border-border">
                      <Icon className="mr-2 h-3.5 w-3.5 opacity-70" />
                      {skill}
                    </Badge>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
