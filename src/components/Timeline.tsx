"use client";

import { useState, useMemo } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { BookDetail } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { BookOpen, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { slugify } from '@/lib/books-data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Particles } from '@/components/magicui/particles';

interface TimelineProps {
  books: BookDetail[];
}

export function Timeline({ books }: TimelineProps) {
  const [periodFilter, setPeriodFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const router = useRouter();

  const decades = useMemo(() => {
    const allYears = books.map(book => book.year);
    const minYear = Math.min(...allYears);
    const maxYear = Math.max(...allYears);
    
    const startDecade = Math.floor(minYear / 10) * 10;
    const endDecade = Math.ceil(maxYear / 10) * 10;
    
    const decades = [];
    for (let decade = startDecade; decade <= endDecade; decade += 10) {
      decades.push(`${decade}s`);
    }
    
    return decades;
  }, [books]);

  const locations = useMemo(() => {
    return [...new Set(books.map(book => book.location))];
  }, [books]);

  const filteredBooks = useMemo(() => {
    return books
      .filter(book => {
        if (periodFilter === "all") return true;
        const decade = Math.floor(book.year / 10) * 10;
        return `${decade}s` === periodFilter;
      })
      .filter(book => {
        if (locationFilter === "all") return true;
        return book.location === locationFilter;
      })
      .sort((a, b) => a.year - b.year);
  }, [books, periodFilter, locationFilter]);

  const getIconStyle = (format: string) => {
    const baseStyle = { 
      background: 'var(--background)', 
      color: 'var(--foreground)',
      boxShadow: '0 0 0 4px var(--border), inset 0 2px 0 rgba(0, 0, 0, 0.08), 0 3px 0 4px rgba(0, 0, 0, 0.05)' 
    };
    
    return baseStyle;
  };

  const navigateToBook = (book: BookDetail) => {
    router.push(`/${book.location}/${slugify(book.title)}`);
  };

  const getFormatColor = (format: string) => {
    switch (format.toLowerCase()) {
      case 'novel':
        return '#6366f1'; // indigo-500
      case 'short story':
        return '#f59e0b'; // amber-500
      case 'novella':
        return '#10b981'; // emerald-500
      default:
        return '#6366f1'; // default indigo
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col justify-between gap-4 mb-8 md:flex-row">
        <div className="w-full md:w-48">
          <label className="block mb-2 text-sm font-medium">Período</label>
          <Select
            value={periodFilter}
            onValueChange={setPeriodFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecionar período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os períodos</SelectItem>
              {decades.map(decade => (
                <SelectItem key={decade} value={decade}>{decade}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-48">
          <label className="block mb-2 text-sm font-medium">Localização</label>
          <Select
            value={locationFilter}
            onValueChange={setLocationFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecionar localização" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as localizações</SelectItem>
              {locations.map(location => (
                <SelectItem key={location} value={location}>{location}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-muted-foreground">Nenhum livro corresponde aos filtros</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setPeriodFilter("all");
              setLocationFilter("all");
            }}
          >
            Limpar filtros
          </Button>
        </div>
      ) : (
        <VerticalTimeline>
          {filteredBooks.map((book) => (
            <VerticalTimelineElement
              key={book.title}
              date={book.year.toString()}
              iconStyle={getIconStyle(book.format)}
              icon={<BookOpen className="w-5 h-5" />}
              className="transition-all cursor-pointer hover:scale-[1.02]"
              onTimelineElementClick={() => navigateToBook(book)}
              contentStyle={{ background: 'transparent', boxShadow: 'none' }}
              contentArrowStyle={{ borderRight: '7px solid transparent' }}
            >
              <Card className="relative overflow-hidden bg-transparent border-0 shadow-none">
                <div className="relative w-full h-40 overflow-hidden bg-black rounded-md">
                  {/* Particles background */}
                  <Particles
                    className="absolute inset-0 z-0"
                    quantity={80}
                    staticity={30}
                    color={getFormatColor(book.format)}
                    size={0.6}
                  />
                  
                  {/* Content overlay */}
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
                    <CardTitle className="mb-4 text-xl font-bold text-center text-white">
                      {book.title}
                    </CardTitle>
                    <div className="flex flex-wrap justify-center gap-2">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {book.year}
                      </Badge>
                      <Badge variant="secondary">{book.format}</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      )}
    </div>
  );
} 