import React, { useState } from 'react';

/**
 * PHIL Input — labeled text field. White box, radius 8, inset hairline border,
 * blue focus ring, red error state. Label is Lato 700.
 */
export function Input({
  label, placeholder = '', value, defaultValue, onChange,
  error = false, disabled = false, type = 'text', id, style = {}, inputStyle = {}, ...rest
}) {
  const [focused, setFocused] = useState(false);
  const borderColor = error ? 'var(--color-text-danger)'
    : focused ? 'var(--color-button-primary-default)'
    : 'var(--color-border-muted)';
  const ring = focused && !error ? ', 0 0 0 3px rgba(35,99,195,0.12)' : '';

  return (
    <label htmlFor={id} style={{ display: 'flex', flexDirection: 'column', gap: 8, ...style }}>
      {label ? (
        <span style={{
          fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-bold)',
          fontSize: 14, lineHeight: '20px', color: 'var(--color-text-secondary)',
        }}>{label}</span>
      ) : null}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          height: 46,
          padding: '12px 16px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: disabled ? 'var(--color-surface-muted)' : 'var(--color-surface-default)',
          border: 'none',
          boxShadow: `inset 0 0 0 1px ${borderColor}, var(--shadow-xs)${ring}`,
          fontFamily: 'var(--font-body)',
          fontWeight: 'var(--weight-regular)',
          fontSize: 14,
          lineHeight: '20px',
          color: 'var(--color-text-default)',
          outline: 'none',
          width: '100%',
          boxSizing: 'border-box',
          cursor: disabled ? 'not-allowed' : 'text',
          opacity: disabled ? 0.6 : 1,
          transition: 'box-shadow 120ms ease',
          ...inputStyle,
        }}
        {...rest}
      />
    </label>
  );
}
