"use client";

import { useState, useRef, useCallback } from "react";
import { ChevronRight, ChevronDown, File, Folder, FolderOpen } from "lucide-react";
import type { RepoFileNode } from "@/types/repo";
import { cn } from "@/lib/utils";

export interface DataLoader {
  getItem: (itemId: string) => RepoFileNode | undefined;
  getChildren: (itemId: string) => string[];
}

export interface TreeProps {
  rootItemId: string;
  dataLoader: DataLoader;
  onSelectItem?: (itemId: string, item: RepoFileNode) => void;
  className?: string;
}

interface TreeNodeProps {
  itemId: string;
  depth: number;
  // Stable accessor — fixes stale closure when parent re-renders with new tree data
  getLoader: () => DataLoader;
  selectedId: string | null;
  onSelect: (id: string, item: RepoFileNode) => void;
  defaultExpanded?: boolean;
}

function TreeNode({
  itemId,
  depth,
  getLoader,
  selectedId,
  onSelect,
  defaultExpanded = false,
}: TreeNodeProps) {
  const item = getLoader().getItem(itemId);
  const [expanded, setExpanded] = useState(defaultExpanded);

  if (!item) return null;

  const isFolder = item.type === "folder";
  const isSelected = selectedId === itemId;
  // Guard getChildren with ?. per spec
  const children = isFolder ? (getLoader().getChildren?.(itemId) ?? []) : [];

  const handleClick = () => {
    if (isFolder) {
      setExpanded((prev) => !prev);
    } else {
      onSelect(itemId, item);
    }
  };

  return (
    <div>
      {/* Row */}
      <div
        role={isFolder ? "button" : "option"}
        aria-selected={isSelected}
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => {
          const treeRoot = e.currentTarget.closest('[role="tree"]');
          const allRows = treeRoot
            ? Array.from(
                treeRoot.querySelectorAll<HTMLElement>('[role="option"], [role="button"]')
              )
            : [];
          const currentIdx = allRows.indexOf(e.currentTarget);

          switch (e.key) {
            case "Enter":
            case " ":
              e.preventDefault();
              handleClick();
              break;
            case "ArrowDown":
              e.preventDefault();
              allRows[currentIdx + 1]?.focus();
              break;
            case "ArrowUp":
              e.preventDefault();
              allRows[currentIdx - 1]?.focus();
              break;
            case "ArrowRight":
              if (isFolder && !expanded) {
                e.preventDefault();
                setExpanded(true);
              } else if (isFolder && expanded) {
                // Move focus to first child
                e.preventDefault();
                allRows[currentIdx + 1]?.focus();
              }
              break;
            case "ArrowLeft":
              if (isFolder && expanded) {
                e.preventDefault();
                setExpanded(false);
              } else if (!isFolder || !expanded) {
                // Move focus to parent (find closest ancestor row)
                e.preventDefault();
                // Walk backwards to find a row at shallower depth
                for (let i = currentIdx - 1; i >= 0; i--) {
                  const candidate = allRows[i];
                  const candidateDepth = parseInt(
                    (candidate as HTMLElement).style.paddingLeft || "8",
                    10
                  );
                  const myDepth = parseInt(
                    (e.currentTarget as HTMLElement).style.paddingLeft || "8",
                    10
                  );
                  if (candidateDepth < myDepth) {
                    candidate.focus();
                    break;
                  }
                }
              }
              break;
          }
        }}
        className="flex items-center gap-1.5 cursor-pointer select-none py-[5px] pr-3 outline-none focus-visible:outline-1"
        style={{
          paddingLeft: `${depth * 14 + 10}px`,
          backgroundColor: isSelected ? "var(--step-3)" : "transparent",
          color: isSelected ? "var(--off-white)" : "var(--step-6)",
          transition: "background-color 80ms, color 80ms",
        }}
        onMouseEnter={(e) => {
          if (!isSelected) {
            (e.currentTarget as HTMLElement).style.backgroundColor = "var(--step-2)";
            (e.currentTarget as HTMLElement).style.color = "var(--step-7)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isSelected) {
            (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
            (e.currentTarget as HTMLElement).style.color = "var(--step-6)";
          }
        }}
      >
        {/* Chevron slot — folders show chevron, files get blank space */}
        <span
          className="w-3 h-3 flex items-center justify-center shrink-0"
          style={{ color: "var(--step-5)" }}
        >
          {isFolder ? (
            expanded ? <ChevronDown size={10} /> : <ChevronRight size={10} />
          ) : null}
        </span>

        {/* File / folder icon */}
        <span
          className="w-3.5 h-3.5 flex items-center justify-center shrink-0"
          style={{ color: "var(--step-5)" }}
        >
          {isFolder ? (
            expanded ? <FolderOpen size={12} /> : <Folder size={12} />
          ) : (
            <File size={11} />
          )}
        </span>

        {/* Label */}
        <span className="font-mono text-[12px] leading-none truncate">{item.name}</span>
      </div>

      {/* Recursive children */}
      {isFolder && expanded && (
        <div role="group">
          {children.map((childId) => (
            <TreeNode
              key={childId}
              itemId={childId}
              depth={depth + 1}
              getLoader={getLoader}
              selectedId={selectedId}
              onSelect={onSelect}
              defaultExpanded={depth < 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Tree({ rootItemId, dataLoader, onSelectItem, className }: TreeProps) {
  // Fix stale-closure: store latest dataLoader in a ref so all TreeNodes always
  // call the current version even after parent re-renders with fresh tree data.
  const loaderRef = useRef(dataLoader);
  loaderRef.current = dataLoader;

  // Stable identity — never recreated, always reads the live ref
  const getLoader = useCallback(() => loaderRef.current, []);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = useCallback(
    (id: string, item: RepoFileNode) => {
      setSelectedId(id);
      onSelectItem?.(id, item);
    },
    [onSelectItem]
  );

  // Show root's children directly — the root folder node itself is not rendered
  const rootItem = dataLoader.getItem(rootItemId);
  const topLevelIds =
    rootItem?.type === "folder"
      ? (dataLoader.getChildren?.(rootItemId) ?? [])
      : [rootItemId];

  return (
    <div
      role="tree"
      aria-label="File explorer"
      className={cn("overflow-y-auto", className)}
      style={{ userSelect: "none" }}
    >
      {topLevelIds.map((childId) => (
        <TreeNode
          key={childId}
          itemId={childId}
          depth={0}
          getLoader={getLoader}
          selectedId={selectedId}
          onSelect={handleSelect}
          defaultExpanded
        />
      ))}
    </div>
  );
}
