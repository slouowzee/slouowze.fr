import { SiKofi } from "react-icons/si";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SUPPORT } from "@/lib/data";

export function SupportLinks() {
  if (!SUPPORT.kofi) return null;

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="w-full justify-start gap-2 px-2 font-normal text-foreground hover:bg-muted/50 transition-colors" 
      asChild
    >
      <Link href={SUPPORT.kofi} target="_blank" rel="noopener noreferrer">
        <SiKofi className="h-4 w-4 text-[#FF5E5B]" />
        <span>Buy me a Ko-fi</span>
      </Link>
    </Button>
  );
}
