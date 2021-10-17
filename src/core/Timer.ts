import EventBus from './EventBus';

export type TimerType = 'timer' | 'countdown';

export interface TimerOptions {
  type: TimerType;
  seconds: number;
}

export default class Timer {
  eventBus: EventBus;
  type: TimerType;
  seconds: number;
  endTime: number;

  constructor(options: TimerOptions) {
    this.eventBus = new EventBus();

    this.type = options.type;
    this.seconds = options.seconds;

    this.endTime = Date.now() + this.seconds * 1000;
  }
}
