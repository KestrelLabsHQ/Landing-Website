Build v1 of the Kestrel Labs LLC website as a real Next.js app.

Project goal:
Create a production-quality v1 marketing site for Kestrel Labs that feels like a serious, cutting-edge R&D/skunkworks engineering firm, but is still approachable enough for normal businesses buying websites, internal tools, and software services.

Important positioning:
This is a hybrid positioning site.
- The main homepage should be broad, commercially legible, and not intimidating.
- A separate “Advanced Systems” page should lean into the elite / R&D / reliability / telemetry / control-systems posture.

Design direction:
Base the implementation on the “Blacksite” concept:
- sharp, sparse, technical, high-contrast
- clean and credible, but not bland/corporate
- “cleaner than a startup, more alive than a consultancy”
- hard edges, minimal rounding
- strong typography
- monochrome / near-monochrome palette
- subtle geometric background motifs inspired by trajectory lines, signal paths, grids, and K-shaped angles
- restrained motion only; no flashy startup animations
- institutional + skunkworks energy
- no colorful gradient-heavy SaaS look
- no soft/glassy/dribbblified UI

Tech requirements:
- Next.js latest stable with App Router
- TypeScript
- Tailwind CSS
- Use reusable components and clean structure
- Optimize for clean code, fast load, and maintainability
- No CMS
- No database
- No auth
- No heavy UI framework
- Minimal dependencies
- Use next/font for typography
- Make the site responsive and polished on mobile, tablet, and desktop

Deliverable requirements:
1. Create the real site structure and implement the pages
2. Use sensible placeholder content where needed, but keep copy aligned to the brand
3. Keep code clean and production-ready
4. At the end, give me a concise summary of what was built, file structure, and how to run it

Pages to build:
- /
- /services
- /advanced-systems
- /about
- /contact

Global visual system:
- backgrounds: mostly white, black, and neutral tones
- borders: crisp 1px lines used consistently
- corners: minimal radius or square
- shadows: subtle, used sparingly
- spacing: disciplined and consistent
- typography: modern sans, Swiss/neo-grotesk feel, strong uppercase micro-labels
- motif language: signal lines, flight paths, technical grid, faint geometry
- avoid visual clutter
- avoid generic stock-marketing blocks

Brand tone:
- confident
- precise
- capable
- understated
- serious
- modern
- not arrogant
- not cold enough to alienate small business buyers

Homepage strategy:
The homepage must feel broadly accessible while preserving depth.
This page should sell:
- website design and rebuilds
- internal tools and workflow software
- software improvements
- backend / infrastructure support

It should also quietly imply deeper capability.

Homepage content direction:
Hero eyebrow:
Atlanta / Software Systems / Infrastructure

Hero headline:
Dependable digital systems for growing businesses.

Hero supporting copy:
From polished websites and internal tools to more demanding software and infrastructure, Kestrel Labs brings research-grade engineering discipline to practical business problems.

Hero CTAs:
- See Services
- Get in Touch

Homepage sections:
1. Header / nav
   - Kestrel Labs wordmark / simple K mark
   - Nav items: Services, Advanced Systems, About, Contact
   - Sticky header with subtle border and backdrop blur

2. Hero
   - left-aligned
   - strong headline and support text
   - CTA pair
   - subtle right-side technical motif / signal lines / geometry

3. Services overview
   3-card or 3-column section for:
   - Websites
   - Internal Tools
   - Software & Infrastructure
   Each card should feel practical and buyer-friendly

4. “How we work” / principles
   Messaging themes:
   - correctness over novelty
   - design for failure, not only success
   - simple systems survive
   - speed comes from clarity
   Make this feel like brand philosophy, not marketing fluff

5. Selected work / example engagements
   Since there may not be real public case studies yet, create tasteful “representative engagement” cards such as:
   - website redesign for a growing local business
   - internal workflow tool for an operations-heavy team
   - backend/infrastructure stabilization for a demanding software system
   Keep these honest and clearly framed as examples or representative work if needed

6. CTA / contact section
   Invite both practical business inquiries and more technical projects

Services page:
Make this page commercially legible and service-oriented.
Organize around:
- Website Design & Rebuilds
- Internal Tools
- Software Engineering
- Infrastructure & Systems Support

For each service:
- short description
- what it helps with
- who it’s for
- outcome-oriented language
Keep it practical and grounded.

Advanced Systems page:
This page is where the brand can fully lean into the skunkworks / advanced engineering posture.

Page goal:
Signal that Kestrel Labs can support more demanding technical work beyond normal agency/dev shop work.

Tone:
- sharper
- more technical
- more elite
- still restrained and readable

Hero eyebrow:
Advanced Systems / Research / Reliability

Hero headline:
Advanced systems work for teams that need more than a standard agency or dev shop.

Hero supporting copy:
Kestrel Labs supports demanding technical efforts across applied R&D, telemetry, control systems, reliability-focused backend engineering, and infrastructure for environments where performance and failure modes matter.

Advanced Systems sections:
- Applied R&D
- Telemetry
- Control
- Reliability
- Infrastructure Under Load
- Engagement fit / who this is for

Possible bullets/topics:
- prototype fast, then harden what matters
- visibility into systems, signals, and runtime behavior
- orchestration, state, automation, and safe execution
- design for failure modes, recovery, and uptime

About page:
Keep it concise and credible.
Position Kestrel Labs as:
- an engineering-led firm
- disciplined
- thoughtful
- practical
- comfortable with both polished business-facing delivery and deeper technical systems work

Contact page:
Simple, direct, clean.
Include:
- headline
- short invitation copy
- contact form UI (frontend only is fine if backend is not set up)
- email placeholder
- optional project-type selection
Make the form feel serious and usable, not playful

Implementation details:
- Use shared layout components
- Create reusable section wrappers, cards, button styles, and heading patterns
- Create a subtle reusable background motif component for line/trajectory/grid accents
- Use strong spacing and typographic hierarchy
- Ensure all sections align cleanly
- Ensure mobile layout is excellent
- Ensure dark sections and light sections both look intentional

Recommended structure:
- app/
  - layout.tsx
  - page.tsx
  - services/page.tsx
  - advanced-systems/page.tsx
  - about/page.tsx
  - contact/page.tsx
- components/
  - site-header.tsx
  - site-footer.tsx
  - hero.tsx
  - section-shell.tsx
  - service-card.tsx
  - principles.tsx
  - representative-work.tsx
  - background-signal.tsx
  - cta-band.tsx
- content/
  - site-copy.ts
  - navigation.ts
- lib/
  - utils.ts

Design rules to preserve:
- one strong idea per section
- sparse, high-signal copy
- no visual noise
- perfect alignment
- no cute illustrations
- no stock-photo feel
- no startup cliches
- no overdesigned agency tricks

Do not:
- ask me a bunch of clarifying questions
- overbuild backend features
- add unnecessary libraries
- introduce bright colors
- make it look like a generic SaaS template
- make it feel overly corporate/conservative
- make it too intimidating for small business buyers

Do:
- make reasonable decisions and implement them
- keep the homepage approachable
- keep the Advanced Systems page sharper and more elite
- produce a cohesive v1 that feels real and launchable

Acceptance criteria:
- The site runs locally
- The five routes exist
- The design clearly matches the Blacksite / hybrid direction
- The homepage is commercially approachable
- The Advanced Systems page clearly signals deeper capability
- The code is organized and maintainable
- The result feels like a serious small engineering firm, not a startup template

After implementing:
1. Summarize what you built
2. Show the file structure
3. List any placeholder content I should replace
4. Suggest the next 5 highest-value improvements for v2