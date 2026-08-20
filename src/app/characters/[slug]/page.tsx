import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { CharacterProfile } from "@/components/CharacterProfile";
import { PageShell } from "@/components/PageShell";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { getImportedCharacterBySlug, getImportedCharacters } from "@/lib/imported-content";

export function generateStaticParams() {
  return getImportedCharacters().map((character) => ({ slug: character.slug }));
}

interface CharacterDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CharacterDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const character = getImportedCharacterBySlug(resolvedParams.slug);

  if (!character) {
    return {
      title: "Personagem não encontrado | Arquivo Stephen King",
      description: "Este personagem não foi encontrado no arquivo.",
    };
  }

  return {
    title: `${character.name} | Personagens`,
    description: character.description.slice(0, 160),
  };
}

export default async function CharacterDetailPage({ params }: CharacterDetailPageProps) {
  const resolvedParams = await params;
  const character = getImportedCharacterBySlug(resolvedParams.slug);

  if (!character) {
    notFound();
  }

  const breadcrumbSegments = [
    { name: "Personagens", href: "/characters" },
    { name: character.name, href: `/characters/${character.slug}`, isCurrent: true },
  ];

  return (
    <PageShell>
      <Breadcrumb segments={breadcrumbSegments} />
      <CharacterProfile character={character} />
    </PageShell>
  );
}
