let minutes = 0;
let seconds = 0;
let interval;
let focusTime;
let breakTime;
let focusSeconds;
let breakSeconds;
let isBreak = false;
let firstRun = true;
let loops = -1;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const clearBtn = document.getElementById('clearBtn');
const messageDisplay = document.getElementById('message');
const audio = new Audio('/Day-19/sound.mp3');

function getValidTimeInput(message, isLoopInput = false) {
  let time;
  do {
    time = prompt(message);
    if (isLoopInput && time === '') {
      return -1;
    }
    if (!Number.isInteger(Number(time)) || Number(time) < 0 || time === '') {
      alert("Please enter a valid positive whole number.");
      return getValidTimeInput(message, isLoopInput);
    }
  } while (!Number.isInteger(Number(time)) || Number(time) < 0);
  return parseInt(time, 10);
}

function retrieveTimes() {
  if (sessionStorage.getItem('focusTime') && sessionStorage.getItem('breakTime') && sessionStorage.getItem('focusSeconds') && sessionStorage.getItem('breakSeconds') && sessionStorage.getItem('loops')) {
    focusTime = parseInt(sessionStorage.getItem('focusTime'), 10);
    breakTime = parseInt(sessionStorage.getItem('breakTime'), 10);
    focusSeconds = parseInt(sessionStorage.getItem('focusSeconds'), 10);
    breakSeconds = parseInt(sessionStorage.getItem('breakSeconds'), 10);
    loops = parseInt(sessionStorage.getItem('loops'), 10);
  } else {
    focusTime = getValidTimeInput('Enter focus time in minutes:');
    focusSeconds = getValidTimeInput('Enter focus time in seconds (0-59):');
    breakTime = getValidTimeInput('Enter break time in minutes:');
    breakSeconds = getValidTimeInput('Enter break time in seconds (0-59):');
    loops = getValidTimeInput('Enter number of loops (leave blank for infinite loops):', true);

    sessionStorage.setItem('focusTime', focusTime);
    sessionStorage.setItem('focusSeconds', focusSeconds);
    sessionStorage.setItem('breakTime', breakTime);
    sessionStorage.setItem('breakSeconds', breakSeconds);
    sessionStorage.setItem('loops', loops);
  }

  if (loops === -1) {
    loops = Infinity;
  }

  minutes = focusTime;
  seconds = focusSeconds;
  updateDisplay();
}

function updateDisplay() {
  minutesDisplay.textContent = minutes < 10 ? `0${minutes}` : minutes;
  secondsDisplay.textContent = seconds < 10 ? `0${seconds}` : seconds;
}

function startTimer() {
  if (!interval) {
    retrieveTimes();

    if (firstRun) {
      minutes = focusTime;
      seconds = focusSeconds;
      firstRun = false;
    }

    interval = setInterval(() => {
      if (seconds === 0 && minutes === 0) {
        if (isBreak) {
          loops--;
          if (loops === 0) {
            clearInterval(interval);
            messageDisplay.textContent = 'All sessions complete!';
            return;
          }
          minutes = focusTime;
          seconds = focusSeconds;
          messageDisplay.textContent = 'Time to Focus!';
          audio.play();
        } else {
          minutes = breakTime;
          seconds = breakSeconds;
          messageDisplay.textContent = 'Time for a Break!';
          audio.play();
        }
        isBreak = !isBreak;
      } else if (seconds === 0) {
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }
      updateDisplay();
    }, 1000);
  }
  messageDisplay.textContent = 'Timer Started';
  startBtn.disabled = true;
  pauseBtn.disabled = false;
}

function pauseTimer() {
  clearInterval(interval);
  interval = null;
  messageDisplay.textContent = 'Timer Paused';
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

function resetTimer() {
  clearInterval(interval);
  interval = null;
  minutes = 0;
  seconds = 0;
  isBreak = false;
  firstRun = true;
  updateDisplay();
  messageDisplay.textContent = 'Timer Reset';
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

function clearSession() {
  sessionStorage.clear();
  messageDisplay.textContent = 'Session Cleared!';
  resetTimer();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
clearBtn.addEventListener('click', clearSession);

startBtn.disabled = false;
pauseBtn.disabled = true;
