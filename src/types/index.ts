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

export type AnimationTypes = 'slide' | 'bounce' | 'spin' | 'zoom' | 'flip';

export type Id = number | string;

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

interface CommonOptions {
  pauseOnHover?: boolean;
  closeOnClick?: boolean;
  position?: ToastPosition;
  onClick?: (event: React.MouseEvent) => void;
}

export interface ToastOptions extends CommonOptions {
  content?: ToastContent;
  animation?: AnimationTypes;
  type?: TypeOptions;
  autoClose?: boolean;
  showIcon?: boolean;
}

export interface ToastProps extends ToastOptions {
  toastId: Id;
  type: TypeOptions;
  position: ToastPosition;
  children?: ToastContent;
  className?: ToastClassName;
  bodyClassName?: ToastClassName;
  theme?: Theme;
  showIcon?: boolean;
  toastAnimation?: AnimationTypes;
  toastAutoClose?: boolean;
  toastShowIcon?: boolean;
  options?: ToastOptions;
}

export interface NotValidatedToastProps extends Partial<ToastProps> {
  toastId: Id;
  toastShowIcon: boolean;
  toastAutoClose: boolean;
}
