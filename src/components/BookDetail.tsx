"use client";

import Image from "next/image";
import { useState } from "react";

import { EditorialProse } from "@/components/EditorialProse";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatBookFormatForDisplay } from "@/lib/book-display-pt";
import type { ImportedSection, WorkDetailViewModel } from "@/lib/types";
import { getSectionDisplayTitle, groupImportedSections } from "@/lib/work-section-utils";
import { formatLocationName, hasSpecificLocation } from "@/lib/work-utils";

interface BookDetailProps {
  book: WorkDetailViewModel;
}

interface TabOption {
  value: string;
  label: string;
}

export function BookDetail({ book }: BookDetailProps) {
  const [activeTab, setActiveTab] = useState("");
  const groupedSections = groupImportedSections(book.importedSections);
  const editionGallery = book.images.length > 1 ? book.images.slice(1) : book.images;

  const quickFacts = [
    { label: "Ano", value: String(book.year) },
    { label: "Formato", value: formatBookFormatForDisplay(book.format || "") || "N/A" },
    { label: "Seções no arquivo", value: String(book.importedSections.length) },
    { label: "Imagens", value: String(book.images.length) },
  ];

  const locationFact = hasSpecificLocation(book.location)
    ? { label: "Localização", value: formatLocationName(book.location) }
    : null;

  const tabOptions: TabOption[] = [
    ...(groupedSections.curiosities.length > 0 ? [{ value: "curiosities", label: "Curiosidades" }] : []),
    ...(book.mainCharacters.length > 0 || groupedSections.characters.length > 0
      ? [{ value: "characters", label: "Personagens" }]
      : []),
    ...(book.connections.length > 0 || groupedSections.connections.length > 0
      ? [{ value: "connections", label: "Conexões" }]
      : []),
    ...(groupedSections.editions.length > 0 || editionGallery.length > 0
      ? [{ value: "editions", label: "Edições" }]
      : []),
    ...(book.adaptations.length > 0 || groupedSections.adaptations.length > 0
      ? [{ value: "adaptations", label: "Adaptações" }]
      : []),
  ];

  const resolvedActiveTab =
    activeTab && tabOptions.some((tab) => tab.value === activeTab) ? activeTab : (tabOptions[0]?.value ?? "");

  return (
    <div className="flex flex-col gap-8">
      <section className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_20rem] xl:items-start">
        <div className="flex min-w-0 flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{book.year}</Badge>
            <Badge variant="outline">{formatBookFormatForDisplay(book.format)}</Badge>
            {book.hasImportedContent ? <Badge>Arquivo brasileiro</Badge> : null}
          </div>

          <h1 className="max-w-3xl text-pretty font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {book.displayTitle || book.title}
          </h1>
          {book.originalTitle && book.originalTitle !== book.title ? (
            <p className="text-sm text-muted-foreground" translate="no">
              Título original: {book.originalTitle}
            </p>
          ) : null}

          <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2 xl:grid-cols-3">
            {[...quickFacts.slice(0, 2), ...(locationFact ? [locationFact] : []), ...quickFacts.slice(2)].map(
              (fact) => (
                <div key={fact.label} className="min-w-0">
                  <dt className="text-xs text-muted-foreground">{fact.label}</dt>
                  <dd className="text-sm font-medium tabular-nums">{fact.value}</dd>
                </div>
              ),
            )}
          </dl>

          {book.summary && groupedSections.about.length === 0 ? (
            <Card>
            <CardHeader>
              <CardTitle>Resumo</CardTitle>
              <CardDescription>
                Texto editorial do arquivo brasileiro.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EditorialProse paragraphs={[book.summary]} />
            </CardContent>
          </Card>
          ) : null}

          <Card>
            <CardHeader>
              <CardTitle>Ficha técnica</CardTitle>
              <CardDescription>
                Dados do arquivo brasileiro, quando a ficha técnica estiver disponível.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {Object.keys(book.technicalFacts).length > 0 ? (
                <dl className="grid gap-4 sm:grid-cols-2">
                  {Object.entries(book.technicalFacts).map(([label, value]) => (
                    <div key={label} className="min-w-0">
                      <dt className="text-sm font-medium">{label}</dt>
                      <dd className="mt-1 text-sm leading-6 text-muted-foreground">{value}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="text-sm leading-7 text-muted-foreground">
                  Ainda não há ficha técnica importada para esta obra.
                </p>
              )}
            </CardContent>
          </Card>

          {book.sourceUrl ? (
            <p className="px-1 text-sm leading-7 text-muted-foreground">
              Fonte:{" "}
              <a href={book.sourceUrl} className="underline underline-offset-4 hover:text-foreground" rel="noreferrer" translate="no">
                stephenking.com.br
              </a>
            </p>
          ) : null}

          {groupedSections.about.length > 0 && (
            <SectionAccordionCard
              title="Sobre a obra"
              description="Texto editorial do arquivo brasileiro."
              sections={groupedSections.about}
              emptyMessage="Esta obra ainda não recebeu seções narrativas importadas."
            />
          )}
        </div>

        <Card className="overflow-hidden xl:sticky xl:top-24">
          {book.images[0] ? (
            <CardContainer className="w-full">
              <CardBody className="h-auto w-full">
                <CardItem translateZ={40} className="w-full">
                  <div className="relative aspect-[4/5] w-full bg-muted/20">
                    <Image
                      src={book.images[0].src}
                      alt={book.images[0].alt || book.title}
                      fill
                      sizes="(max-width: 1279px) 100vw, 360px"
                      className="object-contain p-6"
                    />
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>
          ) : (
            <div className="flex aspect-[4/5] items-center justify-center bg-muted/20 px-6 text-sm text-muted-foreground">
              Sem imagem importada
            </div>
          )}
          <CardContent className="flex flex-col gap-4 p-5 sm:p-6">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Dados rápidos</span>
              <Separator />
            </div>
            <div className="grid gap-3 text-sm">
              {[...(locationFact ? [locationFact] : []), ...quickFacts.slice(2)].map((fact) => (
                <div key={fact.label} className="flex items-start justify-between gap-4">
                  <span className="text-muted-foreground">{fact.label}</span>
                  <span className="max-w-[60%] text-right text-foreground">{fact.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {tabOptions.length > 0 ? (
      <Tabs value={resolvedActiveTab} onValueChange={setActiveTab} className="w-full">
        <div className="relative">
          <TabsList className="hidden h-auto w-full flex-wrap justify-start gap-1 rounded-2xl border border-border/60 bg-card/50 p-1 md:flex">
            {tabOptions.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="flex-none px-4">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="w-full md:hidden">
            <Select value={resolvedActiveTab} onValueChange={setActiveTab}>
              <SelectTrigger className="h-12 w-full rounded-2xl border-border/60 bg-card/50 px-4">
                <SelectValue placeholder="Escolha uma seção" />
              </SelectTrigger>
              <SelectContent>
                {tabOptions.map((tab) => (
                  <SelectItem key={tab.value} value={tab.value}>
                    {tab.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="curiosities" className="mt-6">
          <SectionAccordionCard
            title="Curiosidades e referências"
            description="Notas complementares, bastidores e referências estruturadas por seção."
            sections={groupedSections.curiosities}
            emptyMessage="Não há curiosidades importadas para esta obra."
          />
        </TabsContent>

        <TabsContent value="characters" className="mt-6">
          <Card>
            <CardHeader className="space-y-3 px-5 pt-6 sm:px-8 sm:pt-8">
              <CardTitle>Personagens principais</CardTitle>
              <CardDescription className="leading-7">
                Personagens citados na ficha do arquivo brasileiro.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-5 pb-6 sm:px-8 sm:pb-8">
              {book.mainCharacters.length > 0 ? (
                <ul className="flex list-disc flex-col gap-3 pl-5 text-sm leading-7 text-muted-foreground sm:text-base">
                  {book.mainCharacters.map((character, index) => (
                    <li key={index}>{character}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm leading-7 text-muted-foreground">
                  Sem personagens cadastrados para esta obra.
                </p>
              )}

              {groupedSections.characters.length > 0 && (
                <div className="mt-8">
                  <Separator className="mb-6" />
                  <SectionAccordion sections={groupedSections.characters} />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="connections" className="mt-6">
          <Card>
            <CardHeader className="space-y-3 px-5 pt-6 sm:px-8 sm:pt-8">
              <CardTitle>Conexões com outras obras</CardTitle>
              <CardDescription className="max-w-2xl leading-7">
                Ligações com outras obras, segundo o arquivo brasileiro.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-5 pb-6 sm:px-8 sm:pb-8">
              <div className="flex flex-col gap-6">
                {groupedSections.connections.length > 0 && <SectionAccordion sections={groupedSections.connections} />}

                {book.connections.length > 0 ? (
                  <div className="flex flex-col gap-5">
                    {book.connections.map((connection, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-2 border-b border-border/60 pb-4 last:border-0 last:pb-0"
                      >
                        <h3 className="font-semibold">{connection.title}</h3>
                        <p className="text-sm leading-7 text-muted-foreground">{connection.description}</p>
                      </div>
                    ))}
                  </div>
                ) : groupedSections.connections.length === 0 ? (
                  <p className="text-sm leading-7 text-muted-foreground">
                    Sem conexões cadastradas até o momento.
                  </p>
                ) : null}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="editions" className="mt-6">
          <Card>
            <CardHeader className="space-y-3 px-5 pt-6 sm:px-8 sm:pt-8">
              <CardTitle>Edições e galeria</CardTitle>
              <CardDescription className="leading-7">
                Capas e notas sobre edições publicadas no Brasil.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-8 px-5 pb-6 sm:px-8 sm:pb-8">
              {groupedSections.editions.length > 0 && <SectionAccordion sections={groupedSections.editions} />}

              {editionGallery.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {editionGallery.map((image, index) => (
                    <div
                      key={`${image.src}-${index}`}
                      className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-border/60 bg-background/40"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt || `${book.title} - imagem ${index + 1}`}
                        fill
                        sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 33vw"
                        className="object-contain p-3"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm leading-7 text-muted-foreground">
                  Sem imagens adicionais registradas para esta obra.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="adaptations" className="mt-6">
          <Card>
            <CardHeader className="space-y-3 px-5 pt-6 sm:px-8 sm:pt-8">
              <CardTitle>Adaptações</CardTitle>
              <CardDescription className="leading-7">
                Filmes, séries e outras adaptações descritas no arquivo brasileiro.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-5 pb-6 sm:px-8 sm:pb-8">
              <div className="flex flex-col gap-6">
                {groupedSections.adaptations.length > 0 && <SectionAccordion sections={groupedSections.adaptations} />}

                {book.adaptations.length > 0 ? (
                  book.adaptations.map((adaptation, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-3 border-b border-border/60 pb-5 last:border-0 last:pb-0"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <h3 className="font-semibold">{adaptation.title}</h3>
                        {adaptation.year !== 9999 && (
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge>{adaptation.type}</Badge>
                            <Badge variant="outline">{adaptation.year}</Badge>
                          </div>
                        )}
                      </div>

                      {adaptation.director && (
                        <p className="text-sm leading-7">
                          <span className="font-medium">Direção:</span> {adaptation.director}
                        </p>
                      )}

                      {adaptation.stars && adaptation.stars.length > 0 && (
                        <p className="text-sm leading-7">
                          <span className="font-medium">Elenco:</span> {adaptation.stars.join(", ")}
                        </p>
                      )}

                      <p className="text-sm leading-7 text-muted-foreground">{adaptation.description}</p>
                    </div>
                  ))
                ) : groupedSections.adaptations.length === 0 ? (
                  <p className="text-sm leading-7 text-muted-foreground">
                    Nenhuma adaptação cadastrada para esta obra.
                  </p>
                ) : null}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      ) : null}
    </div>
  );
}

interface SectionAccordionCardProps {
  title: string;
  description: string;
  sections: ImportedSection[];
  emptyMessage: string;
}

function SectionAccordionCard({
  title,
  description,
  sections,
  emptyMessage,
}: SectionAccordionCardProps) {
  const normalizedCardTitle = normalizeSectionHeading(title);

  return (
    <Card>
      <CardHeader className="space-y-3 px-5 pt-6 sm:px-8 sm:pt-8">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="max-w-2xl leading-7">{description}</CardDescription>
      </CardHeader>
      <CardContent className="px-5 pb-6 sm:px-8 sm:pb-8">
        {sections.length > 0 ? (
          <SectionAccordion sections={sections} parentTitle={normalizedCardTitle} />
        ) : (
          <p className="text-sm leading-7 text-muted-foreground">{emptyMessage}</p>
        )}
      </CardContent>
    </Card>
  );
}

function SectionAccordion({
  sections,
  parentTitle,
}: {
  sections: ImportedSection[];
  parentTitle?: string;
}) {
  return (
    <div className="flex flex-col gap-8">
      {sections.map((section, sectionIndex) => (
        <div key={section.id} className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            {sections.length > 1 &&
              normalizeSectionHeading(getSectionDisplayTitle(section.title)) !== parentTitle && (
              <h3 className="text-lg font-semibold text-foreground">{getSectionDisplayTitle(section.title)}</h3>
              )}
            <div className="flex flex-col gap-4">
              <EditorialProse paragraphs={section.paragraphs} />
            </div>
          </div>
          {sectionIndex < sections.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  );
}

function normalizeSectionHeading(value: string) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}
