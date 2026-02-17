"use client";

import { motion } from "framer-motion";
import { Star, Loader2, ArrowDownAZ, ArrowUpAZ, Clock, ChevronDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useEffect, useState, useMemo } from "react";
import { SiGithub } from "react-icons/si";
import { cn } from "@/lib/utils";
import { Project } from "@/lib/data";

type SortOption = "date" | "name" | "stars" | "activity";
type SortOrder = "asc" | "desc" | null;

const ITEMS_PER_PAGE = 8;

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption | null>("activity");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

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

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy, sortOrder, selectedTech]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = useMemo(() => {
     const start = (currentPage - 1) * ITEMS_PER_PAGE;
     return filteredProjects.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

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
        
        <div className="grid gap-4 md:grid-cols-2">
          {paginatedProjects.map((project, index) => (
            <motion.div
              key={project.title + index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="h-full"
            >
              <Link 
                href={project.link} 
                target="_blank" 
                className="group block h-full active:scale-[0.98] transition-all"
              >
                <div className="h-full flex flex-col rounded-md border border-border bg-background p-4 transition-all hover:border-primary/50 hover:shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-primary group-hover:underline truncate max-w-35 sm:max-w-none">
                        {project.title}
                      </span>
                      {project.featured && <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 shrink-0" />}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground shrink-0">
                      {(project.stars ?? 0) > 0 && (
                        <div className="flex items-center gap-1 text-xs">
                          <Star className="h-3.5 w-3.5" />
                          <span>{project.stars}</span>
                        </div>
                      )}
                      <SiGithub className="h-4 w-4" />
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4 grow">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span 
                        key={tag} 
                        className="text-[10px] bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded-full border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                       <span className="text-[10px] text-muted-foreground self-center">
                         +{project.tags.length - 3}
                       </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {totalPages > 1 && (
          <div className="flex items-center justify-end gap-2 mt-4 pb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0 hover:bg-transparent text-muted-foreground hover:text-foreground disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
              title="Page précédente"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Précédent</span>
            </Button>
            
            <Button
              variant="ghost" 
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
               className="h-8 w-8 p-0 hover:bg-transparent text-muted-foreground hover:text-foreground disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
               title="Page suivante"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Suivant</span>
            </Button>
          </div>
        )}
      </section>
    </motion.div>
  );
}
