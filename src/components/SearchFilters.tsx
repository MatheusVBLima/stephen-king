"use client";

import { useQueryStates } from "nuqs";

import { searchPageParsers } from "@/lib/search-page-params";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SearchFiltersProps {
  availableCategories: string[];
}

const typeOptions = [
  { value: "todos", label: "Tudo" },
  { value: "obra", label: "Obras" },
  { value: "especial", label: "Especiais" },
] as const;

const orderOptions = [
  { value: "recentes", label: "Mais recentes" },
  { value: "alfabetica", label: "A-Z" },
] as const;

export function SearchFilters({ availableCategories }: SearchFiltersProps) {
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
        <span className="text-sm font-medium">Categoria</span>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-2 pb-1">
            <button type="button" onClick={() => setParams({ categoria: null })}>
              <Badge variant={params.categoria === "todas" ? "secondary" : "outline"}>Todas</Badge>
            </button>
            {availableCategories.map((value) => (
              <button key={value} type="button" onClick={() => setParams({ categoria: value })}>
                <Badge variant={params.categoria === value ? "secondary" : "outline"}>
                  {value}
                </Badge>
              </button>
            ))}
          </div>
        </ScrollArea>
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
