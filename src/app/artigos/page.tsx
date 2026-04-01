import { ArticlesContent } from "@/components/ArticlesContent";

export const metadata = {
  title: "Especiais | Stephen King",
  description: "Arquivo local de especiais importados para consulta e referência.",
};

interface ArticlesPageProps {
  searchParams: Promise<{
    page?: string;
    tipo?: string;
    categoria?: string;
  }>;
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <ArticlesContent
      page={Number.parseInt(resolvedSearchParams.page || "1", 10)}
      kind={resolvedSearchParams.tipo}
      category={resolvedSearchParams.categoria}
    />
  );
}
