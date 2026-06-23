import React from 'react';

export type PAStatus = 'pending' | 'approved' | 'denied' | 'expired' | 'cancelled';

export interface StatusPillProps {
  /** Prior-auth status. @default 'pending' */
  status?: PAStatus;
  /** Override the default label text. */
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * Prior-authorization status pill — colored dot + uppercase label.
 * @startingPoint section="Core" subtitle="PA status pill: pending / approved / denied / expired" viewport="700x140"
 */
export function StatusPill(props: StatusPillProps): JSX.Element;
