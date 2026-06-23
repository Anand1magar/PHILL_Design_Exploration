import React from 'react';

/**
 * PHIL Tag / chip. Soft or outlined, six semantic colors, optional icon and stat count.
 * Matches the Figma "Tag" family: radius 4, Lato 700, 10px (sm) / 12px (lg).
 */
const COLORS = {
  blue:   { soft: 'var(--blue-100)',    fg: 'var(--blue-600)',   border: 'var(--blue-300)' },
  gray:   { soft: 'var(--neutral-100)', fg: 'var(--neutral-600)', border: 'var(--neutral-300)' },
  green:  { soft: 'var(--green-100)',   fg: 'var(--green-800)',  border: 'var(--green-200)' },
  orange: { soft: 'var(--amber-100)',   fg: 'var(--amber-600)',  border: 'var(--amber-400)' },
  purple: { soft: 'var(--purple-100)',  fg: 'var(--purple-600)', border: 'var(--purple-400)' },
  red:    { soft: 'var(--red-200)',     fg: 'var(--red-500)',    border: 'var(--red-300)' },
};

const SIZES = {
  sm: { fontSize: 10, padding: '4px 8px', gap: 4, iconSize: 10, height: 21 },
  lg: { fontSize: 12, padding: '5px 10px', gap: 6, iconSize: 13, height: 26 },
};

export function Tag({
  children, color = 'gray', variant = 'solid', size = 'sm',
  icon = null, iconRight = null, stat = null, style = {}, ...rest
}) {
  const c = COLORS[color] || COLORS.gray;
  const s = SIZES[size] || SIZES.sm;
  const outlined = variant === 'outlined';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignSelf: 'flex-start',
        width: 'fit-content',
        maxWidth: '100%',
        alignItems: 'center',
        gap: s.gap,
        padding: s.padding,
        borderRadius: 'var(--radius-xs)',
        backgroundColor: outlined ? 'transparent' : c.soft,
        color: c.fg,
        boxShadow: outlined ? `inset 0 0 0 1px ${c.border}` : 'none',
        fontFamily: 'var(--font-body)',
        fontWeight: 'var(--weight-bold)',
        fontSize: s.fontSize,
        lineHeight: 1,
        letterSpacing: '0.2px',
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...style,
      }}
      {...rest}
    >
      {icon ? <span style={{ display: 'inline-flex', width: s.iconSize, height: s.iconSize }}>{icon}</span> : null}
      <span>{children}</span>
      {stat != null ? (
        <span style={{
          marginLeft: 2, padding: '0 5px', borderRadius: 'var(--radius-pill)',
          backgroundColor: outlined ? c.soft : 'rgba(255,255,255,0.6)',
          fontSize: s.fontSize, fontWeight: 'var(--weight-extrabold)',
        }}>{stat}</span>
      ) : null}
      {iconRight ? <span style={{ display: 'inline-flex', width: s.iconSize, height: s.iconSize }}>{iconRight}</span> : null}
    </span>
  );
}
