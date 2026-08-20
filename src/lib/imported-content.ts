import generatedContent from "@/generated/imported-content.generated.json";
import { slugify as bookSlugify } from "@/lib/books-data";
import {
  cleanImportedText,
  getPreviewText,
  getPrimaryContentText,
  hasMeaningfulContent,
} from "@/lib/content-display";
import { importedWorkRouteOverrides } from "@/lib/imported-content-overrides";
import { getAdaptationCatalog, getAuthorContent, getCityEditorial } from "@/lib/imported-editorial";
import {
  BOOK_HUB_SLUGS,
  classifyImportedPage,
  slugifyEditorial,
} from "@/lib/imported-taxonomy";
import { getRelatedWorksForLocation } from "@/lib/skbr-editorial-policy";
import { getAllCharacters } from "@/lib/characters-data";
import { parseEditorialParagraphs } from "@/lib/editorial-blocks";
import type {
  BookAppearance,
  Character,
  ImportedGeneratedContent,
  ImportedPageSource,
  ImportedSection,
  ImportedWorkContent,
  ImportedWorkMappingStatus,
  Work,
  WorkDetailViewModel,
} from "@/lib/types";
import {
  allWorks,
  bachmanWorks,
  darkTowerSeries,
  nonFictionWorks,
  shortStoryCollections,
} from "@/lib/works-data";

const data = generatedContent as unknown as ImportedGeneratedContent;

const NON_DETAIL_LOCATIONS = new Set(["", "none", "various", "multiple"]);

const normalizedWorks = allWorks.map((work) => {
  const slug = bookSlugify(work.title);
  return {
    ...work,
    slug,
    normalizedTitle: normalizeText(work.title),
  };
});

const workCandidatesByTitle = new Map<string, typeof normalizedWorks>();
for (const work of normalizedWorks) {
  const key = normalizeText(work.title);
  if (!key) continue;
  const existing = workCandidatesByTitle.get(key) || [];
  existing.push(work);
  workCandidatesByTitle.set(key, existing);
}

const workImportMatches = buildWorkImportMatches();
const importedWorkBySlug = new Map(
  workImportMatches.matched.map((match) => [match.workSlug, match.content]),
);
let importedCharactersCache: Character[] | null = null;

export function getImportedWorkContentBySlug(workSlug: string): ImportedWorkContent | null {
  return importedWorkBySlug.get(workSlug) ?? null;
}

export function getImportedWorkMappingStatus(): ImportedWorkMappingStatus[] {
  return workImportMatches.status;
}

export function getAllWorksWithImportedState(): Array<
  Work & {
    slug: string;
    href: string;
    displayTitle: string;
    hasImportedContent: boolean;
    hasDetailPage: boolean;
    importedSummary?: string;
    catalogGroup: "fiction" | "nonfiction" | "collections" | "darktower" | "bachman";
  }
> {
  return normalizedWorks
    .filter((work) => importedWorkBySlug.has(work.slug))
    .map((work) => {
      const imported = importedWorkBySlug.get(work.slug);
      const displayTitle = imported?.translatedTitle || imported?.title || work.title;
      const lede = getPreviewText(getPrimaryContentText(imported?.summary, imported?.sections), 220);

      return {
        ...work,
        title: displayTitle,
        notes: lede,
        href: `/works/${work.slug}`,
        displayTitle,
        hasImportedContent: true,
        hasDetailPage: true,
        importedSummary: lede,
        catalogGroup: getCatalogGroup(work),
      };
    });
}

export function getCatalogWorksForLocation(locationId: string) {
  const catalog = getAllWorksWithImportedState();
  const related = getRelatedWorksForLocation(locationId);

  if (related.length) {
    const byHref = new Map(catalog.map((work) => [work.href, work]));
    return related.flatMap((item) => {
      const work = byHref.get(item.href);
      if (!work) return [];
      return [{ ...work, title: item.title, displayTitle: item.title }];
    });
  }

  return catalog.filter((work) => work.location === locationId);
}

