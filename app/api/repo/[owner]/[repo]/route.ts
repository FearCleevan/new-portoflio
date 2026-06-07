import { NextResponse } from "next/server";
import { fetchRepoTree, GitHubError } from "@/lib/github";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ owner: string; repo: string }> }
) {
  const { owner, repo } = await params;

  try {
    const tree = await fetchRepoTree(owner, repo);
    return NextResponse.json(tree, {
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
