# Profile Card – HNG Stage 0 Challenge

## Overview

This project implements the Stage 0 profile-card brief from the HNG Hackathon prerequisites. The goal was to build an accessible, responsive profile component in plain HTML, CSS, and vanilla JavaScript, while exposing a consistent `data-testid` surface for automated grading.  

The result is a polished single-page experience that combines neutral light/dark themes, subtle red accents, and carefully tuned motion. Accessibility is built in from the skip links to keyboard-visible focus states, and performance stays sharp thanks to zero build tooling and zero external network requests after first load.

## Highlights

- **Fully Semantic Markup**: Uses `<main>`, `<article>`, `<header>`, `<figure>`, `<nav>`, and `<section>` to reinforce structure while keeping automated testing hooks through `data-testid` attributes.
- **Accessible Navigation**:
  - Skip-to-content link for screen reader and keyboard users.
  - Sticky light/dark toggle with ARIA pressed state and `localStorage` persistence.
  - Inline focus outlines via `:focus-visible` for every interactive control.
- **Live Data**: The “Current time (ms)” field streams `Date.now()` with a 1 s interval update, matching the prerequisite requirement.
- **Responsive by Design**: Clamped spacing and auto-fit grids ensure comfortable layouts from 320 px phones to large desktops without media-query bloat.
- **Iconography Without Payloads**: Social links use CSS masked SVG data URIs so no extra font or image requests are needed.
- **Performance-Friendly**: Plain HTML/CSS/JS, lazy-free load (no build step, no dependencies), and a total bundle that can be served from any static host.

## Tech Stack

| Layer        | Choice              | Rationale |
|--------------|---------------------|-----------|
| Markup       | Semantic HTML5       | Meets accessibility & testing requirements |
| Styling      | Modern CSS (Grid, Flexbox, logical properties, `clamp()`, CSS custom properties) | Responsive layout with minimal overrides |
| Scripting    | Vanilla JavaScript   | Keeps bundle light; only used for live clock & theme persistence |

## Data Test IDs Checklist

All IDs follow the prerequisite spec:

| Element                      | Selector / Location                       |
|------------------------------|-------------------------------------------|
| `test-profile-card`          | `<article>` root                          |
| `test-user-name`             | `<h2>` inside header                      |
| `test-user-bio`              | `<p>` below the name                      |
| `test-user-avatar`           | `<img>` inside `<figure>`                 |
| `test-user-time`             | `<span>` in the meta row                  |
| `test-user-social-links`     | `<ul>` wrapping the social anchors        |
| `test-user-social-<network>` | Each `<a>` inside the social list         |
| `test-user-hobbies`          | `<ul>` in the Hobbies section             |
| `test-user-dislikes`         | `<ul>` in the Dislikes section            |

These IDs are untouched so automated graders can hook into the DOM reliably.

## Getting Started

1. **Clone or download** this repository.  
2. Open `index.html` directly in your browser — no build step required.  
3. Optional: serve via a static server for local development (`python -m http.server`, `npx serve`, etc.).

### File Structure

```
profile/
├── index.html     # Semantic markup with data-testid hooks
├── style.css      # Theming, responsive layout, accessibility styling
├── script.js      # Live clock + theme toggle persistence
└── prerequisite.md# Original task brief for reference
```

## Accessibility & UX Notes

- **Skip Link & Keyboard Support**: A visually-hidden skip link becomes visible on focus, giving keyboard and screen-reader users a quick path to the main content.
- **Theme Toggle**: Two-button toggle with `role="group"` exposes an ARIA-compliant preference switch; the state persists via `localStorage`.
- **Contrast-Driven Palette**: Both themes rely primarily on neutrals with subtle red flourishes that remain AA-compliant across backgrounds.
- **Motion Sensitivity**: `prefers-reduced-motion` is respected — transitions/animations are disabled for users who opt out.
- **Focus Styling**: `:focus-visible` is applied globally so navigation is obvious without overwhelming pointer users.

## Performance Considerations

- No external fonts, icon sets, or build-time tooling.
- CSS uses `clamp()` and `auto-fit` grids to minimize media queries and repeated layout definitions.
- SVG icons for social links are embedded as data URIs, avoiding additional HTTP requests.
- JavaScript is limited to essential interactive behavior (theme and clock).

## Customisation Tips

- **Swap Profile Content**: Update name, bio, hobbies, dislikes, and social URLs directly in `index.html`. Keep the `data-testid` attributes intact.
- **Branding**: Tweak the CSS custom properties under the `body` selector to change the accent palette or inject alternate gradients.
- **Animations**: Animation keyframes (`glowShift`, `avatarGlow`, `pulseDot`) live near the top of the stylesheet; adjust durations or remove them per your brand tone.

## Deployment

Because the project is static, hosting is as simple as dropping the folder into Netlify, GitHub Pages, Vercel, or any static file server.  

1. Push to a GitHub repository.  
2. Configure your host of choice to serve the root directory.  
3. Share the live URL along with the repo link to match the prerequisite submission instructions.

### Project Links

- GitHub Repository: [`iyoolaoyabiyi/hng-profile-card-stage-0`](https://github.com/iyoolaoyabiyi/hng-profile-card-stage-0)
- Live Preview (GitHub Pages): https://iyoolaoyabiyi.github.io/hng-profile-card-stage-0/

---

Built for the HNG Stage 0 challenge with a focus on clarity, accessibility, and an elegant developer experience. Feel free to fork, remix, and extend! 💫
