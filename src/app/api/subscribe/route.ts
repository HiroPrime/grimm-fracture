import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    const supabase = getSupabase();
    const { error } = await supabase.from("grimm_newsletter").insert([{ email }]);

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ ok: true, alreadySubscribed: true });
      }

      console.error("grimm_newsletter insert failed:", error.message);
      return NextResponse.json(
        { error: "Could not reach the ledger. Try again in a moment." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("subscribe route error:", message);
    return NextResponse.json(
      { error: "Subscribe is temporarily unavailable." },
      { status: 503 }
    );
  }
}
