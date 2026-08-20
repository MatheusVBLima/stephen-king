export function SiteFooter() {
  return (
    <footer className="border-t border-border px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-4">
        <p className="font-display text-base font-bold tracking-tight">Stephen King</p>
        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
          <p>
            Conteúdo editorial importado de{" "}
            <a
              href="https://stephenking.com.br/"
              className="underline underline-offset-4 hover:text-foreground"
              rel="noreferrer"
              translate="no"
            >
              stephenking.com.br
            </a>
            .
          </p>
          <p className="text-[11px] tracking-[0.1em] uppercase">Arquivo não oficial</p>
        </div>
      </div>
    </footer>
  )
}
