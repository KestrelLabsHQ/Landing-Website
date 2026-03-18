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

### Step 2 — Analysis
Use the prompt in `lead-analysis-prompt.md`.
The agent should produce the report in `lead-report-template.md` format.

### Step 3 — Human Decision Gate
Review the generated report and decide:
- Pursue
- Maybe
- Skip

Do **not** fully automate sending.
Use the agent to speed up judgment, not replace it.

### Step 4 — Outreach Drafting
If the lead is worth pursuing:
- use the tailored outreach draft
- edit lightly
- send manually

### Step 5 — CRM Capture
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

## Best Practices
- Analyze 3-5 leads at a time, not 50
- Focus on visible evidence
- Prefer one concrete problem over a broad critique
- Pitch a small first engagement
- Avoid generic growth-language or agency voice

## Best First Offers
For Kestrel, default to one of these:
1. Website Credibility Refresh
2. Contact & Intake Cleanup
3. Lightweight Internal Tool
4. Technical Cleanup / Stabilization

## Suggested Automation Level
### Good automation
- Prospect analysis
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
- Review 3-5 new leads per day or every other day
- Send only the strongest 1-3 messages
- Track replies and refine angles over time

## Why this works for Kestrel
This keeps outbound:
- selective
- founder-led
- thoughtful
- practical

without wasting time manually analyzing every lead from scratch.
