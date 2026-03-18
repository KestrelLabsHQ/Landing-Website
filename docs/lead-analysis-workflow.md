# Kestrel Labs Lead Analysis Workflow

This workflow is designed to make prospect research and outreach more consistent, faster, and more useful.

## Objective
Given a small number of inputs — ideally just:
- website URL
- social URLs
- maps/review URLs

produce a high-quality lead brief that helps answer:
- should I pursue this lead?
- what should I pitch first?
- what would the work likely be worth?
- what should the first outreach email say?

## Key Principle
**Rendered experience matters.**
For Kestrel-style analysis, the agent should evaluate the site as a human would experience it whenever possible.

Preferred analysis methods:
- ACP harness with browser capability
- Playwright
- browser MCP/server
- screenshots or rendered-page capture

Fallback method:
- raw-source / DOM inspection only when rendered analysis is unavailable
- if fallback is used, confidence must be marked lower

## Recommended Workflow

### Step 1 — Intake
Create a small input packet for each business:
- Business name
- Website URL
- Google Maps URL (if available)
- LinkedIn URL
- Instagram URL
- Facebook URL
- Other relevant URLs
- Optional notes

Keep it lightweight.
The goal is to make it easy to analyze a lead with minimal friction.

### Step 2 — Rendered Analysis First
When browser-capable tooling exists, the agent should inspect:
- homepage experience
- section transitions
- readability
- motion/animation behavior
- CTA flow
- overall composure

This should not rely solely on HTML structure.

### Step 3 — Structured Report
Use the prompt in `lead-analysis-prompt.md`.
The agent should produce the report in `lead-report-template.md` format.

### Step 4 — Human Decision Gate
Review the generated report and decide:
- Pursue
- Maybe
- Skip

Do **not** fully automate sending.
Use the agent to speed up judgment, not replace it.

### Step 5 — Outreach Drafting
If the lead is worth pursuing:
- use the tailored outreach draft
- edit lightly
- send manually

### Step 6 — CRM Capture
Drop the internal summary into your lead tracker.
Suggested fields:
- Business name
- Category
- Priority
- Contact name
- Website
- Offer to pitch first
- Ballpark budget
- Status
- Last contact date
- Next action

## Required Experience Dimensions
These should be mandatory in every serious lead review:
1. Visual composure
2. Readability / contrast
3. Motion quality
4. Section rhythm / narrative flow
5. Premium / trust feel
6. Calm vs. chaos

These are especially important for trust-heavy categories like:
- legal
- accounting
- medical / wellness
- clinics
- contractor/home services

## Best First Offers
For Kestrel, default to one of these:
1. Website Credibility Refresh
2. Contact & Intake Cleanup
3. Lightweight Internal Tool
4. Technical Cleanup / Stabilization

## Suggested Automation Level
### Good automation
- Rendered-page analysis
- Signal extraction
- Lead brief generation
- Pricing range suggestion
- First-pass outreach draft
- CRM summary generation

### Keep human-controlled
- Final pursue/skip decision
- Final wording of first-touch message
- Sending the outreach
- Relationship follow-up tone

## Suggested Operating Rhythm
- Review 3-5 new leads at a time
- Send only the strongest 1-3 messages
- Track replies and refine angles over time

## Why this works for Kestrel
This keeps outbound:
- selective
- founder-led
- thoughtful
- practical

without wasting time manually analyzing every lead from scratch.
