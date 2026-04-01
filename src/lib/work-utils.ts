import { slugify } from "@/lib/books-data"

const NON_SPECIFIC_LOCATIONS = new Set(["", "none", "various", "multiple"])

const DISPLAY_LOCATION_NAMES: Record<string, string> = {
  "castle-rock": "Castle Rock",
  derry: "Derry",
  "jerusalems-lot": "Jerusalem's Lot",
  maine: "Maine",
  "rural-maine": "Maine rural",
  "western-maine": "Maine ocidental",
  "dark-tower": "Torre Negra",
  multiple: "Múltiplas localidades",
  various: "Várias localidades",
}

export function getCanonicalWorkHref(title: string) {
  return `/works/${slugify(title)}`
}

export function hasSpecificLocation(location: string) {
  return !NON_SPECIFIC_LOCATIONS.has(location)
}

export function formatLocationName(location: string) {
  if (!location) return "Sem localização definida"
  return DISPLAY_LOCATION_NAMES[location] ?? location
}
