import { generateToastId } from '../utils';

export let events: PubSubEvent[] = [];

export type PubSubEvent = {
  id: string;
  eventName: string;
  fn: () => void;
};

type AddProps = {
  eventName: string;
  fn: () => void;
};

export const PubSub = {
  toastContainerId: '',

  add(eventName: string, fn: () => void): string {
    const id = generateToastId();
    events.push({ id, eventName, fn });
    console.log('events', events);
    return id;
  },

  remove(id: string) {
    const position = this.getEventPosition(id);
    events = events.filter((e) => e.id !== id);
    console.log(events);
  },

  emit(id: string) {
    const event: PubSubEvent | null = this.getEvent(id);
    if (event) {
      event.fn();
    }
  },

  getEvent(id: string) {
    const event = events.filter((e) => e.id === id)[0];
    if (!event) return null;
    return event;
  },

  getEventPosition(id: string): number {
    const position = events.findIndex((e) => e.id === id);
    return position;
  },

  setContainerId(id: string) {
    this.toastContainerId = id;
  },

  getContainerId(): string {
    return this.toastContainerId;
  },
};
