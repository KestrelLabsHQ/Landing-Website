# Kestrel Labs Lead Analysis Prompt

Use this prompt when evaluating a prospect for Kestrel Labs outreach.

## Goal
Create a concise but high-signal lead analysis that helps decide:
- whether to pursue the lead
- what Kestrel should pitch first
- how to tailor a first outreach email

The tone should match Kestrel Labs:
- founder-led
- selective
- practical
- understated
- not salesy

## Analysis Standard
**Preferred method:** analyze the site from its **rendered experience**, not just raw HTML/DOM.
Use a browser-capable workflow when available, such as:
- ACP harness with browser capability
- Playwright
- browser MCP/tooling
- screenshots or rendered-page inspection

If rendered analysis is unavailable, say so explicitly and mark the result as lower-confidence.
Do **not** present DOM-only inspection as equivalent to the real site experience.

## Minimal Inputs
Provide as many of these as you have:
- Business name
- Website URL
- Google Maps URL
- LinkedIn company URL
- Instagram URL
- Facebook URL
- Other feed/review URLs
- Optional notes / gut instincts

## Instructions to the agent
Analyze the prospect using the provided links and any clearly attributable public information you can gather from them.

Do **not** invent contact details, claims, capabilities, or business facts.
If information is uncertain, say so explicitly.

Focus on:
1. first-impression credibility
2. message clarity
3. inquiry/contact flow
4. whether the business appears established and able to pay
5. what kind of smaller Kestrel engagement would make sense first
6. how the rendered site actually feels to a human visitor

Prefer practical findings over abstract branding commentary.

## Required Output Sections

### 1. Prospect Snapshot
- Business name
- Category / type
- Apparent location
- Short summary of what the business seems to do

### 2. Analysis Mode / Confidence
State:
- whether the analysis was based on rendered-page inspection or raw page/source inspection
- what tools were used
- what confidence limitations apply

### 3. First Impression
- What feels strong
- What feels weak
- Does the business seem more credible than the website suggests?

### 4. Required Experience Dimensions
These are mandatory. Comment on each.

#### Visual composure
- Does the site feel calm, controlled, and intentional?
- Or crowded, noisy, chaotic, or uneven?

#### Readability / contrast
- Are key sections easy to read?
- Any weak contrast, text-over-image issues, or visual strain?

#### Motion quality
- Do videos, animations, transitions, or parallax effects feel smooth and polished?
- Or distracting, laggy, cheap, or awkward?

#### Section rhythm / narrative flow
- Does the page move naturally from one idea to the next?
- Or does it feel like one topic transition after another without enough hierarchy?

#### Premium / trust feel
- Does the site feel more or less premium than the business likely is?
- Does it make the business feel more trustworthy or less?

#### Calm vs. chaos
- Does the site reduce stress for the visitor or add to it?
- Especially important for legal, medical, and trust-heavy categories.

### 5. Website / Digital Findings
Comment on only what is actually visible.
Look for:
- outdated design / dated trust signals
- weak or unclear service framing
- confusing navigation / structure
- poor or missing CTA flow
- weak mobile friendliness if apparent
- broken/awkward contact or booking flow
- performance / technical roughness if visible
- signs that the site is underselling the business

### 6. Business Quality Signals
Assess:
- professionalism
- reputation indicators
- signs of operational maturity
- likely budget / seriousness

### 7. Kestrel Fit Assessment
Choose one:
- Pursue
- Maybe
- Skip

Then explain why in 3-6 bullets.

### 8. Best First Offer
Pick the most plausible first engagement:
- Website Credibility Refresh
- Contact & Intake Cleanup
- Lightweight Internal Tool
- Technical Cleanup / Stabilization
- Not enough evidence

Also explain why this is the best first wedge.

### 9. Suggested Path Forward
Give a practical recommendation for next step, for example:
- outreach now
- wait until more verification
- only pursue with a highly specific angle
- deprioritize

### 10. Ballpark Budget Range
Give an order-of-magnitude estimate in USD, with a short reason.
Keep it realistic for small-business first engagements.

