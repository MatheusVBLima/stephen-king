"use client";

import { useState, useMemo } from 'react';
import { Work } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AllWorksListProps {
  works: Work[];
}

// Function to categorize works
const categorizeWork = (work: Work): string => {
  // Check for Richard Bachman
  if (work.notes.toLowerCase().includes('bachman') || 
      work.notes.toLowerCase().includes('richard bachman')) {
    return 'bachman';
  }
  
  // Check for Dark Tower
  if (work.title.toLowerCase().includes('dark tower') ||
      work.notes.toLowerCase().includes('dark tower')) {
    return 'darktower';
  }

  // Check for short story collections
  if (work.format.toLowerCase().includes('short story') ||
      work.notes.toLowerCase().includes('story collection') ||
      work.format.toLowerCase().includes('collection')) {
    return 'collections';
  }

  // Check for non-fiction
  if (work.notes.toLowerCase().includes('non-fiction') ||
      work.format.toLowerCase().includes('non-fiction')) {
    return 'nonfiction';
  }

  // Default to fiction
  return 'fiction';
};

export function AllWorksList({ works }: AllWorksListProps) {
  const [activeTab, setActiveTab] = useState("all");

  // Categorize works
  const categories = useMemo(() => {
    return {
      all: works,
      fiction: works.filter(work => categorizeWork(work) === 'fiction'),
      nonfiction: works.filter(work => categorizeWork(work) === 'nonfiction'),
      collections: works.filter(work => categorizeWork(work) === 'collections'),
      darktower: works.filter(work => categorizeWork(work) === 'darktower'),
      bachman: works.filter(work => categorizeWork(work) === 'bachman')
    };
  }, [works]);

  // Category labels for display
  const categoryLabels = {
    all: "All",
    fiction: "Fiction",
    nonfiction: "Non-Fiction",
    collections: "Collections",
    darktower: "Dark Tower",
    bachman: "Richard Bachman"
  };

  return (
    <div className="w-full">
      {/* Mobile Select */}
      <div className="mb-4 md:hidden">
        <Select value={activeTab} onValueChange={setActiveTab}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(categoryLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Tabs */}
      <div className="hidden md:block">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="fiction">Fiction</TabsTrigger>
            <TabsTrigger value="nonfiction">Non-Fiction</TabsTrigger>
            <TabsTrigger value="collections">Collections</TabsTrigger>
            <TabsTrigger value="darktower">Dark Tower</TabsTrigger>
            <TabsTrigger value="bachman">Richard Bachman</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content for both mobile and desktop */}
      <div className="mt-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories[activeTab as keyof typeof categories]
            .sort((a, b) => a.year - b.year)
            .map((work) => (
              <Card key={work.title} className="overflow-hidden">
                <CardHeader className="p-4">
                  <div className="flex flex-col">
                    <CardTitle className="text-lg">{work.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{work.year}</Badge>
                    <Badge variant="outline">{work.format}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
} 