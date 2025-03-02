import { FictionalLocation } from './types';

// These coordinates are approximations based on the fictional map of Maine
// Real Maine coordinates are used as a base, with adjustments for fictional towns
export const locations: FictionalLocation[] = [
    {
        id: 'derry',
        name: 'Derry',
        coordinates: [44.8023, -68.7778], // Fictional - based near Bangor
        description: 'A sinister town haunted by an ancient evil entity. Derry seems to have a curse that makes violent events occur in cycles of 27 years. The town has a dark energy that makes people ignore or forget tragic events.',
        books: ['It', 'Insomnia', '11/22/63', 'Dreamcatcher'],
        importance: 'major',
        imageUrl: '/images/locations/derry.jpg',
        firstAppearance: 'It'
    },
    {
        id: 'castle-rock',
        name: 'Castle Rock',
        coordinates: [43.8073, -70.2567], // Fictional - based in western Maine
        description: 'A small town with a dark history, Castle Rock is the setting for numerous strange occurrences and supernatural events. The town appears calm on the surface but harbors deep secrets.',
        books: ['The Dead Zone', 'Cujo', 'The Dark Half', 'Needful Things', 'Elevation'],
        importance: 'major',
        imageUrl: '/images/locations/castle-rock.jpg',
        firstAppearance: 'The Dead Zone'
    },
    {
        id: 'jerusalems-lot',
        name: "Jerusalem's Lot",
        coordinates: [43.5021, -70.4529], // Fictional - based near Portland
        description: "Also known as Salem's Lot, this small town was overrun by vampires led by Kurt Barlow. The town has an evil history dating back to its founding, centered around the Marsten House that overlooks it.",
        books: ["Salem's Lot", 'One for the Road', 'Jerusalem\'s Lot'],
        importance: 'major',
        imageUrl: '/images/locations/salems-lot.jpg',
        firstAppearance: "Salem's Lot"
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