import type { SearchParams } from "nuqs/server";

import SearchContent from "@/components/SearchContent";
import { searchPageParamsCache } from "@/lib/search-page-params";

export const metadata = {
  title: "Pesquisa | Stephen King",
  description: "Pesquise obras e especiais no catálogo local de Stephen King.",
};

interface SearchPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchPageParamsCache.parse(searchParams);

  return (
    <SearchContent
      query={resolvedSearchParams.q}
      type={resolvedSearchParams.tipo}
      category={resolvedSearchParams.categoria}
      order={resolvedSearchParams.ordem}
    />
  );
}
