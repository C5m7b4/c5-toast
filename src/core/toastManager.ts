import { generateToastId } from '../utils';
import { TypeOptions, ToastContent, ToastPosition } from '../types';
import { ToastManagerToastProps } from '../interfaces';

let subscribers: any[] = [];

export const enum Event {
  Show,
  Clear,
}

export let toastList: ToastManagerToastProps[] = [];

export const ToastManager = {
  toastContainerId: '',
  toastPosition: '',

  publish(event: Event, data: any) {
    if (!subscribers[event]) return;

    if (event == Event.Show) {
      const newToastId = generateToastId();
      const newToast = {
        ...data,
        id: newToastId,
        position: this.toastPosition,
        toastAnimation: data.options?.animation || null,
      };

      toastList.push(newToast);

      subscribers[event].forEach((subscriberCallback: (arg0: any) => void) => {
        subscriberCallback(newToast);
      });
    } else {
      // we need to remove this toast from the list
      const newToastList = toastList.filter((t) => t.id !== data.id);
      toastList = newToastList;
      subscribers[event].forEach((subscriberCallback: (arg0: any) => void) => {
        subscriberCallback(data);
      });
    }
  },

  subscribe(event: Event, callback: any) {
    console.log(`event:${event} is subscribing`);
    if (!subscribers[event]) {
      subscribers[event] = [];
    }

    let eventAlreadyExists = false;

    subscribers[event].forEach((event: any) => {
      if (event.toString() == callback.toString()) {
        eventAlreadyExists = true;
      }
    });

    if (!eventAlreadyExists) {
      subscribers[event].push(callback);
    }

    console.log('subscribers', subscribers);
  },
  getToastList() {
    return toastList;
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
