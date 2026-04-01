import generatedContent from "@/generated/imported-content.generated.json";
import { getAllBooks, slugify as bookSlugify } from "@/lib/books-data";
import {
  cleanImportedText,
  getPrimaryContentText,
  hasMeaningfulContent,
} from "@/lib/content-display";
import { importedWorkRouteOverrides } from "@/lib/imported-content-overrides";
import type {
  BookDetail,
  ContentImage,
  ImportedArticle,
  ImportedGeneratedContent,
  ImportedPageSource,
  ImportedSection,
  ImportedWorkContent,
  ImportedWorkMappingStatus,
  Work,
  WorkDetailViewModel,
} from "@/lib/types";
import { allWorks } from "@/lib/works-data";

const data = generatedContent as unknown as ImportedGeneratedContent;

const NON_DETAIL_LOCATIONS = new Set(["", "none", "various", "multiple"]);

const normalizedWorks = allWorks.map((work) => {
  const slug = bookSlugify(work.title);
  return {
    ...work,
    slug,
    normalizedTitle: normalizeText(work.title),
    detail: getAllBooks().find((book) => bookSlugify(book.title) === slug) ?? null,
  };
});

const workCandidatesByTitle = new Map<string, typeof normalizedWorks>();
for (const work of normalizedWorks) {
  const keys = new Set([normalizeText(work.title), normalizeText(work.detail?.title || "")]);

  for (const key of keys) {
    if (!key) continue;
    const existing = workCandidatesByTitle.get(key) || [];
    existing.push(work);
    workCandidatesByTitle.set(key, existing);
  }
}

const workImportMatches = buildWorkImportMatches();
const importedWorkBySlug = new Map(
  workImportMatches.matched.map((match) => [match.workSlug, match.content]),
);
const importedArticles = buildImportedArticles(workImportMatches.unmatchedPages);
const importedArticlesBySlug = new Map(importedArticles.map((entry) => [entry.slug, entry]));

export function getImportedWorkContentBySlug(workSlug: string): ImportedWorkContent | null {
  return importedWorkBySlug.get(workSlug) ?? null;
}

export function getImportedArticles(): ImportedArticle[] {
  return importedArticles;
}

export function getImportedArticleBySlug(slug: string): ImportedArticle | null {
  return importedArticlesBySlug.get(slug) ?? null;
}

export function getImportedWorkMappingStatus(): ImportedWorkMappingStatus[] {
  return workImportMatches.status;
}

export function getAllWorksWithImportedState(): Array<
  Work & {
    slug: string;
    href: string;
    hasImportedContent: boolean;
    hasDetailPage: boolean;
    importedSummary?: string;
  }
> {
  return normalizedWorks.map((work) => ({
    ...work,
    href: `/works/${work.slug}`,
    hasImportedContent: importedWorkBySlug.has(work.slug),
    hasDetailPage: true,
    importedSummary: importedWorkBySlug.get(work.slug)?.summary,
  }));
}

export function getWorkDetailViewModelBySlug(workSlug: string): WorkDetailViewModel | null {
  const work = normalizedWorks.find((entry) => entry.slug === workSlug);
  if (!work) {
    return null;
  }

  const imported = importedWorkBySlug.get(work.slug) ?? null;
  const baseDetail = work.detail;
  const importedPrimaryText = getPrimaryContentText(imported?.summary, imported?.sections);
  const fallbackSummary = baseDetail?.synopsis || work.notes;

  const mainCharacters = imported?.technicalFacts["Personagens Principais"]
    ? splitDelimitedValues(imported.technicalFacts["Personagens Principais"])
    : baseDetail?.mainCharacters ?? [];

  return {
    slug: work.slug,
    title: work.title,
    year: work.year,
    format: work.format,
    notes: work.notes,
    location: work.location,
    canonicalHref: `/works/${work.slug}`,
    legacyHref: hasLegacyWorkRoute(work) ? `/${work.location}/${work.slug}` : null,
    summary: hasMeaningfulContent(importedPrimaryText) ? importedPrimaryText : fallbackSummary,
    hasImportedContent: Boolean(imported),
    importedContent: imported,
    importedSections: imported?.sections || [],
    technicalFacts: imported?.technicalFacts || {},
    mainCharacters,
    connections: baseDetail?.connections || [],
    adaptations: baseDetail?.adaptations || [],
    ratings: baseDetail?.ratings || [],
    images: imported?.images || [],
  };
}

export function getWorkDetailViewModelByLegacyRoute(
  location: string,
  workSlug: string,
): WorkDetailViewModel | null {
  const detail = getWorkDetailViewModelBySlug(workSlug);
  if (!detail) {
    return null;
  }

  if (detail.location === location) {
    return detail;
  }

  return null;
}

