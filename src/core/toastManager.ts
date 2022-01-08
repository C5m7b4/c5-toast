import { generateToastId } from '../utils';
import { TypeOptions, ToastContent } from '../types';

export interface ToastProps {
  content: ToastContent;
  id: string;
  type: TypeOptions;
}

let subscribers: any[] = [];

export const enum Event {
  Show,
  Clear,
}

export let toastList: ToastProps[] = [];

export const ToastManager = {
  toastContainerId: '',

  publish(event: Event, data: any) {
    console.log(
      `publishing event: ${event} with data: ${JSON.stringify(data)}`
    );
    if (!subscribers[event]) return;

    if (event == Event.Show) {
      const newToastId = generateToastId();
      const newToast = { ...data, id: newToastId };

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
};
