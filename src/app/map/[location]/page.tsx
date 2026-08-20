import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { LocationDetailContent } from "@/components/LocationDetailContent"
import { PageShell } from "@/components/PageShell"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { getCityEditorial } from "@/lib/imported-editorial"
import { getLocationById } from "@/lib/locations-data"

interface LocationPageProps {
  params: Promise<{
    location: string
  }>
}

const LOCATION_IDS = ["derry", "castle-rock", "jerusalems-lot"] as const

export function generateStaticParams() {
  return LOCATION_IDS.map((location) => ({ location }))
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { location } = await params
  const place = getLocationById(location)

  if (!place) {
    return { title: "Cidade não encontrada" }
  }

  return {
    title: `${place.name} | Mapa`,
    description: place.description,
  }
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { location } = await params
  const place = getLocationById(location)

  if (!place) {
    notFound()
  }

  const editorial = getCityEditorial(location)
  const breadcrumbSegments = [
    { name: "Mapa", href: "/map" },
    { name: place.name, href: `/map/${place.id}`, isCurrent: true },
  ]

  return (
    <PageShell>
      <Breadcrumb segments={breadcrumbSegments} />
      <LocationDetailContent location={place} editorial={editorial} />
    </PageShell>
  )
}
