import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleDetail } from "@/components/ArticleDetail";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { getImportedArticleBySlug } from "@/lib/imported-content";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getImportedArticleBySlug(resolvedParams.slug);

  if (!article) {
    return {
      title: "Conteúdo não encontrado",
      description: "O conteúdo solicitado não foi encontrado.",
    };
  }

  return {
    title: `${article.title} | Especiais`,
    description: article.summary,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const article = getImportedArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const breadcrumbSegments = [
    { name: "Especiais", href: "/artigos" },
    { name: article.title, href: `/artigos/${article.slug}`, isCurrent: true },
  ];

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 md:py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:gap-8">
        <Breadcrumb segments={breadcrumbSegments} />
        <ArticleDetail article={article} />
      </div>
    </main>
  );
}
