import React from 'react';
import {
  ToastContent,
  ToastPosition,
  NotValidatedToastProps,
  Id,
  ToastProps,
  ToastClassName,
  TypeOptions,
  AnimationTypes,
} from '../types';

type TimeoutId = ReturnType<typeof setTimeout>;

export const enum Event {
  Show,
  Clear,
}

export type OnShowCallback = (
  content: ToastContent,
  options: NotValidatedToastProps
) => void;

export type OnClearCallback = (id?: Id) => void;

type Callback = OnShowCallback | OnClearCallback;

export interface ToastManager {
  list: Map<Event, Callback[]>;
  toastList: ToastProps[];
  toastContainerId: string;
  toastPosition: ToastPosition;
  subscribe(event: Event, callback: OnShowCallback): ToastManager;
  subscribe(event: Event, callback: OnClearCallback): ToastManager;
  publish(event: Event.Clear, id: Id): void;
  publish(event: Event.Show, args: ToastEmit): void;

  getToastList(): ToastProps[];
  setContainerId(id: string): void;
  getContainerId(): string;
  setToastPosition(position: ToastPosition): void;
}

export type ToastEmit = {
  content: ToastContent;
  toastId: Id;
  type: TypeOptions;
  position: ToastPosition;
  toastAnimation: AnimationTypes;
  toastAutoClose: boolean;
  toastShowIcon: boolean;
  toastClassName: ToastClassName;
  toastBodyStyle: React.CSSProperties;
};

type EventEmitType = ToastEmit | Id;

export const toastManager: ToastManager = {
  list: new Map(),
  toastList: [],
  toastContainerId: '',
  toastPosition: 'top-right',

  subscribe(event: Event, callback: Callback) {
    this.list.has(event) || this.list.set(event, []);
    const listLength = this.list.get(event)!.length;
    if (listLength === 0) {
      this.list.get(event)!.push(callback);
    }

    return this;
  },

  publish(event: Event, args: EventEmitType) {
    this.list.has(event) &&
      this.list.get(event)!.forEach((callback: Callback) => {
        if (event == Event.Show) {
          const {
            content,
            toastId,
            type,
            toastAutoClose,
            toastShowIcon,
            toastClassName,
            toastBodyStyle,
            toastAnimation,
          } = args as ToastEmit;

          const newToast: ToastProps = {
            content,
            type,
            toastId: toastId,
            position: this.toastPosition,
            toastAnimation: toastAnimation,
            toastAutoClose: toastAutoClose,
            toastShowIcon: toastShowIcon,
            toastClassName: toastClassName,
            toastBodyStyle: toastBodyStyle,
          };

          this.toastList.push(newToast);

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const timer: TimeoutId = setTimeout(() => {
            // @ts-ignore
            callback(newToast, args);
          }, 0);
        } else {
          // we need to remove this toast from the list
          const newToastList = this.toastList.filter((t) => t.toastId !== args);
          this.toastList = newToastList;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const timer: TimeoutId = setTimeout(() => {
            // @ts-ignore
            callback(...args);
          }, 0);
        }
      });
  },

  getToastList() {
    return this.toastList;
  },

  setContainerId(id: string) {
    this.toastContainerId = id;
  },

  getContainerId(): string {
    return this.toastContainerId;
  },

  setToastPosition(position: ToastPosition): void {
    this.toastPosition = position;
  },
};
