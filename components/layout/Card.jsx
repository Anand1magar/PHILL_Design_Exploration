import React, { useState } from 'react';
import { Icon } from '../core/Icon.jsx';

function CopyButton({ onClick }) {
  const [copied, setCopied]   = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    onClick();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <button
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Copy"
        style={{
          border: 'none', background: 'none', cursor: 'pointer', padding: 4,
          color: copied ? 'var(--teal-300)' : 'var(--color-text-secondary)',
          display: 'inline-flex', borderRadius: 4,
          transition: 'color 150ms ease',
        }}
      >
        <Icon name="copy" size={18} />
      </button>
      {(hovered || copied) && (
        <div style={{
          position: 'absolute', right: 0, top: '100%', marginTop: 6, zIndex: 100,
          background: 'var(--neutral-900)', color: 'var(--neutral-0)',
          borderRadius: 4, padding: '4px 8px',
          fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 12, lineHeight: '18px',
          whiteSpace: 'nowrap', pointerEvents: 'none',
          boxShadow: 'var(--shadow-sm)',
        }}>
          {copied ? 'Copied!' : 'Copy'}
        </div>
      )}
    </div>
  );
}

export function Card({
  children, title, action, onCopy, padding = 24, style = {}, bodyStyle = {}, ...rest
}) {
  return (
    <section
      style={{
        display: 'flex', flexDirection: 'column', gap: 16,
        padding,
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--neutral-200)',
        backgroundColor: 'var(--color-surface-default)',
        boxSizing: 'border-box',
        ...style,
      }}
      {...rest}
    >
      {(title || action || onCopy) ? (
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          {title ? (
            <h3 style={{
              margin: 0, fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-bold)',
              fontSize: 18, lineHeight: '28px', color: 'var(--color-text-default)',
            }}>{title}</h3>
          ) : <span />}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {action ?? null}
            {onCopy ? <CopyButton onClick={onCopy} /> : null}
          </div>
        </header>
      ) : null}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, ...bodyStyle }}>{children}</div>
    </section>
  );
}
