import type { ImportedSection } from "@/lib/types"

const PREFERRED_SECTION_KEYWORDS = [
  "sobre",
  "resenha",
  "sinopse",
  "apresentacao",
  "apresentação",
  "conteudo",
  "conteúdo",
]

const EXCLUDED_SECTION_KEYWORDS = [
  "ficha tecnica",
  "ficha técnica",
  "curiosidades",
  "conexoes",
  "conexões",
  "personagens",
  "adaptacoes",
  "adaptações",
  "capas",
  "galeria",
]

const METADATA_MARKERS = [
  "titulo original",
  "título original",
  "titulo traduzido",
  "título traduzido",
  "ano de publicacao",
  "ano de publicação",
  "data de publicacao",
  "data de publicação",
  "personagens principais",
  "cidade da historia",
  "cidade da história",
  "estados da historia",
  "estados da história",
  "adaptacoes",
  "adaptações",
  "disponivel no brasil",
  "disponível no brasil",
]

export function cleanImportedText(value: string | null | undefined) {
  return String(value || "")
    .replace(/\s*\[\.\.\.\]\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export function getPrimaryContentText(
  summary: string | null | undefined,
  sections: ImportedSection[] | null | undefined
) {
  const safeSections = sections || []
  const preferredSection = [...safeSections]
    .map((section) => ({
      section,
      usableParagraphs: section.paragraphs
        .map((paragraph) => cleanImportedText(paragraph))
        .filter((paragraph) => isMeaningfulText(paragraph)),
    }))
    .filter((entry) => entry.usableParagraphs.length > 0)
    .sort((left, right) => scoreSection(right.section, right.usableParagraphs) - scoreSection(left.section, left.usableParagraphs))[0]

  if (preferredSection) {
    return preferredSection.usableParagraphs[0] || ""
  }

  const cleanedSummary = cleanImportedText(summary)
  return isMeaningfulText(cleanedSummary) ? cleanedSummary : ""
}

export function hasMeaningfulContent(value: string | null | undefined) {
  return isMeaningfulText(cleanImportedText(value))
}

export function getPreviewText(value: string | null | undefined, maxLength = 220) {
  const cleaned = cleanImportedText(value)
  if (!cleaned) return ""
  if (cleaned.length <= maxLength) return cleaned

  const sliced = cleaned.slice(0, maxLength)
  const lastSpace = sliced.lastIndexOf(" ")
  const safeSlice = lastSpace > maxLength * 0.6 ? sliced.slice(0, lastSpace) : sliced

  return `${safeSlice.trimEnd()}…`
}

function hasKeyword(value: string, keywords: string[]) {
  const normalized = normalizeText(value)
  return keywords.some((keyword) => normalized.includes(normalizeText(keyword)))
}

function scoreSection(section: ImportedSection, usableParagraphs: string[]) {
  let score = 0

  if (hasKeyword(section.title, PREFERRED_SECTION_KEYWORDS)) score += 6
  if (hasKeyword(section.title, EXCLUDED_SECTION_KEYWORDS)) score -= 6

  score += Math.min(usableParagraphs.length, 3)
  score += Math.min(usableParagraphs.join(" ").length / 300, 3)

  return score
}

function isMeaningfulText(value: string) {
  const cleaned = cleanImportedText(value)
  if (!cleaned) return false
  if (cleaned.length < 80) return false
  if (countWords(cleaned) < 12) return false
  if (isMetadataHeavy(cleaned)) return false
  return true
}

function isMetadataHeavy(value: string) {
  const normalized = normalizeText(value)
  const markerMatches = METADATA_MARKERS.filter((marker) => normalized.includes(normalizeText(marker))).length
  return markerMatches >= 2
}

function countWords(value: string) {
  return value.split(/\s+/).filter(Boolean).length
}

function normalizeText(value: string) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}
