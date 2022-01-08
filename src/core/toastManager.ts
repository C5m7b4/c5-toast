import { generateToastId } from '../utils';
import { TypeOptions } from '../types';

export let events: ToastManagerEvent[] = [];

export type ToastManagerEvent = {
  id: string;
  content: string;
  fn: () => void;
  type: TypeOptions;
};

type AddProps = {
  content: string;
  fn: () => void;
};

export const ToastManager = {
  toastContainerId: '',

  add(content: string, type: TypeOptions, fn: () => void): string {
    const id = generateToastId();
    events.push({ id, content, fn, type });
    console.log('events', events);
    return id;
  },

  remove(id: string) {
    const position = this.getEventPosition(id);
    events = events.filter((e) => e.id !== id);
    console.log(events);
  },

  emit(id: string) {
    const event: ToastManagerEvent | null = this.getEvent(id);
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
