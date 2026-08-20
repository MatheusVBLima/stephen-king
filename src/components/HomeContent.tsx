import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { PageShell } from "@/components/PageShell";
import { Badge } from "@/components/ui/badge";
import {
  getAllWorksWithImportedState,
  getImportedCharacters,
  getImportedWorkContentBySlug,
} from "@/lib/imported-content";
import { getAdaptationCatalog, getAuthorContent, getCityEditorial } from "@/lib/imported-editorial";
import { getAllLocations } from "@/lib/locations-data";

const blurDataUrl =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

const kicker = "text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase";

export function HomeContent() {
  const number = new Intl.NumberFormat("pt-BR");
  const works = getAllWorksWithImportedState();
  const adaptationsCount = getAdaptationCatalog().length;
  const characters = getImportedCharacters();
  const author = getAuthorContent();
  const locations = getAllLocations();

  const featuredWorks = works
    .map((work) => {
      const cover = getImportedWorkContentBySlug(work.slug)?.images[0];
      if (!cover) return null;
      return { ...work, cover };
    })
    .filter((work): work is NonNullable<typeof work> => Boolean(work))
    .sort((left, right) => right.year - left.year)
    .slice(0, 8);

  const featuredCharacters = characters.filter((character) => character.imageUrl).slice(0, 6);
  const authorCover = author?.images[0];

  const [coverLocation, ...otherLocations] = locations;
  const coverEditorial = coverLocation ? getCityEditorial(coverLocation.id) : undefined;
  const coverImage = coverEditorial?.images[0]?.src || coverLocation?.imageUrl;
  const coverLede = coverEditorial?.summary || coverLocation?.description;

  const tocEntries = [
    { label: "Obras", value: number.format(works.length), href: "/works" },
    { label: "Personagens", value: number.format(characters.length), href: "/characters" },
    { label: "Adaptações", value: number.format(adaptationsCount), href: "/adaptacoes" },
    { label: "Cidades fictícias", value: number.format(locations.length), href: "/map" },
    { label: "Linha do tempo", value: "—", href: "/timeline" },
  ];

  return (
    <PageShell className="gap-16 md:py-14">
      {/* Masthead */}
      <section className="flex flex-col items-center gap-4 border-b border-border pb-12 text-center">
        <p className={kicker}>Arquivo não oficial</p>
        <h1 className="font-display text-6xl leading-[0.95] font-black tracking-tight sm:text-7xl lg:text-8xl">
          Stephen King
        </h1>
        <div className="h-[3px] w-20 bg-foreground" />
        <p className="max-w-xl text-pretty text-sm text-muted-foreground sm:text-base">
          Cidades fictícias, obras e curiosidades de um mestre do horror — catalogadas a partir de
          stephenking.com.br.
        </p>
      </section>

      {/* Editorial grid: nesta edição / matéria de capa / outras cidades */}
      <section className="grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)_300px] lg:gap-14">
        <div className="flex flex-col">
          <p className={`${kicker} mb-2`}>Nesta edição</p>
          {tocEntries.map((entry, index) => (
            <Link
              key={entry.href}
              href={entry.href}
              className="flex items-baseline justify-between gap-3 border-b border-dashed border-border py-3.5 transition-colors hover:text-muted-foreground"
            >
              <span className="flex items-baseline gap-3">
                <span className="font-display text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                <span className="font-display text-lg">{entry.label}</span>
              </span>
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{entry.value}</span>
            </Link>
          ))}
        </div>

        {coverLocation ? (
          <div className="min-w-0">
            <Link href={coverLocation.href || `/map/${coverLocation.id}`} className="group block">
              {coverImage ? (
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                  <Image
                    src={coverImage}
                    alt={coverLocation.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    placeholder="blur"
                    blurDataURL={blurDataUrl}
                    priority
                  />
                  <div className="absolute bottom-4 left-4">
                    <Badge className="rounded-none border border-foreground/40 bg-background/80 text-foreground">
                      Cidade fictícia
                    </Badge>
                  </div>
                </div>
              ) : null}
              <p className={`${kicker} mt-5 mb-2`}>Maine · Matéria de capa</p>
              <h2 className="mb-3 font-display text-5xl font-bold tracking-tight">{coverLocation.name}</h2>
              <p className="max-w-prose text-pretty text-sm leading-7 text-muted-foreground sm:text-base">
                {coverLede}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <p className="text-xs text-muted-foreground">
                  Cenário de {coverLocation.books.slice(0, 2).join(" e ")}
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium tracking-[0.1em] uppercase">
                  Explorar {coverLocation.name}
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </span>
              </div>
            </Link>
          </div>
        ) : null}

        <div className="flex flex-col">
          <p className={`${kicker} mb-2`}>Outras cidades</p>
          <div className="flex flex-col">
            {otherLocations.map((place) => {
              const editorial = getCityEditorial(place.id);
              const image = editorial?.images[0]?.src || place.imageUrl;
              const lede = editorial?.summary || place.description;

              return (
                <Link
                  key={place.id}
                  href={place.href || `/map/${place.id}`}
                  className="flex gap-4 border-b border-border py-5 first:pt-0 last:border-b-0"
                >
                  {image ? (
                    <div className="relative size-16 shrink-0 overflow-hidden bg-muted">
                      <Image src={image} alt={place.name} fill sizes="64px" className="object-cover" />
                    </div>
                  ) : null}
                  <div className="min-w-0">
                    <h3 className="mb-1 font-display text-lg font-bold">{place.name}</h3>
                    <p className="line-clamp-3 text-xs leading-5 text-muted-foreground">{lede}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest additions strip */}
      <section>
        <div className="mb-7 flex items-end justify-between gap-4 border-b border-border pb-3">
          <p className={kicker}>Últimas adições ao arquivo</p>
          <Link href="/works" className="inline-flex shrink-0 items-center gap-1 text-xs uppercase tracking-[0.1em] underline-offset-4 hover:underline">
            Catálogo completo
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
          {featuredWorks.map((work) => (
            <Link key={work.slug} href={work.href} className="group flex min-w-0 flex-col gap-3">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
                <Image
                  src={work.cover.src}
                  alt={work.cover.alt || work.displayTitle}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex min-w-0 flex-col gap-1">
                <span className="text-xs tabular-nums text-muted-foreground">{work.year}</span>
                <span className="line-clamp-2 font-display text-base leading-tight font-bold">{work.displayTitle}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Author + characters */}
      <section className="grid gap-10 border-t border-border pt-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        {author ? (
          <Link href="/autor" className="group grid min-w-0 gap-6 md:grid-cols-[220px_minmax(0,1fr)]">
            {authorCover ? (
              <div className="relative min-h-56 overflow-hidden bg-muted md:min-h-full">
                <Image
                  src={authorCover.src}
                  alt={authorCover.alt || author.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 220px"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
            ) : null}
            <div className="flex flex-col gap-3">
              <p className={kicker}>O autor</p>
              <h2 className="font-display text-3xl font-bold">{author.title}</h2>
              <p className="line-clamp-5 text-sm leading-7 text-muted-foreground">{author.summary}</p>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium tracking-[0.1em] uppercase">
                Ler a biografia
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </span>
            </div>
          </Link>
        ) : null}

        <div className="flex min-w-0 flex-col gap-4">
          <div className="flex items-end justify-between gap-4 border-b border-border pb-3">
            <p className={kicker}>Personagens</p>
            <Link href="/characters" className="text-xs uppercase tracking-[0.1em] underline-offset-4 hover:underline">
              Ver todos
            </Link>
          </div>
          <ul className="flex flex-col">
            {featuredCharacters.map((character) => (
              <li key={character.id} className="border-b border-border last:border-b-0">
                <Link href={`/characters/${character.slug}`} className="flex items-center gap-3 py-3.5">
                  {character.imageUrl ? (
                    <span className="relative size-10 shrink-0 overflow-hidden bg-muted">
                      <Image src={character.imageUrl} alt="" fill sizes="40px" className="object-cover" />
                    </span>
                  ) : null}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display font-bold">{character.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">{character.firstAppearance}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Bottom links */}
      <section className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
        {[
          {
            href: "/adaptacoes",
            title: "Adaptações",
            description: "Cinema, séries e minisséries reunidos a partir do acervo.",
            meta: `${number.format(adaptationsCount)} entradas`,
          },
          {
            href: "/timeline",
            title: "Linha do tempo",
            description: "As publicações do arquivo em ordem cronológica.",
            meta: `${number.format(works.length)} obras`,
          },
          {
            href: "/characters",
            title: "Personagens",
            description: "Quem atravessa mais de um livro no arquivo brasileiro.",
            meta: `${number.format(characters.length)} fichas`,
          },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex min-w-0 flex-col gap-3 bg-background p-6 transition-colors hover:bg-accent/30 sm:p-8"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-display text-xl font-bold">{item.title}</h2>
              <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
            </div>
            <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
            <span className="text-xs tabular-nums text-muted-foreground">{item.meta}</span>
          </Link>
        ))}
      </section>
    </PageShell>
  );
}
