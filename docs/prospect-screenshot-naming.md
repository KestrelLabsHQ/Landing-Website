# Prospect Screenshot Naming Convention

Use this convention for browser-based lead analysis evidence captures.

## Goal
Keep screenshot filenames:
- sortable
- predictable
- easy to reference in markdown reports
- usable as report evidence, not just raw archives

## Folder location
Store evidence screenshots under:

```text
prospect-captures/<slug>/evidence/
```

Example:

```text
prospect-captures/atlanta-divorce-law-group/evidence/
```

## Filename format

```text
NN-category-short-label.png
```

Where:
- `NN` = two-digit sequence number
- `category` = broad evidence type
- `short-label` = short human-readable description

## Recommended categories
- `fullpage`
- `hero`
- `trust`
- `issue`
- `cta`
- `contact`
- `mobile`
- `bug`
- `comparison`

## Example filenames
- `00-fullpage-desktop-homepage.png`
- `00-fullpage-mobile-homepage.png`
- `01-hero-first-impression.png`
- `02-trust-team-depth.png`
- `03-issue-busy-homepage-rhythm.png`
- `04-issue-video-fallback-state.png`
- `05-cta-consultation-section.png`
- `06-contact-form-flow.png`
- `07-mobile-density-problem.png`

## Short-label guidance
Use labels that describe the finding, not just the page section.

Prefer:
- `issue-busy-homepage-rhythm`
- `issue-weak-visual-hierarchy`
- `trust-large-team-section`
- `cta-clear-consultation-invite`

Avoid:
- `screenshot-1`
- `homepage-middle`
- `section-a`

## Reporting rule
Every screenshot included in a report should:
1. have a filename that implies why it matters
2. be referenced explicitly in the markdown report
3. support either:
   - a strength,
   - a weakness,
   - a bug,
   - or a recommended improvement

## Minimum evidence set per lead
Aim for at least:
- 1 full-page desktop screenshot
- 1 full-page mobile screenshot
- 1 hero screenshot
- 1 trust/credibility screenshot
- 1-2 issue screenshots
- 1 CTA or contact-flow screenshot
- 1 additional mobile screenshot when mobile issues are relevant

## Suggested markdown reference style

Prefer standard markdown image embeds for shorter evidence screenshots.

Desktop/mobile evidence example:

```md
![Busy homepage rhythm](evidence/03-issue-busy-homepage-rhythm.png)
```

For very long full-page images, prefer links instead of inline embeds:

```md
- View source image: [00-fullpage-desktop-homepage.png](evidence/00-fullpage-desktop-homepage.png)
```

Also keep a plain filename reference near the image or link for quick source lookup:

```md
- Evidence file: `evidence/03-issue-busy-homepage-rhythm.png`
```

## Viewport / fullscreen standard
For desktop analysis, use a representative browser viewport rather than a small or narrow window.
True fullscreen is optional; representativeness is what matters.
Recommended baseline:
- desktop analysis viewport: `1920x1080`
- mobile analysis viewport: around `390x844` (iPhone-class)

The goal is to inspect the site in a realistic desktop context before making judgments about hierarchy, clutter, rhythm, or polish.

## Raw capture rule
Default to raw/live screenshots.
Do not apply CSS injections, layout normalization, width constraints, or visual cleanup during capture unless a technical issue makes faithful capture impossible.

Capture priority:
1. desktop headless raw capture
2. desktop headed raw capture if headless is blocked
3. other faithful browser-inspection fallback only if both fail

If a fallback/workaround is ever required:
- document it in the report
- keep the rawest possible version available
- note why the fallback was needed
- note that the image may be slightly less faithful than a clean primary-path capture

## Notes
The point is not volume. A small set of sharp evidence is more convincing than dumping ten generic full-page screenshots.
