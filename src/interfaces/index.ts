import {
  AnimationTypes,
  Theme,
  ToastContent,
  ToastOptions,
  ToastPosition,
  TypeOptions,
} from '..';

export interface ToastContainerProps {
  position?: ToastPosition;
  autoClose?: boolean;
  autoCloseDelay?: number;
  showIcons?: boolean;
  theme?: Theme;
  animation?: AnimationTypes;
  showLastOnTop?: boolean;
}

export interface ToastManagerToastProps {
  content: ToastContent;
  id: string;
  type: TypeOptions;
  position: ToastPosition;
}
