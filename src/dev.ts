import { Timer } from './core/Timer';

const initPageButtons = () => {
  const countdownPageButton = document.getElementById(
    'countdownPageButton',
  ) as HTMLButtonElement;
  const timerPageButton = document.getElementById('timerPageButton') as HTMLButtonElement;
  const countdownWrapper = document.getElementById('countdownWrapper');
  const timerWrapper = document.getElementById('timerWrapper');

  countdownPageButton.addEventListener('click', () => {
    if (!countdownWrapper || !timerWrapper) return;

    countdownWrapper.style.display = 'block';
    timerWrapper.style.display = 'none';
  });
  timerPageButton.addEventListener('click', () => {
    if (!countdownWrapper || !timerWrapper) return;

    countdownWrapper.style.display = 'none';
    timerWrapper.style.display = 'block';
  });
};

// simple usage
const simpleUsage = () => {
  const input = document.getElementById('simpleInput') as HTMLInputElement;
  const start = document.getElementById('simpleStart') as HTMLElement;
  const reset = document.getElementById('simpleReset') as HTMLElement;
  const pause = document.getElementById('simplePause') as HTMLElement;
  const timeSpace = document.getElementById('simpleTime') as HTMLElement;
  const seconds = timeSpace.querySelector('.s') as HTMLElement;
  const done = document.getElementById('simpleDone') as HTMLElement;

  const timer = new Timer({ type: 'countdown' });

  input.addEventListener('input', () => {
    timer.setSeconds(parseInt(input.value, 10));
    seconds.innerText = input.value;
  });
  start.addEventListener('click', () => {
    input.disabled = true;
    done.innerText = '';
    timer.setSeconds(parseInt(input.value, 10));
    timer.start();
  });
  reset.addEventListener('click', () => {
    timer.reset();
  });
  pause.addEventListener('click', () => {
    timer.pause();
  });

  timer.addEventListener('secondsUpdated', () => {
    seconds.innerText = timer.getSeconds().toString();
  });
  timer.addEventListener('finish', () => {
    input.disabled = false;
    done.innerText = 'Countdown done!!!';
  });
};

const hundredthsSeconds = () => {
  const input = document.getElementById('hundredthsInput') as HTMLInputElement;
  const start = document.getElementById('hundredthsStart') as HTMLElement;
  const timeSpace = document.getElementById('hundredthsTime') as HTMLElement;
  const seconds = timeSpace.querySelector('.s') as HTMLElement;
  const deciseconds = timeSpace.querySelector('.cs') as HTMLElement;
  const done = document.getElementById('hundredthsDone') as HTMLElement;

  const timer = new Timer({ type: 'countdown' });

  input.addEventListener('input', () => {
    seconds.innerText = input.value;
    timer.setSeconds(parseInt(input.value, 10));
  });
  start.addEventListener('click', () => {
    input.disabled = true;
    done.innerText = '';
    timer.setSeconds(parseInt(input.value, 10));
    timer.start();
  });

  timer.addEventListener('secondsUpdated', () => {
    seconds.innerText = timer.getSeconds().toString();
  });
  timer.addEventListener('hundredthsSecondsUpdated', () => {
    deciseconds.innerText = timer.getHundredthsSeconds().toString();
  });
  timer.addEventListener('finish', () => {
    input.disabled = false;
    done.innerText = 'Countdown done!!!';
  });
};

