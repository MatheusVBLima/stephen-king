"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, type ComponentType, type SVGProps } from "react";
import {
  BookOpen,
  Clapperboard,
  Clock,
  Map,
  Menu,
  Search,
  UserRound,
  Users,
} from "lucide-react";

import { SearchBar } from "@/components/SearchBar";
import { SiteLogo } from "@/components/SiteLogo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const xlLinks = [
  { href: "/works", label: "Obras", match: "/works" },
  { href: "/adaptacoes", label: "Adaptações", match: "/adaptacoes" },
  { href: "/autor", label: "O autor", match: "/autor" },
  { href: "/map", label: "Cidades", match: "/map" },
  { href: "/characters", label: "Personagens", match: "/characters" },
  { href: "/timeline", label: "Linha do tempo", match: "/timeline" },
] as const;

const lgLinks = xlLinks.slice(0, 3);

const lgMoreLinks = [
  { href: "/map", label: "Cidades", icon: Map },
  { href: "/characters", label: "Personagens", icon: Users },
  { href: "/timeline", label: "Linha do tempo", icon: Clock },
] as const;

const mobileLinks = [
  { href: "/works", label: "Obras", icon: BookOpen },
  { href: "/adaptacoes", label: "Adaptações", icon: Clapperboard },
  { href: "/autor", label: "O autor", icon: UserRound },
  { href: "/map", label: "Cidades", icon: Map },
  { href: "/characters", label: "Personagens", icon: Users },
  { href: "/timeline", label: "Linha do tempo", icon: Clock },
  { href: "/search", label: "Pesquisa", icon: Search },
] as const;

function isActivePath(pathname: string, match: string) {
  return pathname === match || pathname.startsWith(`${match}/`);
}

export function Header() {
  const pathname = usePathname();
  const lgMoreActive = lgMoreLinks.some((link) => isActivePath(pathname, link.href));

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="z-10 flex min-w-0 items-center gap-2.5 justify-self-start"
        >
          <SiteLogo />
          <span className="min-w-0 truncate font-display text-lg font-bold tracking-tight sm:text-xl">
            Stephen King
          </span>
        </Link>

        <nav aria-label="Seções" className="hidden items-center gap-0.5 justify-self-center lg:flex">
          {lgLinks.map((link) => (
            <NavTextLink key={link.href} href={link.href} label={link.label} active={isActivePath(pathname, link.match)} />
          ))}
          <span className="xl:hidden">
            <MoreMenu links={lgMoreLinks} active={lgMoreActive} />
          </span>
          <span className="hidden xl:contents">
            {xlLinks.slice(3).map((link) => (
              <NavTextLink key={link.href} href={link.href} label={link.label} active={isActivePath(pathname, link.match)} />
            ))}
          </span>
        </nav>

        <div className="z-10 flex shrink-0 items-center justify-end gap-3 justify-self-end">
          <div className="xl:hidden">
            <Suspense fallback={<div className="size-9 border border-border" />}>
              <SearchBar variant="icon" />
            </Suspense>
          </div>
          <div className="hidden w-56 xl:block 2xl:w-64">
            <Suspense fallback={<div className="h-9 w-full border border-border" />}>
              <SearchBar />
            </Suspense>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Abrir menu">
                <Menu aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[220px]">
              {mobileLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href} className="flex w-full items-center">
                    <link.icon aria-hidden="true" className="mr-2" />
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

function NavTextLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "border-b border-transparent px-2.5 py-1.5 text-[11px] font-medium tracking-[0.14em] whitespace-nowrap text-muted-foreground uppercase transition-colors hover:text-foreground",
        active && "border-foreground text-foreground",
      )}
    >
      {label}
    </Link>
  );
}

function MoreMenu({
  links,
  active,
}: {
  links: ReadonlyArray<{ href: string; label: string; icon: ComponentType<SVGProps<SVGSVGElement>> }>;
  active: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "border-b border-transparent px-2.5 py-1.5 text-[11px] font-medium tracking-[0.14em] whitespace-nowrap text-muted-foreground uppercase transition-colors hover:text-foreground",
            active && "border-foreground text-foreground",
          )}
        >
          Mais
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {links.map((link) => (
          <DropdownMenuItem key={link.href} asChild>
            <Link href={link.href} className="flex w-full items-center">
              <link.icon aria-hidden="true" className="mr-2" />
              {link.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
