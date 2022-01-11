import { ToastManager as toastManager, Event } from './toastManager';
import { ToastOptions, TypeOptions } from '../types';
import { TYPE } from '../utils';
import { ToastContent } from '../types';

const createToastByType =
  (type: string) => (content: ToastContent, options?: ToastOptions) =>
    toastManager.publish(Event.Show, mergeOptions(type, options));

function mergeOptions(type: string, options?: ToastOptions) {
  return {
    ...options,
    type: (options && options.type) || type,
  };
}

const toast = (content: ToastContent, options?: ToastOptions) =>
  toastManager.publish(Event.Show, mergeOptions(TYPE.DEFAULT, options));

toast.success = createToastByType(TYPE.SUCCESS);
toast.info = createToastByType(TYPE.INFO);
toast.warning = createToastByType(TYPE.WARNING);
toast.error = createToastByType(TYPE.ERROR);
toast.warn = toast.warning;

export { toast };
