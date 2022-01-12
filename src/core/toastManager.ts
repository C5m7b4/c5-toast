import { generateToastId } from '../utils';
import { ToastOptions, ToastPosition, ToastContent } from '../types';
import { CoreToastProps, ToastManagerToastProps } from '../interfaces';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const subscribers: any[] = [];

export const enum Event {
  Show,
  Clear,
}

type OnShowCallback = (content: ToastContent, options: ToastOptions) => void;
type OnClearCallback = (id?: string) => void;

type Callback = OnShowCallback | OnClearCallback;

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
        content: (data && data.content) || null,
        type: (data && data.type) || undefined,
        id: newToastId,
        position: this.toastPosition as ToastPosition,
      };

      toastList.push(newToast);

      const subscriberEvent: SubscriberEventArray = subscribers[
        event
      ] as SubscriberEventArray;
      if (subscriberEvent) {
        subscriberEvent.forEach((subscriberCallback: SubscriberEvent) => {
          subscriberCallback(newToast);
        });
      }
    } else {
      // we need to remove this toast from the list
      const newToastList = toastList.filter((t) => t.id !== data.id);
      toastList = newToastList;
      const subscriberEvent: SubscriberEventArray = subscribers[
        event
      ] as SubscriberEventArray;
      if (subscriberEvent) {
        subscriberEvent.forEach((subscriberCallback: (arg0: any) => void) => {
          subscriberCallback(data);
        });
      }
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscribe(event: Event, callback: OnShowCallback | IdOnly) {
    console.log(`event:${event} is subscribing`);
    if (!subscribers[event]) {
      subscribers[event] = [];
    }

    let eventAlreadyExists = false;

    const subscriberEvent: SubscriberEventArray = subscribers[
      event
    ] as SubscriberEventArray;
    if (subscriberEvent) {
      subscriberEvent.forEach((event: SubscriberEvent) => {
        if (event.toString() == callback.toString()) {
          eventAlreadyExists = true;
        }

        if (!eventAlreadyExists) {
          subscriberEvent.push(callback);
        }
      });
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
