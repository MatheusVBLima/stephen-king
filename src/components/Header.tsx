"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchBar } from "./SearchBar";
import { Button } from "@/components/ui/button";
import { Clock, Map, Menu, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <header className="sticky top-0 z-50 py-3 border-b backdrop-blur-sm border-border/40 bg-background/95">
      <div className="flex flex-col items-center justify-between gap-4 px-4 mx-auto md:px-0 max-w-7xl sm:flex-row">
        <div className="flex items-center justify-between w-full gap-6 sm:w-auto">
          <Link href="/" className="text-xl font-bold truncate">
            Stephen King's Works
          </Link>
          
          {/* Mobile menu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="w-5 h-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem asChild>
                  <Link href="/timeline" className="flex items-center w-full">
                    <Clock className="w-4 h-4 mr-2" />
                    Timeline
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/characters" className="flex items-center w-full">
                    <Users className="w-4 h-4 mr-2" />
                    Characters
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/map" className="flex items-center w-full">
                    <Map className="w-4 h-4 mr-2" />
                    Maine Map
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="px-2 py-2">
                  <SearchBar />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden gap-1 md:flex">
            <Button variant="ghost" asChild className="flex items-center gap-1">
              <Link href="/timeline">
                <Clock className="w-4 h-4 mr-1" />
                Timeline
              </Link>
            </Button>
            <Button variant="ghost" asChild className="flex items-center gap-1">
              <Link href="/characters">
                <Users className="w-4 h-4 mr-1" />
                Characters
              </Link>
            </Button>
            <Button variant="ghost" asChild className="flex items-center gap-1">
              <Link href="/map">
                <Map className="w-4 h-4 mr-1" />
                Maine Map
              </Link>
            </Button>
          </nav>
        </div>
        
        {/* Desktop search */}
        <div className="flex-1 hidden w-full sm:max-w-sm md:block">
          <SearchBar />
        </div>
      </div>
    </header>
  );
} 