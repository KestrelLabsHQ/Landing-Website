# Prospect Sourcing -> Analysis -> Dolibarr Plan

This is the operating plan for automating Kestrel's prospect pipeline so lead generation does not depend on manual Google Maps work.

The target outcome is not "more leads" in the abstract.
The target outcome is a repeatable weekly shortlist of clinics worth contacting.

## Goal

Build a prospect engine that can:
1. source candidate businesses in target verticals and geographies
2. filter for likely-fit practices
3. capture and inspect the website automatically
4. score the lead
5. push strong candidates into Dolibarr with useful context
6. prepare tailored outreach drafts for human review

## Design principles

- local-first, but not local-only
- selective, not volume-driven
- public-web analysis before contact enrichment
- automate the boring parts, keep judgment human
- avoid tight coupling to a single lead source

## Existing foundation

The repo already includes:
- rendered site capture via `npm run capture:site -- <url> [slug]`
- prospect capture folders under `prospect-captures/`
- lead analysis templates / workflow docs

That means the missing layers are:
- source adapters
- filtering / scoring
- CRM sync
- operator review loop

## Proposed architecture

### Stage 1: Source adapters

Create multiple input adapters so prospecting is not trapped in one source.

Recommended adapters:
- **maps adapter**
  - browser-assisted retrieval of local business search results
- **directory adapter**
  - niche directories, review directories, local business lists
- **csv adapter**
  - import a purchased/exported/hand-built list when useful
- **manual seed adapter**
  - one-off URLs / referrals dropped into the pipeline

Why multiple adapters matter:
- less fragility
- broader lead coverage
- easier testing
- less dependence on one scraping path

## Suggested MVP workflow

### Step 1: Query generation
Inputs:
- verticals
  - PT
  - Chiro
  - Massage / Recovery
  - Sports Performance
- geographies
  - Atlanta
  - suburbs / metro
  - optional broader regions for higher-potential targets

Examples:
- physical therapy atlanta
- sports chiropractor roswell
- medical massage marietta
- sports rehab alpharetta

### Step 2: Candidate extraction
For each query, collect when available:
- business name
- website
- maps / source URL
- category
- city / state
- phone
- rating
- review count

### Step 3: Deduplication and hard filters
Drop candidates that:
- have no website
- are hospital systems / giant networks (for the early motion)
- clearly do not fit the target category
- are duplicates of existing Dolibarr records

### Step 4: Website preflight
For remaining candidates:
- normalize URL
- verify site loads
- record redirects / broken states
- mark sites that are down or unusable

### Step 5: Automated capture
Use existing repo tooling:
- `npm run capture:site -- <url> [slug]`

Output:
- desktop full-page screenshot
- desktop viewport screenshot
- mobile full-page screenshot
- metadata file

### Step 6: Lightweight scoring
Generate first-pass scores for:
- business quality
- website gap
- access
- budget signal

This does not have to be perfect.
It only needs to help rank the queue.

### Step 7: Human review lane
For the top-scoring candidates only:
- generate a concise lead brief
- generate a draft first-touch email
- let a human decide pursue / maybe / skip

### Step 8: Dolibarr sync
For candidates worth keeping:
- create/update Third Party
- create/update primary Contact when available
- write stage = New or Analyzed
- write summary, score, source, and next action
- attach or link to capture assets / report paths

## Recommended file / script layout

Possible additions:
- `prospect-tools/source-maps.js`
- `prospect-tools/source-directory.js`
- `prospect-tools/filter-candidates.js`
- `prospect-tools/score-candidate.js`
- `prospect-tools/sync-dolibarr.js`
- `prospect-tools/run-prospect-pipeline.js`

## Operational modes

### Mode A: Local weekly batch
- target Atlanta + metro
- run once or twice per week
- prioritize owner-led clinics and easy decision paths

### Mode B: Higher-potential exploration
- target multi-location or premium regional groups
- lower volume
- more selective manual review

## Output schema (minimum)

Each candidate should end with a normalized record like:

- slug
- business_name
- category
- website
- source_url
- city
- state
- phone
- rating
- review_count
- locations_count
- business_quality_score
- website_gap_score
- access_score
- budget_signal_score
- total_score
- capture_path
- analysis_path
- outreach_draft_path
- pursue_status
- dolibarr_id

## CRM sync notes for Dolibarr

Use whichever path is less brittle in the current environment:
- Dolibarr REST API
- CSV import bridge

Preferred long-term path:
- REST API for create/update
- idempotent lookups by website and/or organization name

## Review loop

This should stay human-controlled:
- final pursue / skip decision
- final wording of outreach
- actual sending
- pricing / proposal decisions

Automate:
- sourcing
- dedupe
- capture
- first-pass scoring
- CRM creation/update
- draft generation

## Weekly operating target

A healthy output for the first phase is something like:
- 30 sourced candidates
- 10 captured / scored
- 6 worth considering
- 3-6 actually contacted

That is enough to learn without turning Kestrel into a volume machine.

## Why this is the right build

This plan supports both near-term selling and the longer-term agentic systems direction.

It is useful now because it reduces prospecting drag.
It is useful later because it becomes a real internal agent pipeline:
- query
- retrieve
- inspect
- score
- summarize
- route
- act

That is a believable R&D-adjacent system because it helps produce real business outcomes instead of just demo energy.
