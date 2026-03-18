# Playwright Prospect Capture MVP

This is the minimum viable setup for rendered-page prospect analysis in Kestrel Labs.

## What it does
Given a URL, the capture script:
- opens the site in Chromium using Playwright
- captures a **desktop full-page screenshot**
- captures a **desktop viewport screenshot**
- captures a **mobile full-page screenshot**
- writes a small `metadata.json` file with capture details

Output lives in:

```text
prospect-captures/<slug>/
  desktop-full.png
  desktop-viewport.png
  mobile-full.png
  metadata.json
```

## Install
From the KestrelLabs repo root:

```bash
npm install
npx playwright install chromium
```

If Chromium dependencies are missing on Linux, Playwright will tell you what system packages are needed.

## Usage
From the repo root:

```bash
npm run capture:site -- https://example.com prospect-slug
```

Or let the script derive the slug automatically:

```bash
npm run capture:site -- https://example.com
```

## Example
```bash
npm run capture:site -- https://atlantadivorcelawgroup.com atlanta-divorce-law-group
```

## Next use in lead analysis
After capture, feed these into your prospect review workflow:
- the live URL
- `prospect-captures/<slug>/desktop-full.png`
- `prospect-captures/<slug>/desktop-viewport.png`
- `prospect-captures/<slug>/mobile-full.png`
- `prospect-captures/<slug>/metadata.json`

Then ask for a Kestrel lead analysis using the rendered screenshots.

## Why this MVP is enough
This gives you the most important missing piece:
- **rendered visual evidence**

Without building a giant browser agent system first.

## Good next upgrades
After this works reliably, the best upgrades are:
1. section-specific screenshots (hero, trust section, CTA section)
2. lightweight console/network logging for broken assets or obvious client-side issues
3. callout/annotation workflow on screenshots
4. integration into an ACP/browser workflow later

## Reporting standard
For actual lead reports, prefer a small evidence set instead of only one full-page capture.
Try to include:
- hero / first-impression screenshot
- one strong trust signal screenshot
- one or more screenshots of weak UX/UI, clutter, hierarchy issues, or broken/awkward states
- one contact / CTA flow screenshot

This makes the report more persuasive because the critique is visibly grounded in the rendered experience.
