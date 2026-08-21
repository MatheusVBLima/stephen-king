import { cn } from "@/lib/utils";

interface SiteLogoProps {
  className?: string;
  title?: string;
}

export function SiteLogo({ className, title = "Arquivo Stephen King" }: SiteLogoProps) {
  return (
    <span
      className={cn(
        "flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.jpg" alt={title} width={36} height={40} className="h-[86%] w-auto object-contain" />
    </span>
  );
}
