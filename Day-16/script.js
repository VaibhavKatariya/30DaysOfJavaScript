let minutes = 0;
let seconds = 0;
let interval = null;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const messageDisplay = document.getElementById('message');

function updateDisplay() {
    minutesDisplay.textContent = minutes < 10 ? `0${minutes}` : minutes;
    secondsDisplay.textContent = seconds < 10 ? `0${seconds}` : seconds;
}

function updateMessage(text) {
    messageDisplay.textContent = text; 
}

function startTimer() {
    if (interval === null) { 
        interval = setInterval(() => {
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            updateDisplay();
        }, 1000);
        updateMessage("Timer has started");
    }
}

function pauseTimer() {
    if (interval !== null) {
        clearInterval(interval);
        interval = null; 
        updateMessage("Timer has paused"); 
    }
}

function resetTimer() {
    clearInterval(interval);
    interval = null;
    minutes = 0;
    seconds = 0;
    updateDisplay();
    updateMessage("Timer has reset");
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);