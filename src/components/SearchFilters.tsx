"use client";

import { useQueryStates } from "nuqs";

import { searchPageParsers } from "@/lib/search-page-params";
import { Badge } from "@/components/ui/badge";

const typeOptions = [
  { value: "todos", label: "Tudo" },
  { value: "obra", label: "Obras" },
  { value: "adaptacao", label: "Adaptações" },
  { value: "autor", label: "Autor" },
  { value: "cidade", label: "Cidades" },
  { value: "personagem", label: "Personagens" },
] as const;

const orderOptions = [
  { value: "recentes", label: "Mais recentes" },
  { value: "alfabetica", label: "A-Z" },
] as const;

export function SearchFilters() {
  const [params, setParams] = useQueryStates(searchPageParsers, {
    history: "push",
    shallow: false,
    scroll: false,
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium">Tipo</span>
        <div className="flex flex-wrap gap-2">
          {typeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setParams({ tipo: option.value === "todos" ? null : option.value })}
            >
              <Badge variant={params.tipo === option.value ? "secondary" : "outline"}>
                {option.label}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium">Ordenação</span>
        <div className="flex flex-wrap gap-2">
          {orderOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setParams({ ordem: option.value === "recentes" ? null : option.value })}
            >
              <Badge variant={params.ordem === option.value ? "secondary" : "outline"}>
                {option.label}
              </Badge>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
