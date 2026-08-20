/**
 * Display labels for book formats (UI locale: pt-BR).
 * Underlying data in books-data.ts remains English keys for consistency with sources.
 */
const FORMAT_PT: Record<string, string> = {
  Novel: "Romance",
  Novella: "Novela",
  Collection: "Coletânea",
  "Short Story": "Conto",
  "Short Story Collection": "Coletânea de contos",
  "Novella Collection": "Coletânea de novelas",
  "Non-Fiction": "Não ficção",
  "Non-fiction": "Não ficção",
  "Serial Novel": "Romance serializado",
  Screenplay: "Roteiro",
  "E-book": "E-book",
};

export function formatBookFormatForDisplay(format: string): string {
  return FORMAT_PT[format] ?? format;
}
