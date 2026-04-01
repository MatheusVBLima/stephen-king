/**
 * Display labels for book formats (UI locale: pt-BR).
 * Underlying data in books-data.ts remains English keys for consistency with sources.
 */
const FORMAT_PT: Record<string, string> = {
  Novel: "Romance",
  Novella: "Novela",
  "Short Story": "Conto",
  "Non-fiction": "Não ficção",
};

export function formatBookFormatForDisplay(format: string): string {
  return FORMAT_PT[format] ?? format;
}
