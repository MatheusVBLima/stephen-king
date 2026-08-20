"use client";

import Link from "next/link";
import { BookOpen, Skull, UserCheck } from "lucide-react";

import { Particles } from "@/components/magicui/particles";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import type { Character } from "@/lib/types";

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link href={`/characters/${character.slug}`} className="block min-w-0">
      <Card className="h-full overflow-hidden transition-colors hover:border-foreground/40">
        <div className="relative h-60">
          <div className="absolute inset-0">
            <Particles
              className="absolute inset-0 -z-10"
              quantity={50}
              color={character.isVillain ? "#ef4444" : "#3b82f6"}
              size={0.6}
            />
          </div>

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4">
            <div className="relative mb-4 size-16">
              <Avatar className="h-full w-full border-2 border-background">
                <AvatarImage src={character.imageUrl} alt={character.name} className="object-cover" />
                <AvatarFallback className="bg-background/80">
                  {character.isVillain ? (
                    <Skull className="h-8 w-8 text-red-500" />
                  ) : (
                    <UserCheck className="h-8 w-8 text-blue-500" />
                  )}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="mb-2 text-center font-display text-2xl text-white">{character.name}</CardTitle>

            <Badge variant={character.isVillain ? "destructive" : "default"} className="mb-2">
              {character.isVillain ? "Vilão" : "Herói"}
            </Badge>

            <p className="text-center text-sm text-white/80">
              {character.description.length > 100
                ? `${character.description.substring(0, 100)}…`
                : character.description}
            </p>
          </div>
        </div>

        <CardFooter className="flex flex-col items-start gap-2 pb-4 pt-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Primeira aparição:</span>
          </div>
          <Badge variant="outline" className="font-normal">
            {character.firstAppearance}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
