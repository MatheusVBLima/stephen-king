"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchBar } from "./SearchBar";

export function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <header className="sticky top-0 z-50 py-3 border-b backdrop-blur-sm border-border/40">
      <div className="flex flex-col items-center justify-between gap-4 px-4 mx-auto max-w-7xl sm:flex-row">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            Stephen King's Works
          </Link>
        </div>
        
        <div className="flex-1 max-w-sm">
          <SearchBar />
        </div>
      </div>
    </header>
  );
} 