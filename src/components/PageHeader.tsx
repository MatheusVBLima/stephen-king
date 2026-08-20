import type { ReactNode } from "react"

import { Breadcrumb } from "@/components/ui/breadcrumb"

interface PageHeaderProps {
  breadcrumb?: Array<{
    name: string
    href: string
    isCurrent?: boolean
  }>
  kicker?: string
  title: string
  description?: string
  children?: ReactNode
}

export function PageHeader({ breadcrumb, kicker, title, description, children }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-5 border-b border-border pb-8">
      {breadcrumb ? <Breadcrumb segments={breadcrumb} /> : null}
      {kicker ? (
        <p className="text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase">{kicker}</p>
      ) : null}
      <div className="flex flex-col gap-3">
        <h1 className="max-w-3xl text-pretty font-display text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-pretty text-sm leading-7 text-muted-foreground sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </header>
  )
}
