import React from 'react';

export interface AvatarProps {
  /** Up to 2 initials; falls back to "P". */
  initials?: string;
  /** Icon node, rendered instead of initials. */
  icon?: React.ReactNode;
  size?: number;
  /** Circle fill. @default teal brand */
  color?: string;
  textColor?: string;
  style?: React.CSSProperties;
}

/** Teal identity circle — initials, an icon, or the PHIL mark. */
export function Avatar(props: AvatarProps): JSX.Element;
