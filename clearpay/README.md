# ClearPay — Responsive Multi-Page Website

A fictional fintech marketing site built for **Phase 1: Web Foundations & JavaScript Mastery**. Plain HTML5, CSS3, and vanilla JavaScript — no build step, no framework, no dependencies to install.

**Live demo:** _add your GitHub Pages / Netlify URL here after deploying_
**Repository:** _add your GitHub repo URL here_

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Home — hero, value props, CTA into the calculator |
| `features.html` | Filterable feature grid (Processing / Payouts / Reporting / Developer tools) |
| `pricing.html` | Real-time pricing calculator |
| `contact.html` | Validated contact form |

## Features implemented

- **Semantic HTML5**: `header`, `nav`, `main`, `section`, `article`, `footer`, one `h1` per page, a skip link, and labelled form controls.
- **Design token system**: `css/tokens.css` defines colour, type, spacing, and radius as CSS custom properties, with a `[data-theme="dark"]` override block.
- **Fluid responsive layout**: `clamp()`-based type and spacing scales work from 320px phones up to 2560px displays; CSS Grid with `auto-fit`/`minmax` reflows card grids without extra breakpoints; two `max-width` breakpoints (900px, 560px) handle navigation and form layout changes.
- **Real-time pricing calculator** (`js/pricing.js`): two range sliders and a plan selector recompute the itemised total on every `input` event — no submit button, no page reload.
- **Filterable features section** (`js/features.js`): category buttons toggle `hidden` on matching cards and update an `aria-live` status region.
- **Scroll animations** (`js/main.js`): `IntersectionObserver` adds a `.is-visible` class to `.reveal` elements as they enter the viewport; disabled automatically when `prefers-reduced-motion: reduce` is set.
- **Validated contact form** (`js/contact.js`): inline validation on blur and while correcting an error, an `aria-live="alert"` status message, and a simulated submit (there is no backend in this demo).
- **Theme persistence** (`js/main.js`): a light/dark toggle stores the choice in `localStorage` and falls back to `prefers-color-scheme` on first visit.

## Accessibility notes

- Skip-to-content link on every page.
- Visible `:focus-visible` outline distinct from the default browser outline.
- Colour pairs kept at or above WCAG AA contrast in both themes.
- Form errors are associated to inputs via `aria-describedby` and `aria-invalid`.
- Motion respects `prefers-reduced-motion`.

Run an automated pass with the axe DevTools browser extension or Lighthouse's Accessibility audit to confirm zero errors in your own environment before submitting.

## Local development

No build tools are required. From the project root:

```bash
# Python 3
python3 -m http.server 8000

# or Node
npx serve .
```

Then open `http://localhost:8000`.

## Deploying

**GitHub Pages**
1. Push this folder to a GitHub repository.
2. Repo Settings → Pages → Deploy from branch → `main` → `/ (root)`.
3. Your site publishes at `https://<username>.github.io/<repo>/`.

**Netlify**
1. Drag-and-drop this folder onto [app.netlify.com/drop](https://app.netlify.com/drop), or connect the GitHub repo.
2. No build command is needed; the publish directory is the project root.

## Testing checklist for the report

- [ ] Resize the browser (or DevTools device toolbar) at 320px, 768px, 1024px, 1440px, 2560px.
- [ ] Toggle the theme button, reload the page, confirm the choice persisted.
- [ ] Filter the features grid by each category.
- [ ] Move both sliders and switch plans on the pricing page; confirm the total updates instantly.
- [ ] Submit the contact form empty, then with an invalid email, then correctly.
- [ ] Run Lighthouse (Chrome DevTools → Lighthouse tab) on all four pages in mobile and desktop mode; record Performance, Accessibility, Best Practices scores.
- [ ] Run the axe DevTools accessibility scan on all four pages.

## Project structure

```
clearpay/
├── index.html
├── features.html
├── pricing.html
├── contact.html
├── css/
│   ├── tokens.css     # design token system
│   └── main.css       # layout, components, responsive rules
├── js/
│   ├── main.js         # theme toggle, mobile nav, scroll reveal
│   ├── pricing.js      # pricing calculator
│   ├── features.js     # feature filtering
│   └── contact.js      # form validation
└── README.md
```
