import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SearchFilters } from "@/components/SearchFilters";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getImportedArticles, searchSiteContent } from "@/lib/imported-content";

interface SearchContentProps {
  query: string;
  type?: string;
  category?: string;
  order?: string;
}

export default function SearchContent({
  query,
  type = "todos",
  category = "todas",
  order = "recentes",
}: SearchContentProps) {
  const results = searchSiteContent(query);
  const queryTrimmed = query.trim();
  const availableCategories = Array.from(
    new Set(getImportedArticles().flatMap((article) => article.categories).filter(Boolean)),
  ).sort((left, right) => left.localeCompare(right, "pt-BR"));

  const filteredResults = results.filter((result) => {
    const typeMatch = type === "todos" || result.kind === type;
    const categoryMatch = category === "todas" || result.categories.includes(category);
    return typeMatch && categoryMatch;
  });

  const orderedResults = [...filteredResults].sort((left, right) => {
    if (order === "alfabetica") {
      return left.title.localeCompare(right.title, "pt-BR");
    }

    return right.sortDate - left.sortDate;
  });

  const breadcrumbSegments = [{ name: "Pesquisa", href: "/search", isCurrent: true }];

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 md:py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:gap-10">
        <section className="rounded-[2rem] border border-border/60 bg-card/40 px-5 py-6 shadow-sm backdrop-blur-sm sm:px-8 sm:py-8 lg:px-10 lg:py-10">
          <div className="flex flex-col gap-6">
            <Breadcrumb segments={breadcrumbSegments} />

            <div className="flex flex-col gap-4 lg:gap-5">
              <h1 className="max-w-4xl text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Pesquisa
              </h1>
              <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                Use a pesquisa global no header para digitar um termo. Aqui você pode refinar os
                resultados entre obras e especiais.
              </p>
            </div>

            <p className="text-sm leading-7 text-muted-foreground">
              {queryTrimmed
                ? `${orderedResults.length} resultados para "${queryTrimmed}"`
                : `${orderedResults.length} itens disponíveis com os filtros atuais.`}
            </p>
          </div>
        </section>

        <Card className="rounded-[1.75rem] border-border/60 bg-card/55">
          <CardHeader className="space-y-3 px-5 pt-6 sm:px-8 sm:pt-8">
            <CardTitle>Refinar pesquisa</CardTitle>
            <CardDescription className="leading-7">
              Refine a navegação entre obras e especiais.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 px-5 pb-6 sm:px-8 sm:pb-8">
            <SearchFilters availableCategories={availableCategories} />
          </CardContent>
        </Card>

        {orderedResults.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {orderedResults.map((result) => (
              <Link key={`${result.type}-${result.href}`} href={result.href} className="group block h-full">
                <Card className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border-border/60 bg-card/55 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-primary/30 group-hover:shadow-xl">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.07),transparent_42%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <CardHeader className="relative flex flex-col gap-5 p-5 sm:p-6">
                    <Badge variant="outline" className="w-fit">
                      {result.badge}
                    </Badge>
                    <div className="flex items-start justify-between gap-4">
                      <CardTitle className="text-xl leading-tight transition-colors group-hover:text-primary">
                        {result.title}
                      </CardTitle>
                      <span className="rounded-full border border-border/60 bg-background/50 p-2 text-muted-foreground transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary">
                        <ArrowUpRight className="size-4" />
                      </span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <CardDescription className="text-sm leading-7">
                        {result.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="relative mt-auto border-t border-border/50 p-5 pt-4 sm:px-6 sm:pb-6">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-muted-foreground">Abrir resultado</span>
                      <span className="font-medium text-primary transition-transform duration-300 group-hover:translate-x-0.5">
                        Ver detalhe
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
                Nenhum item encontrado com os filtros atuais.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
