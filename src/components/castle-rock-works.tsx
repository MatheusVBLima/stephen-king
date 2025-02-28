import { ResponsiveWorksDisplay } from "./responsive-works-display"

export function CastleRockWorks() {
  const works = [
    {
      year: 1979,
      title: "The Dead Zone",
      format: "Novel",
      notes: "Introduces Castle Rock as a key setting.",
    },
    {
      year: 1981,
      title: "Cujo",
      format: "Novel",
      notes: "Focuses on Castle Rock families impacted by a rabid dog.",
    },
    {
      year: 1982,
      title: "The Body",
      format: "Novella",
      notes: "Published in Different Seasons, set in Castle Rock in the 1960s.",
    },
    {
      year: 1983,
      title: "Uncle Otto's Truck",
      format: "Short Story",
      notes: "First published in 1983, collected in Skeleton Crew (1985).",
    },
    {
      year: 1984,
      title: "Mrs. Todd's Shortcut",
      format: "Short Story",
      notes: "First published in 1984, collected in Skeleton Crew (1985).",
    },
    {
      year: 1984,
      title: "Gramma",
      format: "Short Story",
      notes: "First published in 1984, collected in Skeleton Crew (1985).",
    },
    {
      year: 1985,
      title: "Nona",
      format: "Short Story",
      notes: "Revised version in Skeleton Crew (1985), Castle Rock added.",
    },
    {
      year: 1989,
      title: "The Dark Half",
      format: "Novel",
      notes: "Introduces Sheriff Alan Pangborn, a recurring character.",
    },
    {
      year: 1990,
      title: "The Sun Dog",
      format: "Novella",
      notes: "Published in Four Past Midnight.",
    },
    {
      year: 1991,
      title: "Needful Things",
      format: "Novel",
      notes: 'Marketed as "The Last Castle Rock Story," though more followed.',
    },
    {
      year: 1993,
      title: "It Grows on You",
      format: "Short Story",
      notes: "Revised for Nightmares & Dreamscapes (1993), set in Castle Rock.",
    },
    {
      year: 2009,
      title: "Premium Harmony",
      format: "Short Story",
      notes: "First published in 2009, collected in The Bazaar of Bad Dreams (2015).",
    },
    {
      year: 2015,
      title: "Drunken Fireworks",
      format: "Novella",
      notes: "Published in The Bazaar of Bad Dreams.",
    },
    {
      year: 2017,
      title: "Gwendy's Button Box",
      format: "Novella/Novel",
      notes: "Co-written with Richard Chizmar.",
    },
    {
      year: 2018,
      title: "Elevation",
      format: "Novella",
      notes: "Centers on a Castle Rock resident with a mysterious condition.",
    },
    {
      year: 2019,
      title: "Gwendy's Magic Feather",
      format: "Novel",
      notes: "Co-written with Richard Chizmar, sequel to Gwendy's Button Box.",
    },
    {
      year: 2022,
      title: "Gwendy's Final Task",
      format: "Novel",
      notes: "Co-written with Richard Chizmar, trilogy conclusion.",
    },
    {
      year: 2024,
      title: "Two Talented Bastids",
      format: "Novella",
      notes: "Partially set in Castle Rock and surrounding areas.",
    },
  ]

  return <ResponsiveWorksDisplay works={works} />
}

