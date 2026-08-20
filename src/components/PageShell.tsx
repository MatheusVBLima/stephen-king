import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface PageShellProps {
  children: ReactNode
  className?: string
}

export function PageShell({ children, className }: PageShellProps) {
  return (
    <main className={cn("px-4 py-8 sm:px-6 md:py-10", className)}>
      <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-8">{children}</div>
    </main>
  )
}
