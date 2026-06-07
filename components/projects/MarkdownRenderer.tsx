import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

const components: Components = {
  h2({ children }) {
    return (
      <h2
        className="font-display font-bold uppercase tracking-tight mt-12 mb-5"
        style={{ fontSize: "clamp(20px, 2.5vw, 28px)", color: "var(--off-white)" }}
      >
        {children}
      </h2>
    );
  },

  h3({ children }) {
    return (
      <h3
        className="font-display font-semibold uppercase tracking-tight text-lg mt-8 mb-3"
        style={{ color: "var(--off-white)" }}
      >
        {children}
      </h3>
    );
  },

  p({ children }) {
    return (
      <p
        className="font-body text-sm leading-relaxed mb-5"
        style={{ color: "var(--step-6)" }}
      >
        {children}
      </p>
    );
  },

  ul({ children }) {
    return (
      <ul
        className="mb-5 space-y-2 pl-4"
        style={{ borderLeft: "2px solid var(--step-3)" }}
      >
        {children}
      </ul>
    );
  },

  ol({ children }) {
    return (
      <ol className="mb-5 space-y-2 pl-4 list-decimal" style={{ color: "var(--step-6)" }}>
        {children}
      </ol>
    );
  },

  li({ children }) {
    return (
      <li className="font-body text-sm leading-relaxed pl-2" style={{ color: "var(--step-6)" }}>
        {children}
      </li>
    );
  },

  /* Block code — pre wraps the code element */
  pre({ children }) {
    return (
      <pre
        className="font-mono text-xs leading-relaxed p-5 mb-5 overflow-x-auto"
        style={{
          backgroundColor: "var(--step-1)",
          border: "1px solid var(--step-3)",
          color: "var(--mid-gray)",
        }}
      >
        {children}
      </pre>
    );
  },

  /* Inline code — no className; block code is already handled by pre */
  code({ children, className }) {
    if (className) {
      // Inside a pre block — let pre handle the styling
      return <code>{children}</code>;
    }
    return (
      <code
        className="font-mono text-xs px-1.5 py-0.5 rounded-sm"
        style={{
          backgroundColor: "var(--step-2)",
          color: "var(--mid-gray)",
          border: "1px solid var(--step-3)",
        }}
      >
        {children}
      </code>
    );
  },

  /* GFM table */
  table({ children }) {
    return (
      <div className="mb-5 overflow-x-auto">
        <table
          className="w-full font-mono text-xs"
          style={{ borderCollapse: "collapse", border: "1px solid var(--step-3)" }}
        >
          {children}
        </table>
      </div>
    );
  },

  thead({ children }) {
    return (
      <thead style={{ borderBottom: "1px solid var(--step-4)", backgroundColor: "var(--step-2)" }}>
        {children}
      </thead>
    );
  },

  th({ children }) {
    return (
      <th
        className="px-4 py-2 text-left tracking-widest uppercase text-[10px]"
        style={{ color: "var(--step-5)", borderRight: "1px solid var(--step-3)" }}
      >
        {children}
      </th>
    );
  },

  td({ children }) {
    return (
      <td
        className="px-4 py-2 text-xs"
        style={{
          color: "var(--step-6)",
          borderRight: "1px solid var(--step-3)",
          borderBottom: "1px solid var(--step-3)",
        }}
      >
        {children}
      </td>
    );
  },

  strong({ children }) {
    return (
      <strong style={{ color: "var(--off-white)", fontWeight: 600 }}>
        {children}
      </strong>
    );
  },

  em({ children }) {
    return (
      <em className="italic" style={{ color: "var(--mid-gray)" }}>
        {children}
      </em>
    );
  },

  blockquote({ children }) {
    return (
      <blockquote
        className="pl-4 mb-5 italic"
        style={{
          borderLeft: "2px solid var(--step-4)",
          color: "var(--step-5)",
        }}
      >
        {children}
      </blockquote>
    );
  },

  hr() {
    return (
      <hr className="my-8" style={{ border: "none", borderTop: "1px solid var(--step-3)" }} />
    );
  },

  a({ children, href }) {
    return (
      <a
        href={href}
        className="font-mono text-xs tracking-wider underline underline-offset-4 transition-colors"
        style={{ color: "var(--mid-gray)" }}
      >
        {children}
      </a>
    );
  },
};

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <Markdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </Markdown>
  );
}
