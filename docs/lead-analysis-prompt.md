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
Analyze the prospect using only the provided links and any clearly attributable public information you can gather from them.

Do **not** invent contact details, claims, capabilities, or business facts.
If information is uncertain, say so explicitly.

Focus on:
1. first-impression credibility
2. message clarity
3. inquiry/contact flow
4. whether the business appears established and able to pay
5. what kind of smaller Kestrel engagement would make sense first

Prefer practical findings over abstract branding commentary.

## Required Output Sections

### 1. Prospect Snapshot
- Business name
- Category / type
- Apparent location
- Short summary of what the business seems to do

### 2. First Impression
- What feels strong
- What feels weak
- Does the business seem more credible than the website suggests?

### 3. Website / Digital Findings
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

### 4. Business Quality Signals
Assess:
- professionalism
- reputation indicators
- signs of operational maturity
- likely budget / seriousness

### 5. Kestrel Fit Assessment
Choose one:
- Pursue
- Maybe
- Skip

Then explain why in 3-6 bullets.

### 6. Best First Offer
Pick the most plausible first engagement:
- Website Credibility Refresh
- Contact & Intake Cleanup
- Lightweight Internal Tool
- Technical Cleanup / Stabilization
- Not enough evidence

Also explain why this is the best first wedge.

### 7. Suggested Path Forward
Give a practical recommendation for next step, for example:
- outreach now
- wait until more verification
- only pursue with a highly specific angle
- deprioritize

### 8. Ballpark Budget Range
Give an order-of-magnitude estimate in USD, with a short reason.
Keep it realistic for small-business first engagements.

### 9. Outreach Tailoring
Provide:
- 2 possible subject lines
- 1 short outreach angle summary
- 1 personalized outreach email draft

The email should:
- sound human
- be restrained
- point to one likely problem/opportunity
- avoid hype and generic agency language

### 10. Internal Summary for CRM
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

Use the Kestrel lead-analysis format and produce:
1. Prospect Snapshot
2. First Impression
3. Website / Digital Findings
4. Business Quality Signals
5. Kestrel Fit Assessment
6. Best First Offer
7. Suggested Path Forward
8. Ballpark Budget Range
9. Outreach Tailoring
10. Internal Summary for CRM
```
