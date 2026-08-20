import { Suspense } from "react"

import { AdaptationsList } from "@/components/AdaptationsList"
import { PageHeader } from "@/components/PageHeader"
import { PageShell } from "@/components/PageShell"
import { getAdaptationCatalog } from "@/lib/imported-editorial"

export const metadata = {
  title: "Adaptações | Arquivo Stephen King",
  description: "Cinema, séries e minisséries extraídas do arquivo editorial, sem banners nem recados de contato.",
}

export default function AdaptationsPage() {
  const items = getAdaptationCatalog()
  const number = new Intl.NumberFormat("pt-BR")

  return (
    <PageShell>
      <PageHeader
        breadcrumb={[{ name: "Adaptações", href: "/adaptacoes", isCurrent: true }]}
        kicker={`${number.format(items.length)} entradas no arquivo`}
        title="Adaptações"
        description="Filmes, séries e minisséries reunidos a partir do acervo importado. Quando a ficha completa existe, ela abre nesta seção; o restante vem da cronologia de cinema."
      />
      <Suspense>
        <AdaptationsList items={items} />
      </Suspense>
    </PageShell>
  )
}
