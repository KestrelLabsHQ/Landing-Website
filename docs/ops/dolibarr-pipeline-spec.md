# Dolibarr Pipeline Spec for Kestrel Labs

This document defines the minimum CRM structure Kestrel needs in Dolibarr to support:
- automated prospect intake
- selective outbound
- paid diagnostic offers
- follow-on implementation work
- proposal / invoice follow-through

The goal is not CRM theater.
The goal is to make the pipeline legible, searchable, and easy to act on.

## Core operating model

Use Dolibarr as the system of record for:
- organizations / practices
- contacts
- prospect status
- next action
- offer type
- proposal / invoice state

## Recommended Dolibarr objects

Depending on enabled modules, map the workflow roughly like this:

- **Third Party** = organization / clinic / practice
- **Contact / Address** = individual contact(s)
- **Opportunity / Prospect** = active sales motion
- **Proposal** = paid review or implementation quote
- **Invoice** = paid review or project invoice
- **Project** = optional, for won implementation work

If the Opportunity module is not enabled or feels awkward, Kestrel can still operate with Third Parties + custom tags / extra fields + Proposals.

## Pipeline stages

Use these as the main sales stages:

1. **New**
   - sourced but not reviewed yet
2. **Analyzed**
   - site captured / scored / brief generated
3. **Contacted**
   - first-touch outreach sent
4. **Replied**
   - recipient responded in any way
5. **Sent Notes**
   - concise observations sent
6. **Paid Review**
   - Credibility + Intake Review sold
7. **Proposal Sent**
   - implementation proposal sent
8. **Won**
   - implementation project closed
9. **Lost**
   - explicitly dead or inactive beyond threshold
10. **Nurture / Later**
   - not dead, but not active now

## Required fields

### Organization / practice level

- Business name
- Category / vertical
  - PT
  - Chiro
  - Massage / Recovery
  - Sports Performance
  - Other
- Website
- Google Maps / directory URL
- City
- State
- Region / market
- Phone
- Number of locations
- Review count
- Rating
- Ownership type (single / multi-location / unclear)
- Source adapter
  - maps
  - directory
  - csv
  - referral
  - manual

### Contact level

- Contact name
- Role / title
- Email
- Phone
- Preferred contact status
- Confidence in contact quality (high / medium / low)

### Opportunity / prospect level

- Pipeline stage
- Last touch date
- Next action date
- Offer type
  - free observations
  - credibility + intake review
  - credibility + intake refresh sprint
  - scheduling / intake cleanup
  - internal workflow / tooling
- Estimated budget bucket
  - unknown
  - <$5k
  - $5k-$10k
  - $10k-$25k
  - $25k+
- Business quality score (1-5)
- Website gap score (1-5)
- Access score (1-5)
- Budget signal score (1-5)
- Total score
- Short internal summary
- Link to capture folder / review asset
- Link to generated outreach draft
- Status owner

## Suggested scoring logic

Use 1-5 scoring on these dimensions:

### Business quality
Signals that the clinic is real, established, and likely able to buy.

### Website gap
How clearly the website undersells the business or creates friction.

### Access
How easy it seems to reach a real decision-maker.

### Budget signal
Cash-pay signals, multiple providers, multiple locations, premium presentation, strong reviews, etc.

**Suggested pursue threshold:** 15+

## Default next actions by stage

- **New** → analyze or skip
- **Analyzed** → send first-touch or skip
- **Contacted** → follow up in 4 business days
- **Replied** → respond same day when possible
- **Sent Notes** → ask whether a paid review would be useful
- **Paid Review** → deliver in 2 business days
- **Proposal Sent** → follow up within 3-5 business days
- **Won** → convert to project / invoice workflow
- **Nurture / Later** → set recheck date

## Reporting that actually matters

Track these weekly:
- new prospects added
- prospects analyzed
- first touches sent
- reply count
- notes sent
- paid reviews sold
- proposals sent
- wins

Track these monthly:
- review close rate
- review-to-project conversion rate
- average first project size
- verticals with best reply rates
- lead source quality by adapter

## Recommended tags

Examples:
- atlanta
- metro-atlanta
- local-first
- pt
- chiro
- massage
- sports-performance
- premium
- multi-location
- review-opportunity
- intake-friction
- mobile-friction
- tool-opportunity

## Automations to support

Dolibarr should be fed by automation that can:
- create/update Third Party records
- create/update Contacts
- create/update active Opportunity data or equivalent fields
- attach notes with generated summaries
- store links to captures and reports
- update stage after outbound send / reply / payment

## Minimal version

If Dolibarr customizations are limited, the absolute minimum viable setup is:
- one organization record per practice
- one primary contact
- one stage field
- one next action field
- one summary field
- one score field
- one offer-type field

That is enough to start.

## Principle

Keep the CRM simple enough that it gets used.
If a field does not clearly support action, prioritization, or conversion, it probably does not belong.
