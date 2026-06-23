import React from 'react';

/**
 * PAStatusPill — prior-authorization status indicator.
 * Pill with a colored dot + uppercase Lato 800 label. Mirrors the Figma PAStatusPill set.
 */
// Colors mirror the Figma PAStatusPill set (OPS palette):
// approved uses OPS/Primary/Green #00CCAE (--teal-300), denied uses OPS/Secondary/Red #D0021B (--red-900).
const STATUS = {
  pending:   { bg: 'rgba(35,99,195,0.07)',  fg: 'var(--blue-600)',   label: 'PA Pending' },
  approved:  { bg: 'rgba(16,185,129,0.07)', fg: 'var(--teal-300)',   label: 'PA Approved' },
  denied:    { bg: 'rgba(208,2,27,0.07)',   fg: 'var(--red-900)',    label: 'PA Denied' },
  expired:   { bg: 'rgba(184,92,0,0.08)',   fg: 'var(--amber-600)',  label: 'PA Expired' },
  cancelled: { bg: 'var(--neutral-100)',    fg: 'var(--neutral-500)', label: 'PA Cancelled' },
};

export function StatusPill({ status = 'pending', children, style = {}, ...rest }) {
  const c = STATUS[status] || STATUS.pending;
  return (
    <span
      style={{
        display: 'inline-flex',
        // Hug content: never stretch to fill width when placed in a flex column / grid.
        alignSelf: 'flex-start',
        width: 'fit-content',
        maxWidth: '100%',
        alignItems: 'center',
        gap: 6,
        padding: '6px 12px',
        borderRadius: 'var(--radius-pill)',
        backgroundColor: c.bg,
        color: c.fg,
        fontFamily: 'var(--font-body)',
        fontWeight: 'var(--weight-extrabold)',
        fontSize: 12,
        lineHeight: 1,
        letterSpacing: '0.2px',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...style,
      }}
      {...rest}
    >
      <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: c.fg, flexShrink: 0 }} />
      {children ?? c.label}
    </span>
  );
}
