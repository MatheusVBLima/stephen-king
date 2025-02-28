import { ResponsiveWorksDisplay } from "./responsive-works-display"

export function SalemsLotWorks() {
  const works = [
    {
      year: 1975,
      title: "'Salem's Lot",
      format: "Novel",
      notes: "Core story about a vampire infestation in Jerusalem's Lot.",
    },
    {
      year: 1977,
      title: "One for the Road",
      format: "Short Story",
      notes:
        "Sequel, first published in Maine Magazine (1977), collected in Night Shift (1978). Shows the lasting impact of the events.",
    },
    {
      year: 1978,
      title: "Jerusalem's Lot",
      format: "Short Story",
      notes:
        "Prequel, first published in Whispers (1978), collected in Night Shift (1978). Explores the town's dark history.",
    },
  ]

  return <ResponsiveWorksDisplay works={works} />
}

