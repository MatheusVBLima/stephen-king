"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { BookOpen, Clock, Compass, FileText, Map, Menu, Search, Users } from "lucide-react";

import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 py-3 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 md:px-0">
        <div className="flex w-full items-center justify-between gap-6">
          <Link href="/" className="truncate text-xl font-bold">
            Arquivo Stephen King
          </Link>

          <div className="flex items-center gap-2 md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-9 rounded-full">
                  <Menu />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[220px]">
                <DropdownMenuItem asChild>
                  <Link href="/timeline" className="flex w-full items-center">
                    <Clock className="mr-2" />
                    Linha do tempo
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/works" className="flex w-full items-center">
                    <BookOpen className="mr-2" />
                    Obras
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/characters" className="flex w-full items-center">
                    <Users className="mr-2" />
                    Personagens
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/map" className="flex w-full items-center">
                    <Map className="mr-2" />
                    Mapa
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/artigos" className="flex w-full items-center">
                    <FileText className="mr-2" />
                    Especiais
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/search" className="flex w-full items-center">
                    <Search className="mr-2" />
                    Pesquisa
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <NavigationMenu viewport={false} className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Explorar</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[320px] gap-1">
                    <DesktopNavLink
                      href="/timeline"
                      title="Linha do tempo"
                      description="Percorra a obra em ordem cronológica."
                      icon={Clock}
                    />
                    <DesktopNavLink
                      href="/characters"
                      title="Personagens"
                      description="Veja personagens recorrentes e suas conexões."
                      icon={Users}
                    />
                    <DesktopNavLink
                      href="/map"
                      title="Mapa"
                      description="Explore os lugares ficcionais mais importantes."
                      icon={Map}
                    />
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Obras</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[360px] gap-1">
                    <DesktopNavLink
                      href="/works"
                      title="Catálogo de obras"
                      description="Lista completa com detalhes e conteúdo importado."
                      icon={BookOpen}
                    />
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Especiais</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[360px] gap-1">
                    <DesktopNavLink
                      href="/artigos"
                      title="Arquivo de especiais"
                      description="Acesse páginas evergreen importadas para consulta e referência."
                      icon={FileText}
                    />
                    <DesktopNavLink
                      href="/artigos?tipo=especial"
                      title="Guias e cronologias"
                      description="Conteúdo permanente reaproveitado do acervo importado."
                      icon={Compass}
                    />
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    pathname === "/search" && "bg-accent text-accent-foreground",
                  )}
                >
                  <Link href="/search">Pesquisa</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden items-center md:flex">
            <div className="w-full min-w-[280px] flex-1 lg:min-w-[360px]">
              <Suspense fallback={<SearchBarFallback />}>
                <SearchBar />
              </Suspense>
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <Suspense fallback={<SearchBarFallback />}>
            <SearchBar />
          </Suspense>
        </div>
      </div>
    </header>
  );
}

interface DesktopNavLinkProps {
  href: string;
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

function DesktopNavLink({ href, title, description, icon: Icon }: DesktopNavLinkProps) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link href={href} className="flex-row items-start gap-3">
          <Icon className="mt-0.5" />
          <div className="flex flex-col gap-1">
            <div className="font-medium">{title}</div>
            <div className="line-clamp-2 text-muted-foreground">{description}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

function SearchBarFallback() {
  return <div className="h-12 w-full rounded-full border border-border/60 bg-background/80 shadow-sm" />;
}
