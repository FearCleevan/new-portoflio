import { NextResponse } from "next/server";

const SHEET_URL = process.env.NEXT_PUBLIC_CONTACT_SHEET_URL ?? "";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  if (!SHEET_URL) {
    return NextResponse.json(
      { ok: false, error: "Contact endpoint is not configured." },
      { status: 500 }
    );
  }

  let body: { name?: string; email?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Missing or invalid fields." }, { status: 400 });
  }

  try {
    const params = new URLSearchParams({ name, email, message });
    const res = await fetch(SHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: "The message could not be delivered. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "The message could not be delivered. Please try again." },
      { status: 502 }
    );
  }
}
