import { Character } from './types';

// Function to create a "slug" from the character's name
export function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')      // Replaces spaces with hyphens
        .replace(/[^\w\-]+/g, '')  // Removes special characters
        .replace(/\-\-+/g, '-')    // Replaces multiple hyphens with a single one
        .replace(/^-+/, '')        // Removes hyphens from the beginning
        .replace(/-+$/, '');       // Removes hyphens from the end
}

// Data of recurring characters in Stephen King's works
const characters: Character[] = [
    // Characters from Derry
    {
        id: "pennywise",
        name: "Pennywise (It)",
        slug: "pennywise",
        description: "Pennywise is the predominant form taken by the alien creature known as 'It'. He appears as a clown to attract children and feeds on fear before devouring his victims. He is an interdimensional being that hibernated for millions of years before arriving on Earth.",
        imageUrl: "/images/characters/pennywise.jpg",
        books: [
            {
                bookTitle: "It",
                role: "Antagonist",
                significance: "Major",
                notes: "Main antagonist of the story, representing pure evil."
            }
        ],
        relationships: [
            {
                characterName: "The Losers",
                characterId: "losers-club",
                relationshipType: "Enemy",
                description: "The group of children (and later adults) who confront and eventually defeat Pennywise."
            }
        ],
        traits: ["Shapeshifter", "Manipulative", "Immortal", "Terrifying", "Feeds on fear"],
        quotes: [
            {
                text: "We all float down here.",
                book: "It",
                context: "One of the character's most iconic phrases, used to lure his victims."
            },
            {
                text: "I am the eater of worlds, and of children. And you are next, Richie.",
                book: "It",
                context: "Pennywise boasting about his powers."
            }
        ],
        isVillain: true,
        firstAppearance: "It"
    },
    {
        id: "losers-club",
        name: "The Losers' Club",
        slug: "losers-club",
        description: "A group of seven children united by their traumatic experiences with Pennywise in Derry. They return as adults to confront the evil 27 years later. They are known for their deep bond, courage, and determination in the face of supernatural evil.",
        imageUrl: "/images/characters/losers-club.jpg",
        books: [
            {
                bookTitle: "It",
                role: "Protagonist",
                significance: "Major",
                notes: "Collective protagonists who face Pennywise."
            }
        ],
        relationships: [
            {
                characterName: "Pennywise (It)",
                characterId: "pennywise",
                relationshipType: "Enemy",
                description: "The evil entity that terrorizes Derry and that the Losers swear to destroy."
            }
        ],
        traits: ["Brave", "Loyal", "Traumatized", "United", "Resilient"],
        quotes: [
            {
                text: "If we stick together, anything we imagine can become reality.",
                book: "It",
                context: "Bill Denbrough talking about the power of the united group."
            }
        ],
        isVillain: false,
        firstAppearance: "It"
    },

    // Characters from Castle Rock
    {
        id: "cujo",
        name: "Cujo",
        slug: "cujo",
        description: "A once-friendly Saint Bernard that becomes a killer monster after being infected with rabies. He symbolizes how evil can corrupt even the most innocent and how terror can arise from everyday situations.",
        imageUrl: "/images/characters/cujo.jpg",
        books: [
            {
                bookTitle: "Cujo",
                role: "Antagonist",
                significance: "Major",
                notes: "The dog transformed into a killer that terrorizes Donna and Tad Trenton."
            }
        ],
        relationships: [
            {
                characterName: "Trenton Family",
                characterId: "trenton-family",
                relationshipType: "Enemy",
                description: "The main victims of Cujo during his rabies outbreak."
            }
        ],
        traits: ["Instinctive", "Brutal", "Transformed", "Sick", "Irrational"],
        quotes: [
            {
                text: "It wasn't Cujo's fault. It was just something that happened.",
                book: "Cujo",
                context: "Reflection on the nature of tragedy without deliberate villains."
            }
        ],
        isVillain: true,
        firstAppearance: "Cujo"
    },
    {
        id: "sheriff-bannerman",
        name: "Sheriff George Bannerman",
        slug: "sheriff-bannerman",
        description: "The sheriff of Castle Rock who appears in several stories set in the town. Responsible, dedicated, and deeply connected to the community, he represents law and order in a town frequently plagued by supernatural events.",
        imageUrl: "/images/characters/sheriff-bannerman.jpg",
        books: [
            {
                bookTitle: "The Dead Zone",
                role: "Supporting",
                significance: "Major",
                notes: "Seeks Johnny Smith's help to solve serial murders."
            },
            {
                bookTitle: "Cujo",
                role: "Supporting",
                significance: "Minor",
                notes: "Investigates the incidents involving Cujo."
            }
        ],
        relationships: [
            {
                characterName: "Johnny Smith",
                characterId: "johnny-smith",
                relationshipType: "Colleague",
                description: "Works with Johnny Smith to solve crimes using Johnny's psychic abilities."
            }
        ],
        traits: ["Dedicated", "Fair", "Skeptical", "Protective", "Resilient"],
        quotes: [
            {
                text: "This town has seen too many strange things for me to dismiss any possibility.",
                book: "The Dead Zone",
                context: "Reflecting on the supernatural events in Castle Rock."
            }
        ],
        isVillain: false,
        firstAppearance: "The Dead Zone"
    },

    // Characters from Salem's Lot
    {
        id: "kurt-barlow",
        name: "Kurt Barlow",
        slug: "kurt-barlow",
        description: "The main vampire who invades the small town of Jerusalem's Lot. Ancient and powerful, he represents the ancestral evil that infiltrates seemingly innocent communities. Barlow is methodical in his conquest of the town, turning its inhabitants into vampires.",
        imageUrl: "/images/characters/kurt-barlow.jpg",
        books: [
            {
                bookTitle: "Salem's Lot",
                role: "Antagonist",
                significance: "Major",
                notes: "The master vampire who transforms the town into a nest of undead."
            }
        ],
        relationships: [
            {
                characterName: "Ben Mears",
                characterId: "ben-mears",
                relationshipType: "Enemy",
                description: "The writer who returns to Jerusalem's Lot and leads the resistance against Barlow."
            },
            {
                characterName: "Richard Straker",
                characterId: "richard-straker",
                relationshipType: "Colleague",
                description: "Barlow's human servant who prepares for his arrival in town."
            }
        ],
        traits: ["Ancient", "Manipulative", "Cruel", "Patient", "Predatory"],
        quotes: [
            {
                text: "Look at me. Your faith against mine. You have your good cross, I have my years. Which do you think will win, do you think?",
                book: "Salem's Lot",
                context: "Challenging Father Callahan during their confrontation."
            }
        ],
        isVillain: true,
        firstAppearance: "Salem's Lot"
    },
    {
        id: "ben-mears",
        name: "Ben Mears",
        slug: "ben-mears",
        description: "A writer who returns to his hometown, Jerusalem's Lot, to face his childhood fears related to the Marsten House. He ends up leading a small group of survivors against the vampiric threat that takes over the town. He symbolizes the ordinary person's struggle against supernatural evil.",
        imageUrl: "/images/characters/ben-mears.jpg",
        books: [
            {
                bookTitle: "Salem's Lot",
                role: "Protagonist",
                significance: "Major",
                notes: "Protagonist who leads the fight against the vampires."
            }
        ],
        relationships: [
            {
                characterName: "Kurt Barlow",
                characterId: "kurt-barlow",
                relationshipType: "Enemy",
                description: "The vampire Ben seeks to destroy to save Jerusalem's Lot."
            },
            {
                characterName: "Susan Norton",
                characterId: "susan-norton",
                relationshipType: "Love Interest",
                description: "Resident of Jerusalem's Lot who becomes Ben's love interest."
            }
        ],
        traits: ["Determined", "Reflective", "Brave", "Traumatized", "Resilient"],
        quotes: [
            {
                text: "The town knew evil had come, but each person interpreted it as they wished.",
                book: "Salem's Lot",
                context: "Reflecting on how evil can infiltrate a community."
            }
        ],
        isVillain: false,
        firstAppearance: "Salem's Lot"
    }
];

// Function to get all characters
export function getAllCharacters(): Character[] {
    return characters;
}

// Function to get a specific character by slug
export function getCharacterBySlug(slug: string): Character | undefined {
    return characters.find(character => character.slug === slug);
}

// Function to get characters by type (villains or heroes)
export function getCharactersByType(isVillain: boolean): Character[] {
    return characters.filter(character => character.isVillain === isVillain);
}

// Function to get characters that appear in a specific book
export function getCharactersByBook(bookTitle: string): Character[] {
    return characters.filter(character =>
        character.books.some(appearance => appearance.bookTitle === bookTitle)
    );
}