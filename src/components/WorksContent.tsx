import { Suspense } from "react";

import { AllWorksList } from "@/components/AllWorksList";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { getAllWorksWithImportedState } from "@/lib/imported-content";

export default function WorksContent() {
  const works = getAllWorksWithImportedState();
  const number = new Intl.NumberFormat("pt-BR");

  return (
    <PageShell>
      <PageHeader
        breadcrumb={[{ name: "Obras", href: "/works", isCurrent: true }]}
        kicker={`${number.format(works.length)} obras no arquivo brasileiro`}
        title="Obras de Stephen King"
        description="Catálogo das fichas publicadas no arquivo brasileiro. Contos sem página própria aparecem dentro da coletânea correspondente."
      />
      <Suspense fallback={<WorksListFallback />}>
        <AllWorksList works={works} />
      </Suspense>
    </PageShell>
  );
}

function WorksListFallback() {
  return (
    <p className="text-sm text-muted-foreground">Carregando catálogo…</p>
  );
}