export function getImportedCharacters(): Character[] {
  if (importedCharactersCache) return importedCharactersCache;

  const catalog = getAllWorksWithImportedState();
  const skbrBios = extractSkbrCharacterBios();
  const usedSkbr = new Set<string>();

  const merged = getAllCharacters().map((character) => {
    const bio = skbrBios.find((entry) => namesLooselyMatch(entry.name, character.name));
    if (bio) usedSkbr.add(bio.slug);

    const linkedBooks = linkCharacterBooks(character.books, catalog, bio?.body);
    const firstWork = linkedBooks[0];

    return {
      ...character,
      description: bio?.body || character.description,
      books: linkedBooks,
      quotes: [],
      firstAppearance: firstWork?.bookTitle || character.firstAppearance,
      sourceUrl: bio?.sourceUrl,
    };
  });

  const extras = skbrBios
    .filter((bio) => !usedSkbr.has(bio.slug))
    .map((bio) => {
      const linkedBooks = linkCharacterBooks([], catalog, bio.body);
      return {
        id: bio.slug,
        name: bio.name,
        slug: bio.slug,
        description: bio.body,
        books: linkedBooks,
        relationships: [],
        traits: [],
        quotes: [],
        isVillain: inferVillain(bio.body),
        firstAppearance: linkedBooks[0]?.bookTitle || "Arquivo brasileiro",
        sourceUrl: bio.sourceUrl,
      } satisfies Character;
    });

  importedCharactersCache = attachCharacterCovers(
    sortCharacters(mergeNotableCast([...merged, ...extras], catalog)),
  );
  return importedCharactersCache;
}

export function getImportedCharacterBySlug(slug: string) {
  return getImportedCharacters().find((character) => character.slug === slug) ?? null;
}

function extractSkbrCharacterBios() {
  const bios: Array<{ name: string; slug: string; body: string; sourceUrl: string }> = [];

  for (const locationId of ["derry", "castle-rock", "jerusalems-lot"] as const) {
    const editorial = getCityEditorial(locationId);
    if (!editorial) continue;

    for (const section of editorial.sections) {
      for (const block of parseEditorialParagraphs(section.paragraphs)) {
        if (block.type !== "entry" || block.index || !block.body || !isCharacterName(block.title)) {
          continue;
        }

        const name = cleanCharacterName(block.title);
        const slug = slugifyEditorial(name);
        if (!slug || !isCharacterName(name) || bios.some((entry) => entry.slug === slug)) continue;

        bios.push({
          name,
          slug,
          body: block.body,
          sourceUrl: editorial.sourceUrl,
        });
      }
    }
  }

  return bios;
}

function linkCharacterBooks(
  appearances: BookAppearance[],
  catalog: ReturnType<typeof getAllWorksWithImportedState>,
  sourceText?: string,
) {
  const linked = appearances.map((appearance) => {
    const match = findCatalogWork(appearance.bookTitle, catalog);
    return {
      ...appearance,
      bookTitle: match?.displayTitle || appearance.bookTitle,
      href: match?.href,
    };
  });

  const seen = new Set(linked.map((item) => item.href || item.bookTitle));

  for (const title of extractQuotedTitles(sourceText || "")) {
    const match = findCatalogWork(title, catalog);
    const key = match?.href || title;
    if (seen.has(key)) continue;
    seen.add(key);
    linked.push({
      bookTitle: match?.displayTitle || title,
      role: "Mencionado",
      significance: "Secundário",
      href: match?.href,
    });
  }

  return linked;
}

function mergeNotableCast(
  characters: Character[],
  catalog: ReturnType<typeof getAllWorksWithImportedState>,
) {
  const withAppearances = attachCatalogCast(characters, catalog);
  const notables = collectNotableCast(catalog);

  for (const entry of notables) {
    const existing = withAppearances.find((character) => namesLooselyMatch(character.name, entry.name));
    if (existing) {
      const seen = new Set(existing.books.map((book) => book.href || book.bookTitle));
      for (const appearance of entry.books) {
        const key = appearance.href || appearance.bookTitle;
        if (seen.has(key)) continue;
        seen.add(key);
        existing.books.push(appearance);
      }
      continue;
    }

    withAppearances.push({
      id: entry.slug,
      name: entry.name,
      slug: entry.slug,
      description: entry.description,
      books: entry.books,
      relationships: [],
      traits: [],
      quotes: [],
      isVillain: inferVillain(entry.description),
      firstAppearance: entry.books[0]?.bookTitle || "Arquivo brasileiro",
      sourceUrl: entry.sourceUrl,
    });
  }

  return withAppearances;
}

