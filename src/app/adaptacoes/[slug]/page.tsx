import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { AdaptationDetail } from "@/components/AdaptationDetail"
import { PageShell } from "@/components/PageShell"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { getAdaptationBySlug, getAdaptationCatalog } from "@/lib/imported-editorial"

interface AdaptationPageProps {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return getAdaptationCatalog().map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: AdaptationPageProps): Promise<Metadata> {
  const { slug } = await params
  const item = getAdaptationBySlug(slug)

  if (!item) {
    return { title: "Adaptação não encontrada" }
  }

  return {
    title: `${item.title} | Adaptações`,
    description: item.summary,
  }
}

export default async function AdaptationPage({ params }: AdaptationPageProps) {
  const { slug } = await params
  const item = getAdaptationBySlug(slug)

  if (!item) {
    notFound()
  }

  const breadcrumbSegments = [
    { name: "Adaptações", href: "/adaptacoes" },
    { name: item.title, href: item.href, isCurrent: true },
  ]

  return (
    <PageShell>
      <Breadcrumb segments={breadcrumbSegments} />
      <AdaptationDetail item={item} />
    </PageShell>
  )
}
