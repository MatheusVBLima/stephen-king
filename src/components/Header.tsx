"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchBar } from "./SearchBar";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <header className="sticky top-0 z-50 py-3 border-b backdrop-blur-sm border-border/40">
      <div className="flex flex-col items-center justify-between gap-4 px-4 mx-auto max-w-7xl sm:flex-row">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold">
            Stephen King's Works
          </Link>
          <nav className="hidden md:flex">
            <Button variant="ghost" asChild className="flex items-center gap-1">
              <Link href="/timeline">
                <Clock className="w-4 h-4 mr-1" />
                Timeline
              </Link>
            </Button>
          </nav>
        </div>
        
        <div className="flex-1 max-w-sm">
          <SearchBar />
        </div>
      </div>
    </header>
  );
} 