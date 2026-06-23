import React from 'react';

/**
 * PHIL ProgressBar — the prior-auth SLA tracker card.
 * Soft-blue panel, a glassy pill track with an inset progress fill, and remaining / business-day labels.
 */
const TONES = {
  blue:  { panel: 'rgba(35,99,195,0.10)', fill: 'var(--blue-600)',  accent: 'var(--blue-600)',  ring: 'rgba(35,99,195,0.1)' },
  green: { panel: 'rgba(5,150,105,0.10)', fill: 'var(--green-600)', accent: 'var(--green-800)', ring: 'rgba(5,150,105,0.12)' },
  amber: { panel: 'rgba(184,92,0,0.08)',  fill: 'var(--amber-600)', accent: 'var(--amber-600)', ring: 'rgba(184,92,0,0.12)' },
};

export function ProgressBar({
  value = 40, remainingLabel = '3 days remaining', dayLabel = 'DAY 2 OF 5 BUSINESS DAYS',
  initiatedOn = null, tone = 'blue', style = {}, ...rest
}) {
  const t = TONES[tone] || TONES.blue;
  const pct = Math.max(0, Math.min(100, value));

  return (
    <div
      style={{
        display: 'flex', flexDirection: 'column', gap: 8,
        padding: 12, borderRadius: 'var(--radius-xl)', backgroundColor: t.panel,
        boxSizing: 'border-box', ...style,
      }}
      {...rest}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
        <span style={{
          fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-bold)',
          fontSize: 12, lineHeight: '20px', color: t.accent,
        }}>{remainingLabel}</span>
        <span style={{
          fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-regular)',
          fontSize: 10, lineHeight: '18px', color: 'var(--color-text-default)', letterSpacing: '0.3px',
        }}>{dayLabel}</span>
      </div>

      <div style={{
        padding: 6, borderRadius: 'var(--radius-pill)',
        backgroundColor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)',
        boxShadow: `inset 0 0 0 1px ${t.ring}`,
      }}>
        <div style={{
          height: 12, borderRadius: 'var(--radius-pill)', overflow: 'hidden',
          backgroundColor: 'rgb(241,245,249)', boxShadow: 'var(--shadow-progress-track)',
        }}>
          <div style={{
            width: `${pct}%`, height: '100%', borderRadius: 'var(--radius-pill)',
            backgroundColor: t.fill, transition: 'width 240ms ease',
          }} />
        </div>
      </div>

      {initiatedOn ? (
        <span style={{
          fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-regular)',
          fontSize: 10, lineHeight: '20px', color: 'var(--neutral-700)',
        }}>Initiated on: {initiatedOn}</span>
      ) : null}
    </div>
  );
}
