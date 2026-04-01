import Image from "next/image";

import { ExpandableImageGallery } from "@/components/expandable-card-demo-standard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { ImportedArticle } from "@/lib/types";

interface ArticleDetailProps {
  article: ImportedArticle;
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  return (
    <div className="flex flex-col gap-10 md:gap-12">
      <section className="grid gap-8 xl:grid-cols-[minmax(0,1.18fr)_340px] xl:items-stretch">
        <div className="rounded-[2rem] border border-border/60 bg-card/45 px-5 py-6 shadow-sm backdrop-blur-sm sm:px-8 sm:py-8 lg:px-10 lg:py-10">
          <div className="flex flex-col gap-6 lg:gap-8">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="secondary">Especial</Badge>
              {article.date && (
                <Badge variant="outline">
                  {new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(
                    new Date(article.date),
                  )}
                </Badge>
              )}
              {article.categories.map((category) => (
                <Badge key={category} variant="outline">
                  {category}
                </Badge>
              ))}
            </div>

            <div className="flex flex-col gap-4 lg:gap-5">
              <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
                {article.title}
              </h1>
              <p className="max-w-3xl text-base leading-8 text-muted-foreground">{article.summary}</p>
            </div>
          </div>
        </div>

        {article.images[0] && (
          <div className="relative h-[360px] overflow-hidden rounded-[2rem] border border-border/60 bg-muted/20 sm:h-[420px] xl:h-full xl:min-h-[100%]">
            <Image
              src={article.images[0].src}
              alt={article.images[0].alt || article.title}
              fill
              sizes="(max-width: 1279px) 100vw, 340px"
              className="object-cover"
            />
          </div>
        )}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_320px]">
        <Card className="rounded-[1.75rem] border-border/60 bg-card/55">
          <CardContent className="flex flex-col gap-8 px-5 py-6 sm:px-8 sm:py-8">
            {article.sections.map((section) => (
              <div key={section.id} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                  <Separator />
                </div>
                <div className="flex flex-col gap-4">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={`${section.id}-${index}`} className="leading-8 text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="h-fit rounded-[1.75rem] border-border/60 bg-card/55 xl:sticky xl:top-28">
          <CardHeader className="space-y-3 px-5 pt-6 sm:px-6 sm:pt-7">
            <CardTitle>Contexto do especial</CardTitle>
            <CardDescription className="leading-7">
              Referências visuais e dados rápidos deste conteúdo.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 px-5 pb-6 sm:px-6 sm:pb-7">
            <div className="grid gap-3 rounded-2xl border border-border/50 bg-background/30 p-4 text-sm">
              <div className="flex items-start justify-between gap-4">
                <span className="text-muted-foreground">Tipo</span>
                <span className="text-right text-foreground">Especial</span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-muted-foreground">Seções</span>
                <span className="text-right text-foreground">{article.sections.length}</span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-muted-foreground">Imagens</span>
                <span className="text-right text-foreground">{article.images.length}</span>
              </div>
            </div>

            {article.images.length > 1 && (
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <span className="font-medium text-foreground">Galeria</span>
                  <Separator />
                </div>
                <ExpandableImageGallery
                  images={article.images.slice(1, 5).map((image, index) => ({
                    src: image.src,
                    alt: image.alt || `${article.title} ${index + 2}`,
                    title: `${article.title} · imagem ${index + 2}`,
                    description: "Clique para ampliar e ver a imagem em destaque.",
                  }))}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
