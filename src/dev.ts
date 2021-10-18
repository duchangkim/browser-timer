import Timer from './core/Timer';

const devSpan = document.getElementById('dev') as HTMLElement;

devSpan.innerHTML = '!!DEV!!';

const countdownTimer = new Timer({
  type: 'countdown',
  seconds: 5,
});

const countdownStartButton = document.getElementById(
  'countdownButton',
) as HTMLElement;
const countdownSpace = document.getElementById('countdownSpace') as HTMLElement;

countdownStartButton.addEventListener('click', () => {
  countdownTimer.start();
});

const updateDOM = () => {
  console.log('얼마나 이벤트 발생하는지?');
  countdownSpace.innerHTML = countdownTimer.getSeconds().toString();
};

countdownTimer.addEventListener('seconds-updated', updateDOM);
