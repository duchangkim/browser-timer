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
  private startTime = 0;
  private endTime = 0;
  private timerHours = 0;
  private timerMinutes = 0;
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
      // start한 시점 저장
      this.startTime = Date.now();
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

  private resetAllTimeProperties(): void {
    this.timerHours = 0;
    this.timerMinutes = 0;
    this.timerSeconds = 0;
    this.timerTenthsSeconds = 0;
    this.timerHundredthsSeconds = 0;
    this.timerMilliseconds = 0;
  }

  reset(second?: number) {
    if (this.type === 'timer') {
      this.startTime = Date.now();
      this.resetAllTimeProperties();

      if (second) console.warn(`A timer reset does not require a parameter 'seconds'.`);
    } else if (this.type === 'countdown') {
      if (second) {
        this.seconds = second;
      }

      this.msCount = this.seconds * 1000;
      this.endTime = Date.now() + this.msCount;
      this.timerSeconds = this.seconds;
    }

    this.isPause = false;
    this.emitAllTimeUpdateEvents();
    this.eventBus.emit('reset');
  }

  setSeconds(seconds: number) {
    this.seconds = seconds;
  }

  private convertMs(ms: number): number {
    return ms <= 0 ? 0 : ms % 1000;
  }

  private convertMsToCs(ms: number): number {
    return Math.floor(this.convertMs(ms) / 10);
  }

  private convertMsToDs(ms: number): number {
    return Math.floor(this.convertMs(ms) / 100);
  }

  private convertMsToSeconds(ms: number): number {
    return ms <= 0 ? 0 : Math.floor(ms / 1000);
  }

  private convertMsToMinutes(ms: number): number {
    return Math.floor(ms / 60000);
  }

  private convertMsToHours(ms: number): number {
    return Math.floor(ms / 3600000);
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
    const currentTime = Date.now();
    // 시작시간에서 timer가 불러진 시점의 시간에서 타이머를 시작한 시점의 시간을 빼면 지나간 시간이 됨.
    this.msCount = currentTime - this.startTime;

    const ms = this.convertMs(this.msCount);
    if (this.timerMilliseconds !== ms) {
      this.timerMilliseconds = ms;
      this.eventBus.emit('millisecondsUpdated');
    }

    const cs = this.convertMsToCs(this.msCount);
    if (this.timerHundredthsSeconds !== cs) {
      this.timerHundredthsSeconds = cs;
      this.eventBus.emit('hundredthsSecondsUpdated');
    }

    const ds = this.convertMsToDs(this.msCount);
    if (this.timerTenthsSeconds !== ds) {
      this.timerTenthsSeconds = ds;
      this.eventBus.emit('tenthsSecondsUpdated');
    }

    const s = this.convertMsToSeconds(this.msCount);
    if (this.timerSeconds !== s) {
      this.timerSeconds = s;
      this.eventBus.emit('secondsUpdated');
    }

    const m = this.convertMsToMinutes(this.msCount);
    if (this.timerMinutes !== m) {
      this.timerMinutes = m;
      this.eventBus.emit('minutesUpdated');
    }

    const h = this.convertMsToHours(this.msCount);
    if (this.timerHours !== h) {
      this.timerHours = h;
      this.eventBus.emit('hoursUpdated');
    }
  }

  /**
   * Returns hours
   *
   * @returns `hours`
   */
  getHours(): number {
    return this.timerHours;
  }

  /**
   * Returns minutes
   *
   * @returns `minutes`
   */
  getMinutes(): number {
    return this.timerMinutes;
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

  private emitAllTimeUpdateEvents(): void {
    (
      [
        'hoursUpdated',
        'minutesUpdated',
        'secondsUpdated',
        'tenthsSecondsUpdated',
        'hundredthsSecondsUpdated',
        'millisecondsUpdated',
      ] as EventName[]
    ).forEach((event) => {
      this.eventBus.emit(event);
    });
  }
}
