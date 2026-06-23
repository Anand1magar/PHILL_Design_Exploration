import React from 'react';

export type IconName =
  | 'chevron-down' | 'chevron-right' | 'chevron-left' | 'copy' | 'shield-check'
  | 'cloud-upload' | 'info' | 'circle-help' | 'arrow-up-right' | 'external-link'
  | 'comment' | 'message-square' | 'moon' | 'send' | 'check-circle' | 'check'
  | 'x' | 'edit' | 'folder' | 'file' | 'search' | 'plus' | 'user' | 'bell'
  | 'list-checks' | 'clock' | 'alert-circle' | 'pill' | 'building' | 'phone';

export interface IconProps {
  name: IconName;
  /** Square px size. @default 20 */
  size?: number;
  /** Stroke color; defaults to currentColor so it inherits text color. */
  color?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;
}

/** 24×24 line icon set (2px stroke, currentColor) covering the prior-auth ops UI. */
export function Icon(props: IconProps): JSX.Element;
export const ICON_NAMES: string[];
