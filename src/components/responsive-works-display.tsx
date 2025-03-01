'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookDetail } from '@/lib/types';
import { slugify } from '@/lib/books-data';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ResponsiveWorksDisplayProps {
  works: BookDetail[];
  location: string;
}

export function ResponsiveWorksDisplay({ works, location }: ResponsiveWorksDisplayProps) {
  // Sort works by year
  const sortedWorks = [...works].sort((a, b) => a.year - b.year);
  const router = useRouter();
  
  const navigateToBook = (bookTitle: string) => {
    router.push(`/${location}/${slugify(bookTitle)}`);
  };
  
  return (
    <div>
      {/* Desktop version (table) - hidden on small screens */}
      <div className="hidden md:block">
        <Table>
          <TableCaption>A list of Stephen King's works set in {location === 'castle-rock' ? 'Castle Rock' : 
                       location === 'derry' ? 'Derry' : 
                       location === 'salems-lot' ? "Salem's Lot" : location}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Publication Year</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Format</TableHead>
              <TableHead className="hidden lg:table-cell">Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedWorks.map((book) => (
              <TableRow 
                key={book.title}
                className="transition-colors cursor-pointer hover:bg-accent/50"
                onClick={() => navigateToBook(book.title)}
              >
                <TableCell>{book.year}</TableCell>
                <TableCell>
                  <Link 
                    href={`/${location}/${slugify(book.title)}`}
                    className="text-primary"
                    onClick={(e) => e.stopPropagation()} // Prevent double navigation
                  >
                    {book.title}
                  </Link>
                </TableCell>
                <TableCell>{book.format}</TableCell>
                <TableCell className="hidden lg:table-cell">{book.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile version (cards) - visible only on small screens */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {sortedWorks.map((book) => (
          <Card 
            key={book.title}
            className="transition-colors cursor-pointer hover:border-primary"
            onClick={() => navigateToBook(book.title)}
          >
            <CardHeader>
              <CardTitle>
                <Link 
                  href={`/${location}/${slugify(book.title)}`}
                  className="text-primary"
                  onClick={(e) => e.stopPropagation()} // Prevent double navigation
                >
                  {book.title}
                </Link>
              </CardTitle>
              <CardDescription>
                <Badge variant="secondary" className="mr-2">
                  {book.year}
                </Badge>
                <Badge variant="outline">{book.format}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{book.notes}</p>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Published in {book.year}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

