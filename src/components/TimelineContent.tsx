import { Timeline } from "@/components/Timeline";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { getAllWorksWithImportedState } from "@/lib/imported-content";

export default function TimelineContent() {
  const books = getAllWorksWithImportedState();

  return (
    <PageShell>
      <PageHeader
        breadcrumb={[{ name: "Linha do tempo", href: "/timeline", isCurrent: true }]}
        title="Linha do tempo"
        description="Obras publicadas no arquivo brasileiro, em ordem cronológica."
      />
      <Timeline books={books} />
    </PageShell>
  );
}
