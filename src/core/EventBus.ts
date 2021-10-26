export type EventName =
  | 'secondsUpdated'
  | 'tenthsSecondsUpdated'
  | 'hundredthsSecondsUpdated'
  | 'millisecondsUpdated'
  | 'finish'
  | 'start'
  | 'pause'
  | 'stop'
  | 'reset';

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

  removeListener(eventName: EventName, listener: Function) {
    const targetIndex = this.events[eventName].indexOf(listener);

    if (targetIndex !== -1) {
      this.events[eventName].splice(targetIndex, 1);
    }
  }

  removeListenerAll(eventName?: EventName) {
    if (!eventName) {
      this.events = {};
    } else if (Array.isArray(this.events[eventName])) {
      this.events[eventName] = [];
    }
  }
}
