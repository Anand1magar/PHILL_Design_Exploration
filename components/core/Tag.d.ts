import React from 'react';

export type TagColor = 'blue' | 'gray' | 'green' | 'orange' | 'purple' | 'red';

export interface TagProps {
  children?: React.ReactNode;
  /** Semantic color. @default 'gray' */
  color?: TagColor;
  /** Fill style. @default 'solid' */
  variant?: 'solid' | 'outlined';
  /** @default 'sm' */
  size?: 'sm' | 'lg';
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  /** Optional trailing count bubble (the "Stats" variant). */
  stat?: number | string;
  style?: React.CSSProperties;
}

/** Compact label chip in six semantic colors, solid or outlined, with optional icon and stat count. */
export function Tag(props: TagProps): JSX.Element;
