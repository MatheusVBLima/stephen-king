"use client";

import { useState, useEffect } from 'react';
import { getCharacterBySlug } from '@/lib/characters-data';
import { CharacterProfile } from '@/components/CharacterProfile';
import { PageShell } from '@/components/PageShell';
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
    { name: "Personagens", href: "/characters" },
    { name: character?.name || "Carregando…", href: `/characters/${clientParams?.slug || ""}`, isCurrent: true }
  ];

  if (loading) {
    return (
      <PageShell>
        <Breadcrumb segments={breadcrumbSegments} />
        <p className="text-sm text-muted-foreground">Carregando…</p>
      </PageShell>
    );
  }

  if (!character) {
    return notFound();
  }

  breadcrumbSegments[1].name = character.name;

  return (
    <PageShell>
      <Breadcrumb segments={breadcrumbSegments} />
      <CharacterProfile character={character} />
    </PageShell>
  );
} 