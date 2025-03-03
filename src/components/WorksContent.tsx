"use client";

import { getAllWorks } from '@/lib/works-data';
import { AllWorksList } from '@/components/AllWorksList';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export default function WorksContent() {
  const works = getAllWorks();
  
  // Breadcrumb segments
  const breadcrumbSegments = [
    { name: "Works", href: "/works", isCurrent: true }
  ];
  
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <Breadcrumb segments={breadcrumbSegments} className="mb-6" />
        
        <h1 className="mb-4 text-3xl font-bold text-center md:text-5xl">All Stephen King Works</h1>
        <p className="mb-8 text-center text-muted-foreground">
          Complete list of works organized by category
        </p>
        
        <AllWorksList works={works} />
      </div>
    </main>
  );
} 