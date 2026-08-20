import { EditorialProse } from "@/components/EditorialProse"
import Link from "next/link"

import { DetailHero } from "@/components/DetailHero"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { AdaptationCatalogItem } from "@/lib/types"

const kindLabels = {
  cinema: "Cinema",
  serie: "Série",
  minisserie: "Minissérie",
  hq: "HQ",
  outro: "Outra",
} as const

interface AdaptationDetailProps {
  item: AdaptationCatalogItem
}

export function AdaptationDetail({ item }: AdaptationDetailProps) {
  const cover = item.images[0]

  return (
    <div className="flex flex-col gap-8">
      <DetailHero
        badges={
          <>
            {item.year ? <Badge variant="secondary">{item.year}</Badge> : null}
            <Badge variant="outline">{kindLabels[item.kind]}</Badge>
            {item.hasImportedDetail ? <Badge>Arquivo brasileiro</Badge> : null}
          </>
        }
        title={item.title}
        description={item.summary}
        cover={cover ? { src: cover.src, alt: cover.alt || item.title } : null}
      >
        {item.relatedWorkHref ? (
          <Link href={item.relatedWorkHref} className="text-sm underline underline-offset-4 hover:text-foreground">
            Ver a obra no catálogo
          </Link>
        ) : null}
      </DetailHero>

      <Card>
        <CardHeader>
          <CardTitle>Sobre a adaptação</CardTitle>
          <CardDescription>Texto editorial extraído do arquivo, sem banners nem recados de contato.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-8">
          {item.sections.length > 0 ? (
            item.sections.map((section) => (
              <div key={section.id} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                  <Separator />
                </div>
                <EditorialProse paragraphs={section.paragraphs} />
              </div>
            ))
          ) : (
            <p className="leading-8 text-muted-foreground">
              Esta entrada veio da cronologia de cinema do arquivo. A ficha completa ainda não foi
              importada para esta adaptação.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
