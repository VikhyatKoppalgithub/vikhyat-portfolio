# Vikhyat Koppal — Portfolio

A single-page portfolio built with Next.js 16, TypeScript, Tailwind CSS v4, and
Framer Motion. Dark-first design with a light-mode toggle, statically exported
so it deploys anywhere.

---

## Table of contents

1. [Run it locally](#1-run-it-locally)
2. [Folder structure](#2-folder-structure)
3. [What each file does](#3-what-each-file-does)
4. [How components interact](#4-how-components-interact)
5. [Editing your content](#5-editing-your-content)
6. [Adding a new project](#6-adding-a-new-project)
7. [Deploying](#7-deploying)
8. [Placeholders you should fill in](#8-placeholders-you-should-fill-in)
9. [Design system reference](#9-design-system-reference)

---

## 1. Run it locally

You need Node.js. It was installed on this machine via Homebrew during setup —
if `node -v` doesn't work in a new terminal, make sure `/opt/homebrew/bin` is on
your PATH.

Install dependencies (only needed once):

```bash
npm install
```

Start the dev server — it hot-reloads as you edit:

```bash
npm run dev
```

Then open **http://localhost:3000**.

Produce the production build (writes a static site into `out/`):

```bash
npm run build
```

---

## 2. Folder structure

```
vikhyat-portfolio/
├── app/                          Next.js App Router — the page shell
│   ├── layout.tsx                <html> wrapper: fonts, SEO metadata, theme script
│   ├── page.tsx                  The page itself — assembles all sections in order
│   ├── globals.css               Design tokens + base styles (THE palette lives here)
│   ├── icon.svg                  Favicon (the "VK" monogram)
│   ├── sitemap.ts                Generates /sitemap.xml
│   └── robots.ts                 Generates /robots.txt
│
├── content/                      ★ ALL YOUR CONTENT LIVES HERE ★
│   ├── site.ts                   Name, links, hero copy, impact stats, about text
│   ├── projects.ts               Every project and its full case study
│   ├── experience.ts             Job history
│   ├── skills.ts                 Skill categories
│   ├── education.ts              Degrees + certifications
│   └── types.ts                  TypeScript shapes for all of the above
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            Fixed nav, scrollspy, mobile menu
│   │   ├── Footer.tsx            Footer with social links
│   │   └── ThemeToggle.tsx       Dark ⇄ light switch
│   │
│   ├── sections/                 One file per page section
│   │   ├── Hero.tsx
│   │   ├── ImpactStrip.tsx       The four headline numbers
│   │   ├── About.tsx
│   │   ├── Experience.tsx        Timeline
│   │   ├── Projects.tsx          Wraps the project cards
│   │   ├── Skills.tsx
│   │   ├── Education.tsx
│   │   └── Contact.tsx
│   │
│   ├── projects/
│   │   ├── ProjectCard.tsx       Collapsed summary ⇄ expanded case study
│   │   └── diagrams/
│   │       ├── primitives.tsx        Shared SVG parts (Node, Arrow, Group, Frame)
│   │       ├── DiagramSwitch.tsx     Maps a diagram key → its component
│   │       ├── AgentArchitecture.tsx
│   │       ├── EnsemblePipeline.tsx
│   │       ├── RcaWorkflow.tsx
│   │       └── SegmentationFlow.tsx
│   │
│   └── ui/                       Small reusable primitives
│       ├── Section.tsx           Consistent section spacing + anchor
│       ├── SectionHeading.tsx    "01 — ABOUT" heading block
│       ├── Reveal.tsx            Scroll-triggered fade-up
│       ├── StatTile.tsx          A metric tile
│       ├── Tag.tsx               Pill / chip
│       ├── Button.tsx            CTA link button
│       └── BrandIcons.tsx        GitHub + LinkedIn SVG marks
│
└── public/
    └── resume/                   ★ YOUR RESUME PDFs GO HERE ★
        ├── Vikhyat_Koppal_Data_Analyst.pdf
        └── Vikhyat_Koppal_Business_Analyst.pdf
```

---

## 3. What each file does

### The content layer (`content/`)

This is the only folder you need to touch for normal updates. Nothing here is
JSX — it's plain data. Changing a string here changes the site.

| File | Controls |
|---|---|
| `site.ts` | Your name, headline, value proposition, contact info, social links, resume file paths, SEO metadata, the four impact stats, and the About paragraphs |
| `projects.ts` | Every project card and its full case study content |
| `experience.ts` | The experience timeline |
| `skills.ts` | The seven skill category cards |
| `education.ts` | Degrees and certifications |
| `types.ts` | The TypeScript shape of everything above — if you miss a required field, the build tells you instead of silently rendering blank |

### The app shell (`app/`)

- **`layout.tsx`** — loads the Inter and JetBrains Mono fonts, sets all SEO and
  Open Graph tags, injects the JSON-LD `Person` schema (so Google can show a
  richer result for your name), and runs a tiny inline script that applies your
  saved theme *before* first paint so there's no flash of the wrong colours.
- **`page.tsx`** — imports every section and renders them in order. To reorder
  the page, move a line here.
- **`globals.css`** — the design system. All colours are CSS variables defined
  twice: once for dark (`:root`) and once for light (`.light`). Components never
  hardcode a colour.

---

## 4. How components interact

```
app/page.tsx
   │
   ├── Navbar ──────── reads NAV_LINKS, watches section ids via IntersectionObserver
   │                   └── ThemeToggle ── toggles `.light` on <html>
   │
   ├── Hero ────────── reads content/site.ts
   ├── ImpactStrip ─── reads impactStats  →  renders ui/StatTile
   ├── About ───────── reads about
   ├── Experience ──── reads content/experience.ts
   │
   ├── Projects ────── reads content/projects.ts
   │      └── ProjectCard (one per project)
   │             ├── ui/StatTile   (headline metrics + results)
   │             ├── ui/Tag        (stack chips)
   │             └── DiagramSwitch → the matching SVG diagram
   │
   ├── Skills ──────── reads content/skills.ts
   ├── Education ───── reads content/education.ts
   ├── Contact ─────── reads content/site.ts
   └── Footer
```

Two rules keep this simple:

1. **Sections never contain content.** They read from `content/` and render it.
2. **`Reveal` wraps anything that should fade in on scroll.** It automatically
   does nothing if the visitor has "reduce motion" enabled at the OS level.

### Anchors

Each section's `id` must match its entry in `NAV_LINKS` inside
`components/layout/Navbar.tsx`. If you rename a section id, update both places
or that nav link stops working.

---

## 5. Editing your content

**Change your headline or value proposition** → `content/site.ts`, the `hero` object.

**Change the four big numbers** → `content/site.ts`, the `impactStats` array.

**Add or change social links** → `content/site.ts`, the `links` object. GitHub is
currently an empty string; the moment you fill it in, GitHub buttons appear
automatically in the navbar, hero, contact section, and footer. Nothing else to
change.

**Swap in an updated resume** → drop the PDF into `public/resume/` and update the
`resumes` array in `content/site.ts`. You can list one, two, or more — the hero
dropdown is generated from that array.

**Add a job** → prepend an object to the array in `content/experience.ts`.
Set `track` to `"analytics"` or `"engineering"` to colour its timeline node.

**Add a certification** → drop the certificate PDF into `public/certificates/`
and append an entry to `certifications` in `content/education.ts`. Setting
`file` turns the whole card into a link that opens the document — that's what
makes the credential checkable rather than just claimed. `issued`, `expires`,
and `credentialId` are optional and render as a small footer on the card.

> **Note on what's public.** The certificate PDFs are served as static files, so
> anything printed on them — credential numbers, verification codes — is public
> once the site is deployed. That's the intent (it's how a recruiter verifies
> them), but it's worth knowing. If you'd rather not publish a particular one,
> delete its `file` field and the card renders as plain text instead.

---

## 6. Adding a new project

Open `content/projects.ts` and append an object to the array:

```ts
{
  slug: "my-new-project",              // also becomes the anchor: /#my-new-project
  title: "Project Name",
  tagline: "One sentence that makes someone want to click.",
  context: "Where it happened",
  period: "2026",
  featured: true,                      // true = renders in the main group, first
  category: "Analytics",               // the accent badge
  kind: "Academic",                    // "Academic" | "Professional"

  headlineMetrics: [                   // 2–3, shown on the collapsed card
    { value: "0.95", label: "some metric" },
  ],

  problem: "What was actually wrong.",
  dataset: "What data you had.",
  approach: [
    "Step one.",
    "Step two.",
  ],
  stack: ["Python", "SQL"],
  results: [
    { value: "42%", label: "improvement", note: "vs. baseline" },
  ],
  businessImpact: "Why this mattered commercially.",

  links: {
    github: "https://github.com/you/repo",   // omit to hide the button
    demo: "https://...",
  },
},
```

That's it — the grid, the expand behaviour, the metric tiles, and the anchor link
are all generated from this data.

### Adding a diagram to a project

1. Create `components/projects/diagrams/MyDiagram.tsx`. Copy an existing one and
   use the shared `Node`, `Arrow`, `Group`, and `DiagramFrame` parts from
   `primitives.tsx` — they handle theming, accessibility, and mobile scrolling.
2. Add your key to the `DiagramKey` union in `content/types.ts`.
3. Register it in the `DIAGRAMS` map in `diagrams/DiagramSwitch.tsx`.
4. Set `diagram: "yourKey"` on the project.

---

## 7. Deploying

The build produces a fully static site in `out/`, so every option below works.

### Vercel (easiest)

1. Push this folder to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import that repo.
3. Vercel detects Next.js automatically — accept the defaults and deploy.
4. Add your custom domain under **Settings → Domains**, then update `url` in
   `content/site.ts` so the SEO tags and sitemap point at the real address.

### Netlify

Build command `npm run build`, publish directory `out`.

### GitHub Pages

```bash
npm run build
```

Then publish the `out/` folder. If the site lives at
`username.github.io/repo-name` rather than a root domain, add `basePath` to
`next.config.ts`:

```ts
basePath: "/repo-name",
```

---

## 8. Placeholders you should fill in

Search the codebase for `TODO(vikhyat)` to find each of these in place.

| Priority | What | Where |
|---|---|---|
| ~~High~~ ✅ | ~~GitHub URL~~ — done: `https://github.com/VikhyatKoppalgithub` | `content/site.ts` → `links.github` |
| ~~High~~ ✅ | ~~Repo links~~ — done: all three AI projects link to their GitHub repos | `content/projects.ts` → each `links` object |
| Medium | **Live demo links** — the AI Data Analyst has a Streamlit app; a hosted demo would let a recruiter try it without cloning | `content/projects.ts` → `links.demo` |
| Medium | **Repo descriptions on GitHub** — all three repos have an empty description field, so they look bare next to a polished portfolio | github.com, not this codebase |
| **High** | **Your real domain** — currently a placeholder, and SEO tags depend on it | `content/site.ts` → `url` |
| **High** | **What "12.4M units" measures** — compute-hours? API calls? log events? A concrete unit makes the number land much harder | `content/site.ts` and `content/projects.ts` |
| Medium | **Availability line** — confirm the wording; your Purdue program runs through Aug 2026 | `content/site.ts` → `availability` |
| Medium | **Certification verification links** — PMI and Microsoft both issue them | `content/education.ts` → `url` |
| Medium | **Tableau dashboard screenshots** or a Tableau Public link for the segmentation project | would go in `public/` |
| Low | **Which cloud platform** the PartnerLinQ telemetry lived on, and any tools beyond SQL | `content/projects.ts` |
| Low | **Add Git/GitHub to your resume skills** — its absence is odd for someone who reviewed 50+ PRs | your resume, then `content/skills.ts` |
| Low | **A professional headshot**, if you want one in the hero | `public/` |

### A note on accuracy

Every claim on this site traces back to a line in one of your two resumes. Two
entries are *entailments* rather than direct quotes, and are flagged in
`content/skills.ts`:

- **"JavaScript"** — you migrated Backbone.js modules to React, which is JavaScript.
- **"Pull Request Review Workflow"** — you reviewed 50+ PRs.

Where the project `approach` sections explain *how* a named technique works (for
example, what the KKT conditions verify), they describe the technique — they do
not add accomplishments. Expand those bullets with your own specifics; that's
exactly the detail interviewers dig into.

---

## 9. Design system reference

All colours are CSS variables in `app/globals.css`, defined once for dark and
once for light. To retune the whole site, edit those two blocks — nothing else.

| Token | Dark | Light | Used for |
|---|---|---|---|
| `--bg` | `#07090c` | `#fafbfc` | Page background |
| `--bg-elev` | `#0b0f15` | `#ffffff` | Alternating section bands |
| `--surface` | `#10151c` | `#ffffff` | Cards |
| `--surface-2` | `#161d26` | `#f2f5f9` | Nested chips |
| `--line` | `#1d2731` | `#e2e8f0` | Hairlines |
| `--fg` | `#e8edf4` | `#0b1220` | Primary text |
| `--fg-muted` | `#97a4b5` | `#52627a` | Body text |
| `--fg-subtle` | `#6b7887` | `#7c8ba1` | Captions |
| `--accent` | `#22d3ee` | `#0e7490` | Primary accent (cyan) |
| `--accent-2` | `#818cf8` | `#4f46e5` | Gradient partner (indigo) |

The light accent is deliberately darker than the dark-mode accent so text
contrast stays readable on a pale background.

**Typography** — Inter for text, JetBrains Mono for all numbers and technical
labels. The `.metric` utility applies mono with tabular figures so rows of
numbers stay optically aligned.

**Motion** — one pattern only: a short fade-up as content enters the viewport,
plus a height transition on the project cards. Everything is disabled
automatically under `prefers-reduced-motion`.

**Accessibility built in** — skip-to-content link, visible focus rings, semantic
landmarks, `aria-expanded` on every disclosure, `aria-current` on the active nav
link, and `<title>`/`<desc>` on every diagram so they're described rather than
skipped by screen readers.