function collectNotableCast(catalog: ReturnType<typeof getAllWorksWithImportedState>) {
  type CastRecord = {
    name: string;
    slug: string;
    books: BookAppearance[];
    workCount: number;
    mentionedInProse: boolean;
    isNovelPrincipal: boolean;
    sourceUrl?: string;
  };

  const records = new Map<string, CastRecord>();

  const upsert = (
    name: string,
    work: (typeof catalog)[number],
    imported: ImportedWorkContent,
    significance: BookAppearance["significance"],
    role: BookAppearance["role"],
    asNovelPrincipal: boolean,
  ) => {
    const key = normalizeText(name);
    if (!key) return;

    const current = records.get(key) || {
      name,
      slug: slugifyEditorial(name),
      books: [],
      workCount: 0,
      mentionedInProse: false,
      isNovelPrincipal: false,
      sourceUrl: imported.sourceUrl,
    };

    current.isNovelPrincipal = current.isNovelPrincipal || asNovelPrincipal;
    current.mentionedInProse =
      current.mentionedInProse || characterMentionedInWorkText(name, imported);

    if (!current.books.some((book) => book.href === work.href)) {
      current.books.push({
        bookTitle: work.displayTitle,
        role,
        significance,
        href: work.href,
      });
    }

    records.set(key, current);
  };

  for (const work of catalog) {
    const imported = importedWorkBySlug.get(work.slug);
    if (!imported || /non-fiction/i.test(work.format)) continue;

    const principalField =
      imported.technicalFacts["Personagens Principais"] || imported.technicalFacts["Personagens"] || "";
    const cited = parseCastNames(imported.technicalFacts["Personagens Citados"] || "");
    const isNovel = /^(Novel|Serial Novel)$/i.test(work.format);
    const isNovellaCollection = /novella collection/i.test(work.format);

    const principals = parseCastNames(principalField);
    const collectionLeads = isNovellaCollection ? parseGroupedCollectionLeads(principalField) : [];

    for (const name of principals) {
      upsert(name, work, imported, "Principal", isNovel ? "Protagonista" : "Coadjuvante", isNovel);
    }
    for (const name of collectionLeads) {
      upsert(name, work, imported, "Principal", "Protagonista", true);
    }
    for (const name of cited) {
      upsert(name, work, imported, "Secundário", "Mencionado", false);
    }
  }

  return [...records.values()]
    .map((entry) => ({
      ...entry,
      workCount: new Set(entry.books.map((book) => book.href)).size,
    }))
    .filter((entry) => {
      if (!entry.slug || isJunkCastName(entry.name)) return false;
      if (entry.workCount >= 2) return true;
      return entry.isNovelPrincipal && entry.mentionedInProse;
    })
    .map((entry) => ({
      name: entry.name,
      slug: entry.slug,
      books: entry.books,
      sourceUrl: entry.sourceUrl,
      description: describeCharacterFromWorks(entry.name, entry.books),
    }));
}

function characterMentionedInWorkText(name: string, imported: ImportedWorkContent) {
  const haystack = normalizeText(
    getPrimaryContentText(imported.summary, imported.sections) || imported.searchText || "",
  );
  const full = normalizeText(name);
  if (full.length >= 8 && haystack.includes(full)) return true;

  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length < 2) return haystack.includes(full) && full.length >= 4;

  const firstLast = normalizeText(`${parts[0]} ${parts[parts.length - 1]}`);
  return firstLast.length >= 8 && haystack.includes(firstLast);
}

