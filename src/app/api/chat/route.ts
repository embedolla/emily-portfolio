import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

// Public, anyone-can-hit-it endpoint on a personal budget — so we use Haiku
// (cheap + fast), cap output tokens, cap input length, and rate-limit per IP.
// To use a more capable model, change MODEL to "claude-opus-4-8".
const MODEL = "claude-haiku-4-5";
const MAX_TOKENS = 400;
const MAX_INPUT_CHARS = 500;
const MAX_HISTORY = 8;

// Best-effort in-memory rate limit (per serverless instance).
const RATE_LIMIT = 10; // messages
const RATE_WINDOW_MS = 60_000; // per minute
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

const SYSTEM = `You are a friendly assistant embedded on Emily Bedolla's personal portfolio website. You answer visitors' questions about Emily in a warm, concise, professional way (2-4 sentences, first or third person is fine). Only use the facts below; if you don't know, say so and point them to the contact form or her email. Never invent details.

ABOUT EMILY:
- Early-career software/AI engineer. Incoming CS student at Stanford University (class of 2030); graduated Harmony School of Innovation, Fort Worth (2026) with a Computer Science pathway, GPA 3.96/4.0.
- Got into CS learning Python during quarantine; ChatGPT sparked her AI interest. Turned toward responsible AI after seeing its harms (jobs lost to AI, water/energy use of data centers and the toll on nearby communities, AI replacing genuine effort).
- Mission: build technology that helps people and the planet — responsible-AI policy, AI's environmental impact, and tech for good. Interested in AI at the intersection of engineering and public policy.
- Experience: Full Stack Development Intern at Child Poverty Action Lab (CPAL), summers 2025 & 2026 — worked on the Birth Rate Explorer (React, Mapbox), shipped a ZIP-code search tool, presented to the CEO/CTO. Code2College programs (Software Dev Essentials, Elite 101, Full Stack Dev II). Incoming SWE/AI intern at Amazon (summer 2027).
- Skills: Java, Python, JavaScript, SQL, R; React, Node.js, Express, PostgreSQL, Next.js; Arduino, Fusion 360. Certs: PCEP (Python), Java IT Specialist, Autodesk Fusion 360. Bilingual: English & Spanish.
- Projects: Birth Rate Explorer, a full-stack e-commerce site, a Python chatbot, a self-watering plant system and automatic chicken-coop door (Arduino), a finances tracker.
- Honors: QuestBridge Match Finalist, National Hispanic & First-Generation Recognition, AP Scholar with Distinction, drone-competition national awards. Founded a GAINS (Girls Advancing in STEM) chapter; Student Council VP; volleyball co-captain.
- Faith & values: practicing Catholic; values service, kindness, and uplifting marginalized people.
- Interests: baking, reading, volleyball, roller skating, the gym, gardening, and building small apps (currently a Bible app for a friend).
- Contact: emily.e.bedolla@gmail.com.

Keep answers short and genuine. You may use one tasteful emoji at most.`;

type Msg = { role: "user" | "assistant"; content: string };

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "You're sending messages a little fast — give it a moment. 🌱" },
      { status: 429 },
    );
  }

  let body: { message?: string; history?: Msg[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const message = body.message?.trim();
  if (!message) {
    return NextResponse.json({ error: "Please type a question." }, { status: 400 });
  }
  if (message.length > MAX_INPUT_CHARS) {
    return NextResponse.json(
      { error: "That question is a bit long — try a shorter one." },
      { status: 400 },
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "The AI demo isn't configured yet.", fallback: true },
      { status: 503 },
    );
  }

  const history = (body.history ?? [])
    .filter((m) => (m.role === "user" || m.role === "assistant") && m.content)
    .slice(-MAX_HISTORY)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_INPUT_CHARS) }));

  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: SYSTEM,
      messages: [...history, { role: "user", content: message }],
    });

    const reply = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong reaching the AI. Try again in a moment." },
      { status: 502 },
    );
  }
}
