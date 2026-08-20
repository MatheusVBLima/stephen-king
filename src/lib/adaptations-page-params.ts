import { parseAsIndex, parseAsString, parseAsStringLiteral } from "nuqs"

export const adaptationKindValues = ["todos", "cinema", "serie", "minisserie", "hq", "outro"] as const

export const adaptationsPageParsers = {
  tipo: parseAsStringLiteral(adaptationKindValues)
    .withDefault("todos")
    .withOptions({
      history: "push",
      scroll: false,
    }),
  pagina: parseAsIndex.withDefault(0).withOptions({
    history: "push",
    scroll: false,
  }),
  busca: parseAsString.withDefault("").withOptions({
    history: "replace",
    scroll: false,
  }),
}
