import { slugify } from "@/lib/books-data"

export const workRouteRedirects: Record<string, string> = {
  "one-for-the-road": "/works/night-shift",
  "jerusalems-lot": "/works/night-shift",
  "the-stand-the-complete-uncut-edition": "/works/the-stand",
}

const RELATED_WORKS_BY_LOCATION: Record<string, Array<{ title: string; href: string }>> = {
  derry: [
    { title: "It, A Coisa", href: "/works/it" },
    { title: "Insônia", href: "/works/insomnia" },
    { title: "Novembro de 63", href: "/works/112263" },
    { title: "O Apanhador de Sonhos", href: "/works/dreamcatcher" },
  ],
  "castle-rock": [
    { title: "A Zona Morta", href: "/works/the-dead-zone" },
    { title: "Cujo", href: "/works/cujo" },
    { title: "A Metade Sombria", href: "/works/the-dark-half" },
    { title: "Ascensão", href: "/works/elevation" },
  ],
  "jerusalems-lot": [
    { title: "Salem", href: "/works/salems-lot" },
    { title: "Sombras da Noite", href: "/works/night-shift" },
  ],
}

export function getWorkRouteRedirect(slug: string) {
  return workRouteRedirects[slug] || null
}

export function getCanonicalWorkHref(title: string) {
  const slug = slugify(title)
  return workRouteRedirects[slug] || `/works/${slug}`
}

export function getRelatedWorksForLocation(locationId: string) {
  return RELATED_WORKS_BY_LOCATION[locationId] || []
}
