import React, { useState } from 'react';
import { Icon } from '../core/Icon.jsx';

/**
 * PHIL CommentBox — the PA Queue comment composer.
 * White rounded field with an inline blue send button (bottom-right).
 */
export function CommentBox({
  placeholder = 'Type your comment here.', value, onChange, onSend, disabled = false, style = {}, ...rest
}) {
  const [internal, setInternal] = useState('');
  const controlled = value != null;
  const val = controlled ? value : internal;
  const setVal = (v) => { if (!controlled) setInternal(v); onChange && onChange(v); };
  const canSend = !disabled && String(val).trim().length > 0;

  return (
    <div
      style={{
        position: 'relative', borderRadius: 'var(--radius-lg)',
        backgroundColor: 'var(--color-surface-default)',
        boxShadow: 'inset 0 0 0 1px var(--color-border-muted)',
        padding: 12, boxSizing: 'border-box', ...style,
      }}
      {...rest}
    >
      <textarea
        value={val}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => setVal(e.target.value)}
        rows={3}
        style={{
          width: '100%', border: 'none', outline: 'none', resize: 'none',
          fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: '20px',
          color: 'var(--color-text-default)', backgroundColor: 'transparent',
          paddingRight: 36, boxSizing: 'border-box',
        }}
      />
      <button
        onClick={() => { if (canSend) { onSend && onSend(val); setVal(''); } }}
        aria-label="Send comment"
        disabled={!canSend}
        style={{
          position: 'absolute', right: 12, bottom: 12, width: 28, height: 28,
          borderRadius: '50%', border: 'none', display: 'inline-flex',
          alignItems: 'center', justifyContent: 'center',
          backgroundColor: canSend ? 'var(--blue-100)' : 'var(--neutral-100)',
          color: canSend ? 'var(--blue-600)' : 'var(--neutral-400)',
          cursor: canSend ? 'pointer' : 'default', transition: 'all 120ms ease',
        }}
      >
        <Icon name="send" size={15} />
      </button>
    </div>
  );
}

/**
 * PHIL CommentItem — a single PA Queue activity-log entry: body text + timestamp/author meta.
 */
export function CommentItem({ children, meta, style = {}, ...rest }) {
  return (
    <div
      style={{
        display: 'flex', flexDirection: 'column', gap: 6,
        padding: '14px 16px', borderRadius: 6,
        backgroundColor: 'var(--color-surface-default)',
        boxShadow: '0 1px 1px rgba(0,0,0,0.03)',
        wordBreak: 'break-word', boxSizing: 'border-box', ...style,
      }}
      {...rest}
    >
      <span style={{
        fontFamily: 'var(--font-ui)', fontWeight: 'var(--weight-regular)',
        fontSize: 13, lineHeight: '18.2px', color: 'var(--teal-600)',
      }}>{children}</span>
      {meta ? (
        <span style={{
          fontFamily: 'var(--font-ui)', fontWeight: 'var(--weight-regular)',
          fontSize: 11, lineHeight: '16.5px', color: 'var(--color-text-secondary)',
        }}>{meta}</span>
      ) : null}
    </div>
  );
}
