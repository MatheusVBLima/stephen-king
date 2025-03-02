"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { getAllBooks, slugify } from "@/lib/books-data";
import { BookDetail } from "@/lib/types";
import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { Breadcrumb } from "@/components/ui/breadcrumb";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<BookDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      setLoading(true);
      const allBooks = getAllBooks();
      
      // Filter books based on search criteria
      const filteredBooks = allBooks.filter((book) => {
        const searchableText = [
          book.title,
          book.format,
          book.synopsis,
          book.notes,
          book.year.toString(),
          ...(book.mainCharacters || []),
          ...(book.connections?.map(c => `${c.title} ${c.description}`) || []),
          ...(book.adaptations?.map(a => `${a.type} ${a.year} ${a.title} ${a.description}`) || []),
        ].join(" ").toLowerCase();
        
        return searchableText.includes(query.toLowerCase());
      });
      
      setResults(filteredBooks);
      setLoading(false);
    }
  }, [query]);

  return (
    <div>
      <div className="mb-4">
        <p className="text-center text-muted-foreground">
          {loading ? "Searching..." : 
           results.length ? `Found ${results.length} results for "${query}"` : 
           `No results found for "${query}"`}
        </p>
      </div>
      
      {results.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((book) => (
            <Link 
              key={book.title} 
              href={`/${book.location}/${slugify(book.title)}`}
              className="block"
            >
              <div className="h-full p-6 transition-colors border rounded-lg hover:bg-muted/50">
                <h2 className="mb-2 text-xl font-bold">{book.title}</h2>
                <p className="mb-2 text-sm text-muted-foreground">
                  {book.year} • {book.format}
                </p>
                {book.synopsis && (
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {book.synopsis}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchContent() {
  // Breadcrumb segments
  const breadcrumbSegments = [
    { name: "Search", href: "/search", isCurrent: true }
  ];

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <Breadcrumb segments={breadcrumbSegments} className="mb-6" />
        
        <h1 className="mb-8 text-3xl font-bold text-center md:text-5xl md:mb-10">Search Results</h1>
        
        <div className="flex justify-center mb-8">
          <SearchBar />
        </div>
        
        <Suspense fallback={<div className="text-center">Loading results...</div>}>
          <SearchResults />
        </Suspense>
      </div>
    </main>
  );
} 