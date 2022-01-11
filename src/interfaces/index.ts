import {
  AnimationTypes,
  Theme,
  ToastContent,
  ToastOptions,
  ToastPosition,
  TypeOptions,
} from '..';

export interface CoreToastProps {
  content: React.ReactNode;
  type: TypeOptions;
  animation?: AnimationTypes | undefined;
  pauseOnHover?: boolean | undefined;
  closeOnClick?: boolean | undefined;
  position?: ToastPosition | undefined;
  onClick?: ((event: React.MouseEvent<HTMLElement>) => void) | undefined;
  options?: ToastOptions;
  id?: string | null;
}

export interface ToastContainerProps {
  position?: ToastPosition;
  autoClose?: boolean;
  autoCloseDelay?: number;
  showIcons?: boolean;
  theme?: Theme;
  animation?: AnimationTypes;
  showLastOnTop?: boolean;
}

export interface ToastProps {
  content: ToastContent;
  id: string;
  type: TypeOptions;
  showIcon?: boolean;
  theme?: Theme;
  position?: ToastPosition;
  animation?: AnimationTypes;
  toastAnimation?: AnimationTypes;
}

export interface ToastManagerToastProps {
  content: ToastContent;
  id: string;
  type: TypeOptions;
  position: ToastPosition;
  options?: ToastOptions;
}
