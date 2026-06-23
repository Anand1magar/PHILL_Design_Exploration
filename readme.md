# PHIL Design System

A design system for **PHIL** — a digital pharmacy and prescription-access platform. This system covers PHIL's internal **prior-authorization (PA) operations console**: the tooling pharmacy agents use to start, track, and resolve insurance prior authorizations so patients can get their medication filled.

The product domain is healthcare/pharmacy operations: patients, prescriptions, insurance carriers, claim rejections, PA status, SLAs, and an audit-style activity feed. The tone is **operational and clinical-precise** — dense data, clear status, no fluff.

## Sources
This system was extracted from the attached Figma file:
- **Figma:** "Amazon Connect Design System.fig" (page *Design System*; frames include `Ops-Dash-Dashboard`, `Aside - SideNavBar` / PA Queue, `Patient-Info`, plus component frames `Button`, `Tag`, `PAStatusPill`, `Input field`, `Dropdown`, `Progress bar`, `FileUpload`, `Cards`, `KeyValue`, `CommentBox`, `Radio Buttons`).
- Token values (96 Figma Variables across *Primitives* + *Semantic* collections), component specs, and copy were read directly from that file — it is the source of truth over any public brand reference.

> Note: the file is internally titled "Amazon Connect Design System" but every surface, the wordmark, and the data model are PHIL's pharmacy PA product. We treat the brand as **PHIL**.

---

## Content Fundamentals (voice & copy)

- **Operational, third-person, status-first.** Copy describes system + patient state, not a conversational "you": *"Insurance exception reported by PP. Reason code: 75 - Prior Authorization Required."*, *"Start PA completed by RPA. Order put to sleep for 30 mins."*
- **Activity-log style.** The PA Queue reads like an audit trail — terse event sentences, each stamped with an ISO-ish timestamp and an actor: *"Fri Aug 23, 2024 9:05:49 AM EDT - by PhilSystem"*. Actors are systems (`PhilSystem`, `RPA`, `CMM`) or named agents (`Emmanuel Abujan (Psup Agent)`).
- **Labels are UPPERCASE micro-eyebrows.** Field labels and section headers are short, all-caps: `LEGAL NAME`, `MEMBER ID`, `CLAIM REJECTED`, `PREVIOUS PRIOR AUTHORIZATIONS`, `TRIED & FAILED STEP THERAPY`. Values are Title/normal case.
- **Domain acronyms are used freely and unexpanded** in-product: PA (prior auth), CMM (CoverMyMeds), NDC, BIN, PCN, DAW, ICD10, SIG, NPI, SOP, RPA. The audience is expert.
- **Action language is imperative and specific:** *"Start Prior Authorization"*, *"Select File"*, *"View Manufacturer Business Rules"*, *"Already Submitted in CoverMyMeds"*.
- **Sentence case** for buttons and prompts (*"Click or drag file to this area to upload"*); **uppercase** only for labels, status pills, and codes.
- **No emoji.** No exclamation, no marketing tone. Numbers, codes and IDs are first-class content.

## Visual Foundations

