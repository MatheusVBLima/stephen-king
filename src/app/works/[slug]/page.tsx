import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { BookDetail } from "@/components/BookDetail"
import { PageShell } from "@/components/PageShell"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { getWorkDetailViewModelBySlug } from "@/lib/imported-content"
import { getWorkRouteRedirect } from "@/lib/skbr-editorial-policy"

interface WorkPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const resolvedParams = await params
  if (getWorkRouteRedirect(resolvedParams.slug)) {
    return { title: "Redirecionando…" }
  }

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
  const redirectTo = getWorkRouteRedirect(resolvedParams.slug)
  if (redirectTo) {
    redirect(redirectTo)
  }

  const work = getWorkDetailViewModelBySlug(resolvedParams.slug)

  if (!work) {
    notFound()
  }

  const breadcrumbSegments = [
    { name: "Obras", href: "/works" },
    { name: work.title, href: work.canonicalHref, isCurrent: true },
  ]

  return (
    <PageShell>
      <Breadcrumb segments={breadcrumbSegments} />
      <BookDetail book={work} />
    </PageShell>
  )
}
