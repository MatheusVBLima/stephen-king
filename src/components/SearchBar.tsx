"use client";

import {
  startTransition,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useQueryState } from "nuqs";

import { searchPageParsers } from "@/lib/search-page-params";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SearchBarProps {
  initialValue?: string;
}

interface GlobalSearchResult {
  badge: string;
  description: string;
  href: string;
  kind: "especial" | "obra";
  title: string;
}

export function SearchBar({ initialValue = "" }: SearchBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useQueryState(
    "q",
    searchPageParsers.q.withOptions({
      history: "push",
      shallow: false,
      scroll: false,
    }),
  );
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<GlobalSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const deferredSearchTerm = useDeferredValue(searchTerm.trim());
  const abortRef = useRef<AbortController | null>(null);

  const resolvedInitialValue = pathname === "/search" ? query : initialValue;
  const triggerLabel = resolvedInitialValue.trim() || "Buscar obras, especiais e personagens...";
  const isSearchPage = pathname === "/search";
  const hasTypedQuery = deferredSearchTerm.length > 0;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchTerm(resolvedInitialValue);
        setOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [resolvedInitialValue]);

  useEffect(() => {
    if (!open) {
      abortRef.current?.abort();
      return;
    }

    if (!hasTypedQuery) {
      abortRef.current?.abort();
      return;
    }

    const controller = new AbortController();
    abortRef.current?.abort();
    abortRef.current = controller;

    const params = new URLSearchParams({ q: deferredSearchTerm, limit: "8" });

    fetch(`/api/search?${params.toString()}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Falha ao buscar resultados.");
        }

        const data = (await response.json()) as { results: GlobalSearchResult[] };
        setResults(data.results);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setResults([]);
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [deferredSearchTerm, hasTypedQuery, open]);

  const quickLinks = useMemo(
    () => [
      { href: "/search", label: "Abrir página de pesquisa", shortcut: "Enter" },
      { href: "/works", label: "Explorar obras", shortcut: "Obras" },
      { href: "/artigos", label: "Explorar especiais", shortcut: "Especiais" },
    ],
    [],
  );

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setSearchTerm(resolvedInitialValue);
      setResults([]);
      setIsLoading(Boolean(resolvedInitialValue.trim()));
    } else {
      abortRef.current?.abort();
      setResults([]);
      setIsLoading(false);
    }

    setOpen(nextOpen);
  };

  const handleNavigate = (href: string, nextQuery?: string) => {
    handleOpenChange(false);

    startTransition(() => {
      if (href === "/search" && isSearchPage) {
        void setQuery(nextQuery?.trim() ? nextQuery.trim() : null);
        return;
      }

      if (href === "/search") {
        const normalizedQuery = nextQuery?.trim();
        router.push(
          normalizedQuery ? `/search?q=${encodeURIComponent(normalizedQuery)}` : "/search",
        );
        return;
      }

      router.push(href);
    });
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className="h-12 w-full justify-between gap-3 rounded-full border-border/60 bg-background/80 px-4 text-sm font-normal shadow-sm transition-colors hover:bg-background/90"
        onClick={() => handleOpenChange(true)}
      >
        <span className="truncate text-left text-muted-foreground">{triggerLabel}</span>
        <span className="flex items-center gap-3 text-muted-foreground">
          <kbd className="hidden rounded-md border border-border/60 bg-background/80 px-2 py-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground/80 md:inline-flex">
            Ctrl K
          </kbd>
          <Search data-icon="inline-end" />
        </span>
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="overflow-hidden border-border/60 bg-background p-0 shadow-2xl sm:max-w-2xl">
          <DialogHeader className="sr-only">
            <DialogTitle>Pesquisa global</DialogTitle>
            <DialogDescription>
              Busque obras, especiais e personagens sem sair da página atual.
            </DialogDescription>
          </DialogHeader>
          <Command shouldFilter={false} className="bg-transparent">
            <CommandInput
              autoFocus
              placeholder="Digite para pesquisar em todo o arquivo..."
              value={searchTerm}
              onValueChange={(value) => {
                setSearchTerm(value);

                if (!value.trim()) {
                  abortRef.current?.abort();
                  setResults([]);
                  setIsLoading(false);
                  return;
                }

                setIsLoading(true);
              }}
            />
            <CommandList className="max-h-[65vh]">
              {hasTypedQuery ? (
                <>
                  <CommandGroup heading="Resultados">
                    {results.map((result) => (
                      <CommandItem
                        key={`${result.kind}-${result.href}`}
                        value={`${result.title} ${result.description}`}
                        onSelect={() => handleNavigate(result.href)}
                        className="flex items-start gap-3 rounded-xl px-3 py-3"
                      >
                        <Search className="mt-0.5" />
                        <div className="flex min-w-0 flex-1 flex-col gap-1">
                          <span className="truncate font-medium">{result.title}</span>
                          <span className="line-clamp-2 text-xs leading-6 text-muted-foreground">
                            {result.description}
                          </span>
                        </div>
                        <CommandShortcut>{result.badge}</CommandShortcut>
                      </CommandItem>
                    ))}
                  </CommandGroup>

                  {!isLoading && results.length === 0 ? (
                    <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                      Nenhum resultado encontrado para essa pesquisa.
                    </div>
                  ) : null}

                  {isLoading ? (
                    <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                      Buscando resultados...
                    </div>
                  ) : null}

                  <CommandSeparator />
                  <CommandGroup heading="Pesquisa completa">
                    <CommandItem
                      value={`Abrir pagina de pesquisa ${deferredSearchTerm}`}
                      onSelect={() => handleNavigate("/search", searchTerm)}
                      className="rounded-xl px-3 py-3"
                    >
                      <Search />
                      <span>Ver todos os resultados em Pesquisa</span>
                      <CommandShortcut>↵</CommandShortcut>
                    </CommandItem>
                  </CommandGroup>
                </>
              ) : (
                <CommandGroup heading="Navegação rápida">
                  {quickLinks.map((item) => (
                    <CommandItem
                      key={item.href}
                      value={item.label}
                      onSelect={() => handleNavigate(item.href, resolvedInitialValue)}
                      className="rounded-xl px-3 py-3"
                    >
                      <Search />
                      <span>{item.label}</span>
                      <CommandShortcut>{item.shortcut}</CommandShortcut>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
