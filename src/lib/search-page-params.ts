import { createSearchParamsCache, parseAsString, parseAsStringLiteral } from "nuqs/server";

export const searchPageParsers = {
  q: parseAsString.withDefault(""),
  tipo: parseAsStringLiteral(["todos", "obra", "adaptacao", "autor", "cidade", "personagem"] as const).withDefault("todos"),
  ordem: parseAsStringLiteral(["recentes", "alfabetica"] as const).withDefault("recentes"),
};

export const searchPageParamsCache = createSearchParamsCache(searchPageParsers);
