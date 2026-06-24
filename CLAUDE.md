# PHIL Design System — Agent Rules

## Design System Reference
@readme.md

---

## Design-to-Code Rules

When implementing any Figma design (MCP, screenshot, or URL), **always**:

- Use components from `components/` — Button, Card, Input, Select, Tag, StatusPill, Alert, Icon, KeyValue, Avatar, ProgressBar, CommentBox, AppHeader, etc.
- Use design tokens from `tokens/` — never hardcode colors, spacing, radii, or font values that have a token equivalent
- Map Figma values to tokens first before writing any style:
  - `#2363c3` → `var(--blue-600)` → `intent="primary"` on Button
  - `#00827e` / `rgb(0,130,126)` → `var(--teal-400)` → `var(--color-brand)`
  - `#0f2a2a` → `var(--teal-600)`
  - `#6b7280` → `var(--color-text-secondary)`
  - `8px` radius → `var(--radius-md)`, `12px` → `var(--radius-lg)`, `16px` → `var(--radius-xl)`
- Never use raw `<button>` — use `<Button intent="..." size="...">` from `components/core/Button.jsx`
- Never use bare `<a>` tags for actions — use `<Button intent="link">`
- Use `style` prop to override specific values that don't map to a token

## Button Intents (quick ref)
| Intent | Use case |
|---|---|
| `primary` | Main CTA (blue `#2363c3`) |
| `secondary` | Secondary actions (white + border) |
| `link` | Text-only actions, replaces `<a>` tags |
| `headerAction` | Header nav pills (slides on teal band) |
| `success` / `positive` / `negative` | Status actions |

## Component Locations
- Core: `components/core/` — Button, Tag, StatusPill, Icon
- Forms: `components/forms/` — Input, Select, Radio, FileUpload
- Feedback: `components/feedback/` — Alert, ProgressBar, CommentBox
- Layout: `components/layout/` — Card, KeyValue, Avatar
- Navigation: `components/navigation/` — AppHeader

## Dev Server
```bash
npm run dev   # Vite dev server → http://localhost:3000
```

## Git Workflow (after every change)
```bash
git add .
git commit -m "describe what changed"
git push   # → https://github.com/Anand1magar/PHILL_Design_Exploration
```
