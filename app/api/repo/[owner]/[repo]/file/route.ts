import { NextResponse } from "next/server";
import { fetchFileContent, GitHubError } from "@/lib/github";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ owner: string; repo: string }> }
) {
  const { owner, repo } = await params;
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");

  if (!path) {
    return NextResponse.json({ error: "Missing ?path= parameter" }, { status: 400 });
  }

  try {
    const content = await fetchFileContent(owner, repo, path);
    return NextResponse.json({ content }, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
    });
  } catch (err) {
    if (err instanceof GitHubError) {
      const status = err.status === 404 ? 404 : err.status === 403 ? 429 : 502;
      return NextResponse.json({ error: err.message }, { status });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
