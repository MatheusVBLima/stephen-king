'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, Search, X } from 'lucide-react';

import { formatBookFormatForDisplay } from '@/lib/book-display-pt';
import { getCanonicalWorkHref } from '@/lib/work-utils';
import { BookDetail } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ResponsiveWorksDisplayProps {
  works: BookDetail[];
  location: string;
}

interface WorkTableRow {
  format: string;
  href: string;
  notes: string;
  title: string;
  year: number;
}

const PAGE_SIZE = 10;

const formatFilterFn: FilterFn<WorkTableRow> = (row, columnId, filterValue: string) => {
  if (!filterValue || filterValue === 'todos') {
    return true;
  }

  return row.getValue<string>(columnId) === filterValue;
};

const getLocationLabel = (location: string) => {
  if (location === 'castle-rock') return 'Castle Rock';
  if (location === 'derry') return 'Derry';
  if (location === 'jerusalems-lot') return "Jerusalem's Lot";
  return location;
};

export function ResponsiveWorksDisplay({ works, location }: ResponsiveWorksDisplayProps) {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'year', desc: false }]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    { id: 'format', value: 'todos' },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });

  const data = useMemo<WorkTableRow[]>(
    () =>
      [...works]
        .sort((a, b) => a.year - b.year)
        .map((book) => ({
          year: book.year,
          title: book.title,
          format: formatBookFormatForDisplay(book.format),
          notes: book.notes,
          href: getCanonicalWorkHref(book.title),
        })),
    [works],
  );

  const formatOptions = useMemo(() => {
    return Array.from(new Set(data.map((book) => book.format))).sort((left, right) =>
      left.localeCompare(right, 'pt-BR'),
    );
  }, [data]);

  const columns = useMemo<ColumnDef<WorkTableRow>[]>(
    () => [
      {
        accessorKey: 'year',
        header: ({ column }) => (
          <Button
            type="button"
            variant="ghost"
            className="-ml-3 h-8 px-3"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Ano de publicação
            <ArrowUpDown data-icon="inline-end" />
          </Button>
        ),
        cell: ({ row }) => <span>{row.original.year}</span>,
      },
      {
        accessorKey: 'title',
        header: ({ column }) => (
          <Button
            type="button"
            variant="ghost"
            className="-ml-3 h-8 px-3"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Título
            <ArrowUpDown data-icon="inline-end" />
          </Button>
        ),
        cell: ({ row }) => (
          <Link href={row.original.href} className="text-primary transition-opacity hover:opacity-80">
            {row.original.title}
          </Link>
        ),
      },
      {
        accessorKey: 'format',
        filterFn: formatFilterFn,
        header: ({ column }) => (
          <Button
            type="button"
            variant="ghost"
            className="-ml-3 h-8 px-3"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Formato
            <ArrowUpDown data-icon="inline-end" />
          </Button>
        ),
        cell: ({ row }) => <span>{row.original.format}</span>,
      },
      {
        accessorKey: 'notes',
        header: 'Notas',
        cell: ({ row }) => (
          <span className="line-clamp-2 leading-7 text-muted-foreground lg:line-clamp-none">
            {row.original.notes}
          </span>
        ),
      },
    ],
    [],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      columnFilters,
      pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    globalFilterFn: 'includesString',
    autoResetPageIndex: false,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const formatFilterValue = String(columnFilters.find((filter) => filter.id === 'format')?.value ?? 'todos');
  const rows = table.getRowModel().rows;
  const totalRows = table.getFilteredRowModel().rows.length;
  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;

  const visiblePages = Array.from({ length: pageCount }, (_, index) => index).filter(
    (pageIndex) => Math.abs(pageIndex - currentPage) <= 1 || pageIndex === 0 || pageIndex === pageCount - 1,
  );

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <Card className="rounded-[1.75rem] border-border/60 bg-card/55">
        <CardContent className="flex flex-col gap-6 px-5 py-6 sm:px-8 sm:py-8">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px_auto] lg:items-end">
            <div className="flex flex-col gap-3">
              <span className="text-sm font-medium">Buscar nesta tabela</span>
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={globalFilter}
                  onChange={(event) => {
                    setGlobalFilter(event.target.value);
                    table.setPageIndex(0);
                  }}
                  placeholder="Pesquisar título, formato ou notas..."
                  className="h-12 rounded-2xl border-border/60 bg-background/60 pl-11 pr-12"
                />
                {globalFilter ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 size-10 rounded-full"
                    onClick={() => {
                      setGlobalFilter('');
                      table.setPageIndex(0);
                    }}
                  >
                    <X />
                    <span className="sr-only">Limpar busca</span>
                  </Button>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-sm font-medium">Formato</span>
              <Select
                value={formatFilterValue}
                onValueChange={(value) => {
                  setColumnFilters([{ id: 'format', value }]);
                  table.setPageIndex(0);
                }}
              >
                <SelectTrigger className="h-12 rounded-2xl border-border/60 bg-background/60 px-4">
                  <SelectValue placeholder="Todos os formatos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os formatos</SelectItem>
                  {formatOptions.map((format) => (
                    <SelectItem key={format} value={format}>
                      {format}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-3 text-sm text-muted-foreground lg:items-end">
              <span>{totalRows} obras encontradas</span>
              <span>
                Página {currentPage + 1} de {pageCount || 1}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="hidden md:block">
        <Table>
          <TableCaption>{`Obras de Stephen King ambientadas em ${getLocationLabel(location)}`}</TableCaption>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className={header.column.id === 'notes' ? 'hidden lg:table-cell' : ''}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={cell.column.id === 'notes' ? 'hidden lg:table-cell' : ''}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  Nenhuma obra encontrada com os filtros atuais.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {rows.length > 0 ? (
          rows.map((row) => {
            const book = row.original;

            return (
              <Link key={book.title} href={book.href} className="block">
                <Card className="transition-colors hover:border-primary/40">
                  <CardHeader className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">{book.year}</Badge>
                      <Badge variant="outline">{book.format}</Badge>
                    </div>
                    <div className="flex flex-col gap-2">
                      <CardTitle className="text-primary">{book.title}</CardTitle>
                      <CardDescription className="leading-7 text-muted-foreground">
                        {book.notes}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardFooter>
                    <div className="text-xs text-muted-foreground">{`Publicado em ${book.year}`}</div>
                  </CardFooter>
                </Card>
              </Link>
            );
          })
        ) : (
          <Card>
            <CardContent className="px-5 py-8 text-sm leading-7 text-muted-foreground">
              Nenhuma obra encontrada com os filtros atuais.
            </CardContent>
          </Card>
        )}
      </div>

      {pageCount > 1 ? (
        <Pagination>
          <PaginationContent className="flex-nowrap">
            {table.getCanPreviousPage() ? (
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    table.previousPage();
                  }}
                />
              </PaginationItem>
            ) : null}

            {visiblePages.map((pageIndex, index) => (
              <PaginationItem
                key={pageIndex}
                className={pageIndex === currentPage ? 'block' : 'hidden sm:block'}
              >
                {index > 0 && visiblePages[index - 1] !== pageIndex - 1 ? (
                  <PaginationEllipsis className="hidden sm:flex" />
                ) : null}
                <PaginationLink
                  href="#"
                  isActive={pageIndex === currentPage}
                  onClick={(event) => {
                    event.preventDefault();
                    table.setPageIndex(pageIndex);
                  }}
                >
                  {pageIndex + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {table.getCanNextPage() ? (
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    table.nextPage();
                  }}
                />
              </PaginationItem>
            ) : null}
          </PaginationContent>
        </Pagination>
      ) : null}
    </div>
  );
}
