import React from 'react';

export interface CommentBoxProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSend?: (value: string) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export interface CommentItemProps {
  children?: React.ReactNode;
  /** Timestamp / author meta line. */
  meta?: React.ReactNode;
  style?: React.CSSProperties;
}

/** PA Queue comment composer — rounded field with an inline blue send button. */
export function CommentBox(props: CommentBoxProps): JSX.Element;
/** A single PA Queue activity-log entry: body text + timestamp/author meta. */
export function CommentItem(props: CommentItemProps): JSX.Element;