function describeCharacterFromWorks(name: string, books: BookAppearance[]) {
  for (const book of books) {
    const slug = book.href?.replace(/^\/works\//, "");
    const imported = slug ? importedWorkBySlug.get(slug) : null;
    if (!imported) continue;

    const prose = getPrimaryContentText(imported.summary, imported.sections);
    const snippet = sentenceMentioningName(prose, name);
    if (snippet) return snippet;
  }

  const titles = books.slice(0, 3).map((book) => book.bookTitle).join(", ");
  return `Nomeado nas fichas do arquivo brasileiro em ${titles}.`;
}

function sentenceMentioningName(text: string, name: string) {
  const needle = normalizeText(name);
  if (!needle || !text) return "";

  const sentences = cleanImportedText(text).split(/(?<=[.!?])\s+/);
  const match = sentences.find((sentence) => normalizeText(sentence).includes(needle));
  return match ? getPreviewText(match, 280) : "";
}

function sortCharacters(characters: Character[]) {
  return [...characters].sort((left, right) => {
    const byBooks = right.books.length - left.books.length;
    if (byBooks) return byBooks;
    return left.name.localeCompare(right.name, "pt-BR");
  });
}

function attachCharacterCovers(characters: Character[]) {
  return characters.map((character) => ({
    ...character,
    imageUrl: getCoverFromAppearances(character.books),
  }));
}

function getCoverFromAppearances(books: BookAppearance[]) {
  const ranked = [...books].sort((left, right) => Number(isSecondaryAppearance(left)) - Number(isSecondaryAppearance(right)));

  for (const book of ranked) {
    const slug = book.href?.replace(/^\/works\//, "");
    const cover = slug ? importedWorkBySlug.get(slug)?.images[0]?.src : undefined;
    if (cover) return cover;
  }

  return undefined;
}

function isSecondaryAppearance(book: BookAppearance) {
  return book.significance === "Secundário" || book.significance === "Minor" || book.role === "Mencionado";
}

function attachCatalogCast(
  characters: Character[],
  catalog: ReturnType<typeof getAllWorksWithImportedState>,
) {
  for (const work of catalog) {
    const imported = importedWorkBySlug.get(work.slug);
    if (!imported) continue;

    const principal = parseCastNames(
      imported.technicalFacts["Personagens Principais"] || imported.technicalFacts["Personagens"] || "",
    );
    const cited = parseCastNames(imported.technicalFacts["Personagens Citados"] || "");

    for (const name of principal) {
      addKnownCharacterAppearance(characters, name, work, "Principal");
    }
    for (const name of cited) {
      addKnownCharacterAppearance(characters, name, work, "Secundário");
    }
  }

  return characters;
}

function addKnownCharacterAppearance(
  characters: Character[],
  name: string,
  work: ReturnType<typeof getAllWorksWithImportedState>[number],
  significance: BookAppearance["significance"],
) {
  const character = characters.find((entry) => namesLooselyMatch(entry.name, name));
  if (!character) return;

  const alreadyListed = character.books.some(
    (book) => book.href === work.href || normalizeText(book.bookTitle) === normalizeText(work.displayTitle),
  );
  if (alreadyListed) return;

  character.books.push({
    bookTitle: work.displayTitle,
    role: "Mencionado",
    significance,
    href: work.href,
  });
}

const CAST_NAME_ALIASES: Record<string, string> = {
  "arnie cunninghan": "Arnie Cunningham",
  "ben hascon": "Ben Hanscom",
  "carrieta white": "Carrie White",
  "detta holmes": "Susannah Dean",
  "detta odetta holmes": "Susannah Dean",
  "detta/odetta holmes": "Susannah Dean",
  "donald callahan": "Padre Callahan",
  "john smith": "Johnny Smith",
  "odetta holmes": "Susannah Dean",
  oi: "Oy",
  "rei roland": "Roland Deschain",
  "roland de gilead": "Roland Deschain",
};

const ONE_WORD_CAST_ALLOWLIST = new Set(["blaine", "cujo", "oi", "oy", "pennywise"]);

function parseCastNames(value: string) {
  const cut = String(value || "").split(
    /Cidades da Hist[oó]ria|Estados da Hist[oó]ria|Adapta[cç][oõ]es|Adapta[cç][aã]o|Dispon[ií]vel no Brasil/i,
  )[0];

  const names: string[] = [];

  for (const item of splitDelimitedValues(cut.replace(/\n•?/g, ";"))) {
    const cleaned = cleanImportedText(item)
      .replace(/\s*\([^)]*\)\s*/g, " ")
      .replace(/^e\s+/i, "")
      .replace(/[.,;]+$/g, "")
      .replace(/\s+/g, " ")
      .trim();

    const parts = cleaned.split(/\s+e\s+/i);
    const pieces =
      parts.length === 2 && parts.every((part) => part.split(/\s+/).length >= 2) ? parts : [cleaned];

    for (const piece of pieces) {
      if (!isCastName(piece) || isJunkCastName(piece)) continue;
      names.push(canonicalizeCastName(piece));
    }
  }

  return names;
}

function parseGroupedCollectionLeads(value: string) {
  return String(value || "")
    .split(/\)\s*;/)
    .flatMap((group) => {
      const beforeParen = group.split("(")[0] || "";
      const names = parseCastNames(beforeParen);
      return names[0] ? [names[0]] : [];
    });
}

