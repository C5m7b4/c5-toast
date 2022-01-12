import { toastManager, Event } from './toastManager';
import { NotValidatedToastProps, ToastOptions } from '../types';
import { TYPE } from '../utils';
import { ToastContent, Id } from '../types';
import { generateToastId } from '../utils';

function dispatchToast(
  content: ToastContent,
  options: NotValidatedToastProps
): Id {
  toastManager.publish(Event.Show, content, options);
  return options.toastId;
}

const createToastByType =
  (type: string) => (content: ToastContent, options?: ToastOptions) =>
    dispatchToast(content, mergeOptions(type, options));

function mergeOptions(type: string, options?: ToastOptions) {
  return {
    ...options,
    type: (options && options.type) || type,
    toastId: generateToastId(),
  } as NotValidatedToastProps;
}

const toast = (content: ToastContent, options?: ToastOptions) =>
  dispatchToast(content, mergeOptions(TYPE.DEFAULT, options));

toast.success = createToastByType(TYPE.SUCCESS);
toast.info = createToastByType(TYPE.INFO);
toast.warning = createToastByType(TYPE.WARNING);
toast.error = createToastByType(TYPE.ERROR);
toast.dark = createToastByType(TYPE.DARK);
toast.warn = toast.warning;

export { toast };
