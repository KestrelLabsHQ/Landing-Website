#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import dotenv from "dotenv";
import matter from "gray-matter";

const ROOT = process.cwd();
for (const file of [".env.local", ".env"]) {
  dotenv.config({ path: path.join(ROOT, file), quiet: true });
}

const POSTS_DIR = path.join(ROOT, "content", "posts");
const OUTPUT_DIR = path.join(ROOT, "public", "audio", "voice-tests");
const SCRIPT_DIR = path.join(ROOT, "generated", "audio-snips");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_BASE_URL = (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
const TTS_BACKEND = process.env.TTS_BACKEND || "speech";
const TTS_MODEL = process.env.TTS_MODEL || "gpt-4o-mini-tts";
const TTS_SPEED = Number(process.env.TTS_SPEED || "1");
const TTS_INSTRUCTIONS = process.env.TTS_INSTRUCTIONS || "Narrate in a calm, natural, thoughtful voice. Preserve the meaning and wording closely, avoid sounding salesy, and use gentle pauses at section transitions.";
const NARRATION_ADAPT = process.env.NARRATION_ADAPT !== "0";
const NARRATION_MODEL = process.env.NARRATION_MODEL || "gpt-4o-mini";
const DEFAULT_VOICES = (process.env.AUDIO_SNIP_VOICES || "alloy,echo,sage,ash")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const SNIP_CHARS = Number(process.env.AUDIO_SNIP_CHARS || "900");

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: node scripts/generate-voice-snips.mjs <slug>");
  process.exit(1);
}
if (!OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY is required.");
  process.exit(1);
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.mkdir(SCRIPT_DIR, { recursive: true });

  const { title, narration } = await buildNarrationForSlug(slug);
  const snippet = takeSnippet(narration, SNIP_CHARS);
  const scriptPath = path.join(SCRIPT_DIR, `${slug}.txt`);
  await fs.writeFile(scriptPath, snippet, "utf8");

  const outputs = [];

  for (const voice of DEFAULT_VOICES) {
    try {
      const bytes = await synthesizeSnippet({ text: snippet, voice });
      const filename = `${slug}--${voice}.mp3`;
      const outputPath = path.join(OUTPUT_DIR, filename);
      await fs.writeFile(outputPath, bytes);
      outputs.push({ voice, filename });
      console.log(`wrote ${path.relative(ROOT, outputPath)}`);
    } catch (error) {
      console.error(`voice ${voice} failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  const htmlPath = path.join(OUTPUT_DIR, `${slug}.html`);
  await fs.writeFile(htmlPath, renderComparePage({ title, slug, snippet, outputs }), "utf8");
  console.log(`wrote ${path.relative(ROOT, htmlPath)}`);
}

async function buildNarrationForSlug(slug) {
  const filePath = await resolvePostPath(slug);
  const raw = await fs.readFile(filePath, "utf8");
  const parsed = matter(raw);
  const title = String(parsed.data.title || slug);
  const baseNarration = mdxToNarration(title, parsed.content);
  const narration = await maybeAdaptNarration({ title, baseNarration });
  return { title, narration };
}

async function resolvePostPath(slug) {
  const candidates = [
    path.join(POSTS_DIR, `${slug}.mdx`),
    path.join(POSTS_DIR, `${slug}.md`),
  ];

  for (const candidate of candidates) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {}
  }

  throw new Error(`Post not found for slug: ${slug}`);
}

function mdxToNarration(title, content) {
  let text = content;
  text = text.replace(/```[\s\S]*?```/g, "\n");
  text = text.replace(/<\/?[A-Z][^>]*>/g, "");
  text = text.replace(/<\/?[a-z][^>]*>/g, "");
  text = text.replace(/^(?:\|.*\|\s*\n?)+/gm, "\n");
  text = text.replace(/^#{1,6}\s+(.*)$/gm, (_m, heading) => `\n\n${heading.trim()}.\n\n`);
  text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, "");
  text = text.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
  text = text.replace(/`([^`]+)`/g, "$1");
  text = text.replace(/\*\*([^*]+)\*\*/g, "$1");
  text = text.replace(/\*([^*]+)\*/g, "$1");
  text = text.replace(/^>\s?/gm, "");
  text = text.replace(/^---$/gm, "\n");
  text = text.replace(/^\s*[-*+]\s+/gm, "");
  text = text.replace(/^\s*\d+\.\s+/gm, "");

  const paragraphs = text
    .split(/\n{2,}/)
    .map((chunk) => chunk.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  return [`${title}.`, ...paragraphs].join("\n\n");
}

async function maybeAdaptNarration({ title, baseNarration }) {
  if (!NARRATION_ADAPT || !OPENAI_API_KEY) return baseNarration;

  const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: NARRATION_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You adapt written blog prose into faithful narration scripts for AI audio. Preserve meaning, tone, and structure. Improve spoken clarity, pacing, and transitions. Remove markdown artifacts. Summarize tables, code, or diagrams only if they matter. Do not add hype, commentary, or extra facts. Return plain text only.",
        },
        {
          role: "user",
          content:
            `Rewrite the following blog post into a spoken-audio script that stays faithful to the original but sounds natural when read aloud. Keep it concise where spoken compression helps, but do not materially change the argument.\n\nTitle: ${title}\n\nText:\n${baseNarration}`,
        },
      ],
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Narration adaptation failed (${response.status}): ${errorText}`);
  }

  const json = await response.json();
  const adapted = extractTextResponse(json)?.trim();
  return adapted || baseNarration;
}

function extractTextResponse(json) {
  const content = json?.choices?.[0]?.message?.content;
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((part) => (typeof part?.text === "string" ? part.text : ""))
      .join("\n")
      .trim();
  }
  return undefined;
}

function takeSnippet(text, maxChars) {
  if (text.length <= maxChars) return text;
  const candidate = text.slice(0, maxChars);
  const breakpoints = [candidate.lastIndexOf(". "), candidate.lastIndexOf("? "), candidate.lastIndexOf("! "), candidate.lastIndexOf("\n\n")];
  const cut = Math.max(...breakpoints);
  return `${candidate.slice(0, cut > 200 ? cut + 1 : maxChars).trim()}\n`;
}

async function synthesizeSnippet({ text, voice }) {
  switch (TTS_BACKEND) {
    case "speech":
      return synthesizeViaSpeech({ text, voice });
    case "chat-audio":
      return synthesizeViaChatAudio({ text, voice });
    default:
      throw new Error(`Unsupported TTS_BACKEND: ${TTS_BACKEND}`);
  }
}

async function synthesizeViaSpeech({ text, voice }) {
  const response = await fetch(`${OPENAI_BASE_URL}/audio/speech`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: TTS_MODEL,
      voice,
      input: text,
      response_format: "mp3",
      speed: TTS_SPEED,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Speech TTS request failed (${response.status}): ${errorText}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

async function synthesizeViaChatAudio({ text, voice }) {
  const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: TTS_MODEL,
      modalities: ["text", "audio"],
      audio: {
        voice,
        format: "mp3",
      },
      messages: [
        {
          role: "system",
          content: TTS_INSTRUCTIONS,
        },
        {
          role: "user",
          content: `Narrate the following sample naturally as an audio rendition. Stay faithful to the meaning and structure, but prioritize clear spoken delivery.\n\n${text}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Chat-audio request failed (${response.status}): ${errorText}`);
  }

  const json = await response.json();
  const audioBase64 = extractAudioBase64(json);
  if (!audioBase64) {
    throw new Error(`Chat-audio response did not include audio data. Response keys: ${Object.keys(json).join(", ")}`);
  }

  return Buffer.from(audioBase64, "base64");
}

function extractAudioBase64(json) {
  return (
    json?.choices?.[0]?.message?.audio?.data
    ?? json?.output_audio?.data
    ?? findAudioDataDeep(json?.output)
  );
}

function findAudioDataDeep(output) {
  if (!Array.isArray(output)) return undefined;
  for (const item of output) {
    const content = item?.content;
    if (!Array.isArray(content)) continue;
    for (const part of content) {
      if (typeof part?.data === "string") return part.data;
      if (typeof part?.audio?.data === "string") return part.audio.data;
    }
  }
  return undefined;
}

function renderComparePage({ title, slug, snippet, outputs }) {
  const items = outputs.map(({ voice, filename }) => `
    <section class="card">
      <h2>${escapeHtml(voice)}</h2>
      <audio controls preload="none">
        <source src="./${encodeURIComponent(filename)}" type="audio/mpeg" />
      </audio>
    </section>`).join("\n");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Voice test — ${escapeHtml(title)}</title>
    <style>
      body { font-family: Inter, system-ui, sans-serif; margin: 0; background: #fafafa; color: #111; }
      main { max-width: 960px; margin: 0 auto; padding: 40px 20px 80px; }
      h1 { font-size: 2rem; margin-bottom: 0.5rem; }
      p.meta { color: rgba(0,0,0,.6); margin-top: 0; }
      .grid { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); margin-top: 24px; }
      .card { background: white; border: 1px solid rgba(0,0,0,.1); padding: 16px; }
      .snippet { margin-top: 28px; background: white; border: 1px solid rgba(0,0,0,.1); padding: 16px; white-space: pre-wrap; line-height: 1.6; color: rgba(0,0,0,.75); }
      audio { width: 100%; margin-top: 12px; }
      code { background: rgba(0,0,0,.04); padding: 2px 6px; border-radius: 6px; }
    </style>
  </head>
  <body>
    <main>
      <h1>Voice test</h1>
      <p class="meta">Post: <code>${escapeHtml(slug)}</code></p>
      <p class="meta">Model: <code>${escapeHtml(TTS_MODEL)}</code> · Backend: <code>${escapeHtml(TTS_BACKEND)}</code></p>
      <div class="grid">${items}</div>
      <div class="snippet"><strong>Snippet text</strong>\n\n${escapeHtml(snippet)}</div>
    </main>
  </body>
</html>`;
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
