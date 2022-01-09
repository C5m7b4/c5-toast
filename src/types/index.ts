import React from 'react';

export type TypeOptions =
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'default'
  | 'dark';

export type ToastPosition =
  | 'top-right'
  | 'top-center'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left';

export type Theme = 'light' | 'dark' | 'colored';

export type ToastClassName =
  | {
      type?: TypeOptions;
      defaultClassName?: string;
      position?: ToastPosition;
    }
  | string;

export interface ToastContentProps {
  closeToast?: () => void;
}

// export type ToastContent =
//   | React.ReactNode
//   | ((props: ToastContentProps) => React.ReactNode);
export type ToastContent = React.ReactNode;
