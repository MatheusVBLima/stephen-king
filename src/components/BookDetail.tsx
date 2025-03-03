"use client";

import { BookDetail as BookDetailType } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";

interface BookDetailProps {
  book: BookDetailType;
}

export function BookDetail({ book }: BookDetailProps) {
  const [activeTab, setActiveTab] = useState("synopsis");
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Tab options for both Select and Tabs
  const tabOptions = [
    { value: "synopsis", label: "Synopsis" },
    { value: "characters", label: "Characters" },
    { value: "connections", label: "Connections" },
    { value: "adaptations", label: "Adaptations" },
    { value: "ratings", label: "Ratings" }
  ];

  return (
    <div className="space-y-8">
      {/* Book header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{book.title}</h1>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-sm">
            {book.year}
          </Badge>
          <Badge variant="outline" className="text-sm">
            {book.format}
          </Badge>
        </div>
        <p className="text-muted-foreground">{book.notes}</p>
      </div>

      {/* Content in tabs */}
      <Tabs 
        defaultValue="synopsis" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="relative">
          {/* Desktop Tabs */}
          <TabsList className="flex-wrap hidden w-full p-1 rounded-md md:flex bg-muted">
            {tabOptions.map(tab => (
              <TabsTrigger key={tab.value} value={tab.value} className="flex-1">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {/* Mobile Select */}
          <div className="w-full mt-2 md:hidden">
            <Select value={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                {tabOptions.map(tab => (
                  <SelectItem key={tab.value} value={tab.value}>
                    {tab.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Synopsis Tab */}
        <TabsContent value="synopsis" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Synopsis</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{book.synopsis}</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Characters Tab */}
        <TabsContent value="characters" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Main Characters</CardTitle>
              <CardDescription>Central characters in the story</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="pl-5 space-y-2 list-disc">
                {book.mainCharacters.map((character, index) => (
                  <li key={index}>{character}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Connections Tab */}
        <TabsContent value="connections" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Connections to other works</CardTitle>
              <CardDescription>How this work connects to Stephen King's universe</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {book.connections.map((connection, index) => (
                  <div key={index} className="pb-3 border-b last:border-0">
                    <h3 className="font-semibold">{connection.title}</h3>
                    <p className="text-sm text-muted-foreground">{connection.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Adaptations Tab */}
        <TabsContent value="adaptations" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Adaptations</CardTitle>
              <CardDescription>Film and TV adaptations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {book.adaptations.length > 0 ? (
                  book.adaptations.map((adaptation, index) => (
                    <div key={index} className="pb-4 border-b last:border-0">
                      <div className="flex flex-col mb-2 sm:flex-row sm:items-start sm:justify-between">
                        <h3 className="mb-2 font-semibold sm:mb-0">{adaptation.title}</h3>
                        {adaptation.year !== 9999 && (
                          <div className="flex items-center gap-2">
                            <Badge>{adaptation.type}</Badge>
                            <Badge variant="outline">{adaptation.year}</Badge>
                          </div>
                        )}
                      </div>
                      
                      {adaptation.director && (
                        <p className="mb-1 text-sm">
                          <span className="font-medium">Director:</span> {adaptation.director}
                        </p>
                      )}
                      
                      {adaptation.stars && adaptation.stars.length > 0 && (
                        <p className="mb-2 text-sm">
                          <span className="font-medium">Cast:</span> {adaptation.stars.join(", ")}
                        </p>
                      )}
                      
                      <p className="text-sm text-muted-foreground">{adaptation.description}</p>
                    </div>
                  ))
                ) : (
                  <p>No adaptations available for this work.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ratings Tab */}
        <TabsContent value="ratings" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Ratings</CardTitle>
              <CardDescription>What critics and readers say</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {book.ratings.map((rating, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="py-3 bg-muted/50">
                      <CardTitle className="text-base">{rating.source}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 text-center">
                      <div className="mb-1 text-3xl font-bold">{rating.score}</div>
                      {rating.outOf && (
                        <p className="text-xs text-muted-foreground">out of {rating.outOf}</p>
                      )}
                      {rating.link && (
                        <a 
                          href={rating.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block mt-2 text-xs text-primary hover:underline"
                        >
                          View on site
                        </a>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 