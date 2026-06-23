---
name: phil-design
description: Use this skill to generate well-branded interfaces and assets for PHIL — a digital pharmacy / prescription-access platform and its prior-authorization (PA) operations console — either for production or for throwaway prototypes, mocks and slides. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Where things are
- `readme.md` — the full design guide: voice, visual foundations, iconography, and a file manifest. Start here.
- `styles.css` — the single global stylesheet to link; it `@import`s `tokens/` (colors, typography, spacing, fonts).
- `components/<group>/` — React UI primitives (`Button`, `Tag`, `StatusPill`, `Input`, `Select`, `Radio`, `FileUpload`, `Alert`, `ProgressBar`, `CommentBox`, `Card`, `KeyValue`, `Avatar`, `AppHeader`, `Icon`). Each has a `.d.ts` (props) and `.prompt.md` (usage).
- `guidelines/` — foundation specimen cards (colors / type / spacing / brand).
- `ui_kits/ops_dashboard/` — a full interactive recreation of the Prior Authorization dashboard; the best reference for composing the components.

## Core brand rules (quick)
- **Teal is identity/chrome, blue is action.** Header band, headings and avatar are teal (`--teal-400`); primary buttons and links are blue (`--blue-600`). Don't make buttons teal.
- Type: **Lato** body/labels, **Manrope** display/wordmark, **Inter** micro-labels.
- Cards: white, 16px radius, hairline inset border + soft shadow, 24px padding.
- Labels are UPPERCASE micro-eyebrows; values are normal case. Operational, status-first copy. No emoji.

## Using the components
In an HTML file, link `styles.css`, load `_ds_bundle.js`, then read components from the namespace:
```html
<link rel="stylesheet" href="styles.css" />
<script src="_ds_bundle.js"></script>
<script type="text/babel">
  const { Button, Card, KeyValue, StatusPill, Tag } = window.PHILDesignSystem_bffd2d;
</script>
```
(React + Babel standalone are required for JSX — see any `*.card.html` for the exact script tags.)
