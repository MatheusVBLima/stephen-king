import type { ReactNode } from "react"
import Image from "next/image"

interface DetailHeroProps {
  badges?: ReactNode
  title: string
  description?: ReactNode
  cover?: { src: string; alt: string } | null
  children?: ReactNode
}

export function DetailHero({ badges, title, description, cover, children }: DetailHeroProps) {
  return (
    <section className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_20rem] xl:items-start">
      <div className="flex min-w-0 flex-col gap-4">
        {badges ? <div className="flex flex-wrap items-center gap-2">{badges}</div> : null}
        <h1 className="max-w-3xl text-pretty font-display text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        {description ? (
          <div className="max-w-2xl text-pretty text-sm leading-7 text-muted-foreground sm:text-base">
            {description}
          </div>
        ) : null}
        {children}
      </div>
      {cover ? (
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-border bg-muted xl:h-[420px] xl:aspect-auto">
          <Image src={cover.src} alt={cover.alt} fill className="object-cover" sizes="320px" priority />
        </div>
      ) : null}
    </section>
  )
}
