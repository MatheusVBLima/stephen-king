import { Metadata } from "next"
import { notFound } from "next/navigation"

import { BookDetail } from "@/components/BookDetail"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { getWorkDetailViewModelBySlug } from "@/lib/imported-content"

interface WorkPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const work = getWorkDetailViewModelBySlug(resolvedParams.slug)

  if (!work) {
    return {
      title: "Obra não encontrada",
      description: "A obra solicitada não foi encontrada.",
    }
  }

  return {
    title: `${work.title} | Obras de Stephen King`,
    description: work.summary,
  }
}

export default async function WorkDetailPage({ params }: WorkPageProps) {
  const resolvedParams = await params
  const work = getWorkDetailViewModelBySlug(resolvedParams.slug)

  if (!work) {
    notFound()
  }

  const breadcrumbSegments = [
    { name: "Obras", href: "/works" },
    { name: work.title, href: work.canonicalHref, isCurrent: true },
  ]

  return (
    <main className="px-4 py-6 sm:px-6 md:py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:gap-8">
        <Breadcrumb segments={breadcrumbSegments} />
        <BookDetail book={work} />
      </div>
    </main>
  )
}
