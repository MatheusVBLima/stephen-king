"use client";

import { useEffect, useState } from 'react';
import { Timeline } from '@/components/Timeline';
import { getAllBooks } from '@/lib/books-data';
import { BookDetail } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TimelinePage() {
  const [books, setBooks] = useState<BookDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch books data
    const fetchBooks = () => {
      try {
        const allBooks = getAllBooks();
        setBooks(allBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <Button 
            variant="outline" 
            asChild 
            className="mb-6"
          >
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>Back to Home</span>
            </Link>
          </Button>
        </div>
        
        <h1 className="mb-4 text-3xl font-bold text-center md:text-5xl">Stephen King Timeline</h1>
        <p className="mb-8 text-center text-muted-foreground">
          Explore Stephen King's works in chronological order
        </p>
        
        {loading ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <Timeline books={books} />
        )}
      </div>
    </main>
  );
} 