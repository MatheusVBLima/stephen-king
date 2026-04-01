import { BookDetail } from "@/components/BookDetail";
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { getWorkDetailViewModelByLegacyRoute } from "@/lib/imported-content";
import { formatLocationName } from "@/lib/work-utils";

interface BookPageProps {
  params: Promise<{
    location: string;
    bookTitle: string;
  }>;
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  // Aguardar resolução dos parâmetros
  const resolvedParams = await params;
  const { location, bookTitle } = resolvedParams;
  
  const book = getWorkDetailViewModelByLegacyRoute(location, bookTitle);
  
  if (!book) {
    return {
      title: 'Obra não encontrada',
      description: 'A obra solicitada não foi encontrada',
    };
  }
  
  return {
    title: `${book.title} | Stephen King`,
    description: book.summary || `Detalhes sobre ${book.title}`,
  };
}

export default async function BookPage({ params }: BookPageProps) {
  // Aguardar resolução dos parâmetros
  const resolvedParams = await params;
  const { location, bookTitle } = resolvedParams;
  
  const book = getWorkDetailViewModelByLegacyRoute(location, bookTitle);
  
  if (!book) {
    notFound();
  }

  // Breadcrumb segments
  const breadcrumbSegments = [
    { name: formatLocationName(location), href: "/works" },
    { name: book.title, href: `/${location}/${bookTitle}`, isCurrent: true }
  ];

  return (
    <main className="px-4 py-6 sm:px-6 md:py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:gap-8">
        <Breadcrumb segments={breadcrumbSegments} />
        <BookDetail book={book} />
      </div>
    </main>
  );
} 
