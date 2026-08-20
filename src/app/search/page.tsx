import type { SearchParams } from "nuqs/server";

import SearchContent from "@/components/SearchContent";
import { searchPageParamsCache } from "@/lib/search-page-params";

export const metadata = {
  title: "Pesquisa | Arquivo Stephen King",
  description: "Pesquise obras, adaptações, cidades e personagens do arquivo brasileiro.",
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
      order={resolvedSearchParams.ordem}
    />
  );
}
