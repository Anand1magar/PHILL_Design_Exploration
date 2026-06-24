import React from 'react';
import { Icon } from '../core/Icon.jsx';

/**
 * PHIL Card — the white surface that holds patient/insurance/medication detail.
 * Radius 16, inset hairline border + soft drop shadow. Optional title row with a copy action.
 */
export function Card({
  children, title, action, onCopy, padding = 24, style = {}, bodyStyle = {}, ...rest
}) {
  return (
    <section
      style={{
        display: 'flex', flexDirection: 'column', gap: 16,
        padding,
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--neutral-200)', // Figma 1:1700: 1.3px inset border
        backgroundColor: 'var(--color-surface-default)',
        // boxShadow: 'var(--shadow-card)',
        boxSizing: 'border-box',
        ...style,
      }}
      {...rest}
    >
      {(title || action || onCopy) ? (
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          {title ? (
            <h3 style={{
              margin: 0, fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-bold)',
              fontSize: 18, lineHeight: '28px', color: 'var(--color-text-default)',
            }}>{title}</h3>
          ) : <span />}
          {action || (onCopy ? (
            <button onClick={onCopy} aria-label="Copy" style={{
              border: 'none', background: 'none', cursor: 'pointer', padding: 0,
              color: 'var(--teal-100)', display: 'inline-flex',
            }}>
              <Icon name="copy" size={18} />
            </button>
          ) : null)}
        </header>
      ) : null}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, ...bodyStyle }}>{children}</div>
    </section>
  );
}
