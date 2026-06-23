import React from 'react';

export interface KeyValueProps {
  /** Uppercase micro-label. */
  label: React.ReactNode;
  /** Value text (or use children). */
  value?: React.ReactNode;
  children?: React.ReactNode;
  /** Override value color (e.g. red for allergies). */
  valueColor?: string;
  style?: React.CSSProperties;
}

/** Labeled data row — uppercase tight label over a medium-weight value. Supports multi-line values. */
export function KeyValue(props: KeyValueProps): JSX.Element;
