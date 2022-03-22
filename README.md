# browser-timer

자바스크립트로 작성한 카운트다운 타이머, 타이머 라이브러리 입니다.

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
   * 필수
   * 
   * 타이머 인스턴스가 작동하는 방식을 결정하는 문자열 입니다. (카운트다운 타이머 또는 타이머)
   */
  type: 'countdown' | 'timer';
  
  /**
   * 
   * 선택
   * 
   * 타이머 인스턴스의 초기 시간(초)을 설정합니다.
   * 나중에 setSeconds() 함수로 시간(초)을 설정할 수 있습니다.
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
 * 타이머를 실행시키는 함수입니다.
 * 카운트다운 타이머라면 timer.setSeconds()로 설정한 시간부터 시작합니다.
 * 
 * 타이머라면 0(start()한 시간부터)부터 시작합니다.
 */
start(): void
```

```typescript
/**
 * 실행중인 타이머를 일시정지 시키는 함수입니다.
 * 일시정지 이후에는 timer.start() 함수로 재시작 할 수 있습니다.
 */
pause(): void
```

```typescript
/**
 * 실행중인 타이머를 완전히 정지시키는 함수입니다.
 * stop() 함수 호출 후 start() 함수로 다시 실행하면 초기에 설정했던 seconds 부터 다시 시작합니다.(카운트다운 타이머의 경우)
 */
stop(): void
```

```typescript
/**
 * 초기에 설정했던 또는 timer.setSeconds()로 설정했던 시간부터 다시 시작하는 함수입니다.
 * second(10)과 같이 매개변수를 전달하면 매개변수로 전달된 시간부터(초) 다시 시작합니다.(카운트다운 타이머의 경우)
 * 
 * 0부터 시작하는 타이머의 경우 second 매개변수는 전달 할 필요가 없습니다.
 */
reset(second?: number): void
```

#### EventMethods

```typescript
/**
 * 타이머 인스턴스에 리스너를 추가할 수 있는 함수입니다.
 * eventName이 트리거 될 때마다 listener를 호출합니다.
 */
addEventListener(eventName: EventName, listener: Function);

/**
 * 타이머 인스턴스에 추가한 리스너를 제거하는 함수입니다.
 * eventName에 추가된 listener(매개변수로 전달된)를 제거합니다.
 */
removeEventListener(eventName: EventName, listener: Function);

/**
 * 타이머 인스턴스에 추가한 모든 리스너를 제거하는 함수입니다.
 * 매개변수 eventName와 함께 호출하면 eventName에 추가된 리스너 모두 제거합니다.
 */
removeListenerAll(eventName?: EventName);
```

#### Getters and Setters

```typescript
// Setters
/**
 * 카운트다운 타이머에서 사용될 시간(초)를 설정하는 함수입니다.
 */
setSeconds(seconds: number): void;

// Getters
/**
 * 타이머 인스턴스의 시(h)를 리턴합니다.
 */
getHours(): number

/**
 * 타이머 인스턴스의 분(m)을 리턴합니다.
 */
getMinutes(): number

/**
 * 타이머 인스턴스의 초(s)를 리턴합니다.
 */
getSeconds(): number

/**
 * 타이머 인스턴스의 1/10초를 리턴합니다.
 */
getTenthsSeconds(): number

/**
 * 타이머 인스턴스의 1/100초를 리턴합니다.
 */
getHundredthsSeconds(): number

/**
 * 타이머 인스턴스의 밀리초를 리턴합니다.
 */
getMilliseconds(): number
```


### 3. Countdown timer events
```typescript
timer.addEventListener(EventName, callback);
/**
 * 타이머가 실행된 이후 매 1시간마다 트리거 됩니다.
 */ 
'hoursUpdated'

/**
 * 타이머가 실행된 이후 매 1분마다 트리거 됩니다.
 */ 
'minutesUpdated'

/**
 * 타이머가 실행된 이후 매 1초마다 트리거 됩니다.
 */ 
'secondsUpdated'

/**
 * 타이머가 실행된 이후 매 1/10초마다 트리거 됩니다.
 *                   (100 mlliseconds)
 */
'tenthsSecondsUpdated'

/**
 * 타이머가 실행된 이후 매 1/100초마다 트리거 됩니다.
 *                   (10 mlliseconds)
 */
'hundredthsSecondsUpdated'

/**
 * 타이머가 실행된 이후 매 1밀리초마다 트리거 됩니다.
 */
'millisecondsUpdated'

/**
 * 타이머가 시작될 때 트리거 됩니다.
 */
'start'

/**
 * 타이머가 종료될 때 트리거 됩니다.
 * (카운트다운 타이머에서만 트리거 됩니다.)
 */
'finish'

/**
 * 타이머가 일시 정지될 때 트리거 됩니다.
 */
'pause'

/**
 * 타이머가 정지될 때 트리거 됩니다.
 */
'stop'

/**
 * 타이머가 초기화될 때 트리거 됩니다.
 */
'reset'
```

## Examples (stackblitz)
* [시간 표시를 하지 않는 카운트다운 타이머](https://stackblitz.com/edit/typescript-ceqnfv?file=index.ts)
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

* [카운트다운 타이머 시작, 일시정지, 정지, 리셋](https://stackblitz.com/edit/typescript-a1pmrv?file=index.ts)
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

* [시간이 표시되는 카운트다운 타이머](https://stackblitz.com/edit/typescript-vt3rgb?file=index.ts)
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

* [자세한 시간이 표시되는 (밀리초) 카운트다운 타이머](https://stackblitz.com/edit/typescript-zjgerm?file=index.ts)
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

* [자세한 시간이 표시되는 일반 타이머(0부터 시작)](https://stackblitz.com/edit/typescript-zwrxod?file=index.ts)
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

---
## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/duchangkim/browser-timer/blob/main/LICENSE) file for details