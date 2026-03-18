const { chromium, devices } = require("playwright");
const fs = require("fs/promises");
const path = require("path");

async function main() {
  const [, , targetUrl, slugArg] = process.argv;

  if (!targetUrl) {
    console.error("Usage: npm run capture:site -- <url> [slug]");
    process.exit(1);
  }

  const url = normalizeUrl(targetUrl);
  const slug = slugArg || slugify(url.hostname || targetUrl);
  const outDir = path.resolve(process.cwd(), "prospect-captures", slug);
  const desktopPath = path.join(outDir, "desktop-full.png");
  const mobilePath = path.join(outDir, "mobile-full.png");
  const desktopViewportPath = path.join(outDir, "desktop-viewport.png");
  const metadataPath = path.join(outDir, "metadata.json");

  await fs.mkdir(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  try {
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 2200 },
      deviceScaleFactor: 1,
    });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto(url.toString(), { waitUntil: "networkidle", timeout: 45000 });
    await desktopPage.screenshot({ path: desktopPath, fullPage: true });
    await desktopPage.screenshot({ path: desktopViewportPath, fullPage: false });

    const mobileContext = await browser.newContext({
      ...devices["iPhone 13"],
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(url.toString(), { waitUntil: "networkidle", timeout: 45000 });
    await mobilePage.screenshot({ path: mobilePath, fullPage: true });

    const metadata = {
      sourceUrl: url.toString(),
      slug,
      capturedAt: new Date().toISOString(),
      pages: {
        desktop: {
          title: await desktopPage.title(),
          finalUrl: desktopPage.url(),
          viewport: { width: 1440, height: 2200 },
          screenshots: {
            full: rel(process.cwd(), desktopPath),
            viewport: rel(process.cwd(), desktopViewportPath),
          },
        },
        mobile: {
          title: await mobilePage.title(),
          finalUrl: mobilePage.url(),
          device: "iPhone 13",
          screenshots: {
            full: rel(process.cwd(), mobilePath),
          },
        },
      },
      promptHint: `Analyze this prospect for Kestrel Labs using the rendered screenshots in prospect-captures/${slug}/ and the live site ${url.toString()}.`,
    };

    await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2) + "\n", "utf8");

    console.log(JSON.stringify({
      ok: true,
      slug,
      outputDirectory: rel(process.cwd(), outDir),
      screenshots: {
        desktopFull: rel(process.cwd(), desktopPath),
        desktopViewport: rel(process.cwd(), desktopViewportPath),
        mobileFull: rel(process.cwd(), mobilePath),
      },
      metadata: rel(process.cwd(), metadataPath),
    }, null, 2));

    await desktopContext.close();
    await mobileContext.close();
  } finally {
    await browser.close();
  }
}

function normalizeUrl(input) {
  if (/^https?:\/\//i.test(input)) return new URL(input);
  return new URL(`https://${input}`);
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/^www\./, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function rel(root, file) {
  return path.relative(root, file) || ".";
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
