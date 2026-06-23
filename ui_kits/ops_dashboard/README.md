# UI Kit — PHIL Ops: Prior Authorization Dashboard

A faithful, interactive recreation of PHIL's main pharmacy operations console: the screen a PA agent uses to start and track a prior authorization for a patient's prescription.

## Files
- `index.html` — entry point. Loads React + the compiled DS bundle, mounts `PADashboard`.
- `PADashboard.jsx` — the full screen, composed entirely from PHIL DS components (no re-implemented primitives). Exposes `window.PADashboard`.

## What it demonstrates
- **AppHeader** — teal brand band, actions, avatar.
- **Hero Start-PA panel** — patient identity, a `ClaimRejected` **Alert**, previous-PA **StatusPill** + **KeyValue**s, and a start form (**Select** provider + PA type → enables the primary **Button**). Starting a PA flips the right side to a **StatusPill** + SLA **ProgressBar** and posts a callback to the queue.
- **Detail cards** — Patient Profile / Insurance Details / Doctor Information built from **Card** + **KeyValue** + **Tag**.
- **Medication + MD Notes** — wide medication **Card**, step-therapy list, latest progress note.
- **PA Queue rail** — tabbed (**Comments** / SOP), a **CommentBox** composer, and a live **CommentItem** activity log. Submitting a comment prepends it to the feed.

## Interactions
- Pick an insurance provider **and** a PA type → *Start Prior Authorization* enables.
- Click it → status becomes Pending, an SLA tracker appears, a callback is logged.
- Type in the PA Queue composer and send → the comment is added to the feed.
- Switch PA Queue tabs.

## Source
Recreated from the "Amazon Connect / PHIL Design System" Figma file (page *Design System*, frames `Ops-Dash-Dashboard`, `Aside - SideNavBar`, `Patient-Info`). Token values and component specs were read directly from that file.
