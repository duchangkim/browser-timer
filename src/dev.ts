import Timer from './core/Timer';

// simple usage
const simpleUsage = () => {
  const input = document.getElementById('simpleInput') as HTMLInputElement;
  const start = document.getElementById('simpleStart') as HTMLElement;
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

window.onload = () => {
  simpleUsage();
  tenthsSeconds();
  hundredthsSeconds();
  milliSeconds();
};
