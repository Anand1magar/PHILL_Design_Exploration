import React from 'react';

export interface ProgressBarProps {
  /** Fill percent 0–100. @default 40 */
  value?: number;
  /** Left accent label. @default '3 days remaining' */
  remainingLabel?: string;
  /** Right meta label. @default 'DAY 2 OF 5 BUSINESS DAYS' */
  dayLabel?: string;
  /** Optional footer date. */
  initiatedOn?: string;
  /** Color tone. @default 'blue' */
  tone?: 'blue' | 'green' | 'amber';
  style?: React.CSSProperties;
}

/**
 * Prior-auth SLA tracker — soft panel, glassy pill track, remaining/business-day labels.
 * @startingPoint section="Feedback" subtitle="PA SLA progress tracker card" viewport="700x150"
 */
export function ProgressBar(props: ProgressBarProps): JSX.Element;