function canonicalizeCastName(name: string) {
  const alias = CAST_NAME_ALIASES[normalizeText(name)];
  if (alias) return alias;
  return cleanCharacterName(name);
}

function isJunkCastName(name: string) {
  return /stephen king|tabitha|stewart o.?nan|n\/a|varios|incluindo|protagonistas por|adaptacao|entre outros|cronistas|torcedores|ensaista|palestrante|garoto do colorado|frankenstein|conde dracula|lobisomem|fam[ií]lia |^o pai$|^a madrasta|^a bruxa|^jo[aã]o$|^maria$|^o mayor/i.test(
    name,
  );
}

function isCastName(name: string) {
  if (!name || name.length > 60) return false;
  const words = name.split(/\s+/).filter(Boolean);
  if (words.length >= 2 && words.length <= 6) return true;
  return words.length === 1 && ONE_WORD_CAST_ALLOWLIST.has(normalizeText(name));
}

function findCatalogWork(title: string, catalog: ReturnType<typeof getAllWorksWithImportedState>) {
  const key = normalizeText(title);
  const slug = bookSlugify(title);
  if (!key) return null;

  return (
    catalog.find((work) => work.slug === slug) ||
    catalog.find((work) => normalizeText(work.displayTitle) === key || normalizeText(work.title) === key) ||
    catalog.find((work) => {
      const display = normalizeText(work.displayTitle);
      return display.startsWith(key) || (key.length > 6 && display.includes(key));
    }) ||
    null
  );
}

function extractQuotedTitles(value: string) {
  const titles: string[] = [];
  const pattern = /[“"«]([^”"»]{3,70})[”"»]/g;
  let match = pattern.exec(value);
  while (match) {
    titles.push(match[1].replace(/^do livro\s+/i, "").trim());
    match = pattern.exec(value);
  }
  return titles;
}

function namesLooselyMatch(left: string, right: string) {
  const a = normalizeText(left);
  const b = normalizeText(right);
  if (!a || !b) return false;
  return a === b || a.includes(b) || b.includes(a);
}

function isCharacterName(title: string) {
  if (/personagens|romances|novelas|contos|obras que|lugares|a cidade/i.test(title)) return false;
  return title.split(/\s+/).length <= 6;
}

function cleanCharacterName(name: string) {
  const collapsed = collapseRepeatedName(name.replace(/\s+/g, " ").trim());
  const nickname = collapsed.match(
    /^([A-ZÁÉÍÓÚÀÂÊÔÃÕÜ][\w'’.-]*)\b.+\s+[“"«]([^”"»]+)[”"»]\s+([A-ZÁÉÍÓÚÀÂÊÔÃÕÜ][\w'’.-]*)$/i,
  );
  if (nickname && nickname[1].toLowerCase() === nickname[2].toLowerCase()) {
    return `${nickname[1]} ${nickname[3]}`;
  }
  return collapsed;
}

