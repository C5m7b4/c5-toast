import { ToastPosition } from '../types';

export function generateToastId(): string {
  return (
    Date.now().toString(36) + Math.random().toString(36).substr(2).toString()
  );
}

export const getToastContainerPosition = (position: ToastPosition) => {
  switch (position) {
    case 'top-right':
      return 'position: fixed; top: 10px; right: 10px;';
    case 'top-left':
      return 'position: fixed; top: 10px; left: 10px;';
    case 'top-center':
      return 'position: fixed; top: 10px; left: 50%;';
    case 'bottom-right':
      return 'position: fixed; bottom: 10px; right: 10px;';
    case 'bottom-left':
      return 'position: fixed; bottom: 10px; left: 10px;';
    case 'bottom-center':
      return 'position: fixed; bottom: 10px; left: 50%;';
    default:
      return 'position: fixed; top: 10px; right: 10px;';
  }
};
