import React, { useState } from 'react';
import { Icon } from '../core/Icon.jsx';
import { Button } from '../core/Button.jsx';

/**
 * PHIL FileUpload — dashed dropzone. Cloud icon in a soft blue circle, prompt copy, Select File button.
 * Mirrors the Figma FileUpload set (default / hover / drag-over states via `state`).
 */
const STATE_STYLES = {
  default:  { outline: '2px dashed var(--blue-300)', bg: 'var(--color-surface-default)' },
  hover:    { outline: '2px dashed var(--blue-400)', bg: 'var(--blue-50)' },
  dragover: { outline: '2px dashed var(--blue-500)', bg: 'var(--blue-100)' },
  error:    { outline: '2px dashed var(--red-300)',  bg: 'var(--red-50)' },
  success:  { outline: '2px dashed var(--green-200)', bg: 'var(--green-50)' },
};

export function FileUpload({
  label, title = 'Click or drag file to this area to upload',
  hint = 'Supports single or bulk upload.', state, onSelect, style = {}, ...rest
}) {
  const [hovered, setHovered] = useState(false);
  const active = state || (hovered ? 'hover' : 'default');
  const s = STATE_STYLES[active] || STATE_STYLES.default;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, ...style }} {...rest}>
      {label ? (
        <span style={{
          fontFamily: 'var(--font-ui)', fontWeight: 'var(--weight-bold)',
          fontSize: 14, color: 'var(--neutral-400)',
        }}>{label}</span>
      ) : null}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center',
          padding: 32, borderRadius: 'var(--radius-xl)',
          backgroundColor: s.bg, outline: s.outline, outlineOffset: -2,
          transition: 'background-color 120ms ease, outline-color 120ms ease',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
          <span style={{
            width: 64, height: 64, borderRadius: '50%', backgroundColor: 'var(--blue-50)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--blue-600)',
          }}>
            <Icon name="cloud-upload" size={32} strokeWidth={1.75} />
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
            <span style={{
              fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-bold)',
              fontSize: 16, lineHeight: '24px', color: 'var(--neutral-800)', textAlign: 'center',
            }}>{title}</span>
            <span style={{
              fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-medium)',
              fontSize: 14, lineHeight: '20px', color: 'var(--neutral-400)', textAlign: 'center',
            }}>{hint}</span>
          </div>
        </div>
        <Button intent="primary" size="md" onClick={onSelect}>Select File</Button>
      </div>
    </div>
  );
}
