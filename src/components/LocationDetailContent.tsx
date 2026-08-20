import Link from "next/link"

import { DetailHero } from "@/components/DetailHero"
import { EditorialProse } from "@/components/EditorialProse"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getRelatedWorksForLocation } from "@/lib/skbr-editorial-policy"
import type { CityEditorial, FictionalLocation } from "@/lib/types"

interface LocationDetailContentProps {
  location: FictionalLocation
  editorial: CityEditorial | null
}

export function LocationDetailContent({ location, editorial }: LocationDetailContentProps) {
  const cover = editorial?.images[0]?.src || location.imageUrl
  const summary = editorial?.summary || location.description
  const sections = editorial?.sections || []
  const books = editorial?.relatedWorks.length
    ? editorial.relatedWorks
    : getRelatedWorksForLocation(location.id)

  return (
    <div className="flex flex-col gap-8">
      <DetailHero
        badges={
          <>
            <Badge variant="secondary">Cidade</Badge>
            <Badge variant="outline">Primeira aparição: {location.firstAppearance}</Badge>
          </>
        }
        title={location.name}
        description={summary}
        cover={cover ? { src: cover, alt: location.name } : null}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_320px]">
        <Card>
          <CardContent className="flex flex-col gap-8 px-5 py-6 sm:px-8 sm:py-8">
            {sections.length > 0 ? (
              sections.map((section) => (
                <div key={section.id} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-semibold">{section.title}</h2>
                    <Separator />
                  </div>
                  <EditorialProse paragraphs={section.paragraphs} />
                </div>
              ))
            ) : (
              <p className="leading-8 text-muted-foreground">{location.description}</p>
            )}
          </CardContent>
        </Card>

        <Card className="h-fit xl:sticky xl:top-24">
          <CardHeader>
            <CardTitle>Obras ligadas</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {books.map((book) => (
              <Link
                key={book.href}
                href={book.href}
                className="rounded-md border border-border px-3 py-2 text-sm transition-colors hover:bg-accent"
              >
                {book.title}
              </Link>
            ))}
            {editorial?.sourceUrl ? (
              <p className="pt-2 text-xs leading-6 text-muted-foreground">
                Texto a partir de{" "}
                <a href={editorial.sourceUrl} className="underline underline-offset-4" rel="noreferrer">
                  stephenking.com.br
                </a>
              </p>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
