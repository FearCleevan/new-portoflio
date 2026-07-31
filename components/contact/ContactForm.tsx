"use client";

import { useState, useRef, useEffect } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const GENERIC_ERROR = "The message could not be delivered. Please try again.";

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data: { ok: boolean; error?: string } | null = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        setErrorMessage(data?.error ?? GENERIC_ERROR);
        setStatus("error");
        return;
      }

      setStatus("sent");
      setName("");
      setMessage("");
    } catch {
      setErrorMessage(GENERIC_ERROR);
      setStatus("error");
    }
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

      {/* Delivery error */}
      {status === "error" && errorMessage && (
        <div
          className="font-mono text-[11px] tracking-wide"
          style={{ color: "#e05c5c", border: "1px solid #e05c5c", padding: "0.75rem 1rem" }}
          role="alert"
        >
          {errorMessage}
        </div>
      )}

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
