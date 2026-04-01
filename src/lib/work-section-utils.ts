import type { ImportedSection } from "@/lib/types"

type WorkSectionGroup =
  | "about"
  | "curiosities"
  | "connections"
  | "editions"
  | "adaptations"
  | "characters"
  | "misc"
  | "ignored"

export function groupImportedSections(sections: ImportedSection[]) {
  const grouped = {
    about: [] as ImportedSection[],
    curiosities: [] as ImportedSection[],
    connections: [] as ImportedSection[],
    editions: [] as ImportedSection[],
    adaptations: [] as ImportedSection[],
    characters: [] as ImportedSection[],
    misc: [] as ImportedSection[],
  }

  for (const section of sections) {
    const group = classifySection(section.title)
    if (group === "ignored") {
      continue
    }

    grouped[group].push(section)
  }

  return grouped
}

export function getSectionDisplayTitle(title: string) {
  const normalized = normalizeSectionKey(title)
  const squashed = normalized.replace(/\s+/g, "")

  if (squashed.startsWith("ficha")) return "Ficha técnica"
  if (squashed.startsWith("sobre")) return "Sobre o livro"
  if (squashed.startsWith("sinopse")) return "Sinopse"
  if (squashed.startsWith("resumo")) return "Resumo"
  if (squashed.startsWith("resenha")) return "Resenha"
  if (squashed.startsWith("curiosidades")) return "Curiosidades e referências"
  if (squashed.startsWith("conex")) return "Conexões"
  if (squashed.startsWith("men") && squashed.includes("refer")) return "Menções em outros livros"
  if (squashed.startsWith("edi") && squashed.includes("brasileiras")) return "Edições brasileiras"
  if (squashed.startsWith("adapta")) return "Adaptações"

  return title
}

function classifySection(title: string): WorkSectionGroup {
  const normalized = normalizeSectionKey(title)
  const squashed = normalized.replace(/\s+/g, "")

  if (squashed.startsWith("conteudo") || squashed.startsWith("ficha")) {
    return "ignored"
  }

  if (
    squashed.startsWith("sobre") ||
    squashed.startsWith("sinopse") ||
    squashed.startsWith("resumo") ||
    squashed.startsWith("resenha") ||
    squashed.startsWith("critica")
  ) {
    return "about"
  }

  if (
    squashed.startsWith("curiosidades") ||
    squashed.startsWith("referenciasnarrativas") ||
    squashed.startsWith("referenciaslocais") ||
    squashed.startsWith("referenciasculturais") ||
    squashed.startsWith("referenciasbiograficas") ||
    squashed.startsWith("assuntosrecorrentes")
  ) {
    return "curiosities"
  }

  if (squashed.startsWith("conex") || (squashed.startsWith("men") && squashed.includes("refer"))) {
    return "connections"
  }

  if (squashed.startsWith("edi") && squashed.includes("brasileiras")) {
    return "editions"
  }

  if (squashed.startsWith("adapta") || squashed.startsWith("aparicoesemfilmes")) {
    return "adaptations"
  }

  if (squashed.startsWith("personagens") || squashed.startsWith("referenciasapersonagens")) {
    return "characters"
  }

  if (squashed.startsWith("v") && squashed.endsWith("deos")) {
    return "ignored"
  }

  return "misc"
}

function normalizeSectionKey(value: string) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
}
