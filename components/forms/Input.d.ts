import React from 'react';

export interface InputProps {
  /** Bold label rendered above the field. */
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Red error state. @default false */
  error?: boolean;
  disabled?: boolean;
  type?: string;
  id?: string;
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
}

/** Labeled text input — white box, hairline border, blue focus ring, red error state. */
export function Input(props: InputProps): JSX.Element;
