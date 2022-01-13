import { toastManager, Event, ToastEmit } from './toastManager';
import {
  AnimationTypes,
  NotValidatedToastProps,
  ToastClassName,
  ToastOptions,
  ToastPosition,
  TypeOptions,
} from '../types';
import { TYPE } from '../utils';
import { ToastContent, Id } from '../types';
import { generateToastId } from '../utils';
import React from 'react';

function dispatchToast(
  content: ToastContent,
  options: NotValidatedToastProps
): Id {
  if (!content) {
    throw new Error(
      'It looks like you did not include some content for this toast. Please include either a string, React Element or something that resemples a React Element'
    );
  }

  const {
    type,
    toastId,
    position,
    animation,
    autoClose,
    showIcon,
    className,
    bodyStyle,
  } = options;

  const emit: ToastEmit = {
    content,
    type: type as TypeOptions,
    toastId: toastId,
    position: position as ToastPosition,
    toastAnimation: animation as AnimationTypes,
    toastAutoClose: autoClose as boolean,
    toastShowIcon: showIcon as boolean,
    toastClassName: className as ToastClassName,
    toastBodyStyle: bodyStyle as React.CSSProperties,
  };
  toastManager.publish(Event.Show, emit);
  return options.toastId;
}

const createToastByType =
  (type: string) =>
  (content: ToastContent, options: ToastOptions = {}) =>
    dispatchToast(content, mergeOptions(type, options));

function mergeOptions(type: string, options: ToastOptions) {
  return {
    ...options,
    type: (options && options.type) || type,
    toastId: generateToastId(),
  } as NotValidatedToastProps;
}

const toast = (content: ToastContent, options: ToastOptions) =>
  dispatchToast(content, mergeOptions(TYPE.DEFAULT, options));

toast.success = createToastByType(TYPE.SUCCESS);
toast.info = createToastByType(TYPE.INFO);
toast.warning = createToastByType(TYPE.WARNING);
toast.error = createToastByType(TYPE.ERROR);
toast.dark = createToastByType(TYPE.DARK);
toast.warn = toast.warning;

export { toast };
