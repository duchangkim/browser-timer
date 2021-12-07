# browser-timer

자바스크립트로 작성한 카운트다운 타이머, 타이머 라이브러리 입니다.

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
   * 필수
   * 
   * 타이머 인스턴스가 작동하는 방식을 결정하는 문자열 입니다. (카운트다운 타이머 또는 타이머)
   */
  type: 'countdown' | 'timer'; // 'timer' is under development...
  
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
 * 타이머라면 0부터 시작합니다.
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
 * second(10)과 같이 매개변수를 전달하면 매개변수로 전달된 시간부터(초) 다시 시작합니다.
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
 * 타이머 인스턴스의 초를 리턴합니다.
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

<br/>
<br/>

---
## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/duchangkim/browser-timer/blob/main/LICENSE) file for details