// Types for Stephen King's works

export interface Work {
    year: number;
    title: string;
    format: string;
    notes: string;
    location: string;
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
    role: 'Protagonist' | 'Antagonist' | 'Supporting' | 'Mentioned';
    significance: 'Major' | 'Minor';
    notes?: string;
}

export interface Relationship {
    characterName: string;
    characterId: string;
    relationshipType: 'Friend' | 'Enemy' | 'Family' | 'Colleague' | 'Love Interest' | 'Other';
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