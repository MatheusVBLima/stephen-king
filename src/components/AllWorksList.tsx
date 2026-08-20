"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useDeferredValue, useMemo } from "react";
import { useQueryStates } from "nuqs";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverHighlightGrid } from "@/components/ui/card-hover-effect";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatBookFormatForDisplay } from "@/lib/book-display-pt";
import type { Work } from "@/lib/types";
import { worksCategoryValues, worksPageParsers } from "@/lib/works-page-params";

interface AllWorksListProps {
  works: Array<
    Work & {
      slug: string;
      href: string;
      displayTitle?: string;
      hasImportedContent: boolean;
      hasDetailPage: boolean;
      importedSummary?: string;
      catalogGroup?: "fiction" | "nonfiction" | "collections" | "darktower" | "bachman";
    }
  >;
}

const PAGE_SIZE = 10;

const categoryLabels = {
  all: "Todas",
  fiction: "Ficção",
  nonfiction: "Não ficção",
  collections: "Coletâneas",
  darktower: "Torre Negra",
  bachman: "Richard Bachman",
} satisfies Record<(typeof worksCategoryValues)[number], string>;

const categorizeWork = (
  work: AllWorksListProps["works"][number],
): (typeof worksCategoryValues)[number] => {
  if (work.catalogGroup) return work.catalogGroup
  return "fiction"
}

function normalizeText(value: string) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function buildPaginationItems(totalPages: number, currentPageIndex: number) {
  const pages = new Set<number>([0, totalPages - 1, currentPageIndex - 1, currentPageIndex, currentPageIndex + 1]);
  const sortedPages = Array.from(pages)
    .filter((pageIndex) => pageIndex >= 0 && pageIndex < totalPages)
    .sort((a, b) => a - b);

  const items: Array<{ type: "page"; pageIndex: number } | { type: "ellipsis"; key: string }> = [];

  sortedPages.forEach((pageIndex, index) => {
    if (index > 0 && sortedPages[index - 1] !== pageIndex - 1) {
      items.push({ type: "ellipsis", key: `ellipsis-${sortedPages[index - 1]}-${pageIndex}` });
    }

    items.push({ type: "page", pageIndex });
  });

  return items;
}

export function AllWorksList({ works }: AllWorksListProps) {
  const [params, setParams] = useQueryStates(worksPageParsers);
  const deferredSearch = useDeferredValue(params.busca.trim());

  const categories = useMemo(() => {
    return {
      all: works,
      fiction: works.filter((work) => categorizeWork(work) === "fiction"),
      nonfiction: works.filter((work) => categorizeWork(work) === "nonfiction"),
      collections: works.filter((work) => categorizeWork(work) === "collections"),
      darktower: works.filter((work) => categorizeWork(work) === "darktower"),
      bachman: works.filter((work) => categorizeWork(work) === "bachman"),
    };
  }, [works]);

  const worksInCategory = categories[params.categoria];
  const normalizedSearch = normalizeText(deferredSearch);

  const filteredWorks = useMemo(() => {
    return worksInCategory
      .filter((work) => {
        if (!normalizedSearch) {
          return true;
        }

        const haystack = normalizeText(
          [work.displayTitle, work.title, work.notes, work.format, work.importedSummary]
            .filter(Boolean)
            .join(" "),
        );

        return haystack.includes(normalizedSearch);
      })
      .sort((a, b) => a.year - b.year);
  }, [normalizedSearch, worksInCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredWorks.length / PAGE_SIZE));
  const currentPageIndex = Math.min(params.pagina, totalPages - 1);
  const visibleWorks = filteredWorks.slice(
    currentPageIndex * PAGE_SIZE,
    currentPageIndex * PAGE_SIZE + PAGE_SIZE,
  );

  const buildHref = (next: Partial<typeof params>) => {
    const merged = {
      categoria: params.categoria,
      pagina: currentPageIndex,
      busca: params.busca,
      ...next,
    };

    const query = new URLSearchParams();

    if (merged.categoria !== "all") {
      query.set("categoria", merged.categoria);
    }

    if (merged.pagina > 0) {
      query.set("pagina", String(merged.pagina + 1));
    }

    if (merged.busca.trim()) {
      query.set("busca", merged.busca.trim());
    }

    const search = query.toString();
    return search ? `/works?${search}` : "/works";
  };

  const paginationItems = buildPaginationItems(totalPages, currentPageIndex);

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="busca-obras" className="text-sm font-medium">
            Buscar no catálogo
          </label>
          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              id="busca-obras"
              name="busca"
              autoComplete="off"
              spellCheck={false}
              value={params.busca}
              onChange={(event) =>
                setParams({
                  busca: event.target.value || null,
                  pagina: null,
                })
              }
              placeholder="Não Pisque, 1977…"
              className="pl-9"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 text-sm tabular-nums text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            {filteredWorks.length} obras em {categoryLabels[params.categoria]}
          </span>
          <span>
            Página {currentPageIndex + 1} de {totalPages}
          </span>
        </div>
      </div>

      <div className="md:hidden">
        <Select
          value={params.categoria}
          onValueChange={(value) =>
            setParams({
              categoria: value as (typeof worksCategoryValues)[number],
              pagina: null,
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Escolha uma categoria" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(categoryLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="hidden md:block">
        <Tabs value={params.categoria} onValueChange={() => undefined} className="w-full">
          <TabsList className="grid h-auto w-full grid-cols-6">
            {Object.entries(categoryLabels).map(([value, label]) => (
              <TabsTrigger
                key={value}
                value={value}
                onClick={() =>
                  setParams({
                    categoria: value as (typeof worksCategoryValues)[number],
                    pagina: null,
                  })
                }
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {visibleWorks.length > 0 ? (
        <HoverHighlightGrid>
          {visibleWorks.map((work) => (
            <Link key={work.slug} href={work.href} className="group block h-full min-w-0">
              <Card className="h-full transition-colors group-hover:border-foreground/40">
                <CardHeader className="flex flex-col gap-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{work.year}</Badge>
                    <Badge variant="outline">{formatBookFormatForDisplay(work.format)}</Badge>
                    {work.hasImportedContent ? <Badge>Arquivo brasileiro</Badge> : null}
                  </div>
                  <CardTitle className="font-display text-xl leading-tight">{work.displayTitle || work.title}</CardTitle>
                  <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {work.importedSummary || work.notes}
                  </p>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </HoverHighlightGrid>
      ) : (
        <p className="text-sm text-muted-foreground">
          Nenhuma obra encontrada para essa categoria com o termo pesquisado.
        </p>
      )}

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent className="flex-nowrap items-center">
            {currentPageIndex > 0 && (
              <PaginationItem>
                <PaginationPrevious href={buildHref({ pagina: currentPageIndex - 1 })} />
              </PaginationItem>
            )}

            {paginationItems.map((item) =>
              item.type === "ellipsis" ? (
                <PaginationItem key={item.key} className="hidden sm:list-item">
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem
                  key={item.pageIndex}
                  className={item.pageIndex === currentPageIndex ? "list-item" : "hidden sm:list-item"}
                >
                  <PaginationLink
                    href={buildHref({ pagina: item.pageIndex })}
                    isActive={item.pageIndex === currentPageIndex}
                  >
                    {item.pageIndex + 1}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}

            {currentPageIndex < totalPages - 1 && (
              <PaginationItem>
                <PaginationNext href={buildHref({ pagina: currentPageIndex + 1 })} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
