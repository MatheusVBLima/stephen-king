"use client"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "motion/react"
import { Children, useState, type ReactNode } from "react"

export function HoverHighlightGrid({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const items = Children.toArray(children)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className={cn("grid grid-cols-1 gap-1 md:grid-cols-2 xl:grid-cols-3", className)}>
      {items.map((child, idx) => (
        <div
          key={idx}
          className="relative h-full p-2"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx ? (
              <motion.span
                className="absolute inset-0 block rounded-3xl bg-muted/80"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            ) : null}
          </AnimatePresence>
          <div className="relative z-20 h-full">{child}</div>
        </div>
      ))}
    </div>
  )
}

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string
    description: string
    link: string
  }[]
  className?: string
}) => {
  return (
    <HoverHighlightGrid className={className}>
      {items.map((item) => (
        <a key={item.link} href={item.link} className="block h-full">
          <HoverCard>
            <HoverCardTitle>{item.title}</HoverCardTitle>
            <HoverCardDescription>{item.description}</HoverCardDescription>
          </HoverCard>
        </a>
      ))}
    </HoverHighlightGrid>
  )
}

export const HoverCard = ({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) => {
  return (
    <div
      className={cn(
        "relative z-20 h-full w-full overflow-hidden rounded-2xl border border-border/60 bg-card p-4",
        className,
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}

export const HoverCardTitle = ({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) => {
  return <h4 className={cn("mt-4 font-bold tracking-wide text-foreground", className)}>{children}</h4>
}

export const HoverCardDescription = ({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) => {
  return (
    <p className={cn("mt-4 text-sm leading-relaxed tracking-wide text-muted-foreground", className)}>
      {children}
    </p>
  )
}
