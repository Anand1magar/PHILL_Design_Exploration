import React from 'react';

/**
 * PHIL Avatar — teal identity circle. Shows initials, an icon, or the PHIL mark.
 */
export function Avatar({
  initials, icon, size = 36, color = 'var(--color-brand)', textColor = 'var(--neutral-0)', style = {}, ...rest
}) {
  return (
    <span
      style={{
        width: size, height: size, borderRadius: '50%', backgroundColor: color,
        color: textColor, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-bold)',
        fontSize: Math.round(size * 0.4), flexShrink: 0, boxSizing: 'border-box', ...style,
      }}
      {...rest}
    >
      {icon || (initials ? initials.slice(0, 2).toUpperCase() : 'P')}
    </span>
  );
}