- **Brand color — teal.** `--teal-400 = rgb(0,130,126)` is the anchor (header band, avatar, primary headings), with `--teal-500` (deep) and `--teal-600 = rgb(15,42,42)` (near-black ink). The teal is calm and clinical, not vivid.
- **Action color — blue, not teal.** Primary buttons, links, and the "pending/in-progress" state use `--blue-600 = rgb(35,99,195)`. This is the key brand decision: **teal is chrome/identity, blue is action.** Keep them distinct.
- **Semantic status colors:** red (`--red-500/800`) for rejections/codes, green (`--green-600/800`) for approved/verified, amber (`--amber-600`) for expiring/warning, purple (`--purple-600`) as an accent.
- **Surfaces.** App background is a cool off-white `rgb(245,247,252)`; the PA Queue rail is a slightly warmer gray `rgb(242,244,245)`; cards and inputs are pure white.
- **Type.** **Lato** is the workhorse (body, values, labels, buttons — Regular/Medium/Bold/Black). **Inter** appears on dense nav/secondary micro-labels. **Manrope** (Bold/ExtraBold) is used for display headings and the PHIL wordmark.
- **Cards.** White, **16px** radius, a **hairline inset border** (`inset 0 0 0 1px var(--color-border-muted)`) layered with a soft drop shadow (`0 1px 2px rgba(0,0,0,.1)`). Generous 24px padding. This double border+shadow is the signature surface treatment.
- **Inputs.** White, **8px** radius, inset hairline border + an `xs` shadow; **blue** focus ring; **red** error border. 46px tall. Labels are Lato 700.
- **Pills & tags.** Status pills are fully rounded (`9999`) with a 8px colored dot + uppercase Lato 800 label on a 7–10% tinted background. Tags are **4px** radius, soft tint background, color-600 text, Lato 700 10–12px.
- **Progress / SLA tracker.** A soft-blue rounded-16 panel containing a **glassy pill track** — a translucent white capsule (`rgba(255,255,255,.5)` + `blur(8px)`) over an inset-shadowed slate track with a blue fill. Days-remaining (left, accent) vs business-day count (right, meta).
- **Radii ladder:** 4 (tags) · 8 (inputs/buttons) · 12 (alerts, header pills) · 16 (cards) · 9999 (pills).
- **Elevation** is restrained: hairline borders do most of the separation; shadows are small and low-opacity. No heavy/colored shadows.
- **Motion** is minimal and functional: 120ms ease color/opacity transitions on hover/press, 240ms width ease on progress fills. No bounce, no decorative animation. Buttons darken on hover (primary → blue-500/700), dim on disable (0.6 primary / 0.5 secondary). No press-scale.
- **No gradients** beyond the single glass-blur on the progress track. No illustrations or photography in-product — the imagery *is* the data.

## Iconography

- **Line icons, ~2px stroke, `currentColor`.** The source uses Material Symbols / iconify line icons (cloud-upload, comment_bank, sleep_score/moon, shield, chevrons, copy, external-link, info, circle-help, arrow_outward). They inherit text color and sit at 16–24px.
- This system ships an **`Icon` component** (`components/core/Icon.jsx`) with a curated, Lucide-geometry set covering the PA ops surfaces. Names in `ICON_NAMES`. *(Substitution note: the exact Material Symbols binaries weren't extractable from the .fig, so we recreated the needed glyphs as clean 2px line icons matching the original stroke style. Swap in the real icon font/SVGs if you have them.)*
- **Emoji:** never. **Unicode** is used sparingly for inline affordances (e.g. `↗` after an external CMM key).
- The **PHIL wordmark** is a bold sans wordmark; the **mark/avatar** is a teal circle (the logo geometry was not recoverable from the file, so the wordmark is set in Manrope ExtraBold and the avatar shows initials — replace with the real logo SVG when available).

---

## Index / Manifest

**Root**
- `styles.css` — global entry (import this). `@import`s the four token files + fonts.
- `tokens/` — `colors.css` (96 vars + brand aliases), `typography.css`, `spacing.css` (radii/shadows/layout), `fonts.css` (Lato/Inter/Manrope via Google Fonts).
- `readme.md` — this guide. `SKILL.md` — agent-skill manifest.

**Components** (`components/<group>/` — `<Name>.jsx` + `.d.ts` + `.prompt.md` + a `@dsCard` HTML)
- `core/` — **Button**, **Tag**, **StatusPill**, **Icon**
- `forms/` — **Input**, **Select**, **Radio**, **FileUpload**
- `feedback/` — **Alert**, **ProgressBar**, **CommentBox** (+ `CommentItem`)
- `layout/` — **Card**, **KeyValue**, **Avatar**
- `navigation/` — **AppHeader**

**Foundations** (`guidelines/` — specimen cards for the Design System tab)
- Colors: brand, neutrals, accents, semantic · Type: scale, families · Spacing: radii, elevation, spacing · Brand: logo

**UI Kit** (`ui_kits/ops_dashboard/`)
- `index.html` + `PADashboard.jsx` — interactive Prior Authorization ops dashboard.

The compiler bundles all components into `_ds_bundle.js` under namespace `window.PHILDesignSystem_bffd2d`.
