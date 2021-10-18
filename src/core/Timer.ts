import EventBus, { EventName } from './EventBus';

export type TimerType = 'timer' | 'countdown';

export interface TimerOptions {
  type: TimerType;
  seconds: number;
}

export default class Timer {
  eventBus: EventBus;
  type: TimerType;
  seconds: number;
  msCount = 0;
  endTime = 0;
  intervalRef = 0;
  timerSeconds = 0;

  constructor(options: TimerOptions) {
    this.eventBus = new EventBus();

    this.type = options.type;
    this.seconds = options.seconds;
  }

  start() {
    this.endTime = Date.now() + this.seconds * 1000;
    this.intervalRef = window.setInterval(
      () => (this.type === 'countdown' ? this.countdown() : this.timer()),
      10,
    );
  }

  pause() {}

  restart() {}

  reset() {}

  setSeconds(seconds: number) {
    this.seconds = seconds;
  }

  countdown() {
    const currentTime = Date.now();
    this.msCount = this.endTime - currentTime;

    const s = Math.ceil((this.msCount / 1000) % 60);

    if (this.timerSeconds !== s) {
      this.timerSeconds = s;
      this.eventBus.emit('seconds-updated');
    }

    if (this.msCount < 0) {
      window.clearInterval(this.intervalRef);
      this.eventBus.emit('timer-finish');
    }
  }

  timer() {}

  // getters
  getSeconds() {
    return this.timerSeconds;
  }

  // events
  addEventListener(eventName: EventName, listener: Function) {
    this.eventBus.on(eventName, listener);
  }

  removeEventListener(eventName: EventName, listener: Function) {
    this.eventBus.on(eventName, listener);
  }

  removeListenerAll(eventName?: EventName) {
    this.eventBus.removeListenerAll(eventName);
  }
}
