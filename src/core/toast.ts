import { ToastManager as toastManager, Event } from './toastManager';
import { ToastOptions, TypeOptions } from '../types';
import { TYPE } from '../utils';
import { ToastContent } from '../types';

const createToastByType =
  (type: TypeOptions) => (content: ToastContent, options?: ToastOptions) =>
    toast({ content, type, options });

export interface Toast {
  content: ToastContent;
  type: TypeOptions;
  options?: ToastOptions;
}

const toast = (props: Toast) => {
  const { content, type, options } = props;
  console.log(`creating toast with content: ${content} and type: ${type}`);
  toastManager.publish(Event.Show, { content, type, options });
};

toast.success = createToastByType(TYPE.SUCCESS);
toast.warning = createToastByType(TYPE.WARNING);
toast.error = createToastByType(TYPE.ERROR);
toast.info = createToastByType(TYPE.INFO);
toast.dark = createToastByType(TYPE.DARK);

export { toast };
