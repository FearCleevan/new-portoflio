"use client";

import { useState, useCallback, useMemo } from "react";
import { Tree } from "@/components/ui/tree";
import { FileViewer } from "@/components/projects/FileViewer";
import { useRepoTree } from "@/hooks/useRepoTree";
import type { RepoFileNode } from "@/types/repo";

interface CodePreviewProps {
  repo: { owner: string; name: string } | null;
  githubUrl?: string;
}

export function CodePreview({ repo, githubUrl }: CodePreviewProps) {
  const { tree, getFileContent, loading, error } = useRepoTree(repo);

  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<RepoFileNode | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);

  const handleSelectItem = useCallback(
    async (itemId: string, item: RepoFileNode) => {
      if (item.type === "folder") return;
      setSelectedPath(itemId);
      setSelectedItem(item);
      const content = await getFileContent(itemId);
      setFileContent(content);
    },
    [getFileContent]
  );

  const dataLoader = useMemo(
    () => ({
      getItem: (id: string) => tree[id],
      getChildren: (id: string) => tree[id]?.children ?? [],
    }),
    [tree]
  );

  const fileGithubUrl =
    githubUrl && selectedPath
      ? `${githubUrl}/blob/main/${selectedPath}`
      : undefined;

  if (!repo) {
    return (
      <div
        className="flex items-center justify-center font-mono text-[11px] tracking-widest"
        style={{
          height: "180px",
          border: "1px solid var(--step-3)",
          color: "var(--step-5)",
          backgroundColor: "var(--step-1)",
        }}
      >
        <span>{"// repository is private or not linked"}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex items-center justify-center font-mono text-[11px] tracking-widest"
        style={{
          height: "180px",
          border: "1px solid var(--step-3)",
          color: "var(--step-5)",
          backgroundColor: "var(--step-1)",
        }}
      >
        <span>{`// ${error}`}</span>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        className="flex items-center justify-center font-mono text-[11px] tracking-widest"
        style={{
          height: "180px",
          border: "1px solid var(--step-3)",
          color: "var(--step-5)",
          backgroundColor: "var(--step-1)",
        }}
      >
        <span className="animate-pulse">{"// loading repository..."}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row md:h-[480px] font-mono">
      {/* ── File tree ─────────────────────────────────────────────────── */}
      <div className="md:shrink-0 md:w-[220px] overflow-hidden">
        <Tree
          rootItemId="root"
          dataLoader={dataLoader}
          onSelectItem={handleSelectItem}
          className="h-[200px] md:h-full py-1"
        />
      </div>

      {/* ── File viewer ───────────────────────────────────────────────── */}
      <div className="flex-1 h-[300px] md:h-auto overflow-hidden">
        <FileViewer
          path={selectedPath}
          content={fileContent}
          language={selectedItem?.language ?? "plaintext"}
          filename={selectedItem?.name ?? null}
          githubUrl={fileGithubUrl}
        />
      </div>
    </div>
  );
}
