"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { Calendar } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Timeline as AceternityTimeline } from "@/components/ui/timeline"
import { formatBookFormatForDisplay } from "@/lib/book-display-pt"
import type { Work } from "@/lib/types"
import { formatLocationName, hasSpecificLocation } from "@/lib/work-utils"

interface TimelineProps {
  books: Array<
    Pick<Work, "title" | "year" | "format" | "notes" | "location"> & {
      href: string
    }
  >
}

export function Timeline({ books }: TimelineProps) {
  const [periodFilter, setPeriodFilter] = useState<string>("all")
  const [locationFilter, setLocationFilter] = useState<string>("all")

  const decades = useMemo(() => {
    const allYears = books.map((book) => book.year)
    const minYear = Math.min(...allYears)
    const maxYear = Math.max(...allYears)
    const startDecade = Math.floor(minYear / 10) * 10
    const endDecade = Math.ceil(maxYear / 10) * 10
    const next = []
    for (let decade = startDecade; decade <= endDecade; decade += 10) {
      next.push(`${decade}s`)
    }
    return next
  }, [books])

  const locations = useMemo(() => {
    return Array.from(new Set(books.map((book) => book.location).filter(hasSpecificLocation))).sort(
      (left, right) => formatLocationName(left).localeCompare(formatLocationName(right), "pt-BR"),
    )
  }, [books])

  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        if (periodFilter === "all") return true
        const decade = Math.floor(book.year / 10) * 10
        return `${decade}s` === periodFilter
      })
      .filter((book) => {
        if (locationFilter === "all") return true
        return book.location === locationFilter
      })
      .sort((a, b) => a.year - b.year)
  }, [books, periodFilter, locationFilter])

  const timelineData = useMemo(() => {
    const byYear = new Map<number, typeof filteredBooks>()
    for (const book of filteredBooks) {
      const group = byYear.get(book.year) || []
      group.push(book)
      byYear.set(book.year, group)
    }

    return [...byYear.entries()].map(([year, yearBooks]) => ({
      title: String(year),
      content: (
        <div className="flex flex-col gap-3">
          {yearBooks.map((book) => (
            <Link key={book.href} href={book.href} className="block">
              <Card className="border-border/60 bg-card/55 transition-colors hover:border-primary/30">
                <CardContent className="flex flex-col gap-3 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-lg">{book.title}</CardTitle>
                    <Badge variant="outline">
                      <Calendar data-icon="inline-start" />
                      {book.year}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge>{formatBookFormatForDisplay(book.format)}</Badge>
                    <Badge variant="outline">{formatLocationName(book.location)}</Badge>
                  </div>
                  {book.notes ? (
                    <p className="line-clamp-2 text-sm text-muted-foreground">{book.notes}</p>
                  ) : null}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ),
    }))
  }, [filteredBooks])

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row">
        <div className="w-full md:w-48">
          <label className="mb-2 block text-sm font-medium">Período</label>
          <Select value={periodFilter} onValueChange={setPeriodFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os períodos</SelectItem>
              {decades.map((decade) => (
                <SelectItem key={decade} value={decade}>
                  Anos {decade.replace(/s$/, "")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-48">
          <label className="mb-2 block text-sm font-medium">Local</label>
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o local" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os locais</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {formatLocationName(location)}
                </SelectItem>
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
              setPeriodFilter("all")
              setLocationFilter("all")
            }}
          >
            Limpar filtros
          </Button>
        </div>
      ) : (
        <AceternityTimeline data={timelineData} />
      )}
    </div>
  )
}
