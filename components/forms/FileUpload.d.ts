import React from 'react';

export type FileUploadState = 'default' | 'hover' | 'dragover' | 'error' | 'success';

export interface FileUploadProps {
  label?: string;
  /** Headline prompt. @default 'Click or drag file to this area to upload' */
  title?: string;
  hint?: string;
  /** Force a visual state; omit to let hover drive it. */
  state?: FileUploadState;
  onSelect?: () => void;
  style?: React.CSSProperties;
}

/** Dashed dropzone with cloud icon, prompt copy and a Select File button. */
export function FileUpload(props: FileUploadProps): JSX.Element;
