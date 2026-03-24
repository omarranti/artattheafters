import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  if (!prompt || typeof prompt !== "string") {
    return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { text: "[AI generation unavailable \u2014 ANTHROPIC_API_KEY not configured. Set it in your environment variables to enable AI email and blog generation.]" },
      { status: 200 }
    );
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await res.json();
    const text = data.content?.map((b: { text?: string }) => b.text || "").join("") || "Error generating content.";

    return NextResponse.json({ text });
  } catch {
    return NextResponse.json({ text: "Something went wrong. Try again." }, { status: 500 });
  }
}
