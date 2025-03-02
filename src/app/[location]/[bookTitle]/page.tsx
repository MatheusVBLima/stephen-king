import { getBookBySlug } from "@/lib/books-data";
import { BookDetail } from "@/components/BookDetail";
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumb } from "@/components/ui/breadcrumb";

// Function to capitalize the first letter of each word
function capitalizeWords(str: string): string {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

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
  
  const book = getBookBySlug(location, bookTitle);
  
  if (!book) {
    return {
      title: 'Book Not Found',
      description: 'The requested book could not be found',
    };
  }
  
  return {
    title: `${book.title} - Stephen King's Works`,
    description: book.synopsis || `Details about ${book.title} by Stephen King`,
  };
}

export default async function BookPage({ params }: BookPageProps) {
  // Aguardar resolução dos parâmetros
  const resolvedParams = await params;
  const { location, bookTitle } = resolvedParams;
  
  const book = getBookBySlug(location, bookTitle);
  
  if (!book) {
    notFound();
  }

  const displayLocation = location === 'castle-rock' ? 'Castle Rock' : 
                         location === 'derry' ? 'Derry' : 
                         location === 'salems-lot' ? "Salem's Lot" : capitalizeWords(location);

  // Breadcrumb segments
  const breadcrumbSegments = [
    { name: displayLocation, href: `/#${location}` },
    { name: book.title, href: `/${location}/${bookTitle}`, isCurrent: true }
  ];

  return (
    <main className="p-4 mx-auto md:px-0 max-w-7xl">
      <Breadcrumb segments={breadcrumbSegments} className="mb-6" />
      <BookDetail book={book} />
    </main>
  );
} 