import { Character } from './types';

// Função para criar um "slug" a partir do nome do personagem
export function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')      // Substitui espaços por hífens
        .replace(/[^\w\-]+/g, '')  // Remove caracteres especiais
        .replace(/\-\-+/g, '-')    // Substitui múltiplos hífens por um único
        .replace(/^-+/, '')        // Remove hífens do início
        .replace(/-+$/, '');       // Remove hífens do final
}

// Dados de personagens recorrentes nas obras de Stephen King
const characters: Character[] = [
    // Personagens de Derry
    {
        id: "pennywise",
        name: "Pennywise (It)",
        slug: "pennywise",
        description: "Pennywise é a forma predominante assumida pela criatura alienígena conhecida como 'It'. Ele aparece como um palhaço para atrair crianças e se alimenta do medo antes de devorar suas vítimas. É um ser interdimensional que hibernou por milhões de anos antes de chegar à Terra.",
        imageUrl: "/images/characters/pennywise.jpg",
        books: [
            {
                bookTitle: "It",
                role: "Antagonist",
                significance: "Major",
                notes: "Principal antagonista da obra, representando o mal puro."
            }
        ],
        relationships: [
            {
                characterName: "Os Perdedores",
                characterId: "losers-club",
                relationshipType: "Enemy",
                description: "O grupo de crianças (e mais tarde adultos) que confronta e eventualmente derrota Pennywise."
            }
        ],
        traits: ["Metamorfo", "Manipulador", "Imortal", "Aterrorizante", "Alimenta-se de medo"],
        quotes: [
            {
                text: "Nós todos flutuamos aqui embaixo.",
                book: "It",
                context: "Uma das frases mais icônicas do personagem, dita para atrair suas vítimas."
            },
            {
                text: "Eu sou o comedor de mundos, e de crianças. E você está próximo, Richie.",
                book: "It",
                context: "Pennywise se gabando de seus poderes."
            }
        ],
        isVillain: true,
        firstAppearance: "It"
    },
    {
        id: "losers-club",
        name: "O Clube dos Perdedores",
        slug: "losers-club",
        description: "Um grupo de sete crianças unidas por suas experiências traumáticas com Pennywise em Derry. Retornam como adultos para confrontar o mal 27 anos depois. São conhecidos por seu vínculo profundo, coragem e determinação frente ao mal sobrenatural.",
        imageUrl: "/images/characters/losers-club.jpg",
        books: [
            {
                bookTitle: "It",
                role: "Protagonist",
                significance: "Major",
                notes: "Protagonistas coletivos que enfrentam Pennywise."
            }
        ],
        relationships: [
            {
                characterName: "Pennywise (It)",
                characterId: "pennywise",
                relationshipType: "Enemy",
                description: "A entidade maligna que aterroriza Derry e que os Perdedores juram destruir."
            }
        ],
        traits: ["Corajosos", "Leais", "Traumatizados", "Unidos", "Resilientes"],
        quotes: [
            {
                text: "Se a gente ficar junto, tudo que a gente imaginar pode virar realidade.",
                book: "It",
                context: "Bill Denbrough falando sobre o poder do grupo unido."
            }
        ],
        isVillain: false,
        firstAppearance: "It"
    },

    // Personagens de Castle Rock
    {
        id: "cujo",
        name: "Cujo",
        slug: "cujo",
        description: "Um São Bernardo outrora amigável que se torna um monstro assassino após ser infectado com raiva. Simboliza como o mal pode corromper até mesmo os mais inocentes e como o terror pode surgir de situações cotidianas.",
        imageUrl: "/images/characters/cujo.jpg",
        books: [
            {
                bookTitle: "Cujo",
                role: "Antagonist",
                significance: "Major",
                notes: "O cão transformado em assassino que aterroriza Donna e Tad Trenton."
            }
        ],
        relationships: [
            {
                characterName: "Família Trenton",
                characterId: "trenton-family",
                relationshipType: "Enemy",
                description: "As principais vítimas de Cujo durante seu surto de raiva."
            }
        ],
        traits: ["Instintivo", "Brutal", "Transformado", "Doente", "Irracional"],
        quotes: [
            {
                text: "Não era culpa de Cujo. Era apenas algo que tinha acontecido.",
                book: "Cujo",
                context: "Reflexão sobre a natureza da tragédia sem vilões deliberados."
            }
        ],
        isVillain: true,
        firstAppearance: "Cujo"
    },
    {
        id: "sheriff-bannerman",
        name: "Xerife George Bannerman",
        slug: "sheriff-bannerman",
        description: "O xerife de Castle Rock que aparece em várias histórias ambientadas na cidade. Responsável, dedicado e profundamente ligado à comunidade, representa a lei e a ordem em uma cidade frequentemente assolada por eventos sobrenaturais.",
        imageUrl: "/images/characters/sheriff-bannerman.jpg",
        books: [
            {
                bookTitle: "The Dead Zone",
                role: "Supporting",
                significance: "Major",
                notes: "Busca a ajuda de Johnny Smith para resolver assassinatos em série."
            },
            {
                bookTitle: "Cujo",
                role: "Supporting",
                significance: "Minor",
                notes: "Investiga os incidentes envolvendo Cujo."
            }
        ],
        relationships: [
            {
                characterName: "Johnny Smith",
                characterId: "johnny-smith",
                relationshipType: "Colleague",
                description: "Trabalha com Johnny Smith para resolver crimes usando as habilidades psíquicas de Johnny."
            }
        ],
        traits: ["Dedicado", "Justo", "Cético", "Protetor", "Resiliente"],
        quotes: [
            {
                text: "Esta cidade já viu coisas estranhas demais para eu desconsiderar qualquer possibilidade.",
                book: "The Dead Zone",
                context: "Refletindo sobre os eventos sobrenaturais em Castle Rock."
            }
        ],
        isVillain: false,
        firstAppearance: "The Dead Zone"
    },

    // Personagens de Salem's Lot
    {
        id: "kurt-barlow",
        name: "Kurt Barlow",
        slug: "kurt-barlow",
        description: "O vampiro principal que invade a pequena cidade de Jerusalem's Lot. Antigo e poderoso, ele representa o mal ancestral que se infiltra em comunidades aparentemente inocentes. Barlow é metódico em sua conquista da cidade, transformando seus habitantes em vampiros.",
        imageUrl: "/images/characters/kurt-barlow.jpg",
        books: [
            {
                bookTitle: "Salem's Lot",
                role: "Antagonist",
                significance: "Major",
                notes: "O vampiro mestre que transforma a cidade em um ninho de mortos-vivos."
            }
        ],
        relationships: [
            {
                characterName: "Ben Mears",
                characterId: "ben-mears",
                relationshipType: "Enemy",
                description: "O escritor que retorna à Jerusalem's Lot e lidera a resistência contra Barlow."
            },
            {
                characterName: "Richard Straker",
                characterId: "richard-straker",
                relationshipType: "Colleague",
                description: "O servo humano de Barlow que prepara sua chegada à cidade."
            }
        ],
        traits: ["Antigo", "Manipulador", "Cruel", "Paciente", "Predador"],
        quotes: [
            {
                text: "Olhe para mim. Sua fé contra a minha. Você tem sua cruz boa, eu tenho meus anos. Qual vencerá, você acha?",
                book: "Salem's Lot",
                context: "Desafiando o Padre Callahan durante seu confronto."
            }
        ],
        isVillain: true,
        firstAppearance: "Salem's Lot"
    },
    {
        id: "ben-mears",
        name: "Ben Mears",
        slug: "ben-mears",
        description: "Um escritor que retorna à sua cidade natal, Jerusalem's Lot, para enfrentar seus medos de infância relacionados à Casa Marsten. Ele acaba liderando um pequeno grupo de sobreviventes contra a ameaça vampírica que toma conta da cidade. Simboliza a luta da pessoa comum contra o mal sobrenatural.",
        imageUrl: "/images/characters/ben-mears.jpg",
        books: [
            {
                bookTitle: "Salem's Lot",
                role: "Protagonist",
                significance: "Major",
                notes: "Protagonista que lidera a luta contra os vampiros."
            }
        ],
        relationships: [
            {
                characterName: "Kurt Barlow",
                characterId: "kurt-barlow",
                relationshipType: "Enemy",
                description: "O vampiro que Ben busca destruir para salvar Jerusalem's Lot."
            },
            {
                characterName: "Susan Norton",
                characterId: "susan-norton",
                relationshipType: "Love Interest",
                description: "Moradora de Jerusalem's Lot que se torna interesse amoroso de Ben."
            }
        ],
        traits: ["Determinado", "Reflexivo", "Corajoso", "Traumatizado", "Resiliente"],
        quotes: [
            {
                text: "A cidade sabia o mal tinha chegado, mas cada pessoa interpretou como quis.",
                book: "Salem's Lot",
                context: "Refletindo sobre como o mal pode se infiltrar em uma comunidade."
            }
        ],
        isVillain: false,
        firstAppearance: "Salem's Lot"
    }
];

// Função para obter todos os personagens
export function getAllCharacters(): Character[] {
    return characters;
}

// Função para obter um personagem específico por slug
export function getCharacterBySlug(slug: string): Character | undefined {
    return characters.find(character => character.slug === slug);
}

// Função para obter personagens por tipo (vilões ou heróis)
export function getCharactersByType(isVillain: boolean): Character[] {
    return characters.filter(character => character.isVillain === isVillain);
}

// Função para obter personagens que aparecem em um livro específico
export function getCharactersByBook(bookTitle: string): Character[] {
    return characters.filter(character =>
        character.books.some(appearance => appearance.bookTitle === bookTitle)
    );
}