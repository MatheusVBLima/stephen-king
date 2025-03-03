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
                description: "Set in the same town several years later."
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
        synopsis: "This short story revolves around an old house on the outskirts of Castle Rock that mysteriously adds rooms to itself over time. As the house grows, it seems to absorb the evil memories and histories of its inhabitants, becoming a focal point for the town's dark past and supernatural events.",
        mainCharacters: [
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
        adaptations: [],
        ratings: [
            {
                source: "Goodreads",
                score: "3.63",
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
        synopsis: "Scott Carey is experiencing a mysterious condition: he's losing weight steadily without changing physically. Even more strange, he weighs the same regardless of what he's wearing or carrying. As his condition progresses, Scott becomes involved in healing a rift with his neighbors, a lesbian couple facing discrimination in the small town of Castle Rock. His strange affliction ultimately brings the community together in unexpected ways.",
        mainCharacters: [
            "Scott Carey - A man experiencing a mysterious weight loss condition",
            "Doctor Bob Ellis - Scott's friend and physician",
            "Deirdre McComb and Missy Donaldson - Scott's neighbors facing discrimination",
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
                title: "The Dark Half",
                description: "Shares the Castle Rock setting and mythology established in King's earlier works."
            }
        ],
        adaptations: [],
        ratings: [
            {
                source: "Goodreads",
                score: "3.81",
                outOf: "5",
                link: "https://www.goodreads.com/book/show/38355410-elevation"
            },
            {
                source: "Barnes & Noble",
                score: "3.9",
                outOf: "5"
            }
        ]
    },
    "gwendys-button-box": {
        year: 2017,
        title: "Gwendy's Button Box",
        format: "Novella",
        notes: "First in the Gwendy trilogy, co-written with Richard Chizmar, set in Castle Rock.",
        location: "castle-rock",
        synopsis: "In 1974, twelve-year-old Gwendy Peterson meets a mysterious stranger named Richard Farris at the top of Castle Rock's Suicide Stairs. He entrusts her with a strange device: a box with colored buttons that dispenses magical gifts and chocolates. But the box also holds immense danger, as each button can cause destruction on different scales. As Gwendy grows up with this responsibility, the box shapes her life in unexpected ways.",
        mainCharacters: [
            "Gwendy Peterson - A young girl entrusted with a mysterious box",
            "Richard Farris - A mysterious man who gives Gwendy the button box",
            "Luke Petersen - Gwendy's friend at school"
        ],
        connections: [
            {
                title: "The Body",
                description: "Set in Castle Rock during a similar time period, with references to locations established in The Body."
            },
            {
                title: "Needful Things",
                description: "Shares thematic elements with Leland Gaunt's mysterious objects."
            }
        ],
        adaptations: [],
        ratings: [
            {
                source: "Goodreads",
                score: "3.95",
                outOf: "5",
                link: "https://www.goodreads.com/book/show/34430839-gwendy-s-button-box"
            },
            {
                source: "Barnes & Noble",
                score: "4.3",
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
                description: "Insomnia has not received a film or television adaptation."
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
        location: "jerusalems-lot",
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
        location: "jerusalems-lot",
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
        location: "jerusalems-lot",
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
    },
    "uncle-ottos-truck": {
        year: 1983,
        title: "Uncle Otto's Truck",
        format: "Short Story",
        notes: "Published in Skeleton Crew, set in Castle Rock.",
        location: "castle-rock",
        synopsis: "This short story revolves around the mysterious relationship between Uncle Otto and an old Cresswell truck that seems to have a mind of its own. After Otto's business partner is killed under the vehicle, Otto becomes convinced that the truck is moving on its own, inching closer to his house each day with malevolent intent.",
        mainCharacters: [
            "Uncle Otto - A wealthy but paranoid man",
            "Quentin Cottrell - Otto's nephew who narrates the story",
            "George McCutcheon - Otto's former business partner"
        ],
        connections: [
            {
                title: "The Body",
                description: "Set in the same town of Castle Rock."
            },
            {
                title: "Cujo",
                description: "References to Castle Rock locations."
            }
        ],
        adaptations: [],
        ratings: [
            {
                source: "Goodreads",
                score: "3.72",
                outOf: "5"
            }
        ]
    },
    "mrs-todds-shortcut": {
        year: 1984,
        title: "Mrs. Todd's Shortcut",
        format: "Short Story",
        notes: "Published in Skeleton Crew, set in Castle Rock.",
        location: "castle-rock",
        synopsis: "Homer Buckland, the elderly caretaker for the summer home of the wealthy Todds, recounts the strange tale of Mrs. Todd's obsession with finding shortcuts. Her increasingly impossible routes between Castle Rock and Bangor lead to encounters with otherworldly phenomena, suggesting she's found passages to other dimensions or realities.",
        mainCharacters: [
            "Homer Buckland - Elderly caretaker who narrates the story",
            "Ophelia Todd - A woman obsessed with finding shortcuts",
            "Worth Todd - Ophelia's wealthy husband"
        ],
        connections: [
            {
                title: "The Body",
                description: "Set in the same town of Castle Rock."
            },
            {
                title: "Needful Things",
                description: "References to Castle Rock geography."
            }
        ],
        adaptations: [],
        ratings: [
            {
                source: "Goodreads",
                score: "4.0",
                outOf: "5"
            }
        ]
    },
    "gramma": {
        year: 1984,
        title: "Gramma",
        format: "Short Story",
        notes: "Published in Skeleton Crew, set in Castle Rock.",
        location: "castle-rock",
        synopsis: "Eleven-year-old George is left alone to care for his bedridden, blind grandmother while his mother takes his brother to the hospital after an injury. As the day progresses, George's fear of his grandmother grows, and with good reason - his 'Gramma' is connected to dark, supernatural forces that become active after her death.",
        mainCharacters: [
            "George Bruckner - An eleven-year-old boy left to care for his grandmother",
            "Gramma - George's mysterious and frightening grandmother",
            "Ruth Bruckner - George's mother who is absent for most of the story"
        ],
        connections: [
            {
                title: "The Body",
                description: "Set in the same town of Castle Rock."
            },
            {
                title: "Needful Things",
                description: "Shares the Castle Rock setting."
            }
        ],
        adaptations: [
            {
                title: "Gramma",
                type: "TV Series",
                year: 1986,
                director: "Bradford May",
                stars: ["Barret Oliver", "Peggy Stewart"],
                description: "An episode of the 1985-1986 revival of The Twilight Zone."
            }
        ],
        ratings: [
            {
                source: "Goodreads",
                score: "3.85",
                outOf: "5"
            }
        ]
    },
    "nona": {
        year: 1985,
        title: "Nona",
        format: "Short Story",
        notes: "Published in Skeleton Crew, set in Castle Rock.",
        location: "castle-rock",
        synopsis: "A drifter meets a mysterious and seductive woman named Nona at a roadside tavern. Under her influence, he embarks on a violent killing spree that takes him through Castle Rock and surrounding areas, only to discover that Nona may not be what she appears to be.",
        mainCharacters: [
            "Unnamed Narrator - The protagonist who falls under Nona's influence",
            "Nona - A mysterious woman who may be supernatural",
            "Various victims of the killing spree"
        ],
        connections: [
            {
                title: "The Dark Half",
                description: "References to Castle Rock locations."
            },
            {
                title: "Needful Things",
                description: "Set in the same universe and geography."
            }
        ],
        adaptations: [],
        ratings: [
            {
                source: "Goodreads",
                score: "3.7",
                outOf: "5"
            }
        ]
    },
    "premium-harmony": {
        year: 2009,
        title: "Premium Harmony",
        format: "Short Story",
        notes: "Published in The Bazaar of Bad Dreams, set in Castle Rock.",
        location: "castle-rock",
        synopsis: "Ray and Mary Burkett, a married couple with a strained relationship, are driving through Castle Rock when Mary insists on stopping at a convenience store to buy a ball for her niece. While inside, Mary suffers a fatal heart attack, leading Ray to reflect on their troubled marriage and the mundane events that can suddenly turn tragic.",
        mainCharacters: [
            "Ray Burkett - A husband with a cynical outlook on his marriage",
            "Mary Burkett - Ray's wife who dies suddenly at the convenience store",
            "Biz - The clerk at the convenience store"
        ],
        connections: [
            {
                title: "Needful Things",
                description: "Set in Castle Rock after it has been rebuilt from the events in Needful Things."
            },
            {
                title: "Elevation",
                description: "Both stories showcase the modern-day Castle Rock."
            }
        ],
        adaptations: [],
        ratings: [
            {
                source: "Goodreads",
                score: "3.65",
                outOf: "5"
            }
        ]
    },
    "the-man-in-the-black-suit": {
        year: 1994,
        title: "The Man in the Black Suit",
        format: "Short Story",
        notes: "Published in Everything's Eventual, set near Castle Rock.",
        location: "castle-rock",
        synopsis: "In this award-winning short story, an elderly man named Gary reflects on a terrifying encounter he had as a nine-year-old boy. While fishing alone in the woods near Castle Rock, he meets a strange man in a black suit who claims to be the devil. The encounter leaves a lasting impression that haunts him for the rest of his life.",
        mainCharacters: [
            "Gary - The protagonist, both as a nine-year-old boy and an elderly man",
            "The Man in the Black Suit - A demonic entity who may be the devil",
            "Dan Eakins - Gary's father"
        ],
        connections: [
            {
                title: "Needful Things",
                description: "Shares thematic elements with the diabolical character Leland Gaunt."
            },
            {
                title: "The Body",
                description: "Set in the same geographical area around Castle Rock."
            }
        ],
        adaptations: [],
        ratings: [
            {
                source: "Goodreads",
                score: "4.11",
                outOf: "5"
            }
        ]
    },
    "fair-extension": {
        year: 2010,
        title: "Fair Extension",
        format: "Short Story",
        notes: "Short story from 'Full Dark, No Stars' set in Derry.",
        location: "derry",
        synopsis: "Dave Streeter, a man with terminal cancer, makes a deal with a strange vendor named George Elvid who offers him a 'fair extension' of his life. In exchange, he must transfer his misfortune to someone else - his longtime best friend, Tom Goodhugh. The story explores themes of envy, resentment, and the moral consequences of wishing ill on others.",
        mainCharacters: [
            "Dave Streeter - A man with terminal cancer",
            "George Elvid (an anagram of 'Devil God') - The mysterious vendor",
            "Tom Goodhugh - Streeter's best friend who becomes the target of his resentment"
        ],
        connections: [
            {
                title: "IT",
                description: "Set in the same town of Derry, with references to its sinister atmosphere."
            }
        ],
        adaptations: [],
        ratings: [
            {
                source: "Goodreads",
                score: "4.0",
                outOf: "5"
            }
        ]
    },
    "bag-of-bones": {
        year: 1998,
        title: "Bag of Bones",
        format: "Novel",
        notes: "Partially related to Derry, where the protagonist lived before moving to TR-90.",
        location: "tr-90",
        synopsis: "Mike Noonan, a widowed writer suffering from writer's block, moves to his vacation home in TR-90, known as Sara Laughs, after his wife's death. There, he becomes involved with a young mother and her daughter, while uncovering dark secrets about the town and experiencing supernatural occurrences related to his deceased wife.",
        mainCharacters: [
            "Mike Noonan - A widowed writer with writer's block",
            "Kyra Devore - A young girl Mike helps",
            "Mattie Devore - Kyra's mother and Mike's love interest",
            "Max Devore - An elderly magnate and Kyra's grandfather",
            "Jo Noonan - Mike's deceased wife",
            "Sara Tidwell - An early 20th century blues singer"
        ],
        connections: [
            {
                title: "IT",
                description: "Mike Noonan lived in Derry, where he witnessed some of the events reported in IT."
            },
            {
                title: "Insomnia",
                description: "Contains references to events occurring in Derry after IT."
            }
        ],
        adaptations: [
            {
                title: "Bag of Bones",
                type: "Miniseries",
                year: 2011,
                director: "Mick Garris",
                stars: ["Pierce Brosnan", "Melissa George", "Annabeth Gish"],
                description: "A two-part miniseries starring Pierce Brosnan as Mike Noonan."
            }
        ],
        ratings: [
            {
                source: "Goodreads",
                score: "3.92",
                outOf: "5",
                link: "https://www.goodreads.com/book/show/10589.Bag_of_Bones"
            }
        ]
    },
    "autopsy-room-four": {
        year: 1997,
        title: "Autopsy Room Four",
        format: "Short Story",
        notes: "Short story from 'Everything's Eventual' partially set in Derry.",
        location: "derry",
        synopsis: "Howard Cottrell wakes up naked on an autopsy table, completely paralyzed but conscious. Unable to communicate, he desperately tries to alert the doctors as they prepare to perform his autopsy. The story is narrated from Cottrell's perspective as he tries to understand what caused his paralysis while struggling to be noticed before the procedure begins.",
        mainCharacters: [
            "Howard Cottrell - The paralyzed man mistakenly declared dead",
            "Dr. Katie Arlen - The doctor who will perform the autopsy",
            "Peter Jefferies - The autopsy assistant",
            "Mike Hopper - The police officer who found Cottrell"
        ],
        connections: [
            {
                title: "IT",
                description: "Set in Derry's hospital."
            }
        ],
        adaptations: [
            {
                title: "Autopsy Room Four",
                type: "TV Series",
                year: 2006,
                description: "Episode of the series 'Nightmares & Dreamscapes', based on the short story."
            }
        ],
        ratings: [
            {
                source: "Goodreads",
                score: "3.9",
                outOf: "5"
            }
        ]
    },
    "geralds-game": {
        year: 1992,
        title: "Gerald's Game",
        format: "Novel",
        notes: "Contains references to Derry, although most of the action takes place elsewhere.",
        location: "western-maine",
        synopsis: "Jessie Burlingame becomes trapped to a bed when her husband Gerald dies of a heart attack during a sexual game in an isolated house. Handcuffed and unable to escape, Jessie faces not only thirst, hunger, and exhaustion, but also her own inner demons as she struggles for survival.",
        mainCharacters: [
            "Jessie Burlingame - The protagonist trapped to the bed",
            "Gerald Burlingame - Jessie's husband who dies at the beginning of the book",
            "Raymond Andrew Joubert - A necrophile and murderer whom Jessie calls 'Space Cowboy'",
            "Ruth Neary - A voice in Jessie's head representing her practical side",
            "Goody Burlingame - Another voice in Jessie's head, representing her submissive side"
        ],
        connections: [
            {
                title: "Dolores Claiborne",
                description: "Contains a scene that directly connects with a moment in Dolores Claiborne."
            },
            {
                title: "IT",
                description: "References to events that occurred in Derry."
            }
        ],
        adaptations: [
            {
                title: "Gerald's Game",
                type: "Movie",
                year: 2017,
                director: "Mike Flanagan",
                stars: ["Carla Gugino", "Bruce Greenwood"],
                description: "Netflix adaptation directed by Mike Flanagan, praised for Carla Gugino's performance as Jessie."
            }
        ],
        ratings: [
            {
                source: "Goodreads",
                score: "3.69",
                outOf: "5",
                link: "https://www.goodreads.com/book/show/33124137-gerald-s-game"
            }
        ]
    },
    "gwendys-final-task": {
        year: 2022,
        title: "Gwendy's Final Task",
        format: "Novel",
        notes: "Third part of the Gwendy trilogy, with parts set in Derry.",
        location: "multiple",
        synopsis: "Now a successful senator, Gwendy Peterson receives one final mission: she must take the button box to space, where it can be safely destroyed. As Gwendy deals with the early signs of Alzheimer's, she must complete this crucial mission to save not just our world, but all worlds.",
        mainCharacters: [
            "Gwendy Peterson - Now a US senator",
            "Richard Farris - The mysterious man who originally gave Gwendy the box",
            "Space station crew accompanying Gwendy"
        ],
        connections: [
            {
                title: "The Dark Tower",
                description: "Includes references to the Dark Tower universe, the Beams, and the Crimson King."
            },
            {
                title: "IT",
                description: "Visit to the town of Derry, with references to the events of IT."
            },
            {
                title: "Gwendy's Button Box and Gwendy's Magic Feather",
                description: "Conclusion of the Gwendy trilogy."
            }
        ],
        adaptations: [],
        ratings: [
            {
                source: "Goodreads",
                score: "3.96",
                outOf: "5",
                link: "https://www.goodreads.com/book/show/58985627-gwendy-s-final-task"
            }
        ]
    },
    "liseys-story": {
        year: 2006,
        title: "Lisey's Story",
        format: "Novel",
        notes: "Contains references to Derry, although most of the action takes place elsewhere.",
        location: "rural-maine",
        synopsis: "Two years after the death of her husband, famous writer Scott Landon, Lisey Landon finally begins to clean out his office. As she does so, she relives moments from their marriage and discovers that Scott had created a portal to a parallel world called Boo'ya Moon, a place of beauty and danger. Meanwhile, she is stalked by an obsessive fan of her husband.",
        mainCharacters: [
            "Lisey Landon - Widow of famous author Scott Landon",
            "Scott Landon - Lisey's deceased husband, a famous writer",
            "Jim Dooley - A deranged fan who stalks Lisey",
            "Amanda - Lisey's sister with mental problems",
            "Darla - Another of Lisey's sisters",
            "Professor Dashmiel - Scott's academic colleague"
        ],
        connections: [
            {
                title: "IT",
                description: "Contains references to Derry and related events."
            },
            {
                title: "The Dark Tower",
                description: "The concept of parallel worlds connects with the Dark Tower universe."
            }
        ],
        adaptations: [
            {
                title: "Lisey's Story",
                type: "TV Series",
                year: 2021,
                stars: ["Julianne Moore", "Clive Owen", "Jennifer Jason Leigh"],
                description: "8-episode miniseries for Apple TV+, with screenplay adapted by Stephen King himself."
            }
        ],
        ratings: [
            {
                source: "Goodreads",
                score: "3.79",
                outOf: "5",
                link: "https://www.goodreads.com/book/show/10566.Lisey_s_Story"
            }
        ]
    },
    "mute": {
        year: 2007,
        title: "Mute",
        format: "Short Story",
        notes: "Short story from 'Just After Sunset' partially set in Derry.",
        location: "derry",
        synopsis: "After discovering his wife has cheated on him and depleted their savings, a salesman named Monette picks up a mute hitchhiker and confesses his troubles, including violent thoughts about his wife and her lover. He later discovers that the supposed mute might not have been mute at all, and that his confessions may have unexpected consequences.",
        mainCharacters: [
            "Monette - The protagonist salesman who was betrayed",
            "The mute hitchhiker - A mysterious man who listens to Monette's confessions",
            "Monette's wife - The woman who betrayed him",
            "Father Higgins - The priest to whom Monette tells his story"
        ],
        connections: [
            {
                title: "IT",
                description: "Partially set in Derry, with references to the town."
            }
        ],
        adaptations: [],
        ratings: [
            {
                source: "Goodreads",
                score: "3.8",
                outOf: "5"
            }
        ]
    },
    "rage": {
        year: 1977,
        title: "Rage",
        format: "Novel",
        notes: "Published as Richard Bachman. The first Bachman book. No longer in print at King's request due to its sensitive content.",
        location: "",
        synopsis: "A high school student takes a class hostage at gunpoint, engaging them in discussions about life, death, and society.",
        mainCharacters: [
            "Charlie Decker - A troubled high school student",
            "Ted Jones - The class antagonist",
            "Mr. Carlson - The school principal",
            "Mrs. Underwood - Charlie's math teacher"
        ],
        connections: [],
        adaptations: [],
        ratings: [
            {
                source: "Goodreads",
                score: "3.78",
                outOf: "5"
            }
        ]
    },
    "the-long-walk": {
        year: 1979,
        title: "The Long Walk",
        format: "Novel",
        notes: "Published as Richard Bachman. Often cited as one of King's most disturbing works.",
        location: "maine",
        synopsis: "In a dystopian future America, 100 teenage boys participate in an annual walking contest where the winner is the last one remaining. Contestants who stop walking receive warnings, and after three warnings, they are shot.",
        mainCharacters: [
            "Ray Garraty - The protagonist and Maine's representative in the Walk",
            "Peter McVries - A competitor who befriends Garraty",
            "Stebbins - The mysterious loner who seems to understand the Walk better than anyone",
            "The Major - The organizer of the Walk"
        ],
        connections: [],
        adaptations: [
            {
                title: "The Long Walk",
                type: "Movie",
                year: 2023,
                director: "Francis Lawrence",
                stars: ["TBA"],
                description: "A film adaptation in development directed by Francis Lawrence."
            }
        ],
        ratings: [
            {
                source: "Goodreads",
                score: "4.12",
                outOf: "5"
            }
        ]
    },
    "roadwork": {
        year: 1981,
        title: "Roadwork",
        format: "Novel",
        notes: "Published as Richard Bachman. Subtitled 'A Novel of the First Energy Crisis'.",
        location: "",
        synopsis: "A man's descent into madness as he fights against a highway extension project that threatens to demolish his home and workplace.",
        mainCharacters: [
            "Barton Dawes - A man who refuses to give up his home and business",
            "Mary Dawes - Barton's wife",
            "Georgie Dawes - Barton's deceased son",
            "Steve Ordner - Representative of the highway department"
        ],
        connections: [],
        adaptations: [],
        ratings: [
            {
                source: "Goodreads",
                score: "3.61",
                outOf: "5"
            }
        ]
    },
    "the-running-man": {
        year: 1982,
        title: "The Running Man",
        format: "Novel",
        notes: "Published as Richard Bachman. Set in a dystopian future where game shows are used to pacify the masses.",
        location: "",
        synopsis: "In a dystopian America of 2025, Ben Richards participates in a deadly game show called 'The Running Man' to earn money for his sick daughter's medical treatment. He must evade capture by hunters and the public for 30 days, earning money for each hour he stays alive.",
        mainCharacters: [
            "Ben Richards - A desperate man who joins the game show to help his family",
            "Sheila Richards - Ben's wife",
            "Cathy Richards - Ben's sick daughter",
            "Dan Killian - The producer of The Running Man show",
            "Evan McCone - Chief Hunter"
        ],
        connections: [],
        adaptations: [
            {
                title: "The Running Man",
                type: "Movie",
                year: 1987,
                director: "Paul Michael Glaser",
                stars: ["Arnold Schwarzenegger", "Maria Conchita Alonso", "Richard Dawson"],
                description: "A film adaptation that diverges significantly from the book's plot."
            }
        ],
        ratings: [
            {
                source: "Goodreads",
                score: "3.97",
                outOf: "5"
            }
        ]
    },
    "thinner": {
        year: 1984,
        title: "Thinner",
        format: "Novel",
        notes: "Published as Richard Bachman. The last Bachman book before King's pseudonym was exposed.",
        location: "",
        synopsis: "After an obese lawyer named Billy Halleck accidentally runs over and kills an old Romani woman, he is cursed by her father to grow 'thinner' every day, leading to a desperate search to reverse the curse before it's too late.",
        mainCharacters: [
            "Billy Halleck - An obese lawyer who is cursed to lose weight",
            "Taduz Lemke - The old Romani man who places the curse",
            "Heidi Halleck - Billy's wife",
            "Linda Halleck - Billy's daughter",
            "Richard Ginelli - Billy's friend with mob connections"
        ],
        connections: [],
        adaptations: [
            {
                title: "Thinner",
                type: "Movie",
                year: 1996,
                director: "Tom Holland",
                stars: ["Robert John Burke", "Joe Mantegna", "Lucinda Jenney"],
                description: "A film adaptation that follows the plot of the novel fairly closely."
            }
        ],
        ratings: [
            {
                source: "Goodreads",
                score: "3.57",
                outOf: "5"
            }
        ]
    },
    "the-regulators": {
        year: 1996,
        title: "The Regulators",
        format: "Novel",
        notes: "Published as Richard Bachman. Companion novel to Desperation, featuring the same characters in different roles.",
        location: "",
        synopsis: "On a summer day in the suburban town of Wentworth, Ohio, a red van cruises through Poplar Street, and the peaceful neighborhood is suddenly transformed into a war zone of unearthly horrors.",
        mainCharacters: [
            "Seth Garin - An autistic boy possessed by the entity Tak",
            "Aunt Audrey Garin - Seth's aunt and caretaker",
            "Johnny Marinville - A writer and former 1960s radical",
            "Cary Ripton - A paperboy",
            "David Carver - A young boy with a spiritual connection"
        ],
        connections: [
            {
                title: "Desperation",
                description: "Mirror novel featuring the same characters in different roles."
            }
        ],
        adaptations: [],
        ratings: [
            {
                source: "Goodreads",
                score: "3.66",
                outOf: "5"
            }
        ]
    },
    "blaze": {
        year: 2007,
        title: "Blaze",
        format: "Novel",
        notes: "Published as Richard Bachman. King wrote the original draft in the 1970s but revised it for publication in 2007.",
        location: "",
        synopsis: "Clayton Blaisdell Jr., known as Blaze, is a mentally challenged giant who kidnaps a baby for ransom, guided by the voice of his dead partner-in-crime, George.",
        mainCharacters: [
            "Clayton Blaisdell Jr. (Blaze) - A mentally challenged giant",
            "George Rackley - Blaze's deceased partner who appears as a voice in his head",
            "Joe Gerard - The wealthy father of the kidnapped baby",
            "Joe Gerard Jr. - The kidnapped baby"
        ],
        connections: [],
        adaptations: [],
        ratings: [
            {
                source: "Goodreads",
                score: "3.68",
                outOf: "5"
            }
        ]
    },
    "danse-macabre": {
        year: 1981,
        title: "Danse Macabre",
        format: "Non-fiction",
        notes: "A non-fiction examination of horror in various media from the 1950s to the 1970s.",
        location: "",
        synopsis: "King's analysis of horror in literature, film, and television from 1950 to 1980, exploring what scares us and why. The book examines influences on King's own writing and the cultural significance of horror.",
        mainCharacters: [],
        connections: [],
        adaptations: [],
        ratings: [
            {
                source: "Goodreads",
                score: "3.88",
                outOf: "5"
            }
        ]
    },
    "on-writing": {
        year: 2000,
        title: "On Writing: A Memoir of the Craft",
        format: "Non-fiction",
        notes: "Part memoir, part writing guide. Often cited as one of the best books about writing.",
        location: "",
        synopsis: "Part memoir, part master class by one of the bestselling authors of all time, this superb volume is a revealing and practical view of the writer's craft, comprising the basic tools of the trade every writer must have.",
        mainCharacters: [],
        connections: [],
        adaptations: [],
        ratings: [
            {
                source: "Goodreads",
                score: "4.32",
                outOf: "5"
            }
        ]
    },
    "faithful": {
        year: 2004,
        title: "Faithful",
        format: "Non-fiction",
        notes: "Co-written with Stewart O'Nan. Chronicles the 2004 Boston Red Sox season.",
        location: "",
        synopsis: "A chronicle of the Boston Red Sox's 2004 baseball season, from spring training to their historic World Series victory, as experienced by two devoted fans.",
        mainCharacters: [],
        connections: [],
        adaptations: [],
        ratings: [
            {
                source: "Goodreads",
                score: "3.77",
                outOf: "5"
            }
        ]
    },
    "guns": {
        year: 2013,
        title: "Guns",
        format: "Non-fiction",
        notes: "An essay published as a Kindle Single in response to the Sandy Hook Elementary School shooting.",
        location: "",
        synopsis: "A powerful essay in which King addresses the controversial and divisive issue of gun control and gun violence in America.",
        mainCharacters: [],
        connections: [],
        adaptations: [],
        ratings: [
            {
                source: "Goodreads",
                score: "3.86",
                outOf: "5"
            }
        ]
    },
    "hearts-in-suspension": {
        year: 2016,
        title: "Hearts in Suspension",
        format: "Non-fiction",
        notes: "Collection of essays about King's time at the University of Maine in the 1960s.",
        location: "maine",
        synopsis: "A collection that includes King's recollections of his college years during the Vietnam War, along with contributions from friends and colleagues from that time.",
        mainCharacters: [],
        connections: [],
        adaptations: [],
        ratings: [
            {
                source: "Goodreads",
                score: "3.82",
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