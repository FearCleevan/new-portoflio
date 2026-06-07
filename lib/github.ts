import "server-only";
import type { RepoTree } from "@/types/repo";

const GITHUB_API = "https://api.github.com";
const REVALIDATE = 3600; // 1 hour — stays comfortably under 60 req/hr unauthenticated limit

const EXT_LANG: Record<string, string> = {
  ts: "typescript",
  tsx: "tsx",
  js: "javascript",
  jsx: "jsx",
  py: "python",
  rs: "rust",
  go: "go",
  java: "java",
  json: "json",
  yaml: "yaml",
  yml: "yaml",
  md: "markdown",
  mdx: "markdown",
  css: "css",
  scss: "scss",
  html: "html",
  sh: "bash",
  sql: "sql",
  prisma: "plaintext",
  env: "plaintext",
  toml: "toml",
  lock: "plaintext",
};

function inferLanguage(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  return EXT_LANG[ext] ?? "plaintext";
}

async function getDefaultBranch(owner: string, repo: string): Promise<string> {
  const res = await fetch(`${GITHUB_API}/repos/${owner}/${repo}`, {
    headers: { Accept: "application/vnd.github+json" },
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok) throw new GitHubError(res.status, owner, repo);
  const data = (await res.json()) as { default_branch: string };
  return data.default_branch;
}

export class GitHubError extends Error {
  constructor(
    public readonly status: number,
    public readonly owner: string,
    public readonly repo: string
  ) {
    super(`GitHub API error ${status} for ${owner}/${repo}`);
  }
}

interface GitHubTreeItem {
  path: string;
  type: "blob" | "tree";
  sha: string;
}

interface GitHubTreeResponse {
  tree: GitHubTreeItem[];
  truncated: boolean;
}

export async function fetchRepoTree(
  owner: string,
  repo: string,
  branch?: string
): Promise<RepoTree> {
  const ref = branch ?? (await getDefaultBranch(owner, repo));

  const res = await fetch(
    `${GITHUB_API}/repos/${owner}/${repo}/git/trees/${ref}?recursive=1`,
    {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: REVALIDATE },
    }
  );

  if (!res.ok) throw new GitHubError(res.status, owner, repo);

  const data = (await res.json()) as GitHubTreeResponse;

  // ── Build the flat-path → RepoFileNode map ─────────────────────────────
  const tree: RepoTree = {};

  // Seed the virtual root node
  tree["root"] = {
    name: repo,
    path: "root",
    type: "folder",
    children: [],
  };

  // First pass: create all nodes
  for (const item of data.tree) {
    const parts = item.path.split("/");
    const name = parts[parts.length - 1];

    if (item.type === "tree") {
      tree[item.path] = {
        name,
        path: item.path,
        type: "folder",
        children: [],
      };
    } else {
      tree[item.path] = {
        name,
        path: item.path,
        type: "file",
        language: inferLanguage(name),
      };
    }
  }

  // Second pass: wire children
  for (const item of data.tree) {
    const parts = item.path.split("/");
    const parentPath = parts.length === 1 ? "root" : parts.slice(0, -1).join("/");
    const parent = tree[parentPath];
    if (parent && parent.type === "folder") {
      parent.children = parent.children ?? [];
      parent.children.push(item.path);
    }
  }

  return tree;
}

export async function fetchFileContent(
  owner: string,
  repo: string,
  path: string
): Promise<string> {
  const res = await fetch(
    `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`,
    {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: REVALIDATE },
    }
  );

  if (!res.ok) throw new GitHubError(res.status, owner, repo);

  const data = (await res.json()) as { content?: string; encoding?: string };

  if (data.encoding === "base64" && data.content) {
    // Node.js Buffer handles multi-line base64 with newlines
    return Buffer.from(data.content.replace(/\n/g, ""), "base64").toString("utf-8");
  }

  return "";
}
