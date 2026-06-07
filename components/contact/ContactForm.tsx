"use client";

import { useState, useRef, useEffect } from "react";
import { personal } from "@/data/personal";

type Status = "idle" | "sending" | "sent" | "error";

const SHEET_URL = process.env.NEXT_PUBLIC_CONTACT_SHEET_URL ?? "";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function isValidEmail(value: string) {
  return EMAIL_RE.test(value.trim());
}

export function ContactForm() {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [message, setMessage]   = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [status, setStatus]     = useState<Status>("idle");
  const successRef = useRef<HTMLDivElement>(null);

  const emailError = emailTouched && email.length > 0 && !isValidEmail(email);
  const canSubmit  = name.trim() !== "" && isValidEmail(email) && message.trim() !== "";

  useEffect(() => {
    if (status === "sent" && successRef.current) {
      successRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("sending");

    if (SHEET_URL) {
      const params = new URLSearchParams({ name, email, message });
      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      setStatus("sent");
      setName("");
      setMessage("");
      return;
    }

    // mailto fallback
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.open(`mailto:${personal.email}?subject=${subject}&body=${body}`, "_blank");

    setStatus("sent");
    setName("");
    setMessage("");
  }

  const inputBase: React.CSSProperties = {
    width: "100%",
    backgroundColor: "var(--step-1)",
    border: "1px solid var(--step-3)",
    color: "var(--off-white)",
    fontFamily: "var(--font-nunito)",
    fontSize: "0.875rem",
    padding: "0.75rem 1rem",
    outline: "none",
    transition: "border-color 0.15s",
  };

  // ── Success state ──────────────────────────────────────────────────────────
  if (status === "sent") {
    return (
      <div
        ref={successRef}
        className="flex flex-col items-start justify-center gap-4 py-10 px-8"
        style={{
          border: "1px solid var(--step-3)",
          backgroundColor: "var(--step-1)",
          minHeight: "220px",
        }}
      >
        <div
          className="font-mono text-[10px] tracking-[0.3em] uppercase"
          style={{ color: "var(--step-5)" }}
        >
          ✓ message received
        </div>
        <p
          className="font-display font-bold uppercase leading-tight tracking-tight"
          style={{ fontSize: "clamp(22px, 3vw, 36px)", color: "var(--off-white)" }}
        >
          Thanks — I&apos;ll be in touch soon.
        </p>
        <p className="font-body text-sm" style={{ color: "var(--step-6)" }}>
          Your message has been logged. Expect a reply to{" "}
          <span style={{ color: "var(--mid-gray)" }}>{email}</span> within 24 hours.
        </p>
        <button
          onClick={() => { setStatus("idle"); setEmailTouched(false); }}
          className="font-mono text-[10px] tracking-widest uppercase mt-2 transition-colors"
          style={{ color: "var(--step-5)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--off-white)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--step-5)")}
        >
          ← Send another message
        </button>
      </div>
    );
  }

  const isBusy = status === "sending";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label
            className="font-mono text-[10px] tracking-widest uppercase"
            style={{ color: "var(--step-5)" }}
          >
            Name
          </label>
          <input
            type="text"
            required
            placeholder="Peter Paul"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputBase}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--step-5)")}
            onBlur={(e)  => (e.currentTarget.style.borderColor = "var(--step-3)")}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label
              className="font-mono text-[10px] tracking-widest uppercase"
              style={{ color: "var(--step-5)" }}
            >
              Email
            </label>
            {emailError && (
              <span
                className="font-mono text-[9px] tracking-widest uppercase"
                style={{ color: "#e05c5c" }}
              >
                Invalid email
              </span>
            )}
          </div>
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setEmailTouched(true)}
            style={{
              ...inputBase,
              borderColor: emailError ? "#e05c5c" : "var(--step-3)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = emailError ? "#e05c5c" : "var(--step-5)";
            }}
          />
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label
          className="font-mono text-[10px] tracking-widest uppercase"
          style={{ color: "var(--step-5)" }}
        >
          Message
        </label>
        <textarea
          required
          rows={5}
          placeholder="Tell me about your project..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ ...inputBase, resize: "vertical" }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--step-5)")}
          onBlur={(e)  => (e.currentTarget.style.borderColor = "var(--step-3)")}
        />
      </div>

      {/* Submit */}
      <div className="flex items-center gap-6 flex-wrap">
        <button
          type="submit"
          disabled={isBusy || !canSubmit}
          className="font-mono text-[11px] tracking-widest uppercase px-6 py-3 transition-colors"
          style={{
            backgroundColor: canSubmit && !isBusy ? "var(--off-white)" : "transparent",
            color:           canSubmit && !isBusy ? "var(--base)" : "var(--step-4)",
            border:          `1px solid ${canSubmit && !isBusy ? "var(--off-white)" : "var(--step-3)"}`,
            cursor:          canSubmit && !isBusy ? "pointer" : "not-allowed",
            opacity:         isBusy ? 0.6 : 1,
          }}
          onMouseEnter={(e) => {
            if (!canSubmit || isBusy) return;
            const b = e.currentTarget as HTMLButtonElement;
            b.style.backgroundColor = "transparent";
            b.style.color = "var(--off-white)";
          }}
          onMouseLeave={(e) => {
            if (!canSubmit || isBusy) return;
            const b = e.currentTarget as HTMLButtonElement;
            b.style.backgroundColor = "var(--off-white)";
            b.style.color = "var(--base)";
          }}
        >
          {isBusy ? "Sending..." : "Send Message"}
        </button>

        {!canSubmit && (name || email || message) && (
          <span
            className="font-mono text-[9px] tracking-widest uppercase"
            style={{ color: "var(--step-4)" }}
          >
            {emailError ? "Fix your email to continue" : "Fill all fields to send"}
          </span>
        )}
      </div>
    </form>
  );
}
