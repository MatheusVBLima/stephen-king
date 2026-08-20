"use client"

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

export interface TimelineEntry {
  title: string
  content: ReactNode
}

export const Timeline = ({ data, className }: { data: TimelineEntry[]; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const updateHeight = () => setHeight(node.getBoundingClientRect().height)
    updateHeight()

    const observer = new ResizeObserver(updateHeight)
    observer.observe(node)
    return () => observer.disconnect()
  }, [data])

  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <div className={cn("w-full", className)} ref={containerRef}>
      <div ref={ref} className="relative mx-auto max-w-7xl pb-20">
        {data.map((item, index) => (
          <div key={`${item.title}-${index}`} className="flex justify-start pt-10 md:gap-10 md:pt-16">
            <div className="sticky top-28 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div className="absolute left-3 flex size-10 items-center justify-center rounded-full bg-background md:left-3">
                <div className="size-4 rounded-full border border-border bg-muted p-2" />
              </div>
              <h3 className="hidden text-xl font-bold text-muted-foreground md:block md:pl-20 md:text-5xl">
                {item.title}
              </h3>
            </div>

            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <h3 className="mb-4 text-left text-2xl font-bold text-muted-foreground md:hidden">{item.title}</h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{ height: `${height}px` }}
          className="absolute left-8 top-0 w-px overflow-hidden bg-border md:left-8"
        >
          <motion.div
            style={{
              height: prefersReducedMotion ? height : heightTransform,
              opacity: prefersReducedMotion ? 1 : opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-px bg-foreground"
          />
        </div>
      </div>
    </div>
  )
}
