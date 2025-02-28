import { ResponsiveWorksDisplay } from "./responsive-works-display"

export function DerryWorks() {
  const works = [
    {
      year: 1981,
      title: "The Bird and the Album",
      format: "Short Story",
      notes: "First published in 1981, later incorporated into It (1986). Introduces Derry.",
    },
    {
      year: 1986,
      title: "It",
      format: "Novel",
      notes: "Epic tale of the Losers' Club battling Pennywise in Derry.",
    },
    {
      year: 1986,
      title: "The End of the Whole Mess",
      format: "Short Story",
      notes:
        "First published in 1986, collected in Nightmares & Dreamscapes (1993). Significant portions set in Derry, involving a virus.",
    },
    {
      year: 1992,
      title: "The Fifth Quarter",
      format: "Short Story",
      notes:
        "First published in 1992, collected in Nightmares & Dreamscapes (1993). A key event occurs in Derry, though primarily set elsewhere.",
    },
    {
      year: 1994,
      title: "Insomnia",
      format: "Novel",
      notes: "Centers on supernatural events in Derry, focusing on elderly characters.",
    },
    {
      year: 1999,
      title: "The Road Virus Heads North",
      format: "Short Story",
      notes: "First published in 1999, collected in Everything's Eventual (2002). Protagonist investigates in Derry.",
    },
    {
      year: 2001,
      title: "Riding the Bullet",
      format: "Short Story",
      notes:
        "First published in 2000 as an e-book, collected in Everything's Eventual (2002). Mentions a character from Derry, with minor setting involvement.",
    },
    {
      year: 2011,
      title: "11/22/63",
      format: "Novel",
      notes: "Protagonist Jake Epping spends time in Derry during his time-travel journey.",
    },
  ]

  return <ResponsiveWorksDisplay works={works} />
}

