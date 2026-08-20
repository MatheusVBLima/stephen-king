export type EditorialBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "entry"; index?: string; title: string; body: string }
  | { type: "list"; items: string[] }

const BODY_OPENERS =
  /^(Um|Uma|Uns|Umas|Em|Durante|Quando|Depois|Antes|Charles|Burt|John|Arthur|Howard|Sam|Dois|Duas|Ele|Ela|Este|Esta|Esse|Essa|Aos|Ao)\b/

const NAME_TOKEN = "[A-ZÁÉÍÓÚÀÂÊÔÃÕÜ][\\w'’.+-]*"
const QUOTED_NICKNAME = "[“\"«][^”\"»]{1,40}[”\"»]"
const NAME_STOPWORDS = "(?:Na|No|Nas|Nos|Em|Esta|Este|Esse|Essa|Quando|Depois|Antes|Durante|Ele|Ela|Sua|Seu)"
const CHARACTER_NAME =
  `(?!${NAME_STOPWORDS}\\s)${NAME_TOKEN}(?:\\s+${NAME_TOKEN}){1,4}(?:\\s+${QUOTED_NICKNAME})?(?:\\s+${NAME_TOKEN}){0,2}`

const NAME_THEN_VERB = new RegExp(
  `^(${CHARACTER_NAME})\\s+(?:(?:É|é)(?=\\s)|(?:Aparece|aparece)\\b)`,
)

const BIO_SPLIT = new RegExp(
  `(?<=[.!?”"»])\\s+(?=${CHARACTER_NAME}\\s+(?:(?:É|é)(?=\\s)|(?:Aparece|aparece)\\b))`,
)

export function parseEditorialParagraphs(paragraphs: string[]): EditorialBlock[] {
  const blocks: EditorialBlock[] = []
  let listBuffer: string[] = []

  const flushList = () => {
    if (listBuffer.length === 1) {
      blocks.push({ type: "paragraph", text: listBuffer[0] })
    } else if (listBuffer.length > 1) {
      blocks.push({ type: "list", items: listBuffer })
    }
    listBuffer = []
  }

  for (const raw of paragraphs) {
    const text = String(raw || "").replace(/\s+/g, " ").trim()
    if (!text || text === "-") continue

    const numbered = parseNumberedEntry(text)
    if (numbered) {
      flushList()
      blocks.push(numbered)
      continue
    }

    const bios = splitNamedBios(text)
    if (bios.length > 1) {
      flushList()
      blocks.push(...bios)
      continue
    }

    const named = parseNamedEntry(text)
    if (named) {
      flushList()
      blocks.push(named)
      continue
    }

    const note = parseColonNote(text)
    if (note) {
      flushList()
      blocks.push(note)
      continue
    }

    if (isShortLabel(text)) {
      const last = blocks[blocks.length - 1]
      if (listBuffer.length > 0 || last?.type === "heading") {
        listBuffer.push(text.replace(/^[•\-]\s+/, ""))
        continue
      }
      flushList()
      blocks.push({ type: "heading", text })
      continue
    }

    if (/^[•\-]\s+\S/.test(text)) {
      listBuffer.push(text.replace(/^[•\-]\s+/, ""))
      continue
    }

    flushList()
    blocks.push({ type: "paragraph", text })
  }

  flushList()
  return blocks
}

function parseNumberedEntry(text: string): Extract<EditorialBlock, { type: "entry" }> | null {
  const match = text.match(/^(\d+)\.\s+(.+)$/)
  if (!match) return null

  const index = match[1]
  const rest = match[2]
  const tokens = rest.split(" ")

  for (let i = 1; i < tokens.length; i++) {
    if (BODY_OPENERS.test(tokens[i])) {
      const title = tokens.slice(0, i).join(" ").trim()
      const body = tokens.slice(i).join(" ").trim()
      if (title && body.length > 40) {
        return { type: "entry", index, title, body }
      }
    }
  }

  return { type: "entry", index, title: rest, body: "" }
}

function parseNamedEntry(text: string): Extract<EditorialBlock, { type: "entry" }> | null {
  const match = text.match(NAME_THEN_VERB)
  if (!match || text.length < 120) return null

  const title = match[1].replace(/\s+/g, " ").trim()
  const body = text.slice(match[1].length).trim()
  if (!title || body.length < 80) return null

  return { type: "entry", title, body }
}

function splitNamedBios(text: string): EditorialBlock[] {
  if (text.length < 240 || !BIO_SPLIT.test(text)) return []

  return text
    .split(BIO_SPLIT)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => parseNamedEntry(chunk) || ({ type: "paragraph", text: chunk } as EditorialBlock))
}

function parseColonNote(text: string): Extract<EditorialBlock, { type: "entry" }> | null {
  const cleaned = text.replace(/^[•\-]\s+/, "")
  const match = cleaned.match(/^(.{3,80}?)\s*:\s+(.{40,})$/)
  if (!match) return null

  const title = match[1].replace(/^[-•]\s+/, "").trim()
  if (/^\d{1,2}:\d{2}/.test(title) || /https?:\/\//i.test(title)) return null

  return { type: "entry", title, body: match[2].trim() }
}

function isShortLabel(text: string) {
  if (/^[•\-]\s+\S/.test(text)) return false
  if (text.length > 70 || /[.!?]$/.test(text)) return false
  const words = text.split(/\s+/).filter(Boolean)
  return words.length <= 10 && words.length >= 1
}
