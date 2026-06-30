import React from 'react';

export interface RadioProps {
  label?:    string;
  checked?:  boolean;
  disabled?: boolean;
  name?:     string;
  value?:    string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?:       string;
  /**
   * "row"    (default) — full-width bordered card row, 56px height.
   *                      Matches the Figma "Radio Buttons" component (node 16:178).
   * "inline"           — bare inline label, no border. Use for compact contexts.
   */
  variant?:  'row' | 'inline';
  style?:    React.CSSProperties;
}

/**
 * PHIL Radio — primary single-select control.
 * Default variant is "row": white card, gray border, 56px height, 24px circle, 16px label.
 * Border turns blue when checked.
 */
export function Radio(props: RadioProps): JSX.Element;
