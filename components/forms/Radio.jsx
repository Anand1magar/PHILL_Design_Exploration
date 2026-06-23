import React from 'react';

/**
 * PHIL Radio — single-select control. Blue filled ring when checked, gray ring when not.
 */
export function Radio({
  label, checked = false, disabled = false, name, value, onChange, id, style = {}, ...rest
}) {
  const ringColor = checked ? 'var(--color-button-primary-default)' : 'var(--color-border-strong)';
  return (
    <label
      htmlFor={id}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, ...style,
      }}
    >
      <input
        id={id} type="radio" name={name} value={value} checked={checked}
        disabled={disabled} onChange={onChange}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
        {...rest}
      />
      <span style={{
        width: 20, height: 20, borderRadius: '50%',
        boxShadow: `inset 0 0 0 2px ${ringColor}`,
        backgroundColor: 'var(--color-surface-default)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, transition: 'box-shadow 120ms ease',
      }}>
        {checked ? (
          <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'var(--color-button-primary-default)' }} />
        ) : null}
      </span>
      {label ? (
        <span style={{
          fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-medium)',
          fontSize: 14, lineHeight: '20px', color: 'var(--color-text-default)',
        }}>{label}</span>
      ) : null}
    </label>
  );
}
