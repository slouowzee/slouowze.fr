"use client";

import { motion } from "framer-motion";
import { SKILLS } from "@/lib/data";
import { Terminal, Globe, Code2, Cloud, Zap, Users, Layout, Server, Boxes } from "lucide-react";
import Image from "next/image";
import { 
  SiTypescript, SiJavascript, SiReact, SiNextdotjs, 
  SiTailwindcss, SiVuedotjs, SiPython, SiPostgresql, 
  SiDocker, SiGit, SiFigma, SiNodedotjs, 
  SiPhp, SiLaravel, SiSymfony,
  SiMariadb, SiCanva, SiCplusplus,
  SiBun, SiExpo, SiExpress, SiHtml5, SiCss3,
  SiVercel, SiFirebase, SiBootstrap, SiSupabase
} from "react-icons/si";
import { TbBrandVscode, TbBrandGolang, TbShip } from "react-icons/tb";

// Helper function to map skills to brand icons
const getTechIcon = (skill: string) => {
  const s = skill.toLowerCase();
  
  // Cloud & Infra
  if (s === "vps") return <Server className="h-4 w-4 text-blue-400" />;
  if (s === "dokploy") return <TbShip className="h-4 w-4 text-cyan-400" />;
  if (s === "vercel") return <SiVercel className="text-foreground" />;
  if (s === "firebase") return <SiFirebase className="text-[#FFCA28]" />;

  // Soft Skills
  if (s.includes("architecture")) return <Boxes className="h-4 w-4 text-purple-400" />;
  if (s.includes("design")) return <Layout className="h-4 w-4 text-pink-400" />;
  if (s.includes("agile")) return <Zap className="h-4 w-4 text-yellow-400" />;
  if (s.includes("teamwork")) return <Users className="h-4 w-4 text-green-400" />;

  if (s.includes("typescript")) return <SiTypescript className="text-[#3178C6]" />;
  if (s.includes("javascript")) return <SiJavascript className="text-[#F7DF1E]" />;
  if (s.includes("html")) return <SiHtml5 className="text-[#E34F26]" />;
  if (s.includes("css")) return <SiCss3 className="text-[#1572B6]" />;
  if (s.includes("next")) return <SiNextdotjs className="text-foreground" />;
  if (s.includes("react")) return <SiReact className="text-[#61DAFB]" />;
  if (s.includes("tailwind")) return <SiTailwindcss className="text-[#06B6D4]" />;
  if (s.includes("bootstrap")) return <SiBootstrap className="text-[#7952B3]" />;
  if (s.includes("vue")) return <SiVuedotjs className="text-[#4FC08D]" />;
  if (s.includes("python")) return <SiPython className="text-[#3776AB]" />;
  if (s.includes("postgresql") || s.includes("sql")) return <SiPostgresql className="text-[#4169E1]" />;
  if (s.includes("supabase")) return <SiSupabase className="text-[#3ECF8E]" />;
  if (s.includes("mariadb")) return <SiMariadb className="text-[#003545]" />;
  if (s.includes("php")) return <SiPhp className="text-[#777BB4]" />;
  if (s.includes("go")) return <TbBrandGolang className="text-[#00ADD8]" />;
  if (s.includes("c#")) return <Image src="/csharp.svg" alt="C#" width={20} height={20} className="w-5 h-5" />;
  if (s.includes("bun")) return <SiBun className="text-[#fbf0df]" />;
  if (s.includes("express")) return <SiExpress className="text-foreground" />;
  if (s.includes("expo")) return <SiExpo className="text-foreground" />;
  if (s.includes("c++") || (s === "c" && !s.includes("#"))) return <SiCplusplus className="text-[#00599C]" />;
  if (s.includes("laravel")) return <SiLaravel className="text-[#FF2D20]" />;
  if (s.includes("symfony")) return <SiSymfony className="text-foreground" />;
  if (s.includes("docker")) return <SiDocker className="text-[#2496ED]" />;
  if (s.includes("git")) return <SiGit className="text-[#F05032]" />;
  if (s.includes("figma")) return <SiFigma className="text-[#F24E1E]" />;
  if (s.includes("canva")) return <SiCanva className="text-[#00C4CC]" />;
  if (s.includes("node")) return <SiNodedotjs className="text-[#339933]" />;
  if (s.includes("vsc") || s.includes("code")) return <TbBrandVscode className="text-[#007ACC]" />;
  
  return <Terminal className="h-4 w-4 opacity-50" />;
};

