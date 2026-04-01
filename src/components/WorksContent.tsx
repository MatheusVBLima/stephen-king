import { Suspense } from "react";

import { AllWorksList } from "@/components/AllWorksList";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { getAllWorksWithImportedState } from "@/lib/imported-content";

export default function WorksContent() {
  const works = getAllWorksWithImportedState();
  const importedCount = works.filter((work) => work.hasImportedContent).length;

  const breadcrumbSegments = [{ name: "Obras", href: "/works", isCurrent: true }];

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 md:py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:gap-10">
        <section className="rounded-[2rem] border border-border/60 bg-card/40 px-5 py-6 shadow-sm backdrop-blur-sm sm:px-8 sm:py-8 lg:px-10 lg:py-10">
          <div className="flex flex-col gap-6">
            <Breadcrumb segments={breadcrumbSegments} />

            <div className="flex flex-col gap-4 lg:gap-5">
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span>{works.length} obras no catálogo</span>
                <span className="hidden h-1 w-1 rounded-full bg-border sm:block" />
                <span>{importedCount} com conteúdo importado</span>
              </div>

              <div className="flex flex-col gap-4">
                <h1 className="max-w-4xl text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  Obras de Stephen King
                </h1>
                <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                  Explore o catálogo completo, encontre títulos por coleção e veja quais obras já
                  receberam material complementar importado em português.
                </p>
              </div>
            </div>
          </div>
        </section>
        <Suspense fallback={<WorksListFallback />}>
          <AllWorksList works={works} />
        </Suspense>
      </div>
    </main>
  );
}

function WorksListFallback() {
  return (
    <Card className="rounded-[1.75rem] border-border/60 bg-card/55">
      <CardContent className="px-5 py-8 sm:px-8 sm:py-10">
        <p className="text-sm leading-7 text-muted-foreground">Carregando catálogo...</p>
      </CardContent>
    </Card>
  );
}
