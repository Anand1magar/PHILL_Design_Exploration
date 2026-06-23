import React from 'react';

export interface SelectOption { value: string; label: string; }

export interface SelectProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  /** Options as strings or {value,label} objects. */
  options?: (string | SelectOption)[];
  disabled?: boolean;
  error?: boolean;
  id?: string;
  style?: React.CSSProperties;
}

/** Labeled dropdown — matches Input's box with a trailing chevron; muted placeholder. */
export function Select(props: SelectProps): JSX.Element;
