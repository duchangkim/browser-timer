type EventName = 'seconds-updated' | 'timer-finish';

interface Events {
  [eventName: string]: Array<Function>;
}

export default class EventBus {
  events: Events;

  constructor() {
    this.events = {};
  }

  on(eventName: EventName, listener: Function) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(listener);
  }

  emit(eventName: EventName) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((listener: Function) => listener.apply(this));
    }
  }
}
