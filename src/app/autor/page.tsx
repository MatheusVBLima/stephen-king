import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { AuthorContent } from "@/components/AuthorContent"
import { PageShell } from "@/components/PageShell"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { getAuthorContent } from "@/lib/imported-editorial"

export const metadata: Metadata = {
  title: "O autor | Arquivo Stephen King",
  description: "Biografia editorial de Stephen King importada do arquivo brasileiro.",
}

export default function AuthorPage() {
  const author = getAuthorContent()

  if (!author) {
    notFound()
  }

  return (
    <PageShell>
      <Breadcrumb segments={[{ name: "O autor", href: "/autor", isCurrent: true }]} />
      <AuthorContent author={author} />
    </PageShell>
  )
}