const tenthsSeconds = () => {
  const input = document.getElementById('tenthsInput') as HTMLInputElement;
  const start = document.getElementById('tenthsStart') as HTMLElement;
  const timeSpace = document.getElementById('tenthsTime') as HTMLElement;
  const seconds = timeSpace.querySelector('.s') as HTMLElement;
  const centiseconds = timeSpace.querySelector('.cs') as HTMLElement;
  const done = document.getElementById('tenthsDone') as HTMLElement;

  const timer = new Timer({ type: 'countdown' });

  input.addEventListener('input', () => {
    seconds.innerText = input.value;
    timer.setSeconds(parseInt(input.value, 10));
  });
  start.addEventListener('click', () => {
    input.disabled = true;
    done.innerText = '';
    timer.setSeconds(parseInt(input.value, 10));
    timer.start();
  });

  timer.addEventListener('secondsUpdated', () => {
    seconds.innerText = timer.getSeconds().toString();
  });
  timer.addEventListener('tenthsSecondsUpdated', () => {
    centiseconds.innerText = timer.getTenthsSeconds().toString();
  });
  timer.addEventListener('finish', () => {
    input.disabled = false;
    done.innerText = 'Countdown done!!!';
  });
};

const milliSeconds = () => {
  const input = document.getElementById('milliInput') as HTMLInputElement;
  const start = document.getElementById('milliStart') as HTMLElement;
  const timeSpace = document.getElementById('milliTime') as HTMLElement;
  const seconds = timeSpace.querySelector('.s') as HTMLElement;
  const centiseconds = timeSpace.querySelector('.ms') as HTMLElement;
  const done = document.getElementById('milliDone') as HTMLElement;

  const timer = new Timer({ type: 'countdown' });

  input.addEventListener('input', () => {
    seconds.innerText = input.value;
    timer.setSeconds(parseInt(input.value, 10));
  });
  start.addEventListener('click', () => {
    input.disabled = true;
    done.innerText = '';
    timer.setSeconds(parseInt(input.value, 10));
    timer.start();
  });

  timer.addEventListener('secondsUpdated', () => {
    seconds.innerText = timer.getSeconds().toString();
  });
  timer.addEventListener('millisecondsUpdated', () => {
    centiseconds.innerText = timer.getMilliseconds().toString();
  });
  timer.addEventListener('finish', () => {
    input.disabled = false;
    done.innerText = 'Countdown done!!!';
  });
};

const timerUsage = () => {
  const start = document.getElementById('timerStart') as HTMLElement;
  const pause = document.getElementById('timerPause') as HTMLElement;
  const reset = document.getElementById('timerReset') as HTMLElement;
  const stop = document.getElementById('timerStop') as HTMLElement;
  const timeSpace = document.getElementById('timerSpace') as HTMLElement;
  const hours = timeSpace.querySelector('.h') as HTMLElement;
  const minutes = timeSpace.querySelector('.m') as HTMLElement;
  const seconds = timeSpace.querySelector('.s') as HTMLElement;
  const centiseconds = timeSpace.querySelector('.cs') as HTMLElement;
  const done = document.getElementById('milliDone') as HTMLElement;

  const timer = new Timer({ type: 'timer' });

  start.addEventListener('click', () => {
    timer.start();
  });
  pause.addEventListener('click', () => {
    timer.pause();
  });
  reset.addEventListener('click', () => {
    timer.reset();
  });
  stop.addEventListener('click', () => {
    timer.stop();
  });

  timer.addEventListener('hoursUpdated', () => {
    const h = timer.getHours() % 24 === 0 ? 0 : timer.getHours() % 24;
    hours.innerText = h.toString();
  });
  timer.addEventListener('minutesUpdated', () => {
    const m = timer.getMinutes() % 60 === 0 ? 0 : timer.getMinutes() % 60;
    minutes.innerText = m.toString();
  });
  timer.addEventListener('secondsUpdated', () => {
    const s = timer.getSeconds() % 60 === 0 ? 0 : timer.getSeconds() % 60;
    seconds.innerText = s.toString();
  });
  timer.addEventListener('hundredthsSecondsUpdated', () => {
    centiseconds.innerText = timer.getHundredthsSeconds().toString();
  });
};

window.onload = () => {
  initPageButtons();
  simpleUsage();
  tenthsSeconds();
  hundredthsSeconds();
  milliSeconds();
  timerUsage();
};
