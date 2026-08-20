import generatedContent from "@/generated/imported-content.generated.json"
import {
  cleanImportedText,
  getPreviewText,
  getPrimaryContentText,
  hasMeaningfulContent,
} from "@/lib/content-display"
import {
  ADAPTATION_HUB_SLUGS,
  classifyImportedPage,
  isCityEditorialPost,
  isJunkEditorialParagraph,
  slugifyEditorial,
} from "@/lib/imported-taxonomy"
import { slugify as bookSlugify } from "@/lib/books-data"
import { getRelatedWorksForLocation } from "@/lib/skbr-editorial-policy"
import { allWorks } from "@/lib/works-data"
import type {
  AdaptationCatalogItem,
  AdaptationCatalogKind,
  AuthorPersona,
  AuthorViewModel,
  CityEditorial,
  ContentImage,
  ImportedGeneratedContent,
  ImportedPageSource,
  ImportedPostSource,
  ImportedSection,
} from "@/lib/types"

const data = generatedContent as unknown as ImportedGeneratedContent

const CITY_LOCATION_ALIASES: Record<string, string> = {
  derry: "derry",
  "castle-rock": "castle-rock",
  castle: "castle-rock",
  "jerusalems-lot": "jerusalems-lot",
  jerusalem: "jerusalems-lot",
  salem: "jerusalems-lot",
}

function sanitizeParagraphs(paragraphs: string[]) {
  const cleaned: string[] = []

  for (const paragraph of paragraphs) {
    const text = cleanImportedText(paragraph)
    if (!text || isJunkEditorialParagraph(text)) {
      if (cleaned.length > 0 && isJunkEditorialParagraph(text)) {
        break
      }
      continue
    }
    cleaned.push(text)
  }

  return cleaned
}

function sanitizeSections(sections: ImportedSection[]): ImportedSection[] {
  return sections
    .map((section) => ({
      ...section,
      paragraphs: sanitizeParagraphs(section.paragraphs),
    }))
    .filter((section) => section.paragraphs.length > 0)
}

function sanitizeImages(images: ContentImage[]) {
  return images.filter(
    (image) => !/banner|wkit|siteoficial|logocelular|bannertorre/i.test(`${image.src} ${image.alt}`),
  )
}

function groupBeats(paragraphs: string[], fallbackTitle: string): ImportedSection[] {
  const beats: ImportedSection[] = []
  let currentTitle = fallbackTitle
  let buffer: string[] = []

  const flush = () => {
    const usable = sanitizeParagraphs(buffer)
    if (!usable.length) return
    beats.push({
      id: slugifyEditorial(currentTitle) || `secao-${beats.length + 1}`,
      title: currentTitle,
      paragraphs: usable,
    })
  }

  for (const paragraph of paragraphs) {
    const isHeading = paragraph.length < 70 && !/[.!?]$/.test(paragraph) && paragraph.split(/\s+/).length <= 8
    if (isHeading) {
      flush()
      currentTitle = paragraph
      buffer = []
      continue
    }
    buffer.push(paragraph)
  }

  flush()
  return beats
}

export function getAuthorContent(): AuthorViewModel | null {
  const page =
    data.pages.find((entry) => entry.sourceSlug === "stephen-king") ||
    data.pages.find((entry) => entry.sourceSlug === "stephen-king-2")

  if (!page) return null

  const sections = sanitizeSections(page.sections)
  const paragraphs = sections.flatMap((section) => section.paragraphs)
  const kingBeats = groupBeats(paragraphs, "A vida de Stephen King")
  const personas: AuthorPersona[] = [
    {
      id: "king",
      title: "Stephen King",
      sourceUrl: page.url,
      beats: kingBeats,
      images: sanitizeImages(page.images),
    },
  ]

  const bachman = data.pages.find((entry) => entry.sourceSlug === "richard-bachman")
  if (bachman) {
    const bachmanSections = sanitizeSections(bachman.sections)
    const bachmanParagraphs = bachmanSections.flatMap((section) => section.paragraphs)
    personas.push({
      id: "bachman",
      title: "Richard Bachman",
      sourceUrl: bachman.url,
      beats: groupBeats(bachmanParagraphs, "Richard Bachman"),
      images: sanitizeImages(bachman.images),
    })
  }

  const beats = personas.flatMap((persona) => persona.beats)
  const summary = getPrimaryContentText(page.summary, kingBeats) || kingBeats[0]?.paragraphs[0] || ""

  return {
    title: "Stephen King",
    summary,
    sourceUrl: page.url,
    date: page.date,
    beats,
    images: sanitizeImages(page.images),
    personas,
  }
}

function matchCityLocationId(title: string, slug: string) {
  const haystack = slugifyEditorial(`${slug} ${title}`)
  for (const [alias, locationId] of Object.entries(CITY_LOCATION_ALIASES)) {
    if (haystack.includes(alias)) {
      return locationId
    }
  }
  return null
}

