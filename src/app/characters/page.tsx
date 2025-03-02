"use client";

import { useState, useEffect } from 'react';
import { getAllCharacters, getCharactersByType } from '@/lib/characters-data';
import { CharacterCard } from '@/components/CharacterCard';
import { Button } from '@/components/ui/button';
import { Skull, UserCheck, Users, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Character } from '@/lib/types';

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = () => {
      try {
        let charactersData;

        if (filter === 'all') {
          charactersData = getAllCharacters();
        } else if (filter === 'villains') {
          charactersData = getCharactersByType(true);
        } else if (filter === 'heroes') {
          charactersData = getCharactersByType(false);
        }

        setCharacters(charactersData || []);
      } catch (error) {
        console.error("Error fetching characters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [filter]);

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <Button 
            variant="outline" 
            asChild 
            className="mb-6"
          >
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>Voltar para Home</span>
            </Link>
          </Button>
        </div>
        
        <h1 className="mb-4 text-3xl font-bold text-center md:text-5xl">Personagens do Universo de Stephen King</h1>
        <p className="mb-8 text-center text-muted-foreground">
          Explore os personagens recorrentes que habitam as histórias de Stephen King
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            className="flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            Todos
          </Button>
          <Button
            variant={filter === 'heroes' ? 'default' : 'outline'}
            onClick={() => setFilter('heroes')}
            className="flex items-center gap-2"
          >
            <UserCheck className="w-4 h-4" />
            Heróis
          </Button>
          <Button
            variant={filter === 'villains' ? 'default' : 'outline'}
            onClick={() => setFilter('villains')}
            className="flex items-center gap-2"
          >
            <Skull className="w-4 h-4" />
            Vilões
          </Button>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : characters.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-muted-foreground">Nenhum personagem encontrado</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 