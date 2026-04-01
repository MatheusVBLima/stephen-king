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

// Data of recurring characters in Stephen King's works (pt-BR)
const characters: Character[] = [
    {
        id: "pennywise",
        name: "Pennywise (It)",
        slug: "pennywise",
        description: "Pennywise é a forma predominante da criatura alienígena conhecida como \"It\". Aparece como palhaço para atrair crianças e se alimenta do medo antes de devorar as vítimas. É um ser interdimensional que hibernou por milhões de anos antes de chegar à Terra.",
        imageUrl: "/images/characters/pennywise.jpg",
        books: [
            {
                bookTitle: "It",
                role: "Antagonista",
                significance: "Principal",
                notes: "Antagonista central da história, encarnando o mal absoluto."
            }
        ],
        relationships: [
            {
                characterName: "Clube dos Otários",
                characterId: "losers-club",
                relationshipType: "Inimigo",
                description: "O grupo de crianças (e depois adultos) que enfrenta e no fim derrota Pennywise."
            }
        ],
        traits: ["Metamorfo", "Manipulador", "Imortal", "Aterrorizante", "Alimenta-se de medo"],
        quotes: [
            {
                text: "We all float down here.",
                book: "It",
                context: "Uma das frases mais icônicas do personagem, usada para atrair vítimas."
            },
            {
                text: "I am the eater of worlds, and of children. And you are next, Richie.",
                book: "It",
                context: "Pennywise gabando-se de seu poder."
            }
        ],
        isVillain: true,
        firstAppearance: "It"
    },
    {
        id: "losers-club",
        name: "Clube dos Otários",
        slug: "losers-club",
        description: "Grupo de sete crianças unidas por experiências traumáticas com Pennywise em Derry. Voltam adultos para enfrentar o mal 27 anos depois. São conhecidos pelo vínculo profundo, coragem e determinação diante do mal sobrenatural.",
        imageUrl: "/images/characters/losers-club.jpg",
        books: [
            {
                bookTitle: "It",
                role: "Protagonista",
                significance: "Principal",
                notes: "Protagonistas coletivos que enfrentam Pennywise."
            }
        ],
        relationships: [
            {
                characterName: "Pennywise (It)",
                characterId: "pennywise",
                relationshipType: "Inimigo",
                description: "A entidade maligna que aterroriza Derry e que os Otários juram destruir."
            }
        ],
        traits: ["Corajosos", "Leais", "Traumatizados", "Unidos", "Resilientes"],
        quotes: [
            {
                text: "If we stick together, anything we imagine can become reality.",
                book: "It",
                context: "Bill Denbrough fala sobre o poder do grupo unido."
            }
        ],
        isVillain: false,
        firstAppearance: "It"
    },

    {
        id: "cujo",
        name: "Cujo",
        slug: "cujo",
        description: "Outrora um São Bernardo dócil, torna-se um monstro assassino após infecção raivosa. Simboliza como o mal pode corromper até o mais inocente e como o terror surge de situações cotidianas.",
        imageUrl: "/images/characters/cujo.jpg",
        books: [
            {
                bookTitle: "Cujo",
                role: "Antagonista",
                significance: "Principal",
                notes: "O cão transformado em assassino que aterroriza Donna e Tad Trenton."
            }
        ],
        relationships: [
            {
                characterName: "Família Trenton",
                characterId: "trenton-family",
                relationshipType: "Inimigo",
                description: "As principais vítimas de Cujo durante o surto de raiva."
            }
        ],
        traits: ["Instintivo", "Brutal", "Transformado", "Doente", "Irracional"],
        quotes: [
            {
                text: "It wasn't Cujo's fault. It was just something that happened.",
                book: "Cujo",
                context: "Reflexão sobre tragédia sem vilões deliberados."
            }
        ],
        isVillain: true,
        firstAppearance: "Cujo"
    },
    {
        id: "sheriff-bannerman",
        name: "Xerife George Bannerman",
        slug: "sheriff-bannerman",
        description: "O xerife de Castle Rock em várias histórias da cidade. Responsável, dedicado e ligado à comunidade, representa a lei numa cidade frequentemente assolada pelo sobrenatural.",
        imageUrl: "/images/characters/sheriff-bannerman.jpg",
        books: [
            {
                bookTitle: "The Dead Zone",
                role: "Coadjuvante",
                significance: "Principal",
                notes: "Busca a ajuda de Johnny Smith para esclarecer assassinatos em série."
            },
            {
                bookTitle: "Cujo",
                role: "Coadjuvante",
                significance: "Secundário",
                notes: "Investiga os incidentes envolvendo Cujo."
            }
        ],
        relationships: [
            {
                characterName: "Johnny Smith",
                characterId: "johnny-smith",
                relationshipType: "Colega",
                description: "Trabalha com Johnny Smith usando as habilidades psíquicas dele para crimes."
            }
        ],
        traits: ["Dedicado", "Justo", "Cético", "Protetor", "Resiliente"],
        quotes: [
            {
                text: "This town has seen too many strange things for me to dismiss any possibility.",
                book: "The Dead Zone",
                context: "Sobre os eventos sobrenaturais em Castle Rock."
            }
        ],
        isVillain: false,
        firstAppearance: "The Dead Zone"
    },

    {
        id: "kurt-barlow",
        name: "Kurt Barlow",
        slug: "kurt-barlow",
        description: "O vampiro principal que invade a pequena Jerusalem's Lot. Ancião e poderoso, representa o mal ancestral que se infiltra em comunidades aparentemente inocentes. Conquista a cidade metodicamente, transformando habitantes em vampiros.",
        imageUrl: "/images/characters/kurt-barlow.jpg",
        books: [
            {
                bookTitle: "Salem's Lot",
                role: "Antagonista",
                significance: "Principal",
                notes: "O vampiro mestre que transforma a cidade em ninho de mortos-vivos."
            }
        ],
        relationships: [
            {
                characterName: "Ben Mears",
                characterId: "ben-mears",
                relationshipType: "Inimigo",
                description: "O escritor que volta a Jerusalem's Lot e lidera a resistência contra Barlow."
            },
            {
                characterName: "Richard Straker",
                characterId: "richard-straker",
                relationshipType: "Aliado",
                description: "Servo humano de Barlow que prepara sua chegada à cidade."
            }
        ],
        traits: ["Ancião", "Manipulador", "Cruel", "Paciente", "Predador"],
        quotes: [
            {
                text: "Look at me. Your faith against mine. You have your good cross, I have my years. Which do you think will win, do you think?",
                book: "Salem's Lot",
                context: "Desafiando o padre Callahan no confronto."
            }
        ],
        isVillain: true,
        firstAppearance: "Salem's Lot"
    },
    {
        id: "ben-mears",
        name: "Ben Mears",
        slug: "ben-mears",
        description: "Escritor que volta à cidade natal, Jerusalem's Lot, para enfrentar medos de infância ligados à Casa Marsten. Passa a liderar um pequeno grupo contra a ameaça vampírica. Simboliza a luta do cidadão comum contra o mal sobrenatural.",
        imageUrl: "/images/characters/ben-mears.jpg",
        books: [
            {
                bookTitle: "Salem's Lot",
                role: "Protagonista",
                significance: "Principal",
                notes: "Protagonista que lidera a luta contra os vampiros."
            }
        ],
        relationships: [
            {
                characterName: "Kurt Barlow",
                characterId: "kurt-barlow",
                relationshipType: "Inimigo",
                description: "O vampiro que Ben precisa destruir para salvar Jerusalem's Lot."
            },
            {
                characterName: "Susan Norton",
                characterId: "susan-norton",
                relationshipType: "Interesse amoroso",
                description: "Moradora de Jerusalem's Lot que se torna interesse amoroso de Ben."
            }
        ],
        traits: ["Determinado", "Reflexivo", "Corajoso", "Traumatizado", "Resiliente"],
        quotes: [
            {
                text: "The town knew evil had come, but each person interpreted it as they wished.",
                book: "Salem's Lot",
                context: "Sobre como o mal se infiltra numa comunidade."
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
