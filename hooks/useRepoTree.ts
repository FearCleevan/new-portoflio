"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { RepoTree } from "@/types/repo";

export interface UseRepoTreeResult {
  tree: RepoTree;
  getFileContent: (path: string) => Promise<string>;
  loading: boolean;
  error: string | null;
}

export function useRepoTree(
  repo: { owner: string; name: string } | null
): UseRepoTreeResult {
  const [tree, setTree] = useState<RepoTree>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Stable key so the effect only re-runs when owner/name actually change
  const repoKey = repo ? `${repo.owner}/${repo.name}` : null;
  const prevKey = useRef<string | null>(null);

  useEffect(() => {
    if (!repoKey) {
      setTree({});
      setLoading(false);
      setError(null);
      return;
    }
    if (repoKey === prevKey.current) return;
    prevKey.current = repoKey;

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`/api/repo/${repo!.owner}/${repo!.name}`)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 429) throw new Error("GitHub rate limit reached — try again later.");
          if (res.status === 404) throw new Error("Repository not found.");
          throw new Error(`Failed to load repository (${res.status})`);
        }
        return res.json() as Promise<RepoTree>;
      })
      .then((data) => {
        if (!cancelled) {
          setTree(data);
          setLoading(false);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repoKey]);

  const getFileContent = useCallback(
    async (path: string): Promise<string> => {
      if (!repo) return "";
      try {
        const res = await fetch(
          `/api/repo/${repo.owner}/${repo.name}/file?path=${encodeURIComponent(path)}`
        );
        if (!res.ok) return `// Could not load ${path}`;
        const data = (await res.json()) as { content: string };
        return data.content;
      } catch {
        return `// Could not load ${path}`;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [repoKey]
  );

  return { tree, getFileContent, loading, error };
}
