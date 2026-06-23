import React from 'react';

export type ButtonIntent = 'primary' | 'secondary' | 'success' | 'positive' | 'negative';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  children?: React.ReactNode;
  /** Visual intent. @default 'primary' */
  intent?: ButtonIntent;
  /** Height/padding/type scale. @default 'md' */
  size?: ButtonSize;
  /** Leading icon node (SVG, sized by the button). */
  icon?: React.ReactNode;
  /** Trailing icon node. */
  iconRight?: React.ReactNode;
  /** Stretch to fill container width. @default false */
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
}

/**
 * Primary action control. Blue primary, neutral secondary, plus success/positive/negative intents.
 * @startingPoint section="Core" subtitle="Button with intents, sizes and icons" viewport="700x200"
 */
export function Button(props: ButtonProps): JSX.Element;
