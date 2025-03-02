import { getCharacterBySlug } from '@/lib/characters-data';
import { Metadata } from 'next';
import CharacterDetailContent from '@/components/CharacterDetailContent';

interface CharacterDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CharacterDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const character = getCharacterBySlug(resolvedParams.slug);
  
  if (!character) {
    return {
      title: "Character Not Found | Stephen King's Universe",
      description: "This character could not be found in Stephen King's Universe."
    };
  }
  
  return {
    title: `${character.name} | Stephen King Character Profile`,
    description: `Learn about ${character.name}, ${character.isVillain ? 'a villain' : 'a hero'} from Stephen King's fiction. ${character.description?.substring(0, 150)}...`,
  };
}

export default function CharacterDetailPage({ params }: CharacterDetailPageProps) {
  return <CharacterDetailContent params={params} />;
} 