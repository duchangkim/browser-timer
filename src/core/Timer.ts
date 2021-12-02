import EventBus, { EventName } from './EventBus';

export type TimerType = 'timer' | 'countdown';

export interface TimerOptions {
  type: TimerType;
  seconds?: number;
}

export class Timer {
  private eventBus: EventBus;
  private intervalRef = 0;
  private isPause = false;
  private type: TimerType;
  private seconds: number;
  private msCount = 0;
  private endTime = 0;
  private timerSeconds = 0;
  private timerTenthsSeconds = 0;
  private timerHundredthsSeconds = 0;
  private timerMilliseconds = 0;

  constructor(options: TimerOptions) {
    this.eventBus = new EventBus();

    this.type = options.type;
    this.seconds = options.seconds || 0;
  }

  start() {
    if (this.intervalRef > 0) return;

    if (!this.isPause) {
      this.msCount = this.seconds * 1000;
    }

    this.endTime = Date.now() + this.msCount;
    this.intervalRef = window.setInterval(
      () => (this.type === 'countdown' ? this.countdown() : this.timer()),
      1,
    );
    this.isPause = false;
  }

  pause() {
    if (this.intervalRef === 0) return;

    clearInterval(this.intervalRef);
    this.intervalRef = 0;
    this.isPause = true;
    this.eventBus.emit('pause');
  }

  stop() {
    if (this.intervalRef === 0) return;

    clearInterval(this.intervalRef);
    this.intervalRef = 0;
    this.eventBus.emit('stop');
  }

  reset(second?: number) {
    if (second) {
      this.seconds = second;
    }
    this.msCount = this.seconds * 1000;
    this.endTime = Date.now() + this.msCount;
    this.timerSeconds = this.seconds;
    this.eventBus.emit('secondsUpdated');
    this.eventBus.emit('reset');
  }

  setSeconds(seconds: number) {
    this.seconds = seconds;
  }

  private countdown() {
    const currentTime = Date.now();
    this.msCount = this.endTime - currentTime;

    if (this.msCount <= 0) {
      this.timerSeconds = 0;
      this.eventBus.emit('secondsUpdated');
      this.timerMilliseconds = 0;

      window.clearInterval(this.intervalRef);
      this.intervalRef = 0;
      this.eventBus.emit('finish');
      this.eventBus.emit('millisecondsUpdated');
    }

    /*
     * 1000ms === 1sec
     * 100cs === 1sec  1cs === 10ms
     * 10ds === 1sec   1ds === 100ms
     */
    const ms = this.msCount <= 0 ? 0 : this.msCount % 1000;
    if (this.timerMilliseconds !== ms) {
      this.timerMilliseconds = ms;
      this.eventBus.emit('millisecondsUpdated');
    }

    const cs = Math.floor(ms / 10);
    if (this.timerHundredthsSeconds !== cs) {
      this.timerHundredthsSeconds = cs;
      this.eventBus.emit('hundredthsSecondsUpdated');
    }

    const ds = Math.floor(ms / 100);
    if (this.timerTenthsSeconds !== ds) {
      this.timerTenthsSeconds = ds;
      this.eventBus.emit('tenthsSecondsUpdated');
    }

    const s = this.msCount <= 0 ? 0 : Math.floor(this.msCount / 1000);
    if (this.timerSeconds !== s) {
      this.timerSeconds = s;
      this.eventBus.emit('secondsUpdated');
    }
  }

  private timer() {
    // @todo 타이머 로직 작성
  }

  /**
   * Returns seconds
   *
   * @returns `seconds`
   */
  getSeconds(): number {
    return this.timerSeconds;
  }

  /**
   * Returns 1/10th of a second
   *
   * @returns `deciseconds`
   */
  getTenthsSeconds(): number {
    return this.timerTenthsSeconds;
  }

  /**
   * Returns 1/100th of a second
   *
   * @returns `centiseconds`
   */
  getHundredthsSeconds(): number {
    return this.timerHundredthsSeconds;
  }

  /**
   * Returns 1/1000th of a second (1000ms === 1s)
   *
   * @returns `milliseconds`
   */
  getMilliseconds(): number {
    return this.timerMilliseconds;
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
