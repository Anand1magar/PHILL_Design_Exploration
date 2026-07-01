# Radio

Primary single-select control with built-in click-to-deselect. Figma component: **"Radio Buttons"** (node `16:178`).

## onChange API

`onChange` receives a **value string**, not a DOM event:

- **Select**: `onChange(value)` — called with the option's `value` string
- **Deselect**: `onChange('')` — called with empty string when the already-selected option is clicked again

Always initialise state to `''` (not `null` or `undefined`).

## Default — `variant="row"`

Full-width bordered card row. Always use this for yes/no or multi-option questions in forms.

```jsx
const [val, setVal] = useState('');

{['Yes', 'No'].map(opt => (
  <Radio
    key={opt}
    name="q1"
    value={opt}
    label={opt}
    checked={val === opt}
    onChange={(v) => setVal(v)}   // v = 'Yes' | 'No' | ''
  />
))}
```

Visual spec: white bg · `1px solid #d9d9d9` border · `4px` radius · `56px` min-height ·
`8px` side padding · `24px` circle · `16px` Regular label.
Border turns **blue** (`var(--color-button-primary-default)`) when checked.
Background turns light blue (`#ecf1f9`) when checked.

## Compact — `variant="inline"`

Bare label with no border. Use only in space-constrained contexts.

```jsx
<Radio variant="inline" name="flag" value="yes" label="Yes"
  checked={val === 'yes'} onChange={(v) => setVal(v)} />
```

## Deselect behaviour

Built-in — no extra props needed. Clicking the currently selected option calls `onChange('')`,
which lets the parent clear its state:

```jsx
const [val, setVal] = useState('');
// clicking the already-selected option → onChange('') → setVal('') → nothing selected
onChange={(v) => setVal(v)}
```

## RadioQuestion pattern

Wrap radio groups in a question block with a bold gray label:

```jsx
<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
  <span style={{ font: '700 14px/20px var(--font-body)', color: 'var(--color-text-secondary)' }}>
    Were the clinical questions generated while you were working on the request?
  </span>
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    {['Yes', 'No'].map(opt => (
      <Radio key={opt} name="q1" value={opt} label={opt}
        checked={val === opt} onChange={(v) => setVal(v)} />
    ))}
  </div>
</div>
```
