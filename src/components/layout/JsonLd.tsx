import { PROFILE, SOCIALS } from "@/lib/data";

export function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": PROFILE.name,
      "alternateName": PROFILE.handle,
      "description": PROFILE.bio,
      "image": `https://slouowze.fr${PROFILE.avatar}`,
      "jobTitle": PROFILE.role,
      "url": "https://slouowze.fr",
      "sameAs": SOCIALS.map((social) => social.url),
      "knowsAbout": ["Web Development", "React", "Next.js", "Laravel", "TypeScript"]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
