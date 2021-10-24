import Timer from './core/Timer';

const devSpan = document.getElementById('dev') as HTMLElement;

devSpan.innerHTML = '!!DEV!!';

// countdown area
const countdownTimer = new Timer({
  type: 'countdown',
  seconds: 5,
});

const countdownStartButton = document.getElementById('countdownButton') as HTMLElement;
const countdownPauseButton = document.getElementById('countdownPause') as HTMLElement;
const countdownStopButton = document.getElementById('countdownStop') as HTMLElement;
const countdownResetButton = document.getElementById('countdownReset') as HTMLElement;
const sec = document.getElementById('sec') as HTMLSpanElement;
const ms = document.getElementById('ms') as HTMLSpanElement;

countdownStartButton.addEventListener('click', () => {
  const second =
    parseInt((document.getElementById('countdownInput') as HTMLInputElement).value) ||
    countdownTimer.getSeconds();
  countdownTimer.setSeconds(second);
  countdownTimer.start();
});
countdownPauseButton.addEventListener('click', () => {
  countdownTimer.pause();
});
countdownStopButton.addEventListener('click', () => {
  countdownTimer.stop();
});
countdownResetButton.addEventListener('click', () => {
  const second =
    parseInt((document.getElementById('countdownInput') as HTMLInputElement).value) ||
    countdownTimer.getSeconds();
  countdownTimer.reset(second);
});

const updateDOM = () => {
  console.log('얼마나 이벤트 발생하는지?');
  sec.innerText = countdownTimer.getSeconds().toString();
};

countdownTimer.addEventListener('finish', () => {
  (document.getElementById('done') as HTMLDivElement).innerText = countdownTimer
    .getSeconds()
    .toString();
});
countdownTimer.addEventListener('secondsUpdated', updateDOM);
countdownTimer.addEventListener('millisecondsUpdated', () => {
  // console.log(countdownTimer.getMilliseconds(2).toString());

  ms.innerText = countdownTimer.getMilliseconds(2).toString();
});
