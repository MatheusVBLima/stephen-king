import { getBookBySlug } from "@/lib/books-data";
import { BookDetail } from "@/components/BookDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from "next/link";

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

  return (
    <main className="p-4 mx-auto max-w-7xl">
      <div className="mb-6">
        <Button 
          variant="outline" 
          asChild 
        >
          <Link href={`/#${location}`}>
            <ArrowLeft />
            <span>Back to {displayLocation}</span>
          </Link>
        </Button>
      </div>

      <BookDetail book={book} />
    </main>
  );
} 