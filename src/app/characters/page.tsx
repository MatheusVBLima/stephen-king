import CharactersContent from "@/components/CharactersContent";
import { getImportedCharacters } from "@/lib/imported-content";

export const metadata = {
  title: "Personagens | Arquivo Stephen King",
  description:
    "Personagens recorrentes e figuras centrais das fichas do arquivo brasileiro.",
};

export default function CharactersPage() {
  return <CharactersContent characters={getImportedCharacters()} />;
}
