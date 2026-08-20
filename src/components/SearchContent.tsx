import Link from "next/link";

import { SearchFilters } from "@/components/SearchFilters";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { HoverHighlightGrid } from "@/components/ui/card-hover-effect";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { searchSiteContent } from "@/lib/imported-content";

interface SearchContentProps {
  query: string;
  type?: string;
  order?: string;
}

export default function SearchContent({
  query,
  type = "todos",
  order = "recentes",
}: SearchContentProps) {
  const results = searchSiteContent(query);
  const queryTrimmed = query.trim();

  const filteredResults = results.filter((result) => type === "todos" || result.kind === type);

  const orderedResults = [...filteredResults].sort((left, right) => {
    if (order === "alfabetica") {
      return left.title.localeCompare(right.title, "pt-BR");
    }

    return right.sortDate - left.sortDate;
  });

  const number = new Intl.NumberFormat("pt-BR");
  const kicker = queryTrimmed
    ? `${number.format(orderedResults.length)} resultados para “${queryTrimmed}”`
    : `${number.format(orderedResults.length)} itens com os filtros atuais`;

  return (
    <PageShell>
      <PageHeader
        breadcrumb={[{ name: "Pesquisa", href: "/search", isCurrent: true }]}
        kicker={kicker}
        title="Pesquisa"
        description="Busque no arquivo brasileiro: obras, autor, cidades, adaptações e personagens."
      >
        <SearchFilters />
      </PageHeader>

      {orderedResults.length > 0 ? (
        <HoverHighlightGrid>
          {orderedResults.map((result) => (
            <Link
              key={`${result.kind}-${result.href}-${result.title}`}
              href={result.href}
              className="group block h-full min-w-0"
            >
              <Card className="h-full transition-colors group-hover:border-foreground/40">
                <CardHeader className="flex flex-col gap-3">
                  <Badge variant="outline" className="w-fit">
                    {result.badge}
                  </Badge>
                  <CardTitle className="text-lg leading-tight">{result.title}</CardTitle>
                  <CardDescription className="line-clamp-3 text-sm leading-6">
                    {result.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </HoverHighlightGrid>
      ) : (
        <p className="text-sm text-muted-foreground">Nenhum item encontrado com os filtros atuais.</p>
      )}
    </PageShell>
  );
}
