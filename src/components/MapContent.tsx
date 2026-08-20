"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

import { InteractiveMap } from "@/components/InteractiveMap";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { getAllLocations } from "@/lib/locations-data";

export default function MapContent() {
  const allLocations = getAllLocations();
  const blurDataUrl =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

  return (
    <PageShell>
      <PageHeader
        breadcrumb={[{ name: "Cidades", href: "/map", isCurrent: true }]}
        title="Maine de Stephen King"
        description="Castle Rock, Derry e Jerusalem's Lot, as cidades que sustentam o arquivo."
      />

      <InteractiveMap locations={allLocations} fullscreen={true} />

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Cidades</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {allLocations.map((place) => (
            <Link
              key={place.id}
              href={place.href || `/map/${place.id}`}
              className="flex min-w-0 flex-col gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-accent"
            >
              {place.imageUrl ? (
                <div className="relative h-40 w-full overflow-hidden rounded-md">
                  <Image
                    src={place.imageUrl}
                    alt={place.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL={blurDataUrl}
                  />
                </div>
              ) : null}
              <h3 className="flex min-w-0 items-center gap-2 text-lg font-medium">
                <MapPin aria-hidden="true" className="size-4 shrink-0" />
                <span className="truncate">{place.name}</span>
              </h3>
              <p className="line-clamp-4 text-sm leading-6 text-muted-foreground">{place.description}</p>
              <span className="text-sm underline underline-offset-4">Ler mais</span>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
