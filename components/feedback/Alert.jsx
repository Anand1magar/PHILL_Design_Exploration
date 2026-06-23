import React from 'react';

/**
 * PHIL Alert — the labeled exception/notice block (e.g. "CLAIM REJECTED").
 * Uppercase eyebrow above a bordered white card: a colored code + right-aligned source, then body copy.
 */
const TONES = {
  red:   { code: 'var(--red-800)',   eyebrow: 'var(--color-text-secondary)' },
  blue:  { code: 'var(--blue-600)',  eyebrow: 'var(--color-text-secondary)' },
  green: { code: 'var(--green-800)', eyebrow: 'var(--color-text-secondary)' },
  amber: { code: 'var(--amber-600)', eyebrow: 'var(--color-text-secondary)' },
};

export function Alert({
  eyebrow, code, source, children, tone = 'red', style = {}, ...rest
}) {
  const t = TONES[tone] || TONES.red;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, ...style }} {...rest}>
      {eyebrow ? (
        <span style={{
          fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-bold)',
          fontSize: 12, lineHeight: '16px', letterSpacing: 'var(--tracking-label)',
          textTransform: 'uppercase', color: t.eyebrow,
        }}>{eyebrow}</span>
      ) : null}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 6,
        padding: 16, borderRadius: 'var(--radius-lg)',
        backgroundColor: 'var(--color-surface-default)',
        boxShadow: 'inset 0 0 0 1px var(--color-border-muted)',
      }}>
        {(code || source) ? (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
            <span style={{
              fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-bold)',
              fontSize: 14, lineHeight: '20px', color: t.code,
            }}>{code}</span>
            <span style={{
              fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-bold)',
              fontSize: 14, lineHeight: '20px', color: 'var(--color-text-default)', textAlign: 'right',
            }}>{source}</span>
          </div>
        ) : null}
        {children ? (
          <p style={{
            margin: 0, fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-regular)',
            fontSize: 14, lineHeight: '20px', color: 'var(--neutral-900)',
          }}>{children}</p>
        ) : null}
      </div>
    </div>
  );
}