function collapseRepeatedName(name: string) {
  const parts = name.split(/\s+/);
  if (parts.length >= 2 && parts[0].toLowerCase() === parts[1].toLowerCase()) {
    return parts.slice(1).join(" ");
  }
  const half = Math.floor(parts.length / 2);
  if (half >= 2) {
    const left = parts.slice(0, half).join(" ");
    const right = parts.slice(half).join(" ");
    if (left.toLowerCase() === right.toLowerCase()) {
      return left;
    }
  }
  if (
    parts.length === 4 &&
    parts[1].toLowerCase() === parts[3].toLowerCase() &&
    parts[0][0]?.toLowerCase() === parts[2][0]?.toLowerCase()
  ) {
    return `${parts[0]} ${parts[1]}`;
  }
  return name;
}

function inferVillain(text: string) {
  return /antagonista|vil[aã]o|dem[oô]nio|serial killer|assassino|estrangulador|vampiro/i.test(text);
}

export function getWorkDetailViewModelBySlug(workSlug: string): WorkDetailViewModel | null {
  const work = normalizedWorks.find((entry) => entry.slug === workSlug);
  if (!work) {
    return null;
  }

  const imported = importedWorkBySlug.get(work.slug) ?? null;
  if (!imported) {
    return null;
  }

  const importedPrimaryText = getPrimaryContentText(imported.summary, imported.sections);
  const displayTitle = imported.translatedTitle || imported.title || work.title;
  const mainCharacters = imported.technicalFacts["Personagens Principais"]
    ? splitDelimitedValues(imported.technicalFacts["Personagens Principais"])
    : [];

  return {
    slug: work.slug,
    title: displayTitle,
    year: work.year,
    format: work.format,
    notes: importedPrimaryText,
    location: work.location,
    canonicalHref: `/works/${work.slug}`,
    legacyHref: hasLegacyWorkRoute(work) ? `/${work.location}/${work.slug}` : null,
    summary: importedPrimaryText,
    hasImportedContent: true,
    importedContent: imported,
    importedSections: imported.sections || [],
    technicalFacts: imported.technicalFacts || {},
    mainCharacters,
    connections: [],
    adaptations: [],
    ratings: [],
    images: imported.images || [],
    displayTitle,
    originalTitle: imported.originalTitle,
    sourceUrl: imported.sourceUrl,
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
      if (!detail) return null;
      const haystack = [
        detail.title,
        detail.originalTitle,
        work.title,
        work.format,
        detail.summary,
        detail.mainCharacters.join(" "),
        detail.importedContent?.searchText,
      ]
        .filter(Boolean)
        .join(" ");

      return {
        type: "work" as const,
        kind: "obra" as const,
        title: detail.title,
        description: getPreviewText(detail.summary, 180),
        href: `/works/${work.slug}`,
        badge: "Obra",
        sortDate: work.year,
        categories: [] as string[],
        haystack,
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
    .filter((entry) => !normalizedQuery || normalizeText(entry.haystack).includes(normalizedQuery));

  const author = getAuthorContent()
  const authorResults = author
    ? [
        {
          type: "editorial" as const,
          kind: "autor" as const,
          title: author.title,
          description: getPreviewText(author.summary, 180),
          href: "/autor",
          badge: "Autor",
          sortDate: author.date ? Date.parse(author.date) : 0,
          categories: [] as string[],
          haystack: `${author.title} ${author.summary} ${author.beats.flatMap((beat) => beat.paragraphs).join(" ")}`,
        },
        ...author.personas
          .filter((persona) => persona.id === "bachman")
          .map((persona) => ({
            type: "editorial" as const,
            kind: "autor" as const,
            title: persona.title,
            description: getPreviewText(persona.beats[0]?.paragraphs[0] || "Pseudônimo de Stephen King.", 180),
            href: "/autor",
            badge: "Autor",
            sortDate: author.date ? Date.parse(author.date) : 0,
            categories: [] as string[],
            haystack: `${persona.title} ${persona.beats.flatMap((beat) => beat.paragraphs).join(" ")}`,
          })),
      ].filter((entry) => !normalizedQuery || normalizeText(entry.haystack).includes(normalizedQuery))
    : []

  const cityResults = (["derry", "castle-rock", "jerusalems-lot"] as const)
    .map((locationId) => getCityEditorial(locationId))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
    .map((entry) => ({
      type: "editorial" as const,
      kind: "cidade" as const,
      title: entry.title,
      description: getPreviewText(entry.summary, 180),
      href: `/map/${entry.locationId}`,
      badge: "Cidade",
      sortDate: 0,
      categories: [] as string[],
      haystack: `${entry.title} ${entry.summary} ${entry.sections.flatMap((section) => section.paragraphs).join(" ")}`,
    }))
    .filter((entry) => !normalizedQuery || normalizeText(entry.haystack).includes(normalizedQuery))

  const adaptationResults = getAdaptationCatalog()
    .map((entry) => ({
      type: "editorial" as const,
      kind: "adaptacao" as const,
      title: entry.title,
      description: getPreviewText(entry.summary, 180),
      href: entry.href,
      badge: "Adaptação",
      sortDate: entry.year || 0,
      categories: [] as string[],
      haystack: `${entry.title} ${entry.summary} ${entry.sections.flatMap((section) => section.paragraphs).join(" ")}`,
    }))
    .filter((entry) => !normalizedQuery || normalizeText(entry.haystack).includes(normalizedQuery))

  const characterResults = getImportedCharacters()
    .map((character) => ({
      type: "character" as const,
      kind: "personagem" as const,
      title: character.name,
      description: getPreviewText(character.description, 180),
      href: `/characters/${character.slug}`,
      badge: "Personagem",
      sortDate: 0,
      categories: [] as string[],
      haystack: `${character.name} ${character.description} ${character.books.map((book) => book.bookTitle).join(" ")}`,
    }))
    .filter((entry) => !normalizedQuery || normalizeText(entry.haystack).includes(normalizedQuery))

  return [...workResults, ...authorResults, ...cityResults, ...adaptationResults, ...characterResults].sort((left, right) => right.sortDate - left.sortDate);
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

    const existingIndex = matched.findIndex((entry) => entry.workSlug === match.slug);
    if (existingIndex >= 0) {
      const existingPage = data.pages.find(
        (entry) => entry.sourceSlug === matched[existingIndex].content.sourceSlug,
      );
      if (existingPage && importedContentScore(page) <= importedContentScore(existingPage)) {
        continue;
      }
      matched[existingIndex] = { workSlug: match.slug, content: importedWork };
      continue;
    }

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

function importedContentScore(page: ImportedPageSource) {
  const sectionChars = page.sections.reduce(
    (total, section) => total + section.paragraphs.join(" ").length,
    0,
  );
  return (page.originalTitle ? 10_000 : 0) + sectionChars + page.summary.length;
}

function matchImportedPageToWork(page: ImportedPageSource) {
  const overrideWorkSlug = importedWorkRouteOverrides[page.sourceSlug];
  if (overrideWorkSlug) {
    return normalizedWorks.find((work) => work.slug === overrideWorkSlug) ?? null;
  }

  const editorialKind = classifyImportedPage(page);
  if (
    editorialKind === "author" ||
    editorialKind === "city" ||
    editorialKind === "adaptation" ||
    BOOK_HUB_SLUGS.has(page.sourceSlug)
  ) {
    return null;
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
    candidateKeys.some((key) => titlesLooselyMatch(work.normalizedTitle, key)),
  );

  if (fuzzyCandidates.length === 1) {
    return fuzzyCandidates[0];
  }

  return null;
}

function getCatalogGroup(work: Work): "fiction" | "nonfiction" | "collections" | "darktower" | "bachman" {
  if (bachmanWorks.some((entry) => entry.title === work.title)) return "bachman";
  if (darkTowerSeries.some((entry) => entry.title === work.title)) return "darktower";
  if (shortStoryCollections.some((entry) => entry.title === work.title)) return "collections";
  if (nonFictionWorks.some((entry) => entry.title === work.title)) return "nonfiction";
  return "fiction";
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

function titlesLooselyMatch(left: string, right: string) {
  if (!left || !right) return false;
  if (left === right) return true;

  const shorter = left.length <= right.length ? left : right;
  const longer = left.length <= right.length ? right : left;
  if (shorter.length < 5) return false;

  const pattern = new RegExp(`(?:^| )${shorter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?: |$)`);
  return pattern.test(longer);
}

function normalizeText(value: string) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}
