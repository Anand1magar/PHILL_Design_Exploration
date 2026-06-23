import React from 'react';

export type AlertTone = 'red' | 'blue' | 'green' | 'amber';

export interface AlertProps {
  /** Uppercase eyebrow above the card, e.g. "CLAIM REJECTED". */
  eyebrow?: React.ReactNode;
  /** Colored code/headline (left). */
  code?: React.ReactNode;
  /** Right-aligned source/name. */
  source?: React.ReactNode;
  /** Body copy. */
  children?: React.ReactNode;
  /** @default 'red' */
  tone?: AlertTone;
  style?: React.CSSProperties;
}

/** Labeled exception/notice block — uppercase eyebrow over a bordered card with code, source and body. */
export function Alert(props: AlertProps): JSX.Element;
