"use client";

import { useMemo, useState } from "react";
import { Skull, UserCheck, Users } from "lucide-react";

import { CharacterCard } from "@/components/CharacterCard";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Character } from "@/lib/types";

interface CharactersContentProps {
  characters: Character[];
}

export default function CharactersContent({ characters }: CharactersContentProps) {
  const [filter, setFilter] = useState<"all" | "heroes" | "villains">("all");

  const visibleCharacters = useMemo(() => {
    if (filter === "villains") return characters.filter((character) => character.isVillain);
    if (filter === "heroes") return characters.filter((character) => !character.isVillain);
    return characters;
  }, [characters, filter]);

  const number = new Intl.NumberFormat("pt-BR");

  return (
    <PageShell>
      <PageHeader
        breadcrumb={[{ name: "Personagens", href: "/characters", isCurrent: true }]}
        kicker={`${number.format(characters.length)} fichas`}
        title="Personagens"
        description="Quem atravessa mais de um livro, ou quem as fichas e o texto do arquivo brasileiro tratam como figura central. Não é o elenco inteiro."
      >
        <Tabs value={filter} onValueChange={(value) => setFilter(value as typeof filter)}>
          <TabsList>
            <TabsTrigger value="all">
              <Users data-icon="inline-start" />
              Todos
            </TabsTrigger>
            <TabsTrigger value="heroes">
              <UserCheck data-icon="inline-start" />
              Heróis
            </TabsTrigger>
            <TabsTrigger value="villains">
              <Skull data-icon="inline-start" />
              Vilões
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </PageHeader>

      {visibleCharacters.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhum personagem encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleCharacters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}
    </PageShell>
  );
}
