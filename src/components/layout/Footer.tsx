import { PROFILE } from "@/lib/data";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="text-sm text-muted-foreground">
      <p>&copy; {currentYear} {PROFILE.name}. All rights reserved.</p>
    </footer>
  );
}
