import React, { useState } from 'react';
import { Icon } from '../core/Icon.jsx';

/**
 * PHIL Select — labeled dropdown trigger. Same box as Input with a trailing chevron.
 * Lightweight (renders a styled native menu); placeholder text is muted.
 */
export function Select({
  label, placeholder = 'Select option', value, onChange, options = [],
  disabled = false, error = false, id, style = {}, ...rest
}) {
  const [focused, setFocused] = useState(false);
  const borderColor = error ? 'var(--color-text-danger)'
    : focused ? 'var(--color-button-primary-default)'
    : 'var(--color-border-muted)';
  const ring = focused && !error ? ', 0 0 0 3px rgba(35,99,195,0.12)' : '';
  const empty = value == null || value === '';

  return (
    <label htmlFor={id} style={{ display: 'flex', flexDirection: 'column', gap: 8, ...style }}>
      {label ? (
        <span style={{
          fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-bold)',
          fontSize: 14, lineHeight: '20px', color: 'var(--color-text-secondary)',
        }}>{label}</span>
      ) : null}
      <div style={{ position: 'relative', display: 'flex' }}>
        <select
          id={id}
          value={value ?? ''}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            height: 46,
            padding: '12px 40px 12px 16px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: disabled ? 'var(--color-surface-muted)' : 'var(--color-surface-default)',
            border: 'none',
            boxShadow: `inset 0 0 0 1px ${borderColor}, var(--shadow-xs)${ring}`,
            fontFamily: 'var(--font-body)',
            fontWeight: 'var(--weight-regular)',
            fontSize: 14,
            lineHeight: '20px',
            color: empty ? 'var(--neutral-400)' : 'var(--color-text-default)',
            outline: 'none',
            width: '100%',
            boxSizing: 'border-box',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.6 : 1,
            appearance: 'none',
            WebkitAppearance: 'none',
            transition: 'box-shadow 120ms ease',
          }}
          {...rest}
        >
          <option value="" disabled hidden>{placeholder}</option>
          {options.map((o) => {
            const opt = typeof o === 'string' ? { value: o, label: o } : o;
            return <option key={opt.value} value={opt.value}>{opt.label}</option>;
          })}
        </select>
        <span style={{
          position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
          pointerEvents: 'none', color: 'var(--color-text-secondary)', display: 'inline-flex',
        }}>
          <Icon name="chevron-down" size={16} />
        </span>
      </div>
    </label>
  );
}
