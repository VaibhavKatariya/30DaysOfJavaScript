let workMinutes = 25;
let breakMinutes = 5;
let seconds = 0;
let interval;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const timerMessage = document.getElementById('timerMessage');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

function updateDisplay() {
    minutesDisplay.textContent = workMinutes < 10 ? `0${workMinutes}` : workMinutes;
    secondsDisplay.textContent = seconds < 10 ? `0${seconds}` : seconds;
}

function startTimer() {
    startBtn.disabled = true;  // Disable Start button
    pauseBtn.disabled = false; // Enable Pause button
    resetBtn.disabled = false; // Enable Reset button
    timerMessage.textContent = isWorkTime ? "Work time! Stay focused!" : "Break time! Relax!";
    
    interval = setInterval(() => {
        if (seconds === 0) {
            if (workMinutes === 0) {
                isWorkTime = !isWorkTime;
                workMinutes = isWorkTime ? 25 : 5;
                seconds = 0;
                timerMessage.textContent = isWorkTime ? "Work time! Stay focused!" : "Break time! Relax!";
            } else {
                workMinutes--;
                seconds = 59;
            }
        } else {
            seconds--;
        }
        updateDisplay();
    }, 1000);
}

function pauseTimer() {
    clearInterval(interval);
    startBtn.disabled = false;  // Enable Start button after pausing
    timerMessage.textContent = "Timer paused.";
}

function resetTimer() {
    clearInterval(interval);
    workMinutes = 25;
    seconds = 0;
    isWorkTime = true;
    updateDisplay();
    startBtn.disabled = false;  // Enable Start button after resetting
    pauseBtn.disabled = true;   // Disable Pause button
    resetBtn.disabled = true;   // Disable Reset button
    timerMessage.textContent = "Timer reset. Ready for the next session!";
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Disable Pause and Reset buttons initially
pauseBtn.disabled = true;
resetBtn.disabled = true;

updateDisplay();  // Initialize the display
