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
- `hero`
- `trust`
- `issue`
- `cta`
- `contact`
- `mobile`
- `bug`
- `comparison`

## Example filenames
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
- 1 hero screenshot
- 1 trust/credibility screenshot
- 1-2 issue screenshots
- 1 CTA or contact-flow screenshot
- 1 mobile screenshot when mobile issues are relevant

## Suggested markdown reference style

```md
- Evidence: `evidence/03-issue-busy-homepage-rhythm.png`
```

Or:

```md
![Busy homepage rhythm](evidence/03-issue-busy-homepage-rhythm.png)
```

## Notes
The point is not volume. A small set of sharp evidence is more convincing than dumping ten generic full-page screenshots.
