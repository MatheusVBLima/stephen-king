"use client";

import { useEffect, useState } from 'react';
import { Timeline } from '@/components/Timeline';
import { BookDetail } from '@/lib/types';
import { getAllBooks } from '@/lib/books-data';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import { getMajorLocations } from '@/lib/locations-data';
import 'react-vertical-timeline-component/style.min.css';

export default function TimelineContent() {
  const [books, setBooks] = useState<BookDetail[]>([]);
  const [loading, setLoading] = useState(true);

  // Breadcrumb segments
  const breadcrumbSegments = [
    { name: "Timeline", href: "/timeline", isCurrent: true }
  ];

  useEffect(() => {
    // Fetch books data
    const fetchBooks = () => {
      try {
        const allBooks = getAllBooks();
        // Get the IDs of the major locations
        const majorLocations = getMajorLocations().map(location => location.id);
        
        // Filter only books that take place in one of the major locations
        const locationBooks = allBooks.filter(book => 
          majorLocations.includes(book.location)
        );
        
        setBooks(locationBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Timeline Skeleton Component
  const TimelineSkeleton = () => (
    <div className="space-y-8">
      {/* Filters skeleton */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="space-y-2">
          <div className="font-medium">Period</div>
          <Skeleton className="h-10 w-[200px]" />
        </div>
        <div className="space-y-2">
          <div className="font-medium">Location</div>
          <Skeleton className="h-10 w-[200px]" />
        </div>
      </div>
      
      {/* Timeline skeleton - versão minimalista */}
      <div className="relative">
        {/* Linha vertical central */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-[1px] h-full bg-border" />
        
        <div className="mt-16 space-y-32">
          {/* Primeiro card */}
          <div className="relative flex">
            {/* Card esquerdo */}
            <div className="w-[45%] mr-auto pr-8">
              <div className="p-4 rounded-md bg-card">
                <div className="flex items-start justify-between mb-2">
                  <Skeleton className="w-40 h-7" />
                  <Skeleton className="w-16 h-6" />
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Skeleton className="w-24 h-6" />
                  <Skeleton className="w-32 h-6" />
                </div>
                <Skeleton className="w-full h-4 mb-1" />
                <Skeleton className="h-4 w-[90%] mb-1" />
                <Skeleton className="h-4 w-[60%]" />
              </div>
            </div>
            
            {/* Círculo central */}
            <div className="absolute transform -translate-x-1/2 left-1/2 top-10">
              <Skeleton className="w-10 h-10 rounded-full" />
            </div>
          </div>
          
          {/* Segundo card */}
          <div className="relative flex">
            {/* Círculo central */}
            <div className="absolute transform -translate-x-1/2 left-1/2 top-10">
              <Skeleton className="w-10 h-10 rounded-full" />
            </div>
            
            {/* Card direito */}
            <div className="w-[45%] ml-auto pl-8">
              <div className="p-4 rounded-md bg-card">
                <div className="flex items-start justify-between mb-2">
                  <Skeleton className="w-40 h-7" />
                  <Skeleton className="w-16 h-6" />
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Skeleton className="w-24 h-6" />
                  <Skeleton className="w-32 h-6" />
                </div>
                <Skeleton className="w-full h-4 mb-1" />
                <Skeleton className="h-4 w-[90%] mb-1" />
                <Skeleton className="h-4 w-[60%]" />
              </div>
            </div>
          </div>
          
          {/* Terceiro card */}
          <div className="relative flex">
            {/* Card esquerdo */}
            <div className="w-[45%] mr-auto pr-8">
              <div className="p-4 rounded-md bg-card">
                <div className="flex items-start justify-between mb-2">
                  <Skeleton className="w-40 h-7" />
                  <Skeleton className="w-16 h-6" />
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Skeleton className="w-24 h-6" />
                  <Skeleton className="w-32 h-6" />
                </div>
                <Skeleton className="w-full h-4 mb-1" />
                <Skeleton className="h-4 w-[90%] mb-1" />
                <Skeleton className="h-4 w-[60%]" />
              </div>
            </div>
            
            {/* Círculo central */}
            <div className="absolute transform -translate-x-1/2 left-1/2 top-10">
              <Skeleton className="w-10 h-10 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <Breadcrumb segments={breadcrumbSegments} className="mb-6" />
        <h1 className="mb-4 text-3xl font-bold text-center md:text-5xl">Stephen King Timeline</h1>
        <p className="mb-8 text-center text-muted-foreground">
          Explore Stephen King's works in chronological order
        </p>
        
        {loading ? <TimelineSkeleton /> : <Timeline books={books} />}
      </div>
    </main>
  );
} 