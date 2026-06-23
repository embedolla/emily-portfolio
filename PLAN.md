# 📋 Portfolio Plan — Emily Bedolla

> Status: **Planning** — nothing is built yet. Build begins only when Emily gives the go-ahead.

## Who this is for

Early-career software/AI engineer with a clear trajectory and a mission.

- **Now:** Tech intern at Sepall (2nd summer)
- **Next:** Software/AI Engineer at Amazon (next summer)
- **Long-term goals:** AI / emerging-tech research · using AI to start a nonprofit · AI public policy to keep AI from harming people and the environment
- **Tone:** Professional, but unmistakably personal — show who Emily is, with warmth and cute visual touches.

### Narrative thesis (the through-line)
> *"I build with technology — and I care deeply about whether it helps people and the planet."*
This single idea ties together the engineering work AND the research / nonprofit / policy ambitions. Mission is **front and center**: hero tagline + dedicated section + blog theme.

---

## 1. Tech stack

| Layer | Choice |
|---|---|
| Framework | **Next.js (App Router)** |
| Language | **TypeScript** |
| Styling | **Tailwind CSS** |
| Components | **shadcn/ui** |
| Animation | **Framer Motion** |
| Blog | **MDX** |
| Contact form | **Resend** (or Formspree) |
| AI demo | Anthropic Claude API (latest model) |
| Hosting | **Vercel** (free tier, auto-deploy from GitHub) |
| Domain | Buy `emilybedolla.com`/`.dev` via Cloudflare or Namecheap (~$10–15/yr); launch on `.vercel.app` first |

---

## 2. Visual direction — 🌱 "Grove" (nature meets tech)

Warm, human, and quietly signals the AI + environment values. Botanical doodles (leaves, sprouts), rounded shapes, soft shadows, gentle grain.

### Proposed palette (to refine during build)

**Light mode**
- Cream background `#FAF6EE`
- Sand surface/cards `#F0E9DB`
- Forest green (primary) `#2E5E4E`
- Deep pine (headings) `#1B3A30`
- Coral (accent / CTAs) `#E27D60`  *(honey alt `#E0A458`)*
- Sage (secondary) `#8BAE9D`
- Ink text `#1E2A24`

**Dark mode**
- Deep green-black bg `#0F1A15`
- Surface `#16241D`
- Cream text `#FAF6EE`
- Mint/sage accents + coral CTAs

### Visual elements
- Hand-drawn doodles + a cute custom avatar/illustration of Emily
- Botanical motifs (leaves, sprouts) 🌱
- Subtle scroll animations (Framer Motion), micro-interactions on hover
- Soft animated gradient "blobs," gentle grain/noise texture
- Animated hero text (typewriter cycling roles: engineer / researcher / advocate)
- Custom 404 page + animated favicon/loading touch
- A small easter egg / delight

---

## 3. Site structure — full section list

**Core**
1. **Navbar** — name/monogram (EB), links, dark-mode toggle, résumé button, ⌘K palette
2. **Hero** — name, animated role text, mission tagline, CTAs (View Work / Contact), GitHub & LinkedIn
3. **About** — story + "why," with photo and/or avatar
4. **Mission** ⭐ — responsible AI, AI + environment, social impact (front and center)
5. **Skills** — languages, frameworks, tools (grouped, sticker-style icons)
6. **Projects** ⭐ — filterable case studies (see §4)
7. **Experience** — Sepall → Amazon timeline + Download Résumé (PDF)
8. **Blog / Writing** — MDX posts (`/blog` + post pages), AI-ethics/policy theme
9. **Contact** — working form + copy-email button + socials
10. **Footer** — quick links, socials, copyright

**Personal / human touches**
- **Beyond code** — hobbies & interests
- **Now page** — what Emily is currently learning / building / reading
- **Reading list / influences** — books & ideas shaping her views on AI & society

---

## 4. Projects section (priority)

Aim for **3–4 polished case studies**. Each: title, one-line summary, problem, role + tech, screenshot/GIF, outcome/learning, Live Demo + GitHub links. **Filterable** by theme (AI / web / social-impact).

**Fill the gap:**
- ~2 from existing GitHub / Sepall / school work, written up properly
- ~1–2 new portfolio-grade builds (full-stack app, API integration, or an AI + social/environmental tool)
- The portfolio site itself counts as one deployed project

---

## 5. Standout / "wow" features (all selected)

- 🤖 **Interactive AI demo** — "ask my portfolio a question" chatbot (Claude API). Big differentiator for AI roles. *(Needs an API key + a small usage budget; we'll add rate-limiting.)*
- 📊 **Mission data viz** — visualization about AI's impact (e.g. energy/environmental footprint). Shows skill + values.
- ⌘**K command palette** — quick navigation, dev-flavored.
- **Live GitHub stats** — real repos/activity via the GitHub API.

---

## 6. Technical polish (signals quality to engineers)

Responsive/mobile-first · accessibility (keyboard, ARIA, contrast, reduced-motion) · SEO + Open Graph · Lighthouse 95+ · privacy-friendly analytics · sitemap/robots · clean documented code · auto-deploy + PR previews.

---

## 7. Build roadmap

0. **Scaffold:** Next.js + TS + Tailwind + shadcn; deploy empty site to Vercel (live from day one).
1. **Theme & layout:** Grove palette, navbar/footer, dark mode, responsive shell, ⌘K palette.
2. **Core sections:** Hero (animated), About, Mission, Skills, Experience.
3. **Projects:** Data structure + filterable case-study cards.
4. **Personal:** Beyond-code, Now page, Reading list.
5. **Blog:** MDX pipeline + first post.
6. **Standout features:** Live GitHub stats, mission data viz, AI demo, contact form, résumé download.
7. **Polish & delight:** Animations, doodles, 404, easter egg, SEO, a11y, performance.
8. **Launch:** Custom domain, final review.

---

## 8. To gather before / during build

- [ ] Résumé (PDF) — source for Experience
- [ ] Name styling + final tagline (can draft together)
- [ ] GitHub username & LinkedIn URL
- [ ] Photo and/or notes for the avatar illustration
- [ ] Which projects to feature (share GitHub to pick together)
- [ ] Bio notes for About + Mission
- [ ] Hobbies/interests for "Beyond code"
- [ ] A few books for the Reading list
- [ ] For the AI demo: an Anthropic API key + comfort with a small monthly budget
- [ ] Contact email for the form

---

## Next actions

- Confirm/adjust the Grove palette.
- Decide which projects to feature (or share GitHub).
- Give the go-ahead to scaffold Phase 0.
