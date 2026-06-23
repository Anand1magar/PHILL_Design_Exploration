import React from 'react';

export interface RadioProps {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  style?: React.CSSProperties;
}

/** Single-select radio control — blue filled ring when checked, gray ring otherwise. */
export function Radio(props: RadioProps): JSX.Element;
