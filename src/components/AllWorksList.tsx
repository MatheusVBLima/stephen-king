"use client";

import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { useDeferredValue, useMemo } from "react";
import { useQueryStates } from "nuqs";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      hasImportedContent: boolean;
      hasDetailPage: boolean;
      importedSummary?: string;
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

const categorizeWork = (work: Work): (typeof worksCategoryValues)[number] => {
  if (
    work.notes.toLowerCase().includes("bachman") ||
    work.notes.toLowerCase().includes("richard bachman")
  ) {
    return "bachman";
  }

  if (
    work.title.toLowerCase().includes("dark tower") ||
    work.notes.toLowerCase().includes("dark tower")
  ) {
    return "darktower";
  }

  if (
    work.format.toLowerCase().includes("short story") ||
    work.notes.toLowerCase().includes("story collection") ||
    work.format.toLowerCase().includes("collection")
  ) {
    return "collections";
  }

  if (
    work.notes.toLowerCase().includes("non-fiction") ||
    work.format.toLowerCase().includes("non-fiction")
  ) {
    return "nonfiction";
  }

  return "fiction";
};

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
          [work.title, work.notes, work.format, work.importedSummary].filter(Boolean).join(" "),
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
    <div className="w-full space-y-6 md:space-y-8">
      <Card className="rounded-[1.75rem] border-border/60 bg-card/55">
        <CardContent className="flex flex-col gap-6 px-5 py-6 sm:px-8 sm:py-8">
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium">Buscar no catálogo</span>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={params.busca}
                onChange={(event) =>
                  setParams({
                    busca: event.target.value || null,
                    pagina: null,
                  })
                }
                placeholder="Pesquisar apenas nas obras..."
                className="h-12 rounded-2xl border-border/60 bg-background/60 pl-11 pr-4"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>
              {filteredWorks.length} obras encontradas em {categoryLabels[params.categoria]}
            </span>
            <span>
              Página {currentPageIndex + 1} de {totalPages}
            </span>
          </div>
        </CardContent>
      </Card>

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
          <SelectTrigger className="h-12 w-full rounded-2xl border-border/60 bg-card/50 px-4">
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
          <TabsList className="grid h-auto w-full grid-cols-6 gap-1 rounded-2xl border border-border/60 bg-card/50 p-1">
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
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleWorks.map((work) => (
            <Link key={work.title} href={work.href} className="group block h-full">
              <Card className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border-border/60 bg-card/55 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-primary/30 group-hover:shadow-xl">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.07),transparent_42%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <CardHeader className="relative space-y-5 p-5 sm:p-6">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{work.year}</Badge>
                    <Badge variant="outline">{formatBookFormatForDisplay(work.format)}</Badge>
                    {work.hasImportedContent ? (
                      <Badge>Importado</Badge>
                    ) : (
                      <Badge variant="outline">Base local</Badge>
                    )}
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-4">
                      <CardTitle className="text-lg leading-tight transition-colors group-hover:text-primary">
                        {work.title}
                      </CardTitle>
                      <span className="rounded-full border border-border/60 bg-background/50 p-2 text-muted-foreground transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary">
                        <ArrowUpRight className="size-4" />
                      </span>
                    </div>
                    <p className="text-sm leading-7 text-muted-foreground">{work.notes}</p>
                  </div>
                </CardHeader>
                <CardContent className="relative mt-auto border-t border-border/50 p-5 pt-4 sm:px-6 sm:pb-6">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-muted-foreground">Explorar obra</span>
                    <span className="font-medium text-primary transition-transform duration-300 group-hover:translate-x-0.5">
                      Abrir
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card className="rounded-[1.75rem] border-border/60 bg-card/55">
          <CardContent className="px-5 py-8 sm:px-8 sm:py-10">
            <p className="text-sm leading-7 text-muted-foreground">
              Nenhuma obra encontrada para essa categoria com o termo pesquisado.
            </p>
          </CardContent>
        </Card>
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
