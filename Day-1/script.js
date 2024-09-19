const counterDisplay = document.querySelector('#counter');
const incrementButton = document.querySelector('#increment');
const decrementButton = document.querySelector('#decrement');
const resetButton = document.querySelector('#reset');

let counterValue = 0;

function updateCounter() {
    counterDisplay.textContent = counterValue;
}

incrementButton.addEventListener('click', () => {
    counterValue++;
    updateCounter();
});

decrementButton.addEventListener('click', () => {
    if (counterValue > 0) {
        counterValue--;
    } else {
        alert('Counter value cannot be negative!');
    }
    updateCounter();
});

resetButton.addEventListener('click', () => {
    if (counterValue === 0) {
        alert('Counter value already 0!');
    } else {
        counterValue = 0;
    }
    updateCounter();
});