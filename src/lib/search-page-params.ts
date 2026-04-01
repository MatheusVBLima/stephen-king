import { createSearchParamsCache, parseAsString, parseAsStringLiteral } from "nuqs/server";

export const searchPageParsers = {
  q: parseAsString.withDefault(""),
  tipo: parseAsStringLiteral(["todos", "obra", "especial"] as const).withDefault("todos"),
  categoria: parseAsString.withDefault("todas"),
  ordem: parseAsStringLiteral(["recentes", "alfabetica"] as const).withDefault("recentes"),
};

export const searchPageParamsCache = createSearchParamsCache(searchPageParsers);
