import React from 'react';

export interface HeaderAction { icon?: string; label: string; onClick?: () => void; }

export interface AppHeaderProps {
  actions?: HeaderAction[];
  user?: { initials?: string };
  /** 'brand' = teal band (default, as in the product); 'light' = white bar. */
  theme?: 'brand' | 'light';
  logo?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * Product top bar — teal brand band, white PHIL wordmark, pill actions + avatar.
 * @startingPoint section="Navigation" subtitle="Teal app header with actions + avatar" viewport="1280x76"
 */
export function AppHeader(props: AppHeaderProps): JSX.Element;