export function searchSiteContent(query: string) {
  const normalizedQuery = normalizeText(query);

  const workResults = normalizedWorks
    .map((work) => {
      const detail = getWorkDetailViewModelBySlug(work.slug);
      const haystack = [
        work.title,
        work.format,
        work.notes,
        detail?.summary,
        detail?.mainCharacters.join(" "),
        detail?.importedContent?.searchText,
      ]
        .filter(Boolean)
        .join(" ");

      return {
        type: "work" as const,
        kind: "obra" as const,
        title: work.title,
        description: detail?.summary || work.notes,
        href: `/works/${work.slug}`,
        badge: "Obra",
        sortDate: work.year,
        categories: [] as string[],
        haystack,
      };
    })
    .filter((entry) => !normalizedQuery || normalizeText(entry.haystack).includes(normalizedQuery));

  const specialResults = importedArticles
    .map((entry) => ({
      type: "editorial" as const,
      kind: entry.kind,
      title: entry.title,
      description: getPrimaryContentText(entry.summary, entry.sections) || cleanImportedText(entry.summary),
      href: `/artigos/${entry.slug}`,
      badge: "Especial",
      sortDate: entry.date ? Date.parse(entry.date) : 0,
      categories: entry.categories,
      haystack: `${entry.title} ${entry.summary} ${entry.searchText} ${entry.categories.join(" ")}`,
    }))
    .filter((entry) => !normalizedQuery || normalizeText(entry.haystack).includes(normalizedQuery));

  return [...workResults, ...specialResults].sort((left, right) => right.sortDate - left.sortDate);
}

function buildWorkImportMatches() {
  const status: ImportedWorkMappingStatus[] = [];
  const matched: Array<{ workSlug: string; content: ImportedWorkContent }> = [];
  const unmatchedPages: ImportedPageSource[] = [];

  for (const page of data.pages) {
    const match = matchImportedPageToWork(page);

    if (!match) {
      status.push({
        sourceSlug: page.sourceSlug,
        sourceTitle: page.title,
        matchedWorkSlug: null,
        matchedWorkTitle: null,
        status: "unmatched",
      });
      unmatchedPages.push(page);
      continue;
    }

    const importedWork: ImportedWorkContent = {
      sourceId: page.sourceId,
      sourceSlug: page.sourceSlug,
      sourceUrl: page.url,
      title: page.title,
      summary: hasMeaningfulContent(getPrimaryContentText(page.summary, page.sections))
        ? getPrimaryContentText(page.summary, page.sections)
        : cleanImportedText(page.summary),
      originalTitle: page.originalTitle,
      translatedTitle: page.translatedTitle,
      technicalFacts: page.technicalFacts,
      sections: page.sections,
      images: page.images,
      searchText: page.searchText,
    };

    matched.push({ workSlug: match.slug, content: importedWork });
    status.push({
      sourceSlug: page.sourceSlug,
      sourceTitle: page.title,
      matchedWorkSlug: match.slug,
      matchedWorkTitle: match.title,
      status: "matched",
    });
  }

  return { matched, unmatchedPages, status };
}

function buildImportedArticles(unmatchedPages: ImportedPageSource[]): ImportedArticle[] {
  const usedSlugs = new Set<string>();

  return unmatchedPages.map((page) => createImportedArticle(page, usedSlugs)).sort((left, right) => {
    const leftDate = left.date ? Date.parse(left.date) : 0;
    const rightDate = right.date ? Date.parse(right.date) : 0;
    return rightDate - leftDate;
  });
}

function createImportedArticle(source: ImportedPageSource, usedSlugs: Set<string>): ImportedArticle {
  let slug = source.sourceSlug;

  if (usedSlugs.has(slug)) {
    slug = `${source.sourceSlug}-${source.sourceId}`;
  }

  usedSlugs.add(slug);

  return {
    slug,
    kind: "especial",
    title: source.title,
    summary: getPrimaryContentText(source.summary, source.sections) || cleanImportedText(source.summary),
    date: source.date,
    url: source.url,
    categories: source.categories,
    tags: [],
    sections: source.sections,
    images: source.images,
    searchText: source.searchText,
  };
}

function matchImportedPageToWork(page: ImportedPageSource) {
  const overrideWorkSlug = importedWorkRouteOverrides[page.sourceSlug];
  if (overrideWorkSlug) {
    return normalizedWorks.find((work) => work.slug === overrideWorkSlug) ?? null;
  }

  const candidateKeys = [page.originalTitle, page.translatedTitle, page.title]
    .map((value) => normalizeText(value || ""))
    .filter(Boolean);

  for (const key of candidateKeys) {
    const exactMatches = workCandidatesByTitle.get(key);
    if (exactMatches?.length === 1) {
      return exactMatches[0];
    }
  }

  const fuzzyCandidates = normalizedWorks.filter((work) =>
    candidateKeys.some((key) => work.normalizedTitle.includes(key) || key.includes(work.normalizedTitle)),
  );

  if (fuzzyCandidates.length === 1) {
    return fuzzyCandidates[0];
  }

  return null;
}

function hasLegacyWorkRoute(work: Work) {
  return !NON_DETAIL_LOCATIONS.has(work.location);
}

function splitDelimitedValues(value: string) {
  return value
    .split(/[;,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeText(value: string) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}
