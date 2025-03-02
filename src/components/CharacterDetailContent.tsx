"use client";

import { useState, useEffect } from 'react';
import { getCharacterBySlug } from '@/lib/characters-data';
import { CharacterProfile } from '@/components/CharacterProfile';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { Character } from '@/lib/types';
import { Breadcrumb } from '@/components/ui/breadcrumb';

interface CharacterDetailContentProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function CharacterDetailContent({ params }: CharacterDetailContentProps) {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const clientParams = useParams();

  useEffect(() => {
    // Fetch character data
    const fetchCharacter = async () => {
      try {
        setLoading(true);
        
        let slug: string;
        
        // Get slug from props or client params
        if (params) {
          const resolvedParams = await params;
          slug = resolvedParams.slug;
        } else if (clientParams && 'slug' in clientParams) {
          slug = clientParams.slug as string;
        } else {
          notFound();
          return;
        }
        
        // Fetch character data
        const characterData = getCharacterBySlug(slug);
        
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

  // Breadcrumb segments
  const breadcrumbSegments = [
    { name: "Characters", href: "/characters" },
    { name: character?.name || "Loading...", href: `/characters/${clientParams?.slug || ""}`, isCurrent: true }
  ];

  if (loading) {
    return (
      <main className="min-h-screen p-4 md:p-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb segments={breadcrumbSegments} className="mb-6" />
          
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

  // Update breadcrumb with character name once loaded
  breadcrumbSegments[1].name = character.name;

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <Breadcrumb segments={breadcrumbSegments} className="mb-6" />
        
        <CharacterProfile character={character} />
      </div>
    </main>
  );
} 