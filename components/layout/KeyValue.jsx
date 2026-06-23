import React from 'react';

/**
 * PHIL KeyValue — three Figma variants (node 1:1701):
 *   default   — gray label / dark 14px medium value (standard data fields)
 *   title     — gray label / teal bold 16px value (prominent headings e.g. Drug Name)
 *   link      — gray label / blue underlined 14px value (e.g. CMM Key)
 *
 * `valueColor` still works as an escape hatch (e.g. red for allergies).
 */

const LABEL_STYLE = {
  fontFamily: 'var(--font-body)',
  fontWeight: 'var(--weight-bold)',
  fontSize: 11,
  lineHeight: '16px',
  letterSpacing: 'var(--tracking-tight)',
  textTransform: 'uppercase',
  color: 'var(--color-text-secondary)',
};

const VALUE_VARIANTS = {
  default: {                      // value
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--weight-semibold)',
    fontSize: 14,
    lineHeight: '20px',
    color: 'var(--color-text-default)',
    whiteSpace: 'pre-line',
  },
  title: {
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--weight-bold)',
    fontSize: 16,
    lineHeight: '24px',
    color: 'var(--color-brand)',
    whiteSpace: 'pre-line',
  },
  link: {
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--weight-semibold)',
    fontSize: 14,
    lineHeight: '20px',
    color: 'var(--color-text-link)',
    textDecoration: 'underline',
    textUnderlinePosition: 'from-font',
    textDecorationSkipInk: 'none',
    whiteSpace: 'pre-line',
  },
};

export function KeyValue({ label, value, children, variant = 'default', valueColor, style = {}, ...rest }) {
  const valueStyle = {
    ...VALUE_VARIANTS[variant] || VALUE_VARIANTS.default,
    ...(valueColor ? { color: valueColor } : {}),
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, ...style }} {...rest}>
      <span style={LABEL_STYLE}>{label}</span>
      <span style={valueStyle}>{children ?? value}</span>
    </div>
  );
}
