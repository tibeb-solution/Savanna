# Savanna static pages

Three Savanna learner pages and an accessible profile module, frozen from the **local dev app** into plain HTML + CSS so they can be
opened offline and used as a reference for front-end and accessibility work.

Open `index.html` (or any file in `pages/`) directly with `file://` — double-clicking works, no
server needed.

## What is here

## Accessible sign-up component

Partners can drop the registration widget into any page. It uses light DOM so host
styles can override `--primary-color` and other variables:

```html
<link rel="stylesheet" href="/signup-widget.css" />
<script src="/alx-signup.js" defer></script>
<alx-signup lang="en"></alx-signup>
```

Set `lang="am"` for Amharic labels. The widget saves unfinished input to
`localStorage`, announces validation errors, supports password managers, and
submits to `POST /api/v1/auth/register`. See [swagger.json](swagger.json) for
the OpenAPI contract and [prisma/schema.prisma](prisma/schema.prisma) for the
relational model.

## ALX accessibility module structure

The requested drop-in module is integrated into this repository without removing
the original Savanna captures:

```text
prisma/schema.prisma          User, Profile, and JobMatch relations
server/server.js              Express entry point and static serving
server/routes/                 Auth, profile, and career routes
server/controllers/            Validation and Prisma controllers
server/docs/swagger.json       OpenAPI documentation
public/index.html              Partner-site demo
public/sw.js                   Offline app shell
public/manifest.json           Installable PWA metadata
public/css/widget-theme.css    Host-overridable accessible theme
public/js/                     Signup, profile, and offline adapters
assets/ and pages/              Existing Savanna learner/profile data
```

Copy `.env.example` to `.env`, set `DATABASE_URL` and `JWT_SECRET`, then run:

```powershell
npm run prisma:generate
npm start
```

The demo is served at `http://localhost:4173/`; existing captures remain
available under `/pages/` and `/assets/`.

| Page | Learner / course | What it shows |
|------|------------------|----------------|
| `pages/homepage-v1-paced.html` | Björn Sibanda — **WR 100: Fundamentals of Effective Communication**, cohort F26-SEM-16W (31 Aug – 20 Dec 2026), week 10 of 15 | Courses dropdown (3 courses), week strip with **every week preloaded**, "continue where you left off", immediate deliverables, period progress, overall score (59.56%, "slightly behind"), upcoming events |
| `pages/homepage-v1-self-paced.html` | Amara Nwosu — **VA-1: VA Foundations & Professional Identity** | Course-progression gauge (16% against the 70% graduation threshold), 1 of 3 modules complete, **working module switcher**, **preloaded programme modal**, pacing boost (11 days left), upcoming events |
| `pages/concept-with-navigation.html` | Amara Nwosu — concept *"The Future of the VA Industry"* | Curriculum navigation panel (read / current / unread states) beside a full authored concept: callouts, numbered card grid, two-column comparison, icon lists, "Mark as complete". The "Need a Fast Track?" block and the Padlet reflection block are removed on request. |
| `pages/profile.html` | Accessible profile and career gateway | Offline-first identity status, voice review, private support matching, Amharic and low-literacy modes, read aloud, applications, employer accommodations, and consent-gated resume flow. |


## Layout

```
savanna_static_pages/
├── index.html                 landing page linking the three captures
├── pages/*.html               the frozen pages (relative links into ../assets)
├── assets/
   ├── css/                   the application's own stylesheets, unminified — application_alx.css 
   │                          (sprockets, themed), app.css (esbuild), Google Fonts, Typekit —
   │                          plus static-page.css, the only one written for these pages
   ├── fonts/                 76 font files, all referenced by the stylesheets above
   ├── img/                   51 images: logos, icons, concept artwork, substituted embeds
   └── js/                    popper.js + bootstrap.bundle.js (the exact files the live app
                              serves through sprockets) + static-page.js
```

Everything is shared: the three pages point at the same `assets/` tree, nothing is duplicated and
nothing is minified or gzipped. Captures are additive, so each run ends by dropping assets no
published page references any more — otherwise the Rive stills from retired week panels would
pile up run after run.

## What still works

These are live in the frozen pages, driven by `assets/js/static-page.js` against content that was
pre-rendered during the capture and parked in `<template>` elements (so nothing is duplicated in
the accessibility tree and no id appears twice):

| Control | Page | Behaviour |
|---|---|---|
| **Hamburger** | all | Collapses the sidebar to its 70px icon rail and back, remembered in `localStorage` under `sidebar-collapsed`. It moves the same three things the app does: `body.sidebar-collapsed`, `expanded` on `#sidebar`, and the labels (React wrote `display` inline on each, so `assets/css/static-page.css` overrides them from the body class). |
| **Week strip** | paced homepage | Every week of the course was rendered server-side at capture time; clicking one swaps the panel below it and moves the `active` state. The chevrons and the scroll-into-view of the selected week are reimplemented from the component's own sidecar JS. |
| **Score details modal** | paced homepage | Server-rendered per week, so it opens on its own — including the one that arrives with a week you switch to. |
| **My activities** | self-paced homepage | Each module's activity list was rendered at capture time; clicking a module swaps the panel beside it, as `HomepageSelfPacedActivities.tsx` does. |
| **Programme modal** | self-paced homepage | "Program details" normally fetches `/dashboards/program_structure.json` on first open — the capture opens it once so the fetched tree is baked in. Its course and module accordions expand and collapse: React renders only the body of an *open* section, so the capture opens each one to materialise its content, pairs every toggle with the element it controls (`data-static-collapse-toggle` / `data-static-collapse-body`) and closes again the ones the app had closed. |
| **Courses dropdown** | all | Server-rendered markup, so Bootstrap's dropdown opens it with no help: three courses across a programme group and "Other courses". |
| **Curriculum bar** | all | The bar fixed under the header pads the content by its own height and slides away on scroll down, as `CurrentCurriculumScrollBehavior.tsx` does. |
| Dropdowns, modals, accordions, collapse, tooltips | all | Bootstrap's own bundle. |

Everything else is inert.

## Profile module

Open `pages/profile.html` directly or use the link on `index.html`. Profile data, support choices,
applications, and employer drafts are stored in the browser's local storage. Voice input and read
aloud use browser capabilities when available; the page remains usable with keyboard and typing when
they are not. The SMS control is intentionally consent-gated and clearly reports that no message is
sent by this offline capture.

### Gemini Amharic read-aloud

Gemini TTS requires network access and sends the selected page text to Google. To enable it, use
Node.js 18+ and set the key only in your local environment; never put the key in HTML or JavaScript:

```powershell
$env:GEMINI_API_KEY = "your-key"
node server.cjs
```

Open `http://localhost:4173/` after starting the server. The Read Aloud button sends the current
text to the local proxy, which keeps the key server-side and returns Gemini audio for playback.


