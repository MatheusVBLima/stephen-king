"use client";

import { useState, useEffect } from 'react';
import { getCharacterBySlug } from '@/lib/characters-data';
import { CharacterProfile } from '@/components/CharacterProfile';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Character } from '@/lib/types';
import { useParams } from 'next/navigation';

interface CharacterDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function CharacterDetailPage({ params }: CharacterDetailPageProps) {
  // Usar useParams para acessar os parâmetros no lado do cliente
  const clientParams = useParams();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Função assíncrona para buscar o personagem
    const fetchCharacter = async () => {
      try {
        let slugValue: string;
        
        // Se temos clientParams (via navegação do cliente), use-os
        if (clientParams?.slug) {
          slugValue = String(clientParams.slug);
        } 
        // Caso contrário, resolva a Promise de params do servidor
        else {
          const resolvedParams = await params;
          slugValue = resolvedParams.slug;
        }
        
        // Buscar dados do personagem pelo slug
        const characterData = getCharacterBySlug(slugValue);
        
        if (!characterData) {
          notFound();
        }
        
        setCharacter(characterData);
      } catch (error) {
        console.error("Error fetching character:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [params, clientParams]);

  if (loading) {
    return (
      <main className="min-h-screen p-4 md:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <Button 
              variant="outline" 
              asChild 
              className="mb-6"
            >
              <Link href="/characters">
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span>Voltar para Personagens</span>
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-8 h-8 border-4 rounded-full border-primary border-t-transparent animate-spin"></div>
          </div>
        </div>
      </main>
    );
  }

  if (!character) {
    return notFound();
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <Button 
            variant="outline" 
            asChild 
            className="mb-6"
          >
            <Link href="/characters">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>Voltar para Personagens</span>
            </Link>
          </Button>
        </div>
        
        <CharacterProfile character={character} />
      </div>
    </main>
  );
} 