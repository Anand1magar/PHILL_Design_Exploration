One-line: PHIL's primary action button — blue primary, neutral secondary, plus success / positive / negative intents in three sizes.

```jsx
<Button intent="primary" size="md" onClick={start}>Start Prior Authorization</Button>
<Button intent="secondary" icon={<Icon name="folder" />}>View Business Rules</Button>
<Button intent="success" size="sm">PA Approved</Button>
```

Variants:
- `intent`: `primary` (blue), `secondary` (neutral, bordered), `success` (green), `positive` (soft green outline), `negative` (red).
- `size`: `sm` (32px), `md` (40px), `lg` (48px).
- `icon` / `iconRight` take any SVG node; `fullWidth` stretches; `disabled` dims (0.6 primary / 0.5 secondary).
Hover/press states are handled internally.