### 11. Outreach Tailoring
Provide:
- 2 possible subject lines
- 1 short outreach angle summary
- 1 personalized outreach email draft

The email should:
- sound human
- be restrained
- point to one likely problem/opportunity
- avoid hype and generic agency language

### 12. Internal Summary for CRM
Return a short block suitable for dropping into a lead tracker:
- one-line summary
- likely offer
- pursue / maybe / skip
- next step

## Output Preferences
- Use bullets where possible
- Keep it compact but thoughtful
- Be concrete
- Do not overstate certainty
- Avoid sounding like a consultant parody

## Evidence Capture Preference
When browser tooling is available, include more than one generic page screenshot.
Capture and reference screenshots of:
- hero / first-impression area
- one or more sections that support trust/credibility
- specific UX/UI problems worth calling out
- any visible bugs, broken states, awkward overlays, poor hierarchy, or weak CTA flow
- at least one example of a suggested improvement opportunity
- at least one mobile-specific evidence screenshot when mobile analysis is relevant

Prefer a representative default browser viewport during analysis rather than a small or narrow window.
Use this baseline unless there is a specific reason to do otherwise:
- desktop viewport: `1920x1080`
- mobile viewport: iPhone-class mobile viewport (roughly `390x844`)

Desktop automation capture flow:
- start with headless capture
- if the site blocks desktop headless capture (for example with 403 / bot protection / blank-denied response), retry desktop capture in headed mode
- if headed succeeds, use that desktop evidence and note the fallback in the report
- if both fail, fall back to the most faithful browser-inspection path available and note the limitation explicitly

Capture the site as it exists live.
Do **not** inject style overrides, layout fixes, or cosmetic cleanup during normal capture.
If a technical bug prevents faithful capture and an override/workaround is necessary:
- keep the intervention as narrow as possible
- say explicitly that a workaround was used
- explain why it was necessary
- treat that capture as lower-confidence than a clean raw capture

If full-page capture has rendering edge cases (for example: carousels, overflow-heavy widgets, sticky UI, lazy-loaded assets, or background video):
- prefer the most faithful raw method available rather than the simplest method
- a raw pre-scroll/hydration pass is acceptable if needed to trigger lazy-loaded content before capture
- if `fullPage: true` is visibly wrong, use a more faithful raw capture path and note that choice in the report when relevant

In every final markdown report, include:
- one full-page desktop screenshot asset
- one full-page mobile screenshot asset
- targeted evidence screenshots for specific strengths, issues, bugs, and CTA/contact findings

In the final markdown report:
- embed shorter evidence screenshots directly in the report
- link very long full-page screenshots instead of embedding them inline by default
- prefer standard markdown image syntax for embedded screenshots when possible
- keep the source filename near each embedded screenshot or full-page link for easy lookup

If possible, name the screenshots clearly so they can be dropped into a report as supporting evidence rather than just archived as raw capture output.

## Copy/Paste Prompt Template

```text
Analyze this prospect for Kestrel Labs.

Inputs:
- Business name: <name>
- Website: <url>
- Google Maps: <url or none>
- LinkedIn: <url or none>
- Instagram: <url or none>
- Facebook: <url or none>
- Other links: <urls or none>
- My notes: <optional>

Requirements:
- Prefer rendered-page/browser analysis over DOM-only inspection.
- State the analysis mode and confidence level clearly.
- Treat these as required dimensions: visual composure, readability/contrast, motion quality, section rhythm/narrative flow, premium/trust feel, calm vs. chaos.
- Then produce the Kestrel lead-analysis format.

Return:
1. Prospect Snapshot
2. Analysis Mode / Confidence
3. First Impression
4. Required Experience Dimensions
5. Website / Digital Findings
6. Business Quality Signals
7. Kestrel Fit Assessment
8. Best First Offer
9. Suggested Path Forward
10. Ballpark Budget Range
11. Outreach Tailoring
12. Internal Summary for CRM
```
