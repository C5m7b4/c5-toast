import {
  ToastContent,
  ToastPosition,
  NotValidatedToastProps,
  Id,
  ToastProps,
} from '../types';

// const subscribers: any[] = [];

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
  publish(event: Event.Clear, id?: string | number): void;
  publish(
    event: Event.Show,
    content: ToastContent,
    options: NotValidatedToastProps
  ): void;

  getToastList(): ToastProps[];
  setContainerId(id: string): void;
  getContainerId(): string;
  setToastPosition(position: ToastPosition): void;
}

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

  publish(event: Event, ...args: any[]) {
    this.list.has(event) &&
      this.list.get(event)!.forEach((callback: Callback) => {
        if (event == Event.Show) {
          const { toastId, type } = args[1];
          const content = args[0];
          const options = args[1];

          const newToast = {
            content,
            type,
            toastId: toastId,
            position: this.toastPosition,
            options: args[1],
            toastAnimation: options.animation || undefined,
          };

          this.toastList.push(newToast);

          const timer: TimeoutId = setTimeout(() => {
            // @ts-ignore
            callback(newToast, options);
          }, 0);
        } else {
          // we need to remove this toast from the list
          const newToastList = this.toastList.filter(
            (t) => t.toastId !== args[1].toastId
          );
          this.toastList = newToastList;
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
