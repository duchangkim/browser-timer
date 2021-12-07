# browser-timer

This is the JavaScript library where you can create countdowns and timers.

## Installation
``` shell
npm i browser-timer
```
```javascript
import Timer from 'browser-timer';

const timer = new Timer({ type: 'countdown' });
timer.setSeconds(10);
timer.start();
```

## Examples
* 시간 표시를 하지 않는 카운트다운 타이머
* 시간이 표시되는 카운트다운 타이머
* 자세한 시간이 표시되는 (밀리초) 카운트다운 타이머
* 특정 시간에 특정 함수 실행하는 예제

## API Document
### 1. Countdown timer options
```typescript
interface TimerOptions {
  /*
   * Requirement
   * 
   * A string that determines how the timer instance behaves.
   */
  type: 'countdown' | 'timer'; // 'timer' is under development...
  
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
 * 
 * 
 */
start(): void
```

```typescript
/**
 * 
 * 
 */
pause(): void
```

```typescript
/**
 * 
 * 
 */
stop(): void
```

```typescript
/**
 * 
 * 
 */
reset(second?: number): void
```

#### EventMethods

```typescript
/**
 * 
 * 
 */
addEventListener(eventName: EventName, listener: Function);

/**
 * 
 * 
 */
removeEventListener(eventName: EventName, listener: Function);

/**
 * 
 * 
 */
removeListenerAll(eventName?: EventName);
```

#### Getters and Setters

```typescript
// Setters
/**
 * 
 * 
 */
setSeconds(seconds: number): void;

// Getters
/**
 * 
 * 
 */
getSeconds(): number

/**
 * 
 * 
 */
getTenthsSeconds(): number

/**
 * 
 * 
 */
getHundredthsSeconds(): number

/**
 * 
 * 
 */
getMilliseconds(): number
```


### 3. Countdown timer events
```typescript
timer.addEventListener(EventName, callback);
/**
 * Triggered every 1 seconds. (after the timer starts)
 */ 
'secondsUpdated'

/**
 * Triggered every 1/10 seconds. (after the timer starts)
 *                (100 mlliseconds)
 */
'tenthsSecondsUpdated'

/**
 * Triggered every 1/100 seconds. (after the timer starts)
 *                (10 mlliseconds)
 */
'hundredthsSecondsUpdated'

/**
 * Triggered every 1 milliseconds. (after the timer starts)
 */
'millisecondsUpdated'

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

<br/>
<br/>

---
## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/duchangkim/browser-timer/blob/main/LICENSE) file for details