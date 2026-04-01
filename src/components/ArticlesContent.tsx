import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getPreviewText } from "@/lib/content-display";
import { getImportedArticles } from "@/lib/imported-content";

interface ArticlesContentProps {
  page?: number;
  kind?: string;
  category?: string;
}

const PAGE_SIZE = 12;

export function ArticlesContent({
  page = 1,
  kind = "todos",
  category = "todas",
}: ArticlesContentProps) {
  const allArticles = getImportedArticles();
  const availableCategories = Array.from(
    new Set(allArticles.flatMap((article) => article.categories).filter(Boolean)),
  ).sort((left, right) => left.localeCompare(right, "pt-BR"));

  const filteredArticles = allArticles.filter((article) => {
    const kindMatch = kind === "todos" || article.kind === kind;
    const categoryMatch = category === "todas" || article.categories.includes(category);
    return kindMatch && categoryMatch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const currentItems = filteredArticles.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const breadcrumbSegments = [{ name: "Especiais", href: "/artigos", isCurrent: true }];

  const buildHref = (nextPage: number, nextKind = kind, nextCategory = category) => {
    const params = new URLSearchParams();
    if (nextPage > 1) params.set("page", String(nextPage));
    if (nextKind !== "todos") params.set("tipo", nextKind);
    if (nextCategory !== "todas") params.set("categoria", nextCategory);
    const query = params.toString();
    return query ? `/artigos?${query}` : "/artigos";
  };

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 md:py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:gap-10">
        <section className="rounded-[2rem] border border-border/60 bg-card/40 px-5 py-6 shadow-sm backdrop-blur-sm sm:px-8 sm:py-8 lg:px-10 lg:py-10">
          <div className="flex flex-col gap-6">
            <Breadcrumb segments={breadcrumbSegments} />

            <div className="flex flex-col gap-4 lg:gap-5">
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span>{filteredArticles.length} itens filtrados</span>
                <span className="hidden h-1 w-1 rounded-full bg-border sm:block" />
                <span>{allArticles.length} no arquivo completo</span>
              </div>

              <div className="flex flex-col gap-4">
                <h1 className="max-w-4xl text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  Especiais
                </h1>
                <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                  Explore páginas evergreen importadas para complementar o arquivo local com
                  contexto, cronologias e materiais de referência.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Card className="rounded-[1.75rem] border-border/60 bg-card/55">
          <CardHeader className="space-y-3 px-5 pt-6 sm:px-8 sm:pt-8">
            <CardTitle>Filtros</CardTitle>
            <CardDescription className="leading-7">
              Refine a listagem por tipo e categoria.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 px-5 pb-6 sm:px-8 sm:pb-8">
            <div className="flex flex-col gap-3">
              <span className="text-sm font-medium">Tipo</span>
              <div className="flex flex-wrap gap-2">
                {[
                  ["todos", "Todos"],
                  ["especial", "Especiais"],
                ].map(([value, label]) => (
                  <Link key={value} href={buildHref(1, value, category)}>
                    <Badge variant={kind === value ? "secondary" : "outline"}>{label}</Badge>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-sm font-medium">Categoria</span>
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex gap-2 pb-1">
                  <Link href={buildHref(1, kind, "todas")}>
                    <Badge variant={category === "todas" ? "secondary" : "outline"}>Todas</Badge>
                  </Link>
                  {availableCategories.map((value) => (
                    <Link key={value} href={buildHref(1, kind, value)}>
                      <Badge variant={category === value ? "secondary" : "outline"}>{value}</Badge>
                    </Link>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">{filteredArticles.length} itens encontrados</p>
          <p className="text-sm text-muted-foreground">
            Página {currentPage} de {totalPages}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {currentItems.map((article) => (
            <Link key={article.slug} href={`/artigos/${article.slug}`} className="group block h-full">
              <Card className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border-border/60 bg-card/55 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-primary/30 group-hover:shadow-xl">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.07),transparent_42%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <CardHeader className="relative flex flex-col gap-5 p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">Especial</Badge>
                    {article.categories.slice(0, 2).map((entry) => (
                      <Badge key={entry} variant="outline">
                        {entry}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-xl leading-tight transition-colors group-hover:text-primary">
                      {article.title}
                    </CardTitle>
                    <span className="rounded-full border border-border/60 bg-background/50 p-2 text-muted-foreground transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>

                  {article.date && (
                    <CardDescription className="leading-6">
                      {new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(
                        new Date(article.date),
                      )}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="relative mt-auto border-t border-border/50 p-5 pt-4 sm:px-6 sm:pb-6">
                  <div className="flex flex-col gap-4">
                    <p className="text-sm leading-7 text-muted-foreground">
                      {getPreviewText(article.summary, 220)}
                    </p>
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-muted-foreground">Abrir especial</span>
                      <span className="font-medium text-primary transition-transform duration-300 group-hover:translate-x-0.5">
                        Ler mais
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious href={buildHref(currentPage - 1)} />
                </PaginationItem>
              )}

              {Array.from({ length: totalPages }, (_, index) => index + 1)
                .filter((entry) => Math.abs(entry - currentPage) <= 2 || entry === 1 || entry === totalPages)
                .map((entry, index, visiblePages) => (
                  <PaginationItem key={entry}>
                    {index > 0 && entry - visiblePages[index - 1] > 1 && (
                      <span className="px-1 text-muted-foreground">...</span>
                    )}
                    <PaginationLink href={buildHref(entry)} isActive={entry === currentPage}>
                      {entry}
                    </PaginationLink>
                  </PaginationItem>
                ))}

              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext href={buildHref(currentPage + 1)} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </main>
  );
}
