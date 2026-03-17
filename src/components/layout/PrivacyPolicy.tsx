"use client";

import { BookOpen, Cookie, Mail, ExternalLink, Info, Server } from "lucide-react";

export function PrivacyPolicy({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-xs hover:text-foreground transition-colors underline underline-offset-2 decoration-muted-foreground/30 hover:decoration-foreground"
    >
      Politique de confidentialité
    </button>
  );
}

export function PrivacyPolicyContent() {
  return (
    <div className="space-y-24 pb-20 max-w-5xl mx-auto">
      <section className="relative px-4 pb-12 flex flex-col items-center justify-start">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
          <span
            className="font-black italic opacity-[0.03] select-none tracking-tighter leading-none text-foreground whitespace-nowrap"
            style={{ fontSize: 'clamp(10rem, 40vw, 28rem)' }}
          >
            Heyyy
          </span>
        </div>
        <div className="relative z-10 space-y-8 text-center max-w-3xl pt-6">
          <p className="text-2xl md:text-4xl leading-tight font-space-grotesk font-bold tracking-tighter">
            Heyyy, c&apos;est la partie un peu chiante que tout le monde <span className="underline decoration-primary/30 underline-offset-12 decoration-4">NE LIT PAS</span> mais c&apos;est obligatoire donc je parle cash
            <span className="block mt-4">┻━┻ ︵ヽ(`Д´)ヽ︵﻿ ┻━┻</span>
          </p>
          <p className="text-muted-foreground italic md:text-xl font-medium">
            Moi je m&apos;appelle Gaël « slouowze » Pilet, je suis développeur web, bon, encore en études mais j&apos;ai déjà des projets hein.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-4">
        {/* 1. Contact */}
        <article className="space-y-4">
          <div className="flex items-center gap-3 text-primary">
            <Mail className="w-6 h-6" />
            <h3 className="text-xl font-bold font-space-grotesk">Me contacter</h3>
          </div>
          <div className="space-y-2 text-muted-foreground leading-relaxed">
            <p>
              SI JAMAIS, au grand jamais, il te prend l&apos;envie de me contacter, soit tu vas sur mes réseaux OU ici :<br />(👉⁰▽⁰)👉 <a href="mailto:contact@slouowze.fr" className="text-primary hover:underline font-mono">contact@slouowze.fr</a>
            </p>
            <p className="text-xs italic opacity-70">D&apos;ailleurs ça se prononce [sluz] au cas où...</p>
          </div>
        </article>

        {/* 2. Analytics */}
        <article className="space-y-4">
          <div className="flex items-center gap-3 text-primary">
            <Info className="w-6 h-6" />
            <h3 className="text-xl font-bold font-space-grotesk">Ce que je regarde</h3>
          </div>
          <div className="space-y-2 text-muted-foreground leading-relaxed text-sm">
            <p>
              J&apos;utilise <span className="text-foreground font-medium">Google Analytics 4</span> pour savoir combien de personnes passent sur mon portfolio et ce qui les intéresse — les pages visitées, les clics, le scroll, le type d&apos;appareil. Rien de personnel, pas d&apos;IP complète, pas de nom, pas d&apos;email, pas de blabla ni de chichis
            </p>
          </div>
        </article>

        {/* 3. Cookies + Google */}
        <article className="space-y-4">
          <div className="flex items-center gap-3 text-primary">
            <Cookie className="w-6 h-6" />
            <h3 className="text-xl font-bold font-space-grotesk">Tu aimes les cookies ?</h3>
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed text-sm">
            <p>
              Bah je t&apos;en donne un, tiens (っ▀¯▀)つ 🍪
            </p>
            <p>
              Il y a un cookie anonyme sur ce site pour compter les visites. Il ne sait pas qui tu es, il ne te suit pas ailleurs, il ne sert qu&apos;à un compteur. La CNIL considère ce type de cookie comme exempté de consentement. C&apos;est pour ça que tu n&apos;as pas vu de bandeau cookies.
            </p>
            <div className="mt-6 bg-muted/30 p-4 rounded-2xl border border-border/50 space-y-3">
              <div className="flex items-center gap-2 text-primary">
                <span className="text-xs font-bold font-space-grotesk">Google par-ci, Google par-là...</span>
              </div>
              <p className="text-[10px] leading-tight opacity-80">
                GA4 et Google Tag Manager sont gérés par Google Ireland Ltd. 
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="ml-1 text-primary hover:underline">
                  Règles <ExternalLink className="w-2 h-2 inline" />
                </a>
              </p>
              <p className="text-[10px] leading-tight opacity-80">
                Données conservées <span className="text-foreground font-medium underline decoration-primary/30">14 mois</span> chez Google.
              </p>
            </div>
          </div>
        </article>

        {/* 4. Rights */}
        <article className="space-y-4">
          <div className="flex items-center gap-3 text-destructive">
            <BookOpen className="w-6 h-6" />
            <h3 className="text-xl font-bold font-space-grotesk">Tes droits</h3>
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed text-sm">
            <p>
              RGPD oblige — tu peux demander l&apos;accès, la rectification ou la suppression de tes données en faisant une demande à <a href="mailto:contact@slouowze.fr" className="text-primary hover:underline font-bold">contact@slouowze.fr</a> avec l&apos;objet : 
            </p>
            <span className="block p-3 bg-muted rounded-xl font-mono text-[10px] text-foreground border border-border/50">« Je veux mes données supprimées »</span>
            <p className="italic opacity-70 text-[11px]">
              Enfin, genre, il n&apos;y a aucune donnée sur toi comme tu as pu le lire ; si tu m&apos;envoies un mail, je pourrais t&apos;envoyer un gif ou une connerie du genre (∩｀-´)⊃━☆ﾟ.*･
            </p>
            <div className="pt-2 space-y-3">
              <p className="text-[11px] text-muted-foreground">
                Si vraiment tu ne veux pas que je sache que tu es passé par là (même anonymement), tu peux bloquer GA4 ici :
              </p>
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-1.5 bg-muted hover:bg-muted/80 rounded-full transition-colors text-[10px] font-bold border border-border/50">
                Bloquer GA4 <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </article>
      </div>

      <article className="space-y-4 px-4 text-center border-t border-border/50 pt-16">
        <div className="flex items-center justify-center gap-3 text-primary/50">
          <Server className="w-5 h-5" />
          <h3 className="text-sm font-bold uppercase tracking-widest">Hébergement</h3>
        </div>
        <p className="text-sm text-muted-foreground font-medium">
          Il est où le site ? Bah sous tes yeux ??? AHHHHH, mais où sur Terre ?<br/>
          <span className="text-foreground italic">Le site est hébergé sur un VPS que j&apos;ai configuré aux petits oignons -`ღ´-</span>
        </p>
      </article>
    </div>
  );
}

