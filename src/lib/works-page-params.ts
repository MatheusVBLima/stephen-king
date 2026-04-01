import { parseAsIndex, parseAsString, parseAsStringLiteral } from "nuqs";

export const worksCategoryValues = [
  "all",
  "fiction",
  "nonfiction",
  "collections",
  "darktower",
  "bachman",
] as const;

export const worksPageParsers = {
  categoria: parseAsStringLiteral(worksCategoryValues)
    .withDefault("all")
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
};
