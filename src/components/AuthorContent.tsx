"use client"

import { useState } from "react"

import { DetailHero } from "@/components/DetailHero"
import { EditorialProse } from "@/components/EditorialProse"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { AuthorPersona, AuthorViewModel } from "@/lib/types"

interface AuthorContentProps {
  author: AuthorViewModel
}

export function AuthorContent({ author }: AuthorContentProps) {
  const personas = author.personas.length > 0 ? author.personas : null
  const [activePersona, setActivePersona] = useState(personas?.[0]?.id ?? "king")
  const current = personas?.find((persona) => persona.id === activePersona) ?? personas?.[0]
  const cover = current?.images[0] || author.images[0]
  const beats = current?.beats || author.beats
  const sourceUrl = current?.sourceUrl || author.sourceUrl

  return (
    <div className="flex flex-col gap-8">
      <DetailHero
        badges={
          <>
            <Badge variant="secondary">O autor</Badge>
            {author.date ? (
              <Badge variant="outline">
                {new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(new Date(author.date))}
              </Badge>
            ) : null}
          </>
        }
        title={current?.title || author.title}
        description={
          current?.id === "bachman"
            ? current.beats[0]?.paragraphs[0] || author.summary
            : author.summary
        }
        cover={cover ? { src: cover.src, alt: cover.alt || current?.title || author.title } : null}
      />

      {personas && personas.length > 1 ? (
        <Tabs value={activePersona} onValueChange={(value) => setActivePersona(value as AuthorPersona["id"])}>
          <TabsList>
            {personas.map((persona) => (
              <TabsTrigger key={persona.id} value={persona.id} className="flex-none px-4">
                {persona.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {personas.map((persona) => (
            <TabsContent key={persona.id} value={persona.id} className="mt-6">
              <AuthorBeats persona={persona} date={author.date} />
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <AuthorBeats
          persona={{
            id: "king",
            title: author.title,
            sourceUrl,
            beats,
            images: author.images,
          }}
          date={author.date}
        />
      )}
    </div>
  )
}

function AuthorBeats({ persona, date }: { persona: AuthorPersona; date: string | null }) {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_320px]">
      <Card>
        <CardContent className="flex flex-col gap-10 px-5 py-6 sm:px-8 sm:py-8">
          {persona.beats.map((beat) => (
            <section key={beat.id} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold">{beat.title}</h2>
                <Separator />
              </div>
              <EditorialProse paragraphs={beat.paragraphs} />
            </section>
          ))}
        </CardContent>
      </Card>

      <Card className="h-fit xl:sticky xl:top-24">
        <CardHeader>
          <CardTitle>Fonte</CardTitle>
          <CardDescription className="leading-7">
            Texto editorial do arquivo brasileiro{date ? ", atualizado na origem." : "."}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm leading-7 text-muted-foreground">
          <a
            href={persona.sourceUrl}
            className="underline underline-offset-4 hover:text-foreground"
            rel="noreferrer"
            translate="no"
          >
            stephenking.com.br
          </a>
        </CardContent>
      </Card>
    </div>
  )
}
