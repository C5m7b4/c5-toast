import { generateToastId } from '../utils';
import { ToastPosition } from '../types';
import { CoreToastProps, ToastManagerToastProps } from '../interfaces';

const subscribers: any[] = [];

export const enum Event {
  Show,
  Clear,
}

type SubscriberEvent = (toast: CoreToastProps) => void;

type SubscriberEventArray = SubscriberEvent[];

export let toastList: ToastManagerToastProps[] = [];

export const ToastManager = {
  toastContainerId: '',
  toastPosition: '',

  publish(event: Event, data: CoreToastProps) {
    if (!subscribers[event]) return;

    if (event == Event.Show) {
      const newToastId = generateToastId();
      const newToast = {
        ...data,
        id: newToastId,
        position: this.toastPosition as ToastPosition,
        toastAnimation: data.options?.animation || null,
      };

      toastList.push(newToast);

      const subscriberEvent: SubscriberEventArray = subscribers[event];
      if (subscriberEvent) {
        subscriberEvent.forEach((subscriberCallback: SubscriberEvent) => {
          subscriberCallback(newToast);
        });
      }
    } else {
      // we need to remove this toast from the list
      const newToastList = toastList.filter((t) => t.id !== data.id);
      toastList = newToastList;
      const subscriberEvent: SubscriberEventArray = subscribers[event];
      if (subscriberEvent) {
        subscriberEvent.forEach((subscriberCallback: (arg0: any) => void) => {
          subscriberCallback(data);
        });
      }
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
