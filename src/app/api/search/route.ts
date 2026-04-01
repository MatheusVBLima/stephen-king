import { NextResponse } from "next/server";

import { searchSiteContent } from "@/lib/imported-content";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";
  const limitParam = Number(searchParams.get("limit") ?? "8");
  const limit = Number.isFinite(limitParam) ? Math.min(Math.max(limitParam, 1), 12) : 8;

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const results = searchSiteContent(query)
    .slice(0, limit)
    .map((result) => ({
      badge: result.badge,
      description: result.description,
      href: result.href,
      kind: result.kind,
      title: result.title,
    }));

  return NextResponse.json({ results });
}
