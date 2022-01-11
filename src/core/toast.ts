import { ToastManager as toastManager, Event } from './toastManager';
import { ToastOptions, TypeOptions } from '../types';
import { TYPE } from '../utils';
import { ToastContent } from '../types';
import { CoreToastProps } from '../interfaces';

function mergeOptions(
  content: ToastContent,
  type: string,
  options?: ToastOptions
) {
  return {
    ...options,
    content,
    type: (options && options.type) || (type as TypeOptions),
  };
}

const createToastByType =
  (type: string) => (content: ToastContent, options?: ToastOptions) =>
    toastManager.publish(
      Event.Show,
      mergeOptions(content, type, options) as CoreToastProps
    );

const toast = (content: ToastContent, options?: ToastOptions) =>
  toastManager.publish(
    Event.Show,
    mergeOptions(content, TYPE.DEFAULT, options) as CoreToastProps
  );

toast.success = createToastByType(TYPE.SUCCESS);
toast.info = createToastByType(TYPE.INFO);
toast.warning = createToastByType(TYPE.WARNING);
toast.error = createToastByType(TYPE.ERROR);
toast.warn = toast.warning;

export { toast };
