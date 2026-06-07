"use client";

import { useEffect, useState, useRef } from "react";
import type { Highlighter, ThemeRegistration } from "shiki";

// ─── Monochrome shiki theme ──────────────────────────────────────────────────
const monoTheme: ThemeRegistration = {
  name: "portfolio-mono",
  colors: {
    "editor.background": "#1a1a1a",
    "editor.foreground": "#a6a6a6",
    "editorLineNumber.foreground": "#3a3a3a",
    "editorLineNumber.activeForeground": "#666666",
  },
  tokenColors: [
    {
      scope: ["comment", "punctuation.definition.comment", "string.comment"],
      settings: { foreground: "#4a4a4a", fontStyle: "italic" },
    },
    {
      scope: [
        "keyword",
        "keyword.control",
        "keyword.operator",
        "storage.type",
        "storage.modifier",
        "keyword.other",
      ],
      settings: { foreground: "#e8e8e8" },
    },
    {
      scope: [
        "string",
        "string.quoted",
        "string.template",
        "string.regexp",
      ],
      settings: { foreground: "#777777" },
    },
    {
      scope: [
        "entity.name.function",
        "support.function",
        "meta.function-call",
      ],
      settings: { foreground: "#d0d0d0" },
    },
    {
      scope: [
        "entity.name.type",
        "entity.name.class",
        "support.type",
        "support.class",
      ],
      settings: { foreground: "#b8b8b8" },
    },
    {
      scope: ["constant.numeric", "constant.language", "constant.other"],
      settings: { foreground: "#8a8a8a" },
    },
    {
      scope: ["variable", "variable.other", "variable.parameter"],
      settings: { foreground: "#a6a6a6" },
    },
    {
      scope: ["punctuation", "meta.brace"],
      settings: { foreground: "#606060" },
    },
    {
      scope: ["support.variable.property", "variable.other.property"],
      settings: { foreground: "#999999" },
    },
    {
      scope: ["entity.name.tag", "meta.tag"],
      settings: { foreground: "#c0c0c0" },
    },
    {
      scope: ["entity.other.attribute-name"],
      settings: { foreground: "#888888" },
    },
    {
      scope: ["meta.import", "keyword.control.import", "keyword.control.export"],
      settings: { foreground: "#e8e8e8" },
    },
  ],
};

// ─── Singleton highlighter ────────────────────────────────────────────────────
// Created once, shared across all FileViewer instances. Prevents 500ms re-init
// on every file selection.
let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = import("shiki").then(({ createHighlighter }) =>
      createHighlighter({
        themes: [monoTheme],
        langs: [
          "typescript",
          "tsx",
          "javascript",
          "jsx",
          "json",
          "css",
          "sql",
          "bash",
          "yaml",
          "markdown",
          "plaintext",
        ],
      })
    );
  }
  return highlighterPromise;
}

// ─── Cache highlighted output ─────────────────────────────────────────────────
const cache = new Map<string, string>();

function getCacheKey(path: string, lang: string) {
  return `${path}::${lang}`;
}

// ─── Component ───────────────────────────────────────────────────────────────
interface FileViewerProps {
  path: string | null;
  content: string | null;
  language: string;
  filename: string | null;
  githubUrl?: string;
}

export function FileViewer({
  path,
  content,
  language,
  filename,
  githubUrl,
}: FileViewerProps) {
  const [html, setHtml] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inflightRef = useRef<string | null>(null);

  useEffect(() => {
    if (!content || !path) {
      setHtml(null);
      setLoading(false);
      return;
    }

    const cacheKey = getCacheKey(path, language);
    if (cache.has(cacheKey)) {
      setHtml(cache.get(cacheKey)!);
      setLoading(false);
      return;
    }

    const thisKey = cacheKey;
    inflightRef.current = thisKey;
    setLoading(true);

    getHighlighter()
      .then((hl) => {
        if (inflightRef.current !== thisKey) return; // stale if user switched file

        const safeLang = hl.getLoadedLanguages().includes(language as never)
          ? language
          : "plaintext";

        const result = hl.codeToHtml(content, {
          lang: safeLang,
          theme: "portfolio-mono",
        });

        cache.set(cacheKey, result);

        if (inflightRef.current === thisKey) {
          setHtml(result);
          setLoading(false);
        }
      })
      .catch(() => {
        if (inflightRef.current === thisKey) {
          setHtml(`<pre>${content}</pre>`);
          setLoading(false);
        }
      });

    return () => {
      // Mark this effect as stale; the inflight check above handles cleanup
    };
  }, [path, content, language]);

  // ── Empty state ──────────────────────────────────────────────────────────
  if (!filename) {
    return (
      <div
        className="flex flex-col items-center justify-center h-full"
        style={{ color: "var(--step-4)" }}
      >
        <span
          className="font-mono text-[10px] tracking-[0.3em] mb-3"
          style={{ color: "var(--step-4)" }}
        >
          SELECT A FILE
        </span>
        <div
          className="font-mono text-[28px] leading-none"
          style={{ color: "var(--step-3)" }}
        >
          ⌘
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* ── Tab bar ─────────────────────────────────────────────────────── */}
      <div
        className="flex items-center shrink-0"
        style={{
          borderBottom: "1px solid var(--step-3)",
          height: "36px",
          backgroundColor: "var(--step-1)",
        }}
      >
        <div
          className="flex items-center gap-2 h-full px-4"
          style={{
            borderRight: "1px solid var(--step-3)",
            borderBottom: "2px solid var(--step-5)",
          }}
        >
          <span
            className="font-mono text-[11px] tracking-wide"
            style={{ color: "var(--step-6)" }}
          >
            {filename}
          </span>
        </div>
      </div>

      {/* ── Code area ───────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-auto relative">
        {loading && (
          <div className="p-5 space-y-2.5" aria-label="Loading file content">
            {[72, 45, 88, 34, 91, 58, 67, 40, 80, 52, 73, 38].map((w, i) => (
              <div
                key={i}
                className="h-3.5 rounded-none animate-pulse"
                style={{
                  width: `${w}%`,
                  backgroundColor: "var(--step-2)",
                  animationDelay: `${i * 40}ms`,
                }}
              />
            ))}
          </div>
        )}

        {html && !loading && (
          <div
            className="shiki-wrap font-mono text-[12.5px] leading-[1.65]"
            // shiki outputs a full <pre><code>…</code></pre> with inline colours
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </div>

      {/* ── Footer: GitHub link ──────────────────────────────────────────── */}
      {githubUrl && (
        <div
          className="shrink-0 flex items-center justify-end px-4"
          style={{
            height: "36px",
            borderTop: "1px solid var(--step-3)",
            backgroundColor: "var(--step-1)",
          }}
        >
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] tracking-widest uppercase transition-colors text-[var(--step-5)] hover:text-[var(--off-white)]"
          >
            Open on GitHub ↗
          </a>
        </div>
      )}
    </div>
  );
}
