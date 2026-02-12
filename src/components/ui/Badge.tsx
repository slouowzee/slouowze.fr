import * as React from "react";
import { cn } from "@/lib/utils";

// Note: I don't have CVA installed yet, but I can do a simpler version or install it.
// The user asked for "architecture strict" but I didn't plan for CVA explicitly.
// I'll stick to simple tailwind classes for now to avoid installing more deps if not strictly needed,
// but actually CVA is great for maintainability.
// Let's stick to standard `clsx` usage as planned.

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-transparent bg-muted text-muted-foreground hover:bg-muted/80",
    outline: "text-foreground border-border hover:bg-muted/50",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
