import { parseEditorialParagraphs, type EditorialBlock } from "@/lib/editorial-blocks"

interface EditorialProseProps {
  paragraphs: string[]
  className?: string
}

export function EditorialProse({ paragraphs, className }: EditorialProseProps) {
  const blocks = parseEditorialParagraphs(paragraphs)

  if (blocks.length === 0) return null

  return (
    <div className={className ?? "flex flex-col gap-5"}>
      {blocks.map((block, index) => (
        <EditorialBlockView key={`${block.type}-${index}`} block={block} />
      ))}
    </div>
  )
}

function EditorialBlockView({ block }: { block: EditorialBlock }) {
  if (block.type === "heading") {
    return <h3 className="text-lg font-semibold tracking-tight text-foreground">{block.text}</h3>
  }

  if (block.type === "list") {
    return (
      <ul className="flex list-disc flex-col gap-2 pl-5 text-sm leading-7 text-muted-foreground sm:text-base">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )
  }

  if (block.type === "entry") {
    return (
      <article className="flex flex-col gap-2 border-b border-border/50 pb-5 last:border-0 last:pb-0">
        <h3 className="text-base font-semibold leading-7 text-foreground">
          {block.index ? <span className="mr-2 tabular-nums text-muted-foreground">{block.index}.</span> : null}
          {block.title}
        </h3>
        {block.body ? <p className="leading-8 text-muted-foreground">{block.body}</p> : null}
      </article>
    )
  }

  return <p className="leading-8 text-muted-foreground">{block.text}</p>
}
