import type { ImportedPageSource, ImportedPostSource } from "@/lib/types"
import { importedWorkRouteOverrides } from "@/lib/imported-content-overrides"

export const AUTHOR_PAGE_SLUGS = new Set(["stephen-king", "stephen-king-2", "richard-bachman"])
export const CITY_PAGE_SLUGS = new Set(["derry", "castle-rock", "jerusalems-lot", "as-cidades"])
export const BOOK_HUB_SLUGS = new Set(["livros", "livros-de-contos", "os-livros"])
export const ADAPTATION_HUB_SLUGS = new Set([
  "adaptacoes",
  "adaptacoes-para-o-cinema",
  "adaptacoes-para-a-tv",
  "series",
  "minisseries",
  "continuacoes",
  "hqs",
])

export type EditorialKind = "author" | "city" | "adaptation" | "book" | "especial"

export function normalizeEditorialText(value: string) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
}

export function isJunkEditorialParagraph(paragraph: string) {
  const normalized = normalizeEditorialText(paragraph)
  if (!normalized) return true

  return (
    normalized.startsWith("gostou deste conteudo") ||
    normalized.includes("compartilhe") ||
    normalized.startsWith("professor de lingua portuguesa") ||
    normalized.includes("access token could not be decrypted") ||
    normalized.includes("re authorize your instagram") ||
    normalized.includes("como posso entrar em contato") ||
    normalized.includes("voces possuem alguma ligacao oficial") ||
    normalized.startsWith("search") && normalized.length < 12
  )
}

export function classifyImportedPage(page: ImportedPageSource): EditorialKind {
  const slug = page.sourceSlug
  const haystack = `${page.title} ${page.summary} ${page.sections.map((section) => section.title).join(" ")}`

  if (AUTHOR_PAGE_SLUGS.has(slug)) return "author"
  if (CITY_PAGE_SLUGS.has(slug)) return "city"
  if (importedWorkRouteOverrides[slug]) return "book"
  if (ADAPTATION_HUB_SLUGS.has(slug)) return "adaptation"
  if (BOOK_HUB_SLUGS.has(slug)) return "book"

  if (page.originalTitle || page.translatedTitle || /sobre o livro/i.test(haystack)) {
    return "book"
  }

  if (
    /dire[cç][aã]o/i.test(haystack) ||
    /elenco/i.test(haystack) ||
    /ano de estreia/i.test(haystack) ||
    /\(\d{4}\)/.test(page.title)
  ) {
    return "adaptation"
  }

  return "especial"
}

export function isCityEditorialPost(post: ImportedPostSource) {
  return /^as cidades de stephen king/i.test(post.title)
}

export function slugifyEditorial(value: string) {
  return normalizeEditorialText(value).replace(/\s+/g, "-")
}
