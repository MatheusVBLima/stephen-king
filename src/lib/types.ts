// Types for Stephen King's works

export interface Work {
    year: number;
    title: string;
    format: string;
    notes: string;
    location: string;
}

export interface ContentImage {
    src: string;
    alt: string;
}

export interface ImportedSection {
    id: string;
    title: string;
    paragraphs: string[];
}

export interface ImportedPageSource {
    sourceId: number;
    sourceType: 'page';
    sourceSlug: string;
    title: string;
    url: string;
    date: string | null;
    summary: string;
    categories: string[];
    originalTitle: string | null;
    translatedTitle: string | null;
    technicalFacts: Record<string, string>;
    sections: ImportedSection[];
    paragraphs: string[];
    images: ContentImage[];
    searchText: string;
}

export interface ImportedPostSource {
    sourceId: number;
    sourceType: 'post';
    sourceSlug: string;
    title: string;
    url: string;
    date: string | null;
    summary: string;
    categories: string[];
    tags: string[];
    sections: ImportedSection[];
    paragraphs: string[];
    images: ContentImage[];
    searchText: string;
}

export interface ImportedGeneratedContent {
    generatedAt: string;
    stats: {
        pages: number;
        posts: number;
        copiedAssets: number;
    };
    pages: ImportedPageSource[];
    posts: ImportedPostSource[];
}

export interface ImportedWorkContent {
    sourceId: number;
    sourceSlug: string;
    sourceUrl: string;
    title: string;
    summary: string;
    originalTitle: string | null;
    translatedTitle: string | null;
    technicalFacts: Record<string, string>;
    sections: ImportedSection[];
    images: ContentImage[];
    searchText: string;
}

export interface ImportedArticle {
    slug: string;
    kind: 'especial';
    title: string;
    summary: string;
    date: string | null;
    url: string;
    categories: string[];
    tags: string[];
    sections: ImportedSection[];
    images: ContentImage[];
    searchText: string;
}

export interface ImportedWorkMappingStatus {
    sourceSlug: string;
    sourceTitle: string;
    matchedWorkSlug: string | null;
    matchedWorkTitle: string | null;
    status: 'matched' | 'unmatched';
}

export interface WorkDetailViewModel extends Work {
    slug: string;
    canonicalHref: string;
    legacyHref: string | null;
    summary: string;
    hasImportedContent: boolean;
    importedContent: ImportedWorkContent | null;
    importedSections: ImportedSection[];
    technicalFacts: Record<string, string>;
    mainCharacters: string[];
    connections: Connection[];
    adaptations: Adaptation[];
    ratings: Rating[];
    images: ContentImage[];
}

export interface BookDetail extends Work {
    synopsis: string;
    mainCharacters: string[];
    connections: Connection[];
    adaptations: Adaptation[];
    ratings: Rating[];
}

export interface Connection {
    title: string;
    description: string;
}

export interface Adaptation {
    title: string;
    type: 'Movie' | 'TV Series' | 'TV Movie' | 'Miniseries';
    year: number;
    director?: string;
    stars?: string[];
    description: string;
}

export interface Rating {
    source: string;
    score: string;
    outOf?: string;
    link?: string;
}

// Interfaces for recurring characters

export interface Character {
    id: string;
    name: string;
    slug: string;
    description: string;
    imageUrl?: string;
    books: BookAppearance[];
    relationships: Relationship[];
    traits: string[];
    quotes: Quote[];
    isVillain: boolean;
    firstAppearance: string;  // Título do livro da primeira aparição
}

export interface BookAppearance {
    bookTitle: string;
    role: 'Protagonist' | 'Antagonist' | 'Supporting' | 'Mentioned' | 'Protagonista' | 'Antagonista' | 'Coadjuvante' | 'Mencionado';
    significance: 'Major' | 'Minor' | 'Principal' | 'Secundário';
    notes?: string;
}

export interface Relationship {
    characterName: string;
    characterId: string;
    relationshipType: 'Friend' | 'Enemy' | 'Family' | 'Colleague' | 'Love Interest' | 'Other' | 'Inimigo' | 'Colega' | 'Aliado' | 'Interesse amoroso';
    description: string;
}

export interface Quote {
    text: string;
    book: string;
    context?: string;
}

// Interfaces for the Maine map

export interface FictionalLocation {
    id: string;
    name: string;
    coordinates: [number, number]; // [latitude, longitude]
    description: string;
    books: string[]; // List of book titles where this location appears
    importance: 'major' | 'minor';
    imageUrl?: string;
    firstAppearance: string;
} 
