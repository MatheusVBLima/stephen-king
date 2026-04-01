"use client";

import { useState, useMemo } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { BookDetail } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { BookOpen, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getMajorLocations } from '@/lib/locations-data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from 'next/link';
import { formatLocationName, getCanonicalWorkHref } from '@/lib/work-utils';
import { formatBookFormatForDisplay } from '@/lib/book-display-pt';

interface TimelineProps {
  books: BookDetail[];
}

export function Timeline({ books }: TimelineProps) {
  const [periodFilter, setPeriodFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");

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
    const majorLocations = getMajorLocations();
    return majorLocations.map(location => location.id);
  }, []);

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
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os períodos</SelectItem>
              {decades.map(decade => (
                <SelectItem key={decade} value={decade}>
                  Anos {decade.replace(/s$/, "")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-48">
          <label className="block mb-2 text-sm font-medium">Local</label>
          <Select
            value={locationFilter}
            onValueChange={setLocationFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o local" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os locais</SelectItem>
              {locations.map(location => (
                <SelectItem key={location} value={location}>{formatLocationName(location)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-muted-foreground">Nenhuma obra corresponde aos filtros selecionados</p>
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
        <VerticalTimeline
          className="custom-timeline"
          lineColor="rgba(255, 255, 255, 0.2)"
        >
          {filteredBooks.map((book) => (
            <VerticalTimelineElement
              key={book.title}
              date={book.year.toString()}
              dateClassName="font-medium"
              iconStyle={getIconStyle(book.format)}
              icon={<BookOpen className="w-5 h-5" />}
              contentStyle={{ 
                background: 'transparent', 
                boxShadow: 'none',
                padding: 0,
                border: 'none'
              }}
              contentArrowStyle={{
                borderRight: '7px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <Link href={getCanonicalWorkHref(book.title)} className="block">
                <Card className="transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-lg">
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg">{book.title}</CardTitle>
                      <Badge variant="outline" className="ml-2">
                        <Calendar className="w-3 h-3 mr-1" />
                        {book.year}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge>{formatBookFormatForDisplay(book.format)}</Badge>
                      <Badge variant="outline" className="capitalize">
                        {formatLocationName(book.location)}
                      </Badge>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                      {book.notes}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      )}
    </div>
  );
} 
