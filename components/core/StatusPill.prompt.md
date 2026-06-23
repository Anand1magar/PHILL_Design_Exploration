One-line: prior-authorization status pill — a colored dot plus an uppercase status label.

```jsx
<StatusPill status="approved" />
<StatusPill status="denied">PA Denied</StatusPill>
```

Statuses: `pending` (blue), `approved` (green), `denied` (red), `expired` (amber), `cancelled` (gray). Default label follows the status; pass children to override.
