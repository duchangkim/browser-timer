[KOR](https://github.com/duchangkim/browser-timer) | ENG

# browser-timer

This is the JavaScript library where you can create countdowns and timers.

## Installation
``` shell
npm i browser-timer
```
```javascript
import Timer from 'browser-timer';

const countdownTimer = new Timer({ type: 'countdown' });
countdownTimer.setSeconds(10);
countdownTimer.start();

--------------------------------------------------------

const timer = new Timer({ type: 'timer' });
timer.start();
```

## API Document
### 1. Countdown timer options
```typescript
interface TimerOptions {
  /*
   * Requirement
   * 
   * A string that determines how the timer instance behaves. (countdown timer or timer)
   */
  type: 'countdown' | 'timer';
  
  /**
   * 
   * Optional
   * 
   * Specifies the initial number of seconds for the timer instance.
   * You can later set it as a setSeconds() function.
   */
  seconds?: number;
}
```

### 2. Countdown timer methods

#### How to use all methods
```typescript
const timer = new Timer({ ...timerOptions });
timer.methods();
```

#### Generals

```typescript
/**
 * A function that executes a timer.
 * If the timer type is 'countdown', it starts from the time set by timer.setSeconds().
 * 
 * If the timer type is 'timer', it starts from 0(when start() is called).
 */
start(): void
```

```typescript
/**
 * A function that pause the running timer.
 * After pause, you can restart with timer.start() function.
 */
pause(): void
```

```typescript
/**
 * A function that completely stop the timer.
 * After stop, you can restart timer.start() function.
 */
stop(): void
```

```typescript
/**
 * This function restarts from the time initially set or set by timer.setSeconds()
 * If you pass a parameter like second(10), it will start over from the time (in seconds) passed as parameter (for countdown timer).
 * For timers starting from zero, the second parameter does not need to be passed.
 */
reset(second?: number): void
```

#### EventMethods

```typescript
/**
 * A function that can add a listener to a timer instance.
 * Call listener when eventName event triggered.
 */
addEventListener(eventName: EventName, listener: Function);

/**
 * A function to remove a listener added to a timer instance.
 * Remove the listener (passed as parameter) appended to eventName.
 */
removeEventListener(eventName: EventName, listener: Function);

/**
 * A function that removes any listeners added to the timer instance.
 */
removeListenerAll(eventName?: EventName);
```

#### Getters and Setters

```typescript
// Setters
/**
 * A function that sets the time(seconds) to be used in the countdown timer.
 */
setSeconds(seconds: number): void;

// Getters
/**
 * Return hours of a timer instance.
 */
getHours(): number

/**
 * Return minutes of a timer instance.
 */
getMinutes(): number

/**
 * Return seconds of a timer instance.
 */
getSeconds(): number

/**
 * Return 1/10 seconds of a timer instance.
 */
getTenthsSeconds(): number

/**
 * Return 1/100 seconds of a timer instance.
 */
getHundredthsSeconds(): number

/**
 * Return milliseconds of a timer instance.
 */
getMilliseconds(): number
```


### 3. Countdown timer events
```typescript
timer.addEventListener(EventName, callback);
/**
 * Triggered every 1 hour. (after the timer starts)
 */ 
'hoursUpdated'

/**
 * Triggered every 1 minute. (after the timer starts)
 */ 
'minutesUpdated'

/**
 * Triggered every 1 second. (after the timer starts)
 */ 
'secondsUpdated'

/**
 * Triggered every 1/10 second. (after the timer starts)
 *                (100 mlliseconds)
 */
'tenthsSecondsUpdated'

/**
 * Triggered every 1/100 second. (after the timer starts)
 *                (10 mlliseconds)
 */
'hundredthsSecondsUpdated'

/**
 * Triggered every 1 millisecond. (after the timer starts)
 */
'millisecondsUpdated'

/**
 * Triggered when the timer starts.
 */
'start'

/**
 * Triggered when the timer expires.
 * (It only triggers on the countdown timer.)
 */
'finish'

/**
 * Triggered when the timer pauses.
 */
'pause'

/**
 * Triggered when the timer stops.
 */
'stop'

/**
 * Triggered when the timer resets.
 */
'reset'
```

## Examples (stackblitz)
* [Countdown timer with no time indication](https://stackblitz.com/edit/typescript-ceqnfv?file=index.ts)
```typescript
import Timer from 'browser-timer';

const countdownTimer = new Timer({ type: 'countdown' });

countdownTimer.addEventListener('finish', () => {
  alert('countdown is done!');
});

document.getElementById('start').addEventListener('click', () => {
  countdownTimer.setSeconds(5);
  countdownTimer.start();
});
```

* [Countdown timer start, pause, stop, reset](https://stackblitz.com/edit/typescript-a1pmrv?file=index.ts)
```typescript
import Timer from 'browser-timer';

const countdownTimer = new Timer({ type: 'countdown' });
const sec = document.getElementById('sec');
const ms = document.getElementById('ms');

countdownTimer.addEventListener('finish', () => {
  document.getElementById('timeSpace').style.color = 'red';
});
countdownTimer.addEventListener('secondsUpdated', () => {
  sec.innerHTML = countdownTimer.getSeconds().toString();
});
countdownTimer.addEventListener('hundredthsSecondsUpdated', () => {
  ms.innerHTML = countdownTimer.getHundredthsSeconds().toString();
});

document.getElementById('start').addEventListener('click', () => {
  countdownTimer.setSeconds(5);
  countdownTimer.start();
  (document.getElementById('pause') as HTMLButtonElement).disabled = false;
  document.getElementById('timeSpace').style.color = 'black';
});

document.getElementById('pause').addEventListener('click', () => {
  (document.getElementById('start2') as HTMLButtonElement).disabled = false;
  countdownTimer.pause();
});
document.getElementById('start2').addEventListener('click', () => {
  countdownTimer.start();
});
document.getElementById('stop').addEventListener('click', () => {
  countdownTimer.stop();
});
document.getElementById('reset').addEventListener('click', () => {
  countdownTimer.reset(10);
  ms.innerHTML = '00';
});
```

* [Countdown timer with time](https://stackblitz.com/edit/typescript-vt3rgb?file=index.ts)
```typescript
import Timer from 'browser-timer';

const countdownTimer = new Timer({ type: 'countdown' });
const timeSpace = document.getElementById('timeSpace');

countdownTimer.addEventListener('finish', () => {
  alert('countdown is done!');
});
countdownTimer.addEventListener('secondsUpdated', () => {
  timeSpace.innerHTML = countdownTimer.getSeconds().toString();
});

document.getElementById('start').addEventListener('click', () => {
  countdownTimer.setSeconds(5);
  countdownTimer.start();
});
```

* [Countdown timer with detailed time in milliseconds](https://stackblitz.com/edit/typescript-zjgerm?file=index.ts)
```typescript
import Timer from 'browser-timer';

const countdownTimer = new Timer({ type: 'countdown' });
const sec = document.getElementById('sec');
const ms = document.getElementById('ms');

countdownTimer.addEventListener('secondsUpdated', () => {
  sec.innerHTML = countdownTimer.getSeconds().toString();
});
countdownTimer.addEventListener('millisecondsUpdated', () => {
  ms.innerHTML = countdownTimer.getMilliseconds().toString();
});

document.getElementById('start').addEventListener('click', () => {
  countdownTimer.setSeconds(5);
  countdownTimer.start();
});
```

* [Normal timer with detailed time (zero-based)](https://stackblitz.com/edit/typescript-zwrxod?file=index.ts)
```typescript
import Timer from 'browser-timer';

const timer = new Timer({ type: 'timer' });

document.getElementById('start').addEventListener('click', () => {
  timer.start();
});

timer.addEventListener('hoursUpdated', () => {
  h.innerHTML = timer.getSeconds().toString();
});

timer.addEventListener('minutesUpdated', () => {
  m.innerHTML = timer.getSeconds().toString();
});

timer.addEventListener('secondsUpdated', () => {
  sec.innerHTML = timer.getSeconds().toString();
});

timer.addEventListener('millisecondsUpdated', () => {
  ms.innerHTML = timer.getMilliseconds().toString();
});
```

<br/>
<br/>


## Related articles
[browser-timer(kor)](https://www.notion.so/browser-timer-71285a2262d84a618e31e2ed997d32ec) @duchang.dev

---
## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/duchangkim/browser-timer/blob/main/LICENSE) file for details