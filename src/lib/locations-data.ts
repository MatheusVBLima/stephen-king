import { FictionalLocation } from './types';

// These coordinates are approximations based on the fictional map of Maine
// Real Maine coordinates are used as a base, with adjustments for fictional towns
export const locations: FictionalLocation[] = [
    {
        id: 'derry',
        name: 'Derry',
        coordinates: [44.8023, -68.7778], // Fictional - based near Bangor
        description: 'Derry é uma cidade do estado do Maine, que se situa ao longo da interestadual 95, ao sul de Dexter e ao oeste de Bangor e Haven. Aparentemente trata-se de uma típica cidade norte-americana interiorana, mas marcada por ciclos de violência e por uma memória coletiva que prefere esquecer.',
        books: ['It, A Coisa', 'Insônia', 'Novembro de 63', 'O Apanhador de Sonhos'],
        importance: 'major',
        imageUrl: '/images/locations/derry-hd.png',
        firstAppearance: 'It, A Coisa',
        href: '/map/derry'
    },
    {
        id: 'castle-rock',
        name: 'Castle Rock',
        coordinates: [43.8073, -70.2567], // Fictional - based in western Maine
        description: 'Castle Rock, por vezes chamada de “The Rock”, é uma cidade imaginária da geografia fictícia do Maine criada por Stephen King. Serve de palco para romances, novelas e contos, e estreou em A Zona Morta.',
        books: ['A Zona Morta', 'Cujo', 'A Metade Sombria', 'Ascensão'],
        importance: 'major',
        imageUrl: '/images/locations/castle-rock-hd.png',
        firstAppearance: 'A Zona Morta',
        href: '/map/castle-rock'
    },
    {
        id: 'jerusalems-lot',
        name: "Jerusalem's Lot",
        coordinates: [43.5021, -70.4529], // Fictional - based near Portland
        description: 'Jerusalem’s Lot, também conhecida como Salem’s Lot ou apenas Lot, é uma cidade fictícia da topografia do Maine de Stephen King. Serviu de cenário para o romance Salem e para contos de Sombras da Noite.',
        books: ['Salem', 'Sombras da Noite'],
        importance: 'major',
        imageUrl: '/images/locations/jerusalems-lot.jpg',
        firstAppearance: 'Salem',
        href: '/map/jerusalems-lot'
    }
];

// Function to get all locations
export function getAllLocations(): FictionalLocation[] {
    return locations;
}

// Function to get a location by ID
export function getLocationById(id: string): FictionalLocation | undefined {
    return locations.find(location => location.id === id);
}

// Function to get major locations
export function getMajorLocations(): FictionalLocation[] {
    return locations.filter(location => location.importance === 'major');
}

// Function to get locations by book
export function getLocationsByBook(bookTitle: string): FictionalLocation[] {
    return locations.filter(location =>
        location.books.some(book => book.toLowerCase() === bookTitle.toLowerCase())
    );
} 
