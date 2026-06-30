import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { Avatar } from '../layout/Avatar.jsx';
import { Button } from '../core/Button.jsx';

/**
 * PHIL AppHeader — teal brand band, centered 1316px content area.
 * Figma node 1:1346: action pills use light #F5F7F6 bg + #E6E6E6 border + black text (not translucent).
 * Avatar is white circle with teal initials.
 */
export function AppHeader({
  actions = [{ icon: 'moon', label: 'Sleep Order' }, { icon: 'comment', label: 'Order Insights' }],
  user = { initials: 'P' }, theme = 'brand', logo = 'PHIL', onMenuClick, style = {}, ...rest
}) {
  const brand = theme === 'brand';

  return (
    <header
      style={{
        height: 'var(--header-height)',
        width: '100%',
        boxSizing: 'border-box',
        backgroundColor: brand ? 'var(--color-header-bg)' : 'var(--color-surface-default)',
        borderBottom: brand ? '1px solid rgba(0,0,0,0.08)' : 'var(--border-hairline)',
        ...style,
      }}
      {...rest}
    >
      <div style={{
        maxWidth: 1316,
        margin: '0 auto',
        height: '100%',
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
      }}>
        {/* Left: menu toggle + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {onMenuClick && (
            <button onClick={onMenuClick} style={{
              width: 32, height: 32, borderRadius: 6, border: 'none', cursor: 'pointer',
              display: 'inline-flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: 4,
              background: 'color-mix(in srgb, var(--neutral-0) 14%, transparent)',
              transition: 'background 150ms ease', flexShrink: 0, padding: 0,
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'color-mix(in srgb, var(--neutral-0) 22%, transparent)'}
              onMouseLeave={e => e.currentTarget.style.background = 'color-mix(in srgb, var(--neutral-0) 14%, transparent)'}
            >
              {[0,1,2].map(i => (
                <span key={i} style={{ width: 14, height: 1.5, borderRadius: 2, background: 'var(--neutral-0)', display: 'block' }} />
              ))}
            </button>
          )}
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 'var(--weight-extrabold)',
            fontSize: 26, letterSpacing: '0.5px',
            color: brand ? 'var(--neutral-0)' : 'var(--color-text-default)',
          }}>{logo}</span>
        </div>

        {/* Right side: action pills + avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* Action pill group */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {actions.map((a, i) => (
              <Button key={i} intent="headerAction" size="md"
                icon={a.icon ? <Icon name={a.icon} size={18} color="var(--neutral-900)" /> : null}
                onClick={a.onClick}>
                {a.label}
              </Button>
            ))}
          </div>

          {/* Avatar — white bg with teal initials, per Figma */}
          <Avatar
            initials={user.initials}
            size={36}
            color="var(--neutral-0)"
            textColor="var(--color-brand)"
          />
        </div>
      </div>
    </header>
  );
}
