#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";
import dotenv from "dotenv";
import matter from "gray-matter";

const ROOT = process.cwd();

// Load local env files for CLI usage. Existing shell vars still win.
for (const file of [".env.local", ".env"]) {
  dotenv.config({ path: path.join(ROOT, file), quiet: true });
}

const POSTS_DIR = path.join(ROOT, "content", "posts");
const AUDIO_DIR = path.join(ROOT, "public", "audio");
const SCRIPT_DIR = path.join(ROOT, "generated", "audio-scripts");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_BASE_URL = (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
const TTS_BACKEND = process.env.TTS_BACKEND || "speech";
const TTS_MODEL = process.env.TTS_MODEL || "gpt-4o-mini-tts";
const TTS_VOICE = process.env.TTS_VOICE || "sage";
const TTS_SPEED = Number(process.env.TTS_SPEED || "1");
const TTS_INSTRUCTIONS = process.env.TTS_INSTRUCTIONS || "Narrate in a calm, natural, thoughtful voice. Preserve the meaning and wording closely, avoid sounding salesy, and use gentle pauses at section transitions.";
const NARRATION_ADAPT = process.env.NARRATION_ADAPT !== "0";
const NARRATION_MODEL = process.env.NARRATION_MODEL || "gpt-4o-mini";

const args = new Set(process.argv.slice(2));
const positional = process.argv.slice(2).filter((arg) => !arg.startsWith("--"));
const all = args.has("--all");
const dryRun = args.has("--dry-run");
const scriptOnly = args.has("--script-only");

if (!all && positional.length === 0) {
  console.error("Usage: node scripts/generate-blog-audio.mjs <slug> [<slug> ...] [--dry-run|--script-only]\n       node scripts/generate-blog-audio.mjs --all [--dry-run|--script-only]");
  process.exit(1);
}

async function main() {
  const slugs = all ? await getAllSlugs() : positional;
  await fs.mkdir(AUDIO_DIR, { recursive: true });
  await fs.mkdir(SCRIPT_DIR, { recursive: true });

  for (const slug of slugs) {
    const { title, narration } = await buildNarrationForSlug(slug);
    const scriptPath = path.join(SCRIPT_DIR, `${slug}.txt`);
    await fs.writeFile(scriptPath, narration, "utf8");
    console.log(`wrote script: ${path.relative(ROOT, scriptPath)}`);

    if (dryRun || scriptOnly) continue;
    if (!OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is required to generate audio. You can still use --script-only to inspect narration text.");
    }

    const outputPath = path.join(AUDIO_DIR, `${slug}.mp3`);
    await synthesizeToMp3({ title, narration, outputPath });
    console.log(`wrote audio: ${path.relative(ROOT, outputPath)}`);
  }
}

async function getAllSlugs() {
  const entries = await fs.readdir(POSTS_DIR);
  return entries
    .filter((name) => name.endsWith(".md") || name.endsWith(".mdx"))
    .map((name) => name.replace(/\.(md|mdx)$/, ""))
    .sort();
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

  // Drop fenced code/diagrams entirely for audio.
  text = text.replace(/```[\s\S]*?```/g, "\n");

  // Remove MDX component tags but keep their content.
  text = text.replace(/<\/?[A-Z][^>]*>/g, "");
  text = text.replace(/<\/?[a-z][^>]*>/g, "");

  // Drop markdown tables; they usually sound bad read aloud.
  text = text.replace(/^(?:\|.*\|\s*\n?)+/gm, "\n");

  // Convert headings into spoken section breaks.
  text = text.replace(/^#{1,6}\s+(.*)$/gm, (_m, heading) => `\n\n${heading.trim()}.\n\n`);

  // Links/images/inline formatting.
  text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, "");
  text = text.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
  text = text.replace(/`([^`]+)`/g, "$1");
  text = text.replace(/\*\*([^*]+)\*\*/g, "$1");
  text = text.replace(/\*([^*]+)\*/g, "$1");
  text = text.replace(/^>\s?/gm, "");
  text = text.replace(/^---$/gm, "\n");

  // Lists: keep content, lose symbols.
  text = text.replace(/^\s*[-*+]\s+/gm, "");
  text = text.replace(/^\s*\d+\.\s+/gm, "");

  // Collapse whitespace while keeping paragraph breaks.
  const paragraphs = text
    .split(/\n{2,}/)
    .map((chunk) => chunk.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  return [
    `${title}.`,
    ...paragraphs,
  ].join("\n\n");
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

function splitIntoChunks(text, maxChars = 3500) {
  const paragraphs = text.split(/\n{2,}/).filter(Boolean);
  const chunks = [];
  let current = "";

  for (const paragraph of paragraphs) {
    const candidate = current ? `${current}\n\n${paragraph}` : paragraph;
    if (candidate.length <= maxChars) {
      current = candidate;
      continue;
    }

    if (current) chunks.push(current);

    if (paragraph.length <= maxChars) {
      current = paragraph;
      continue;
    }

    // Fallback: split oversized paragraphs by sentence-ish boundaries.
    const parts = paragraph.split(/(?<=[.!?])\s+/);
    current = "";
    for (const part of parts) {
      const sentenceCandidate = current ? `${current} ${part}` : part;
      if (sentenceCandidate.length <= maxChars) {
        current = sentenceCandidate;
      } else {
        if (current) chunks.push(current);
        current = part;
      }
    }
  }

  if (current) chunks.push(current);
  return chunks;
}

async function synthesizeToMp3({ narration, outputPath }) {
  const chunks = splitIntoChunks(narration);
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "blog-audio-"));

  try {
    const chunkPaths = [];

    for (let i = 0; i < chunks.length; i += 1) {
      const chunkText = chunks[i];
      let bytes;

      switch (TTS_BACKEND) {
        case "speech":
          bytes = await synthesizeChunkViaSpeech(chunkText);
          break;
        case "chat-audio":
          bytes = await synthesizeChunkViaChatAudio(chunkText);
          break;
        default:
          throw new Error(`Unsupported TTS_BACKEND: ${TTS_BACKEND}. Try \"speech\" or \"chat-audio\".`);
      }

      const chunkPath = path.join(tmpDir, `chunk-${String(i).padStart(3, "0")}.mp3`);
      await fs.writeFile(chunkPath, bytes);
      chunkPaths.push(chunkPath);
    }

    if (chunkPaths.length === 1) {
      await fs.copyFile(chunkPaths[0], outputPath);
      return;
    }

    const concatFile = path.join(tmpDir, "concat.txt");
    const concatBody = chunkPaths.map((p) => `file '${p.replaceAll("'", "'\\''")}'`).join("\n");
    await fs.writeFile(concatFile, concatBody, "utf8");

    execFileSync("ffmpeg", [
      "-y",
      "-f", "concat",
      "-safe", "0",
      "-i", concatFile,
      "-c", "copy",
      outputPath,
    ], { stdio: "inherit" });
  } finally {
    await fs.rm(tmpDir, { recursive: true, force: true });
  }
}

async function synthesizeChunkViaSpeech(chunkText) {
  const response = await fetch(`${OPENAI_BASE_URL}/audio/speech`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: TTS_MODEL,
      voice: TTS_VOICE,
      input: chunkText,
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

async function synthesizeChunkViaChatAudio(chunkText) {
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
        voice: TTS_VOICE,
        format: "mp3",
      },
      messages: [
        {
          role: "system",
          content: TTS_INSTRUCTIONS,
        },
        {
          role: "user",
          content: `Narrate the following text naturally as an audio rendition. Stay faithful to the meaning and structure, but prioritize clear spoken delivery.\n\n${chunkText}`,
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

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
