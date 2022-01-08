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
    console.log(`publishing event: ${event} with data: ${data}`);

    if (event == Event.Show) {
      toastList.push(data);
    }

    if (!subscribers[event]) return;

    subscribers[event].forEach((subscriberCallback: (arg0: any) => void) => {
      subscriberCallback(data);
    });
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