export function getCityEditorial(locationId: string): CityEditorial | null {
  const posts = data.posts.filter(isCityEditorialPost)
  const post = posts.find((entry) => matchCityLocationId(entry.title, entry.sourceSlug) === locationId)
  const page = data.pages.find((entry) => matchCityLocationId(entry.title, entry.sourceSlug) === locationId)

  const source: ImportedPageSource | ImportedPostSource | undefined = post || page
  if (!source) return null

  const sections = sanitizeSections(source.sections)
  const summary =
    getPrimaryContentText(source.summary, sections) || sanitizeParagraphs(source.paragraphs)[0] || ""

  return {
    locationId,
    title: source.title.replace(/^as cidades de stephen king:\s*/i, "").trim() || source.title,
    summary,
    sourceUrl: source.url,
    sections,
    images: sanitizeImages(source.images),
    relatedBooks: (getRelatedWorksForLocation(locationId) || []).map((work) => work.title),
    relatedWorks: getRelatedWorksForLocation(locationId),
  }
}

function inferAdaptationKind(title: string, slug: string): AdaptationCatalogKind {
  const haystack = `${title} ${slug}`.toLowerCase()
  if (haystack.includes("hq") || haystack.includes("quadrinho") || haystack.includes("comic") || haystack.includes("torre-negra-")) {
    return "hq"
  }
  if (haystack.includes("miniss") || haystack.includes("mini-serie") || haystack.includes("mini serie")) {
    return "minisserie"
  }
  if (
    haystack.includes("sér") ||
    haystack.includes("serie") ||
    haystack.includes("season") ||
    /haven|chapelwaite|kingdom-hospital|castle-rock-2018|mr-mercedes-2017|outsider-2020|o-instituto-2025|it-bem-vindos|sob-a-redoma-2013/.test(
      haystack,
    )
  ) {
    return "serie"
  }
  return "cinema"
}

function parseChronology(page: ImportedPageSource | undefined): AdaptationCatalogItem[] {
  if (!page) return []

  const blob = page.paragraphs.join(" ")
  const pattern = /(\d{4})\s*[–—-]\s*(.+?)(?=\s+\d{4}\s*[–—-]|$)/g
  const items: AdaptationCatalogItem[] = []
  let match = pattern.exec(blob)

  while (match) {
    const year = Number(match[1])
    const title = cleanImportedText(match[2])
    if (title) {
      const slug = slugifyEditorial(`${year}-${title}`)
      items.push(buildAdaptationItem({
        slug,
        title,
        year,
        kind: inferAdaptationKind(title, slug),
        summary: `Adaptação de ${year}.`,
        sourceUrl: page.url,
        images: [],
        sections: [],
        hasImportedDetail: false,
      }))
    }
    match = pattern.exec(blob)
  }

  return items
}

function relatedWorkHref(title: string) {
  const needle = slugifyEditorial(title)
  if (!needle) return null

  const match = allWorks.find((work) => {
    const workKey = slugifyEditorial(work.title)
    if (!workKey || workKey.length < 3) return needle === workKey
    return needle === workKey || needle.startsWith(`${workKey}-`) || needle.endsWith(`-${workKey}`)
  })

  return match ? `/works/${bookSlugify(match.title)}` : null
}

function buildAdaptationItem(input: Omit<AdaptationCatalogItem, "href" | "relatedWorkHref"> & { relatedWorkHref?: string | null }): AdaptationCatalogItem {
  return {
    ...input,
    href: `/adaptacoes/${input.slug}`,
    relatedWorkHref: input.relatedWorkHref ?? relatedWorkHref(input.title),
  }
}

function adaptationFromPage(page: ImportedPageSource): AdaptationCatalogItem {
  const sections = sanitizeSections(page.sections)
  const yearMatch = page.title.match(/\b(19|20)\d{2}\b/)
  const yearFromFacts = Number.parseInt(page.technicalFacts["Ano de Publicação"] || page.technicalFacts["Ano de estreia"] || "", 10)

  return buildAdaptationItem({
    slug: page.sourceSlug,
    title: page.title,
    year: yearFromFacts || (yearMatch ? Number(yearMatch[0]) : null),
    kind: inferAdaptationKind(page.title, page.sourceSlug),
    summary: getPreviewText(getPrimaryContentText(page.summary, sections) || page.summary, 220),
    sourceUrl: page.url,
    images: sanitizeImages(page.images),
    sections,
    hasImportedDetail: sections.some((section) => section.paragraphs.join(" ").length > 180),
  })
}

export function getAdaptationCatalog(): AdaptationCatalogItem[] {
  const detailPages = data.pages
    .filter((page) => classifyImportedPage(page) === "adaptation" && !ADAPTATION_HUB_SLUGS.has(page.sourceSlug))
    .map(adaptationFromPage)

  const chronology = parseChronology(
    data.pages.find((page) => page.sourceSlug === "adaptacoes-para-o-cinema"),
  )

  const bySlug = new Map<string, AdaptationCatalogItem>()
  for (const item of [...chronology, ...detailPages]) {
    const key = slugifyEditorial(item.title) || item.slug
    const existing = bySlug.get(key)
    if (!existing || (item.hasImportedDetail && !existing.hasImportedDetail)) {
      bySlug.set(key, item)
    }
  }

  return [...bySlug.values()].sort((left, right) => (right.year || 0) - (left.year || 0) || left.title.localeCompare(right.title, "pt-BR"))
}

export function getAdaptationBySlug(slug: string): AdaptationCatalogItem | null {
  return getAdaptationCatalog().find((item) => item.slug === slug) ?? null
}

export function getAdaptationHubImages() {
  const hub = data.pages.find((page) => page.sourceSlug === "adaptacoes")
  return sanitizeImages(hub?.images || []).slice(0, 12)
}
