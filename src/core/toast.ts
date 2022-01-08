import { ToastManager as toastManager, Event } from './toastManager';
import { TypeOptions } from '../types';
import { TYPE } from '../utils';
import { ToastContent } from '../types';

const createToastByType = (type: TypeOptions) => (content: ToastContent) =>
  toast(content, type);

export const toast = (content: ToastContent, type: TypeOptions) => {
  console.log(`creating toast with content: ${content} and type: ${type}`);
  toastManager.publish(Event.Show, { content, type });
};
toast.success = createToastByType(TYPE.SUCCESS);
toast.warning = createToastByType(TYPE.WARNING);
toast.error = createToastByType(TYPE.ERROR);
toast.info = createToastByType(TYPE.INFO);
toast.dark = createToastByType(TYPE.DARK);
