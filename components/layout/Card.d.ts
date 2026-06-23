import React from 'react';

export interface CardProps {
  children?: React.ReactNode;
  /** Bold title rendered in the header row. */
  title?: React.ReactNode;
  /** Custom header action node (overrides the copy button). */
  action?: React.ReactNode;
  /** Show a copy icon button in the header and call this on click. */
  onCopy?: () => void;
  padding?: number;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
}

/**
 * White detail surface — radius 16, hairline border + soft shadow, optional title/copy header.
 * @startingPoint section="Layout" subtitle="Detail card with title and copy action" viewport="700x260"
 */
export function Card(props: CardProps): JSX.Element;
