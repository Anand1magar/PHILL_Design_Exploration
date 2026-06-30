import React, { useState } from 'react';

/**
 * PHIL Button — primary action control.
 * Faithful to the Figma Button set: radius 8, Lato 700, three sizes, six intents.
 * link intent: transparent, no border, underlines on hover — use instead of bare <a> tags.
 */
const SIZES = {
  sm: { height: 32, padding: '0 12px', fontSize: 12, gap: 8, iconSize: 14 },
  md: { height: 40, padding: '0 16px', fontSize: 14, gap: 8, iconSize: 16 },
  lg: { height: 48, padding: '0 20px', fontSize: 16, gap: 8, iconSize: 18 },
};

const INTENTS = {
  primary: {
    base: 'var(--color-button-primary-default)', hover: 'var(--color-button-primary-hover)',
    pressed: 'var(--color-button-primary-pressed)', text: 'var(--color-button-primary-text)',
    border: null, disabledOpacity: 0.6,
  },
  secondary: {
    base: 'var(--color-button-secondary-default)', hover: 'var(--color-button-secondary-hover)',
    pressed: 'var(--color-button-secondary-pressed)', text: 'var(--color-button-secondary-text)',
    border: 'var(--color-button-secondary-border)', disabledOpacity: 0.5,
  },
  success: {
    base: 'var(--color-button-success-primary-bg)', hover: 'var(--color-button-success-primary-bg)',
    pressed: 'var(--color-button-success-primary-bg)', text: 'var(--color-button-success-text)',
    border: null, disabledOpacity: 0.6,

  },
  positive: {
    base: 'var(--color-button-positive-secondary-bg)', hover: 'var(--color-button-positive-secondary-bg)',
    pressed: 'var(--color-button-positive-secondary-bg)', text: 'var(--color-button-positive-secondary-text)',
    border: 'var(--color-button-positive-secondary-border)', disabledOpacity: 0.5,
  },
  negative: {
    base: 'var(--color-button-negative-primary-bg)', hover: 'var(--color-button-negative-primary-bg)',
    pressed: 'var(--color-button-negative-primary-bg)', text: 'var(--color-button-negative-text)',
    border: null, disabledOpacity: 0.6,
  },
  negativeSecondary: {
    base: 'var(--color-surface-default)', hover: 'color-mix(in srgb, #b91d13 6%, white)',
    pressed: 'color-mix(in srgb, #b91d13 12%, white)', text: '#b91d13',
    border: '#b91d13', disabledOpacity: 0.5,
  },
  link: {
    base: 'transparent', hover: 'transparent', pressed: 'transparent',
    text: 'var(--color-text-link)',
    border: null, disabledOpacity: 0.4, underlineOnHover: true,
    weight: 'var(--weight-semibold)',
  },
  headerAction: {
    base: 'rgb(245,247,246)', hover: 'var(--neutral-200)', pressed: 'var(--neutral-300)',
    text: 'var(--neutral-1000)',
    border: '#e6e6e6', disabledOpacity: 0.5,
    borderRadius: 'var(--radius-lg)',
  },
};

export function Button({
  children, intent = 'primary', size = 'md', icon = null, iconRight = null,
  fullWidth = false, disabled = false, style = {}, onClick, type = 'button', ...rest
}) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const s = SIZES[size] || SIZES.md;
  const c = INTENTS[intent] || INTENTS.primary;
  const bg = disabled ? c.base : active ? c.pressed : hover ? c.hover : c.base;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        height: c.underlineOnHover ? 'auto' : s.height,
        padding: c.underlineOnHover ? 0 : s.padding,
        width: fullWidth ? '100%' : 'auto',
        display: 'inline-flex',
        flexDirection: 'row',
        gap: s.gap,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: c.underlineOnHover ? 0 : (c.borderRadius || 'var(--radius-md)'),
        backgroundColor: bg,
        color: c.text,
        border: 'none',
        boxShadow: c.border ? `inset 0 0 0 1px ${c.border}` : 'none',
        fontFamily: 'var(--font-body)',
        fontWeight: c.weight || 'var(--weight-bold)',
        fontSize: s.fontSize,
        lineHeight: 1,
        whiteSpace: 'nowrap',
        textDecoration: c.underlineOnHover && hover ? 'underline' : 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? c.disabledOpacity : 1,
        transition: 'background-color 120ms ease, opacity 120ms ease, text-decoration 0ms',
        boxSizing: 'border-box',
        ...style,
      }}
      {...rest}
    >
      {icon ? <span style={{ display: 'inline-flex', width: s.iconSize, height: s.iconSize }}>{icon}</span> : null}
      {children != null ? <span style={{ flexShrink: 0 }}>{children}</span> : null}
      {iconRight ? <span style={{ display: 'inline-flex', width: s.iconSize, height: s.iconSize }}>{iconRight}</span> : null}
    </button>
  );
}
