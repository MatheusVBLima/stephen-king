import { BookDetail } from './types';

export const bookDetails: Record<string, BookDetail> = {
    "the-dead-zone": {
        year: 1979,
        title: "The Dead Zone",
        format: "Novel",
        notes: "Introduces Castle Rock as a key setting.",
        location: "castle-rock",
        synopsis: "After a car crash puts Johnny Smith in a coma for nearly five years, he awakens with the ability to see the future and the terrible fate that awaits mankind in the form of politician Greg Stillson. When Johnny has a vision of Stillson becoming president and causing a nuclear war, he must decide: should he assassinate a candidate to save millions of lives?",
        mainCharacters: [
            "Johnny Smith - A schoolteacher who gains psychic abilities after a coma",
            "Sarah Bracknell - Johnny's former girlfriend who moved on during his coma",
            "Greg Stillson - An ambitious and dangerous politician",
            "Sheriff George Bannerman - Castle Rock's sheriff who seeks Johnny's help",
            "Herb Smith - Johnny's father"
        ],
        connections: [
            {
                title: "IT",
                description: "The town of Derry is mentioned in The Dead Zone."
            },
            {
                title: "Cujo",
                description: "Sheriff Bannerman appears in both novels, connecting the Castle Rock stories."
            },
            {
                title: "The Dark Half",
                description: "Castle Rock is a prominent setting in both novels."
            }
        ],
        adaptations: [
            {
                title: "The Dead Zone",
                type: "Movie",
                year: 1983,
                director: "David Cronenberg",
                stars: ["Christopher Walken", "Martin Sheen", "Brooke Adams"],
                description: "A critically acclaimed film adaptation directed by David Cronenberg, starring Christopher Walken as Johnny Smith."
            },
            {
                title: "The Dead Zone",
                type: "TV Series",
                year: 2002,
                stars: ["Anthony Michael Hall", "Nicole de Boer"],
                description: "A television series that ran for six seasons, expanding on the concept from the novel with new storylines."
            }
        ],
        ratings: [
            {
                source: "Goodreads",
                score: "3.97",
                outOf: "5",
                link: "https://www.goodreads.com/book/show/11576.The_Dead_Zone"
            },
            {
                source: "Barnes & Noble",
                score: "4.4",
                outOf: "5"
            },
            {
                source: "TheBestBooks.org",
                score: "4.19",
                outOf: "5"
            }
        ]
    },
    "cujo": {
        year: 1981,
        title: "Cujo",
        format: "Novel",
        notes: "Focuses on Castle Rock families impacted by a rabid dog.",
        location: "castle-rock",
        synopsis: "Cujo is a good dog, a big Saint Bernard, until a bat bite drives him mad. The once friendly dog turns into a killer, trapping a mother and her young son in their Ford Pinto with no food, water, or means of escape. As the hot summer days unfold, their situation becomes increasingly desperate and terrifying.",
        mainCharacters: [
            "Cujo - A Saint Bernard infected with rabies",
            "Donna Trenton - A mother trapped in a car with her son",
            "Tad Trenton - Donna's young son",
            "Vic Trenton - Donna's husband who is away on business",
            "Joe Camber - Cujo's owner",
            "Sheriff George Bannerman - Castle Rock's sheriff"
        ],
        connections: [
            {
                title: "The Dead Zone",
                description: "Sheriff Bannerman appears in both novels."
            },
            {
                title: "The Body",
                description: "Set in the same town of Castle Rock."
            },
            {
                title: "Needful Things",
                description: "References to events in Castle Rock."
            },
            {
                title: "Pet Sematary",
                description: "Makes references to the events in Cujo."
            }
        ],
        adaptations: [
            {
                title: "Cujo",
                type: "Movie",
                year: 1983,
                director: "Lewis Teague",
                stars: ["Dee Wallace", "Danny Pintauro", "Daniel Hugh-Kelly"],
                description: "A film adaptation released in 1983, known for its intense scenes of the mother and son trapped in the car."
            }
        ],
        ratings: [
            {
                source: "Goodreads",
                score: "3.7",
                outOf: "5",
                link: "https://www.goodreads.com/book/show/10603.Cujo"
            },
            {
                source: "Barnes & Noble",
                score: "4.2",
                outOf: "5"
            },
            {
                source: "TheBestBooks.org",
                score: "3.82",
                outOf: "5"
            }
        ]
    },
    "the-body": {
        year: 1982,
        title: "The Body",
        format: "Novella",
        notes: "Published in Different Seasons, set in Castle Rock in the 1960s.",
        location: "castle-rock",
        synopsis: "During the summer of 1960, four twelve-year-old boys from Castle Rock set out on a journey to find the body of a missing boy from a neighboring town. As they follow the railway tracks towards their destination, they face various challenges and share personal stories that reveal their troubled lives and dreams for the future.",
        mainCharacters: [
            "Gordie Lachance - The narrator and aspiring writer",
            "Chris Chambers - Gordie's best friend from a troubled family",
            "Teddy Duchamp - A boy with an unstable and abusive father",
            "Vern Tessio - The boy who overheard about the location of the body",
            "Ray Brower - The missing boy whose body they seek"
        ],
        connections: [
            {
                title: "Needful Things",
                description: "References to Castle Rock locals mentioned in The Body."
            },
            {
                title: "Cujo",
                description: "Set in the same town several years later."
            },
            {
                title: "The Sun Dog",
                description: "Takes place in the same town."
            }
        ],
        adaptations: [
            {
                title: "Stand By Me",
                type: "Movie",
                year: 1986,
                director: "Rob Reiner",
                stars: ["Wil Wheaton", "River Phoenix", "Corey Feldman", "Jerry O'Connell"],
                description: "A highly acclaimed coming-of-age film adaptation directed by Rob Reiner, often considered one of the best adaptations of King's work."
            }
        ],
        ratings: [
            {
                source: "Goodreads",
                score: "4.22",
                outOf: "5",
                link: "https://www.goodreads.com/book/show/22614899-the-body"
            },
            {
                source: "Barnes & Noble",
                score: "4.6",
                outOf: "5"
            },
            {
                source: "TheBestBooks.org",
                score: "4.3",
                outOf: "5"
            }
        ]
    },
    "the-dark-half": {
        year: 1989,
        title: "The Dark Half",
        format: "Novel",
        notes: "Features Sheriff Alan Pangborn, a recurring Castle Rock character.",
        location: "castle-rock",
        synopsis: "When author Thad Beaumont attempts to put his pseudonym George Stark to rest, Stark comes to life and begins a murderous rampage. The novel explores the duality of human nature as Thad and Sheriff Alan Pangborn of Castle Rock must find a way to stop Stark's reign of terror before more people die.",
        mainCharacters: [
            "Thad Beaumont - A writer trying to kill his pseudonym",
            "George Stark - Thad's violent pseudonym who comes to life",
            "Sheriff Alan Pangborn - The sheriff of Castle Rock",
            "Liz Beaumont - Thad's wife",
            "Wendy and William Beaumont - Thad's twin children"
        ],
        connections: [
            {
                title: "Needful Things",
                description: "Sheriff Alan Pangborn appears in both novels."
            },
            {
                title: "The Sun Dog",
                description: "Both stories take place in Castle Rock around the same time period."
            },
            {
                title: "Bag of Bones",
                description: "Makes references to events in The Dark Half."
            }
        ],
        adaptations: [
            {
                title: "The Dark Half",
                type: "Movie",
                year: 1993,
                director: "George A. Romero",
                stars: ["Timothy Hutton", "Amy Madigan", "Michael Rooker"],
                description: "A film adaptation directed by horror legend George A. Romero, with Timothy Hutton playing the dual roles of Thad Beaumont and George Stark."
            }
        ],
        ratings: [
            {
                source: "Goodreads",
                score: "3.77",
                outOf: "5",
                link: "https://www.goodreads.com/book/show/11588.The_Dark_Half"
            },
            {
                source: "Barnes & Noble",
                score: "4.1",
                outOf: "5"
            },
            {
                source: "TheBestBooks.org",
                score: "3.85",
                outOf: "5"
            }
        ]
    },
    "the-sun-dog": {
        year: 1990,
        title: "The Sun Dog",
        format: "Novella",
        notes: "Published in Four Past Midnight, features recurring characters from Castle Rock.",
        location: "castle-rock",
        synopsis: "Fifteen-year-old Kevin Delevan receives a Polaroid Sun 660 camera for his birthday, but discovers that it only produces pictures of a menacing black dog that appears to be getting closer with each shot. The camera eventually comes into the possession of Castle Rock merchant Pop Merrill, who becomes obsessed with its supernatural properties, with deadly consequences.",
        mainCharacters: [
            "Kevin Delevan - A teenager who receives the cursed camera",
            "John 'Pop' Merrill - The owner of a local pawn shop called The Emporium Galorium",
            "Reginald 'Pop' Merrill - Pop's brother",
            "Mr. Delevan - Kevin's father"
        ],
        connections: [
            {
                title: "Needful Things",
                description: "The character of Pop Merrill is mentioned in Needful Things, which takes place after the events of The Sun Dog."
            },
            {
                title: "The Dark Half",
                description: "Both stories take place in Castle Rock during the same time period."
            },
            {
                title: "The Body",
                description: "References to Castle Rock locations established in The Body."
            }
        ],
        adaptations: [
            {
                title: "No formal adaptations yet",
                type: "Movie",
                year: 9999, // Placeholder
                description: "The Sun Dog has not yet been adapted for film or television as a standalone story."
            }
        ],
        ratings: [
            {
                source: "Goodreads",
                score: "3.69",
                outOf: "5",
                link: "https://www.goodreads.com/book/show/3365119-four-past-midnight"
            },
            {
                source: "Barnes & Noble",
                score: "3.8",
                outOf: "5"
            },
            {
                source: "TheBestBooks.org",
                score: "3.75",
                outOf: "5"
            }
        ]
    },
    "needful-things": {
        year: 1991,
        title: "Needful Things",
        format: "Novel",
        notes: 'Originally marketed as "The Last Castle Rock Story," wrapping up the Castle Rock saga.',
        location: "castle-rock",
        synopsis: "A new shop called 'Needful Things' opens in Castle Rock, run by the mysterious Leland Gaunt. The shop sells items that seem perfectly suited to each customer's deepest desires, but at a terrible price beyond the monetary cost. As the townspeople fall under Gaunt's influence, they begin to turn against each other, leading to chaos and violence that threatens to destroy the entire town.",
        mainCharacters: [
            "Leland Gaunt - The mysterious shopkeeper who may be more than human",
            "Sheriff Alan Pangborn - The sheriff of Castle Rock trying to maintain order",
            "Polly Chalmers - Pangborn's girlfriend who suffers from arthritis",
            "Danforth 'Buster' Keeton - The town's corrupt selectman",
            "Nettie Cobb - Polly's fragile friend with a traumatic past",
            "Brian Rusk - An eleven-year-old boy who is Gaunt's first customer"
        ],
        connections: [
            {
                title: "The Dark Half",
                description: "Sheriff Alan Pangborn appears in both novels as a main character."
            },
            {
                title: "The Sun Dog",
                description: "References to Pop Merrill and events from The Sun Dog."
            },
            {
                title: "Cujo",
                description: "References to the Cujo incident and its aftermath in Castle Rock."
            },
            {
                title: "The Dead Zone",
                description: "References to events and characters from The Dead Zone."
            }
        ],
        adaptations: [
            {
                title: "Needful Things",
                type: "Movie",
                year: 1993,
                director: "Fraser C. Heston",
                stars: ["Max von Sydow", "Ed Harris", "Bonnie Bedelia"],
                description: "A film adaptation starring Max von Sydow as Leland Gaunt and Ed Harris as Sheriff Alan Pangborn. The film condenses the novel significantly."
            },
            {
                title: "Castle Rock",
                type: "TV Series",
                year: 2018,
                description: "While not a direct adaptation, the Hulu series 'Castle Rock' draws from the mythology established in Needful Things and other Castle Rock stories."
            }
        ],
        ratings: [
            {
                source: "Goodreads",
                score: "3.98",
                outOf: "5",
                link: "https://www.goodreads.com/book/show/107291.Needful_Things"
            },
            {
                source: "Barnes & Noble",
                score: "4.3",
                outOf: "5"
            },
            {
                source: "TheBestBooks.org",
                score: "4.05",
                outOf: "5"
            }
        ]
    },
    "it-grows-on-you": {
        year: 1993,
        title: "It Grows on You",
        format: "Short Story",
        notes: "Revised for Nightmares & Dreamscapes (1993), set in Castle Rock.",
        location: "castle-rock",
        synopsis: "This short story revolves around an old house on the outskirts of Castle Rock that mysteriously adds rooms to itself over time. As the house grows, it seems to absorb the evil memories and histories of its inhabitants, becoming a focal point for the town's dark past and the tragedies that befall those connected to it.",
        mainCharacters: [
            "The house itself - The central 'character' that grows new additions",
            "Joe Newall - The original owner of the house",
            "Various Castle Rock residents - Witnesses to the house's strange properties"
        ],
        connections: [
            {
                title: "Needful Things",
                description: "Set in Castle Rock after the catastrophic events of Needful Things."
            },
            {
                title: "The Sun Dog",
                description: "References locations established in previous Castle Rock stories."
            },
            {
                title: "The Dark Half",
                description: "Shares the Castle Rock setting and mythology."
            }
        ],
        adaptations: [
            {
                title: "No formal adaptations yet",
                type: "Movie",
                year: 9999, // Placeholder
                description: "It Grows on You has not yet been adapted for film or television as a standalone story."
            }
        ],
        ratings: [
            {
                source: "Goodreads",
                score: "3.95",
                outOf: "5",
                link: "https://www.goodreads.com/book/show/10588.Nightmares_and_Dreamscapes"
            },
            {
                source: "Barnes & Noble",
                score: "4.1",
                outOf: "5"
            },
            {
                source: "TheBestBooks.org",
                score: "3.9",
                outOf: "5"
            }
        ]
    },
    "elevation": {
        year: 2018,
        title: "Elevation",
        format: "Novella",
        notes: "A return to Castle Rock after many years, focusing on themes of prejudice and community.",
        location: "castle-rock",
        synopsis: "Scott Carey is experiencing a mysterious condition: he's losing weight but not mass—he weighs less and less while his appearance remains unchanged. As Scott's condition progresses, he becomes involved in the lives of his neighbors, a lesbian couple facing discrimination in the small town of Castle Rock. His strange affliction ultimately brings the community together in unexpected ways.",
        mainCharacters: [
            "Scott Carey - A man with a mysterious weight-loss condition",
            "Doctor Bob Ellis - Scott's friend and doctor",
            "Deirdre McComb - One of Scott's neighbors who runs a restaurant",
            "Missy Donaldson - Deirdre's wife and business partner",
            "Various Castle Rock residents"
        ],
        connections: [
            {
                title: "Gwendy's Button Box",
                description: "Both are set in the contemporary Castle Rock and share the theme of mysterious forces affecting ordinary lives."
            },
            {
                title: "Needful Things",
                description: "References to how Castle Rock has rebuilt and changed since the catastrophic events of Needful Things."
            },
            {
                title: "The Dead Zone",
                description: "Shares the Castle Rock setting and mythology established in King's earlier works."
            }
        ],
        adaptations: [
            {
                title: "No formal adaptations yet",
                type: "Movie",
                year: 9999, // Placeholder
                description: "Elevation has not yet been adapted for film or television."
            }
        ],
        ratings: [
            {
                source: "Goodreads",
                score: "3.79",
                outOf: "5",
                link: "https://www.goodreads.com/book/show/38355410-elevation"
            },
            {
                source: "Barnes & Noble",
                score: "3.9",
                outOf: "5"
            },
            {
                source: "TheBestBooks.org",
                score: "3.85",
                outOf: "5"
            }
        ]
    },
    "gwendys-button-box": {
        year: 2017,
        title: "Gwendy's Button Box",
        format: "Novella",
        notes: "Co-written with Richard Chizmar, introducing the character of Gwendy Peterson.",
        location: "castle-rock",
        synopsis: "In 1974, twelve-year-old Gwendy Peterson meets a mysterious stranger named Richard Farris at the top of Castle Rock's Suicide Stairs. He entrusts her with a strange device: a box with colored buttons that dispenses magical gifts and chocolates. But the box also holds immense danger, as each button can cause catastrophic events when pressed. Gwendy must learn to bear the responsibility of this powerful object throughout her formative years.",
        mainCharacters: [
            "Gwendy Peterson - A young girl who receives a mysterious button box",
            "Richard Farris - A mysterious man in black who gives Gwendy the box",
            "Mrs. Peterson - Gwendy's mother",
            "Mr. Peterson - Gwendy's father",
            "Harry Streeter - Gwendy's friend and eventual prom date"
        ],
        connections: [
            {
                title: "The Dark Tower series",
                description: "Richard Farris resembles The Man in Black, a recurring character in King's Dark Tower series."
            },
            {
                title: "Needful Things",
                description: "Thematic connections to the idea of objects with mysterious powers that come with a price."
            },
            {
                title: "The Body",
                description: "Set in Castle Rock during a similar time period, with references to locations established in The Body."
            }
        ],
        adaptations: [
            {
                title: "No formal adaptations yet",
                type: "Movie",
                year: 9999, // Placeholder
                description: "Gwendy's Button Box has not yet been adapted for film or television."
            }
        ],
        ratings: [
            {
                source: "Goodreads",
                score: "4.01",
                outOf: "5",
                link: "https://www.goodreads.com/book/show/34430839-gwendy-s-button-box"
            },
            {
                source: "Barnes & Noble",
                score: "4.3",
                outOf: "5"
            },
            {
                source: "TheBestBooks.org",
                score: "4.05",
                outOf: "5"
            }
        ]
    },
    "it": {
        year: 1986,
        title: "IT",
        format: "Novel",
        notes: "One of King's most iconic works set primarily in Derry.",
        location: "derry",
        synopsis: "In the town of Derry, Maine, seven teenagers discover an ancient evil that feeds on children's fears and takes the shape of Pennywise the Dancing Clown. Nearly three decades later, when children begin disappearing again, the now-adults must reunite to face their childhood nightmare once more – this time to destroy It for good.",
        mainCharacters: [
            "Bill Denbrough - Leader of the Losers Club, whose brother Georgie was killed by It",
            "Beverly Marsh - The only female member of the Losers Club",
            "Richie Tozier - The comedian of the group",
            "Eddie Kaspbrak - A hypochondriac member of the Losers Club",
            "Mike Hanlon - The historian of the group who stays in Derry",
            "Ben Hanscom - An overweight member who harbors a crush on Beverly",
            "Stanley Uris - A practical member of the group",
            "Pennywise/IT - The shape-shifting monster"
        ],
        connections: [
            {
                title: "11/22/63",
                description: "The main character visits Derry and meets characters from IT."
            },
            {
                title: "Dreamcatcher",
                description: "Contains references to the memorial for Pennywise's victims in Derry."
            },
            {
                title: "Insomnia",
                description: "Set in Derry years after the events of IT."
            }
        ],
        adaptations: [
            {
                title: "IT",
                type: "Miniseries",
                year: 1990,
                director: "Tommy Lee Wallace",
                stars: ["Tim Curry", "Richard Thomas", "Annette O'Toole"],
                description: "A television miniseries featuring Tim Curry's iconic performance as Pennywise."
            },
            {
                title: "IT",
                type: "Movie",
                year: 2017,
                director: "Andy Muschietti",
                stars: ["Bill Skarsgård", "Jaeden Martell", "Sophia Lillis"],
                description: "The first part of a two-film adaptation focusing on the children's storyline."
            },
            {
                title: "IT Chapter Two",
                type: "Movie",
                year: 2019,
                director: "Andy Muschietti",
                stars: ["Bill Skarsgård", "Jessica Chastain", "James McAvoy"],
                description: "The second part of the adaptation focusing on the adult storyline."
            }
        ],
        ratings: [
            {
                source: "Goodreads",
                score: "4.24",
                outOf: "5",
                link: "https://www.goodreads.com/book/show/830502.It"
            },
            {
                source: "Barnes & Noble",
                score: "4.7",
                outOf: "5"
            },
            {
                source: "TheBestBooks.org",
                score: "4.39",
                outOf: "5"
            }
        ]
    },
    "insomnia": {
        year: 1994,
        title: "Insomnia",
        format: "Novel",
        notes: "Set in Derry, years after the events of IT.",
        location: "derry",
        synopsis: "Ralph Roberts, an elderly man suffering from insomnia, begins to see colored auras around people and notices strange creatures - the 'bald doctors' - who seem to determine when people die. Together with his friend Lois Chasse, Ralph discovers he is involved in a cosmic battle related to the fate of a child who could save or destroy the universe.",
        mainCharacters: [
            "Ralph Roberts - An elderly widower with insomnia who develops supernatural abilities",
            "Lois Chasse - A widow and Ralph's neighbor who also develops abilities",
            "Ed Deepneau - A neighbor of Ralph who becomes violent and obsessed",
            "Helen Deepneau - Ed's wife and Ralph's friend",
            "Clotho and Lachesis - Two of the 'bald doctors' who work for higher powers",
            "Atropos - A corrupt 'bald doctor' who serves malign purposes",
            "Susan Day - A feminist activist marked for assassination"
        ],
        connections: [
            {
                title: "IT",
                description: "Set in Derry, with references to the events of IT, such as the collapse of the water tower."
            },
            {
                title: "The Dark Tower",
                description: "Features connections to the Dark Tower and the concept of 'Purpose' and 'Random'."
            },
            {
                title: "Dreamcatcher",
                description: "Shares the Derry setting and mentions events from that book."
            }
        ],
        adaptations: [
            {
                title: "No formal adaptations yet",
                type: "Movie",
                year: 9999, // Placeholder
                description: "Insomnia has not yet received a film or television adaptation."
            }
        ],
        ratings: [
            {
                source: "Goodreads",
                score: "3.89",
                outOf: "5",
                link: "https://www.goodreads.com/book/show/10585.Insomnia"
            },
            {
                source: "Barnes & Noble",
                score: "4.1",
                outOf: "5"
            },
            {
                source: "TheBestBooks.org",
                score: "3.95",
                outOf: "5"
            }
        ]
    },
    "dreamcatcher": {
        year: 2001,
        title: "Dreamcatcher",
        format: "Novel",
        notes: "Partially set in Derry, with references to IT.",
        location: "derry",
        synopsis: "Four childhood friends, who possess telepathic abilities since they saved a boy with Down syndrome named Duddits, reunite for their annual hunting trip at an isolated cabin in the Maine woods. Their retreat is interrupted by the arrival of a disoriented hunter who brings with him an alien infection. The story follows the friends' struggle against the alien invasion and a ruthless military man determined to cover up the incident.",
        mainCharacters: [
            "Henry Devlin - A psychiatrist with suicidal tendencies",
            "Pete Moore - A car salesman with alcoholism issues",
            "Jonesy - A university professor who becomes host to an alien",
            "Beaver - An impulsive and loyal carpenter",
            "Douglas 'Duddits' Cavell - A friend with Down syndrome and special abilities",
            "Coronel Abraham Kurtz - A military man tasked with containing the alien invasion",
            "Owen Underhill - A subordinate of Kurtz who questions his orders"
        ],
        connections: [
            {
                title: "IT",
                description: "Contains references to the memorial for Pennywise's victims in Derry."
            },
            {
                title: "The Dark Tower",
                description: "Features elements that suggest a connection with other worlds in the Dark Tower multiverse."
            },
            {
                title: "Insomnia",
                description: "Shares the Derry setting and mentions events from that book."
            }
        ],
        adaptations: [
            {
                title: "Dreamcatcher",
                type: "Movie",
                year: 2003,
                director: "Lawrence Kasdan",
                stars: ["Morgan Freeman", "Thomas Jane", "Jason Lee", "Damian Lewis"],
                description: "A film adaptation that received mixed reviews and failed to capture all the nuances of the book."
            }
        ],
        ratings: [
            {
                source: "Goodreads",
                score: "3.59",
                outOf: "5",
                link: "https://www.goodreads.com/book/show/11570.Dreamcatcher"
            },
            {
                source: "Barnes & Noble",
                score: "3.7",
                outOf: "5"
            },
            {
                source: "TheBestBooks.org",
                score: "3.65",
                outOf: "5"
            }
        ]
    },
    "11-22-63": {
        year: 2011,
        title: "11/22/63",
        format: "Novel",
        notes: "Part of the novel takes place in Derry shortly after the events of IT.",
        location: "derry",
        synopsis: "Jake Epping, a high school English teacher, discovers a time portal in his friend Al's diner that leads to 1958. Al, who is dying of cancer, convinces Jake to take on his mission: to prevent the assassination of President John F. Kennedy. During his journey to change history, Jake spends time in Derry, meets characters from 'IT', falls in love with Sadie Dunhill, and discovers that the past resists change, creating obstacles for those who try to alter it.",
        mainCharacters: [
            "Jake Epping/George Amberson - The teacher who travels through time",
            "Al Templeton - Owner of the diner and discoverer of the time portal",
            "Sadie Dunhill - The librarian Jake falls in love with",
            "Lee Harvey Oswald - The assassin Jake tries to stop",
            "Harry Dunning - A janitor whose family was murdered",
            "Frank Dunning - Harry's abusive father",
            "Richie Tozier and Beverly Marsh - Characters from 'IT' that Jake meets in Derry"
        ],
        connections: [
            {
                title: "IT",
                description: "Jake visits Derry in 1958 and meets characters from 'IT', including Richie Tozier and Beverly Marsh."
            },
            {
                title: "The Dark Tower",
                description: "Introduces concepts similar to time travel and traveling through time."
            },
            {
                title: "Insomnia",
                description: "Mentions elements related to the forces that control the universe."
            }
        ],
        adaptations: [
            {
                title: "11.22.63",
                type: "TV Series",
                year: 2016,
                stars: ["James Franco", "Sarah Gadon", "George MacKay"],
                description: "A miniseries produced by J.J. Abrams and James Franco for Hulu, with 8 episodes that adapt the book with some alterations."
            }
        ],
        ratings: [
            {
                source: "Goodreads",
                score: "4.31",
                outOf: "5",
                link: "https://www.goodreads.com/book/show/10644930-11-22-63"
            },
            {
                source: "Barnes & Noble",
                score: "4.6",
                outOf: "5"
            },
            {
                source: "TheBestBooks.org",
                score: "4.35",
                outOf: "5"
            }
        ]
    },
    "salems-lot": {
        year: 1975,
        title: "Salem's Lot",
        format: "Novel",
        notes: "The second novel published by Stephen King, which established many elements of his fictional universe.",
        location: "salems-lot",
        synopsis: "Ben Mears returns to the town of Jerusalem's Lot, where he spent part of his childhood, to write about the Marsten House, an abandoned mansion that has haunted him since his youth. Meanwhile, a mysterious antique dealer named Richard Straker opens a shop in town, while his partner, Kurt Barlow, remains absent. When children and residents begin to disappear, Ben and a small group of allies discover that Barlow is an ancient vampire who is transforming the entire town's population.",
        mainCharacters: [
            "Ben Mears - A writer who returns to the town to face childhood traumas",
            "Susan Norton - A young woman who becomes Ben's love interest",
            "Matt Burke - An elderly and respected teacher in town",
            "Jimmy Cody - A local doctor",
            "Mark Petrie - A brave boy with knowledge about vampires",
            "Father Donald Callahan - The alcoholic priest of the local church",
            "Kurt Barlow - The master vampire who terrorizes the town",
            "Richard Straker - Barlow's human servant"
        ],
        connections: [
            {
                title: "Jerusalem's Lot & One for the Road",
                description: "Two short stories, 'Jerusalem's Lot' and 'One for the Road', take place in the same town, before and after the events of the novel."
            },
            {
                title: "The Dark Tower series",
                description: "There are references to Salem's Lot and nearby towns."
            },
            {
                title: "Hearts in Atlantis",
                description: "Father Callahan appears in this book, connecting the stories."
            }
        ],
        adaptations: [
            {
                title: "Salem's Lot",
                type: "Miniseries",
                year: 1979,
                director: "Tobe Hooper",
                stars: ["David Soul", "James Mason", "Lance Kerwin"],
                description: "A TV miniseries adaptation directed by Tobe Hooper, known for its frightening portrayal of the vampire Barlow."
            },
            {
                title: "Salem's Lot",
                type: "Miniseries",
                year: 2004,
                director: "Mikael Salomon",
                stars: ["Rob Lowe", "Andre Braugher", "Donald Sutherland"],
                description: "A television remake that presents some differences from the original book."
            },
            {
                title: "Salem's Lot",
                type: "Movie",
                year: 2023,
                director: "Gary Dauberman",
                stars: ["Lewis Pullman", "Makenzie Leigh", "Bill Camp"],
                description: "A new film adaptation by New Line Cinema, with Gary Dauberman as director."
            }
        ],
        ratings: [
            {
                source: "Goodreads",
                score: "4.03",
                outOf: "5",
                link: "https://www.goodreads.com/book/show/11590.Salem_s_Lot"
            },
            {
                source: "Barnes & Noble",
                score: "4.5",
                outOf: "5"
            },
            {
                source: "TheBestBooks.org",
                score: "4.2",
                outOf: "5"
            }
        ]
    },
    "jerusalems-lot": {
        year: 1978,
        title: "Jerusalem's Lot",
        format: "Short Story",
        notes: "A prelude to Salem's Lot, set in the 1850s.",
        location: "salems-lot",
        synopsis: "Presented as a series of letters and journals, the story follows Charles Boone who, along with his manservant Calvin McCann, inherits his grandfather's property in the town of Preacher's Corners, near Jerusalem's Lot. In the Chapelwaite mansion, Charles discovers documents from an ancestor that lead him to explore the abandoned town of Jerusalem's Lot and discover a sinister cult that worshipped a being called 'The Worm'.",
        mainCharacters: [
            "Charles Boone - The protagonist who inherits Chapelwaite",
            "Calvin McCann - Charles's loyal manservant",
            "Stephen Boone - An ancestor who was involved with the cult",
            "Philip Boone - Charles's deceased uncle"
        ],
        connections: [
            {
                title: "Salem's Lot",
                description: "Serves as a pre-history of the town, establishing its evil nature before the events of the novel."
            },
            {
                title: "The Dark Tower",
                description: "Contains elements that reference Lovecraftian mythology, which in turn connects to the cosmology of the Dark Tower."
            }
        ],
        adaptations: [
            {
                title: "Chapelwaite",
                type: "TV Series",
                year: 2021,
                stars: ["Adrien Brody", "Emily Hampshire"],
                description: "An Epix series that considerably expands the original story, maintaining the basic elements but adding new plots and characters."
            }
        ],
        ratings: [
            {
                source: "Goodreads",
                score: "3.94",
                outOf: "5",
                link: "https://www.goodreads.com/book/show/29554897-jerusalem-s-lot"
            },
            {
                source: "Barnes & Noble",
                score: "4.1",
                outOf: "5"
            }
        ]
    },
    "one-for-the-road": {
        year: 1978,
        title: "One for the Road",
        format: "Short Story",
        notes: "A sequel to Salem's Lot, showing what happened to the town years later.",
        location: "salems-lot",
        synopsis: "During a severe snowstorm, a man named Gerard Lumley enters a local bar near Jerusalem's Lot, begging for help. His car broke down on the road and he left his wife and daughter there while seeking assistance. The bar owner, Herb Tooklander, and the story's narrator, Booth, reluctantly agree to help him, warning about the dangers of Jerusalem's Lot, now abandoned and infested with vampires.",
        mainCharacters: [
            "Booth - The narrator of the story",
            "Herb Tooklander - Owner of Tooklander's bar",
            "Gerard Lumley - The desperate man seeking help",
            "The vampires of Jerusalem's Lot"
        ],
        connections: [
            {
                title: "Salem's Lot",
                description: "Direct continuation, showing what happened to the town after the survivors abandoned it."
            }
        ],
        adaptations: [
            {
                title: "None yet",
                type: "Movie",
                year: 9999, // Placeholder
                description: "This short story has not yet received a formal adaptation for film or television."
            }
        ],
        ratings: [
            {
                source: "Goodreads",
                score: "3.91",
                outOf: "5",
                link: "https://www.goodreads.com/book/show/59870259-one-for-the-road"
            },
            {
                source: "TheBestBooks.org",
                score: "3.9",
                outOf: "5"
            }
        ]
    }
};

export const getBookBySlug = (location: string, titleSlug: string): BookDetail | undefined => {
    const book = Object.values(bookDetails).find(
        book => book.location === location && slugify(book.title) === titleSlug
    );

    return book;
};

export const getAllBooks = (): BookDetail[] => {
    return Object.values(bookDetails);
};

export const getBooksByLocation = (location: string): BookDetail[] => {
    return Object.values(bookDetails).filter(book => book.location === location);
};

// Função para converter títulos em slugs URL-friendly
export const slugify = (text: string): string => {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')        // Replace spaces with -
        .replace(/[^\w\-]+/g, '')    // Remove all non-word characters
        .replace(/\-\-+/g, '-')      // Replace multiple - with single -
        .replace(/^-+/, '')          // Trim - from start of text
        .replace(/-+$/, '');         // Trim - from end of text
}; 