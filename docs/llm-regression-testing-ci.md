# LLM Regression Testing in CI (Without the Ceremony)

If you’re building LLM features, you’re shipping *behavior*, not just code. The problem: most teams change prompts, swap models, tweak temperature, or adjust context formatting… and then **hope** nothing important broke.

This post shows a minimal, practical approach: **deterministic evals** you can run locally and in CI, with a small reference implementation.

- Target audience: CTOs and senior engineers
- Use case: **sales lead intake extraction**
- Model used in examples: `gpt-4.1-mini`

## The core idea
Treat your LLM prompts/config like code:

- Define a **small eval suite** of realistic cases (including edge cases)
- Run the suite on every meaningful change (prompt, model, parsing, output contract)
- **Fail CI** when regressions happen
- Store artifacts so you can see *what changed*

This isn’t meant to be research-grade benchmarking. It’s meant to stop preventable regressions from hitting production.

## Why deterministic evals first
There’s a time and place for model-graded scoring, human review, and statistical analysis. But the fastest credibility move (and the most useful for real teams) is:

1) Start with a **contract** (output schema)
2) Validate it deterministically
3) Add edge cases until the suite resembles production inputs

For many workflows—especially extraction and routing—deterministic checks get you 80% of the value with 20% of the effort.

## Example: sales lead intake extraction
Imagine a pipeline that takes inbound email/webform text and extracts:

- `requester_name`
- `requester_email`
- `urgency` (low/medium/high)
- `summary`

Downstream systems assume the JSON is parseable and complete. When the model starts returning markdown, missing fields, or creative synonyms for enums, you get silent failure.

So we make that contract explicit.

## A minimal eval suite format (YAML)
Here’s a single test case:

```yaml
name: "Structured extraction demo"

cases:
  - id: "basic_checkout_down"
    prompt:
      system: |
        You are a careful information extraction system.
        Return ONLY valid JSON. No markdown. No extra text.
      user: |
        Extract the fields from the email.

        Email:
        ---
        Hi, this is Jordan Lee (jordan@example.com). Our checkout is down and customers can't pay.
        Can someone take a look ASAP?
        ---
    checks:
      - type: json_schema
        json_schema:
          type: object
          required: [requester_name, requester_email, urgency, summary]
          properties:
            requester_name: { type: string }
            requester_email: { type: string }
            urgency: { type: string }
            summary: { type: string }
      - type: regex
        pattern: '"urgency"\\s*:\\s*"(low|medium|high)"'
```

A good v1 suite is 15–30 cases, not 1–3. Your edge cases are where regressions hide:
- multiple emails in thread
- CCs / other addresses in body
- signature blocks
- weird whitespace
- all-caps senders

## The harness: provider → runner → checks → report
The architecture is intentionally boring:

1) Load suite YAML
2) For each case: call the model
3) Run deterministic checks
4) Emit a JSON report
5) Exit non-zero if anything failed

Reference implementation: `KestrelLabs/kestrel-evals/`

Phase 1 uses the OpenAI SDK. Phase 2 keeps a provider interface so you can add Anthropic, Azure OpenAI, or any OpenAI-compatible gateway without rewriting the eval logic.

## Run locally
```bash
cd KestrelLabs/kestrel-evals
python3 -m venv .venv
source .venv/bin/activate
pip install -e ".[openai]"

export OPENAI_API_KEY=...

kestrel-evals run examples/structured_extraction.yaml \
  --model gpt-4.1-mini \
  --out reports/report.json
```

## Gate regressions in CI (GitHub Actions)
A minimal workflow:

- install dependencies
- run the suite
- upload the report artifact

In CI, the important behavior is: **failed checks fail the job**.

## Common regressions this catches immediately
1) **Non-JSON output** (markdown, prose, code fences)
2) **Missing required fields**
3) **Enum drift** ("urgent" instead of "high")
4) **Output verbosity creep** that breaks parsers

## Where to go next (v2+)
Once deterministic evals are working, expand with intent:

- Add provider adapters (keep the suite and checks unchanged)
- Track cost/latency drift
- Add golden-set correctness checks (exact matches for certain cases)
- Add rubric scoring (LLM-as-judge) *only after* you’ve made deterministic contracts reliable

## Closing thought
Evals don’t need to be fancy to be effective. A small, realistic suite + deterministic checks + CI gating is enough to turn LLM behavior from "magic" into engineering.

---

If you want help implementing eval suites that match your production traffic (and don’t turn into bureaucracy), that’s what we do at Kestrel Labs.
