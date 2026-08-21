import { cn } from "@/lib/utils";

interface SiteLogoProps {
  className?: string;
  title?: string;
}

export function SiteLogo({ className, title = "Arquivo Stephen King" }: SiteLogoProps) {
  return (
    <svg
      role="img"
      aria-label={title}
      viewBox="0 0 32 32"
      className={cn("size-8 shrink-0", className)}
    >
      <title>{title}</title>
      <rect x="1.25" y="1.25" width="29.5" height="29.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="6.5" y="12" width="5" height="13.5" fill="currentColor" />
      <rect x="13.5" y="6.5" width="5" height="19" fill="currentColor" />
      <rect x="20.5" y="14.5" width="5" height="11" fill="currentColor" />
    </svg>
  );
}
