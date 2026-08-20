"use client"

import Link from "next/link"
import { ArrowUpRight, Search } from "lucide-react"
import { useDeferredValue, useMemo } from "react"
import { createSerializer, useQueryStates } from "nuqs"

import { HoverHighlightGrid } from "@/components/ui/card-hover-effect"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { adaptationsPageParsers, adaptationKindValues } from "@/lib/adaptations-page-params"
import type { AdaptationCatalogItem } from "@/lib/types"

interface AdaptationsListProps {
  items: AdaptationCatalogItem[]
}

const PAGE_SIZE = 12
const serializeAdaptations = createSerializer(adaptationsPageParsers)

const kindLabels = {
  todos: "Todas",
  cinema: "Cinema",
  serie: "Séries",
  minisserie: "Minisséries",
  hq: "HQs",
  outro: "Outras",
} as const

function visiblePageIndexes(currentPage: number, totalPages: number) {
  const pages = new Set([0, currentPage - 1, currentPage, currentPage + 1, totalPages - 1])
  return [...pages].filter((page) => page >= 0 && page < totalPages).sort((left, right) => left - right)
}

export function AdaptationsList({ items }: AdaptationsListProps) {
  const [params, setParams] = useQueryStates(adaptationsPageParsers)
  const deferredQuery = useDeferredValue(params.busca)

  const filtered = useMemo(() => {
    const query = deferredQuery.trim().toLowerCase()
    return items.filter((item) => {
      const kindMatch = params.tipo === "todos" || item.kind === params.tipo
      const searchMatch =
        !query || `${item.title} ${item.year ?? ""} ${item.summary}`.toLowerCase().includes(query)
      return kindMatch && searchMatch
    })
  }, [deferredQuery, items, params.tipo])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(params.pagina, totalPages - 1)
  const visible = filtered.slice(currentPage * PAGE_SIZE, currentPage * PAGE_SIZE + PAGE_SIZE)
  const pages = visiblePageIndexes(currentPage, totalPages)

  const hrefForPage = (page: number) => serializeAdaptations("/adaptacoes", { ...params, pagina: page })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Tabs
          value={params.tipo}
          onValueChange={(value) =>
            setParams({ tipo: value as (typeof adaptationKindValues)[number], pagina: 0 })
          }
        >
          <TabsList>
            {adaptationKindValues.map((kind) => (
              <TabsTrigger key={kind} value={kind}>
                {kindLabels[kind]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="relative w-full max-w-sm">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            value={params.busca}
            onChange={(event) => setParams({ busca: event.target.value, pagina: 0 })}
            placeholder="Carrie, 2017, minissérie…"
            className="pl-9"
            name="busca"
            autoComplete="off"
            spellCheck={false}
            aria-label="Buscar adaptação"
          />
        </div>
      </div>

      <p className="text-sm tabular-nums text-muted-foreground" aria-live="polite">
        {filtered.length} adaptações
      </p>

      {visible.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhuma adaptação encontrada com os filtros atuais.</p>
      ) : (
        <HoverHighlightGrid className="md:grid-cols-2 xl:grid-cols-2">
          {visible.map((item) => (
            <Card key={item.slug} className="min-w-0 transition-colors hover:border-foreground/40">
              <CardHeader className="gap-3">
                <div className="flex flex-wrap gap-2">
                  {item.year ? <Badge variant="secondary">{item.year}</Badge> : null}
                  <Badge variant="outline">{kindLabels[item.kind]}</Badge>
                  {item.hasImportedDetail ? <Badge>Ficha importada</Badge> : null}
                </div>
                <CardTitle className="text-xl leading-snug">
                  <Link href={item.href} className="inline-flex min-w-0 items-start gap-2 hover:underline">
                    <span className="break-words">{item.title}</span>
                    <ArrowUpRight aria-hidden="true" className="mt-1 size-4 shrink-0" />
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="line-clamp-4 text-sm leading-7 text-muted-foreground">
                {item.summary}
              </CardContent>
            </Card>
          ))}
        </HoverHighlightGrid>
      )}

      {totalPages > 1 ? (
        <Pagination>
          <PaginationContent>
            {currentPage > 0 ? (
              <PaginationItem>
                <PaginationPrevious href={hrefForPage(currentPage - 1)} />
              </PaginationItem>
            ) : null}
            {pages.map((page, index) => (
              <PaginationItem key={page}>
                {index > 0 && pages[index - 1] !== page - 1 ? <PaginationEllipsis /> : null}
                <PaginationLink href={hrefForPage(page)} isActive={page === currentPage}>
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            {currentPage < totalPages - 1 ? (
              <PaginationItem>
                <PaginationNext href={hrefForPage(currentPage + 1)} />
              </PaginationItem>
            ) : null}
          </PaginationContent>
        </Pagination>
      ) : null}
    </div>
  )
}
