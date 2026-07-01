import React from 'react';

/**
 * PHIL Radio — Figma component: "Radio Buttons" (node 16:178 / 1099:1842)
 *
 * variant="row" (default)
 *   Full-width bordered card row. Matches Figma exactly.
 *   Border + circle ring turn blue when checked.
 *
 * variant="inline"
 *   Bare inline label, no border. Use for compact/legacy contexts.
 *
 * Deselect behaviour (built-in):
 *   Clicking an already-selected option calls onChange('') to clear the value.
 *   onChange receives the selected value string on select, '' on deselect.
 */
export function Radio({
  label,
  checked   = false,
  disabled  = false,
  name,
  value,
  onChange,
  id,
  variant   = 'row',
  style     = {},
  ...rest
}) {
  const isRow     = variant === 'row';
  const ringColor = checked ? 'var(--blue-600)' : '#d9d9d9';

  // All click logic lives here; hidden input onChange is a no-op.
  const handleClick = (e) => {
    e.preventDefault();
    if (disabled) return;
    onChange && onChange(checked ? '' : value);
  };

  const hiddenInput = (
    <input
      id={id} type="radio" name={name} value={value}
      checked={checked} disabled={disabled}
      onChange={() => {}}
      style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
      {...rest}
    />
  );

  const circle = (
    <span style={{
      width: 24, height: 24, borderRadius: '50%',
      border: `2px solid ${ringColor}`,
      background: 'transparent',
      boxSizing: 'border-box',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, transition: 'border-color 120ms ease',
    }}>
      {checked && (
        <span style={{
          width: 10, height: 10, borderRadius: '50%',
          background: 'var(--blue-600)',
          transition: 'transform 120ms ease',
        }} />
      )}
    </span>
  );

  if (isRow) {
    return (
      <label htmlFor={id} onClick={handleClick} style={{
        display: 'flex', alignItems: 'center', gap: 8,
        width: '100%', padding: 8,
        background: checked ? '#ecf1f9' : 'var(--color-surface-default)',
        border: `1px solid ${checked ? 'var(--blue-600)' : '#d9d9d9'}`,
        borderRadius: 4,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'border-color 120ms ease, background 120ms ease',
        boxSizing: 'border-box',
        ...style,
      }}>
        {hiddenInput}
        <span style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 8, borderRadius: '100px', flexShrink: 0,
        }}>
          {circle}
        </span>
        <span style={{
          flex: '1 0 0', minWidth: 0,
          fontFamily: 'var(--font-body)', fontWeight: 400,
          fontSize: 16, lineHeight: '24px', letterSpacing: '0.024px',
          color: 'var(--color-text-default)',
        }}>
          {label}
        </span>
      </label>
    );
  }

  return (
    <label htmlFor={id} onClick={handleClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      ...style,
    }}>
      {hiddenInput}
      <span style={{
        width: 20, height: 20, borderRadius: '50%',
        border: `2px solid ${checked ? 'var(--blue-600)' : 'var(--color-border-strong)'}`,
        background: 'transparent',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, transition: 'border-color 120ms ease',
      }}>
        {checked && (
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--blue-600)' }} />
        )}
      </span>
      {label && (
        <span style={{
          fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-medium)',
          fontSize: 14, lineHeight: '20px', color: 'var(--color-text-default)',
        }}>
          {label}
        </span>
      )}
    </label>
  );
}
