# Multi-page Profile & Reflections — HNG Internship

## Overview

The original Stage 0 profile card has now grown into a lightweight, multi-page experience. You still get the polished profile landing page, but it is joined by an “About” reflections page and an accessible “Contact” form with custom validation, all in semantic HTML, modern CSS, and vanilla JavaScript. The codebase stays dependency-free and keeps a consistent `data-testid` surface for automated grading.

## Highlights

- **Reusable Layout Shell** – A shared skip link, sticky header, and theme toggle appear on every page, keeping navigation consistent and keyboard-friendly.
- **Accessible Profile Card** – The home page retains the original semantic structure, live clock, and data attributes that power automated checks.
- **About Page Reflections** – Structured `<section>` blocks document biography, goals, confidence gaps, and notes to future self with ARIA-linked headings.
- **Contact Form Validation** – Custom validation covers required fields, email format, and message length while surfacing inline errors and a success toast.
- **Performance-first** – No frameworks or external requests; CSS and JS are shared across pages with preloaded styles and deferred scripts.

## Pages

| File           | Purpose                                                                               |
|----------------|---------------------------------------------------------------------------------------|
| `index.html`   | Profile card with social links, hobbies, dislikes, and live time indicator.           |
| `about.html`   | Reflections, goals, and extra thoughts structured in accessible `<section>` blocks.  |
| `contact.html` | Accessible contact form with inline error messages and a polite live success banner. |

## Tech Stack

| Layer   | Choice | Rationale |
|---------|--------|-----------|
| Markup  | Semantic HTML5 | Meets accessibility requirements and keeps `data-testid` hooks intact. |
| Styling | Modern CSS (Grid, Flexbox, custom properties, `clamp()`) | Responsive layouts with minimal overrides. |
| Scripts | Vanilla JavaScript | Handles theme persistence, live clock, and contact form validation. |

## Data Test IDs Reference

### Profile (index.html)

`test-profile-card`, `test-user-name`, `test-user-bio`, `test-user-avatar`, `test-user-time`, `test-user-social-links`, `test-user-social-<network>`, `test-user-hobbies`, `test-user-dislikes`

### About (about.html)

`test-about-page`, `test-about-bio`, `test-about-goals`, `test-about-confidence`, `test-about-future-note`, `test-about-extra`

### Contact (contact.html)

`test-contact-form`, `test-contact-name`, `test-contact-email`, `test-contact-subject`, `test-contact-message`, `test-contact-submit`, `test-contact-success`, plus `test-contact-error-<field>` for each inline error container

## Getting Started

1. Clone or download this repository.
2. Open any of the HTML files directly in your browser — no build step required.
3. Optional: serve via a static server for live-reload (`python -m http.server`, `npx serve`, etc.).

### File Structure

```
web/
├── index.html
├── about.html
├── contact.html
├── style.css
├── script.js
├── tests/
│   ├── profile-card.test.js
│   ├── about.test.js
│   └── contact.test.js
└── assets
```

## Running Tests

Each page ships with a fast, dependency-free structural test:

```bash
node tests/index.test.js
node tests/about.test.js
node tests/contact.test.js
```

Run them individually or chain them in your package scripts/CI to ensure the DOM surface and validation hooks stay intact.

## Lighthouse Reports

Audited pages ship with static Lighthouse reports you can open locally:

- [Profile page report](tests/reports/lighthouse.report.html)
- [About page report](tests/reports/lighthouse-about.report.html)
- [Contact page report](tests/reports/lighthouse-contact.report.html)

## Accessibility & UX Notes

- **Skip Link & Keyboard Support** – Skip link appears on focus, and every interactive control honours `:focus-visible`.
- **Theme Toggle** – Light/dark toggle uses `role="group"` and `aria-pressed` states, with user preference cached via `localStorage`.
- **Form Messaging** – Each input owns an error container tied through `aria-describedby`; success copies live in a `role="status"` container.
- **Reduced Motion** – Animations respect `prefers-reduced-motion` with near-zero-duration fallbacks.

## Performance Considerations

- No external fonts or JavaScript frameworks — pages are deployable as static assets.
- Stylesheets are preloaded and apply once, while scripts are deferred to keep first paint quick.
- Shared components (header, theme toggle, validation helpers) prevent duplicate logic across pages.

## Deployment

Static hosting is all you need:

1. Push the project to your preferred Git host.
2. Point Netlify, Vercel, GitHub Pages, or any static server to the project root.
3. Share the live URL alongside the repository when submitting your HNG tasks.

---

Built for the HNG Intenship with equal care for accessibility, performance, and a smooth developer experience.
