"use client";

import { motion } from "framer-motion";
import { SERVICES } from "@/lib/data";
import { Star, Loader2, ArrowDownAZ, ArrowUpAZ, Clock, ChevronDown, ArrowUp, ArrowDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useEffect, useState, useMemo } from "react";
import { SiGithub } from "react-icons/si";
import { cn } from "@/lib/utils";

interface Project {
  title: string;
  description: string;
  link: string;
  tags: string[];
  featured?: boolean;
  stars?: number;
  date?: string; // CreatedAt
  lastActivity?: string; // PushedAt
}

type SortOption = "date" | "name" | "stars" | "activity";
type SortOrder = "asc" | "desc" | null;

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption | null>("activity");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

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

  // Compute unique tech tags
  const allTechs = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach(p => p.tags.forEach(t => techs.add(t)));
    return Array.from(techs).sort();
  }, [projects]);

  // Filter and Sort
  const filteredProjects = useMemo(() => {
    let result = [...projects];

    // Filter by Tech
    if (selectedTech) {
        result = result.filter(p => p.tags.includes(selectedTech));
    }

    // Sort
    if (sortBy && sortOrder) {
      result.sort((a, b) => {
        let cmp = 0;
        if (sortBy === "date") {
            const dateA = new Date(a.date || 0).getTime();
            const dateB = new Date(b.date || 0).getTime();
            cmp = dateA - dateB;
        } else if (sortBy === "activity") {
            const dateA = new Date(a.lastActivity || 0).getTime();
            const dateB = new Date(b.lastActivity || 0).getTime();
            cmp = dateA - dateB;
        } else if (sortBy === "name") {
            cmp = a.title.localeCompare(b.title);
        } else if (sortBy === "stars") {
            cmp = (a.stars || 0) - (b.stars || 0);
        }
        
        return sortOrder === "asc" ? cmp : -cmp;
      });
    }

    return result;
  }, [projects, sortBy, sortOrder, selectedTech]);

  const toggleSort = (option: SortOption) => {
    if (sortBy === option) {
      if (sortOrder === "desc") setSortOrder("asc");
      else if (sortOrder === "asc") {
        setSortBy("activity");
        setSortOrder("desc");
      }
    } else {
      setSortBy(option);
      setSortOrder("desc");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="space-y-12"
    >
      <section>
        <div className="flex flex-col gap-4 mb-6 border-b border-border pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">
                    Projets
                </h2>
                {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
            </div>
            
            {!loading && (
             <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-muted/30 p-1.5 rounded-lg border border-border/50">
                <span className="text-xs font-medium text-muted-foreground px-1 hidden sm:inline-block">Filtres :</span>
                
                {/* Sort Options */}
                <div className="flex items-center gap-1">
                    <button 
                         onClick={() => toggleSort("stars")}
                         className={cn(
                             "flex items-center gap-1 px-3 py-1.5 rounded-md transition-all text-xs font-medium border border-transparent", 
                             sortBy === "stars" 
                               ? "bg-background text-foreground shadow-sm border-border" 
                               : "hover:bg-background/50 hover:text-foreground"
                         )}
                         title="Trier par étoiles"
                    >
                        <Star className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Stars</span>
                        {sortBy === "stars" && (sortOrder === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
                    </button>
                    <button 
                         onClick={() => toggleSort("date")}
                         className={cn(
                             "flex items-center gap-1 px-3 py-1.5 rounded-md transition-all text-xs font-medium border border-transparent", 
                             sortBy === "date" 
                               ? "bg-background text-foreground shadow-sm border-border" 
                               : "hover:bg-background/50 hover:text-foreground"
                         )}
                         title="Trier par date de création"
                    >
                        <Clock className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Création</span>
                        {sortBy === "date" && (sortOrder === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
                    </button>
                    <button 
                         onClick={() => toggleSort("name")}
                         className={cn(
                             "flex items-center gap-1 px-3 py-1.5 rounded-md transition-all text-xs font-medium border border-transparent", 
                             sortBy === "name" 
                               ? "bg-background text-foreground shadow-sm border-border" 
                               : "hover:bg-background/50 hover:text-foreground"
                         )}
                         title="Trier par nom"
                    >
                        <ArrowDownAZ className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Nom</span>
                        {sortBy === "name" && (sortOrder === "asc" ? <ArrowUpAZ className="h-3 w-3" /> : <ArrowDownAZ className="h-3 w-3" />)}
                    </button>
                </div>

                <div className="h-4 w-px bg-border hidden sm:block" />

                {/* Tech Filters - Dropdown */}
                <div className="relative w-full sm:w-48">
                    <select 
                        value={selectedTech || ""} 
                        onChange={(e) => setSelectedTech(e.target.value || null)}
                        className="w-full appearance-none bg-background border border-border/50 hover:border-border rounded-md py-1.5 pl-3 pr-8 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer h-8"
                    >
                        <option value="">Toutes les technologies</option>
                        {allTechs.map(tech => (
                            <option key={tech} value={tech}>{tech}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                </div>
             </div>
            )}
          </div>
        </div>
        
        <div className="divide-y divide-border">
          {filteredProjects.map((project, index) => (
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
                      <SiGithub className="h-3 w-3" /> Visiter
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