export function SkillsSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight">Tech Stack</h2>
        <p className="text-sm text-muted-foreground">Les outils et technologies que j&apos;utilise au quotidien.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Frameworks - Big Bento Box */}
        <div className="md:col-span-8 p-6 rounded-3xl border border-border bg-card/30 flex flex-col justify-between overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none transform rotate-12">
            <Code2 size={120} />
          </div>
          
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-2 block">Frameworks & Librairies</span>
            <h3 className="text-xl font-bold mb-6">L&apos;ossature de mes projets</h3>
            <div className="flex flex-wrap gap-3">
              {SKILLS.find(s => s.category === "Frameworks")?.items.map(skill => (
                <div key={skill} className="flex items-center gap-2 bg-background/50 border border-border/50 px-3 py-2 rounded-xl text-sm font-medium hover:scale-105 transition-transform">
                  {getTechIcon(skill)}
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Languages - Small Bento Box */}
        <div className="md:col-span-4 md:row-span-2 p-6 rounded-3xl border border-border bg-card/30 flex flex-col justify-between overflow-hidden relative">
          <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none transform -rotate-12">
            <Globe size={140} />
          </div>

          <div className="relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-2 block">Languages</span>
            <h3 className="text-lg font-bold mb-4">La base</h3>
            <div className="grid grid-cols-2 gap-3">
              {SKILLS.find(s => s.category === "Languages")?.items.map(skill => (
                <div key={skill} className="flex flex-col gap-2 p-3 rounded-2xl bg-background/40 border border-border/50 hover:border-primary/30 transition-colors group">
                  <div className="text-xl group-hover:scale-110 transition-transform duration-300">
                    {getTechIcon(skill)}
                  </div>
                  <span className="text-xs font-semibold opacity-70 group-hover:opacity-100 transition-opacity truncate">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cloud & Infra */}
        <div className="md:col-span-4 p-6 rounded-3xl border border-border bg-card/30 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none">
            <Cloud size={100} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-2 block">Infrastructure</span>
          <h3 className="text-lg font-bold mb-4">Cloud & Hosting</h3>
          <div className="flex flex-wrap gap-2">
             {SKILLS.find(s => s.category === "Cloud")?.items.map(skill => (
                <div key={skill} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background/50 border border-border/50 text-[11px] font-semibold">
                  {getTechIcon(skill)}
                  {skill}
                </div>
              ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div className="md:col-span-4 p-6 rounded-3xl border border-border bg-card/30 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none">
            <Users size={100} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-2 block">Expérience</span>
          <h3 className="text-lg font-bold mb-4">Soft Skills</h3>
          <div className="flex flex-wrap gap-2">
             {SKILLS.find(s => s.category === "Soft Skills")?.items.map(skill => (
                <div key={skill} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background/50 border border-border/50 text-[11px] font-semibold">
                  {getTechIcon(skill)}
                  {skill}
                </div>
              ))}
          </div>
        </div>

        {/* Tools & Workflow - Wide Bento Box */}
        <div className="md:col-span-12 p-6 rounded-3xl border border-border bg-card/30">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="md:max-w-50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-2 block">Écosystème</span>
                <h3 className="text-lg font-bold">Outils & Workflow</h3>
                <p className="text-xs text-muted-foreground mt-2">Pour des cycles de développement rapides et fiables.</p>
              </div>
              
              <div className="flex flex-wrap gap-6 justify-center">
                {SKILLS.find(s => s.category === "Tools")?.items.map(skill => (
                  <div key={skill} className="flex flex-col items-center gap-2 group">
                    <div className="w-12 h-12 rounded-2xl bg-background/40 border border-border/50 flex items-center justify-center text-xl group-hover:bg-primary/10 group-hover:border-primary/30 transition-all shadow-sm">
                      {getTechIcon(skill)}
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">{skill}</span>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
