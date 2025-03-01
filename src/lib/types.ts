// Tipos para as obras de Stephen King

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