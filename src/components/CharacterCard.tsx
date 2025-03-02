"use client";

import { Character } from '@/lib/types';
import { Card, CardFooter, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Skull, UserCheck, BookOpen } from 'lucide-react';
import { Particles } from '@/components/magicui/particles';

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link href={`/characters/${character.slug}`} className="block transition-transform hover:scale-[1.02]">
      <Card className="h-full overflow-hidden border">
        <div className="relative h-60">
          {/* Particles background effect */}
          <div className="absolute inset-0">
            <Particles 
              className="absolute inset-0 -z-10" 
              quantity={50}
              color={character.isVillain ? '#ef4444' : '#3b82f6'} // Red for villains, blue for heroes
              size={0.6}
            />
          </div>
          
          {/* Overlay content */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-background/80">
              {character.isVillain ? (
                <Skull className="w-8 h-8 text-red-500" />
              ) : (
                <UserCheck className="w-8 h-8 text-blue-500" />
              )}
            </div>
            <CardTitle className="mb-2 text-xl text-center text-white">{character.name}</CardTitle>
            
            <Badge variant={character.isVillain ? "destructive" : "default"} className="mb-2">
              {character.isVillain ? 'Villain' : 'Hero'}
            </Badge>
            
            <p className="text-sm text-center text-white/80">
              {character.description.length > 100 
                ? `${character.description.substring(0, 100)}...` 
                : character.description}
            </p>
          </div>
        </div>
        
        <CardFooter className="flex flex-col items-start gap-2 pt-4 pb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">First appearance:</span>
          </div>
          <Badge variant="outline" className="font-normal">
            {character.firstAppearance}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
} 