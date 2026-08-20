import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { BookDetail } from "@/components/BookDetail"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { getWorkDetailViewModelByLegacyRoute } from "@/lib/imported-content"
import { getWorkRouteRedirect } from "@/lib/skbr-editorial-policy"
import { formatLocationName } from "@/lib/work-utils"

interface BookPageProps {
  params: Promise<{
    location: string
    bookTitle: string
  }>
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const { location, bookTitle } = resolvedParams
  if (getWorkRouteRedirect(bookTitle)) {
    return { title: "Redirecionando…" }
  }

  const book = getWorkDetailViewModelByLegacyRoute(location, bookTitle)

  if (!book) {
    return {
      title: "Obra não encontrada",
      description: "A obra solicitada não foi encontrada.",
    }
  }

  return {
    title: `${book.title} | Obras de Stephen King`,
    description: book.summary,
  }
}

export default async function BookPage({ params }: BookPageProps) {
  const resolvedParams = await params
  const { location, bookTitle } = resolvedParams
  const redirectTo = getWorkRouteRedirect(bookTitle)
  if (redirectTo) {
    redirect(redirectTo)
  }

  const book = getWorkDetailViewModelByLegacyRoute(location, bookTitle)

  if (!book) {
    notFound()
  }

  const breadcrumbSegments = [
    { name: formatLocationName(location), href: "/works" },
    { name: book.title, href: book.canonicalHref, isCurrent: true },
  ]

  return (
    <main className="px-4 py-6 sm:px-6 md:py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:gap-8">
        <Breadcrumb segments={breadcrumbSegments} />
        <BookDetail book={book} />
      </div>
    </main>
  )
}
