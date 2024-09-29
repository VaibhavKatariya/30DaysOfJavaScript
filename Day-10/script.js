const display = document.querySelector('#display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let operator = '';
let previousInput = '';

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const key = e.target.getAttribute('data-key');
        handleInput(key);
    });
});

document.addEventListener('keydown', (e) => {
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', 'Enter', 'Backspace'];
    if (allowedKeys.includes(e.key)) {
        handleInput(e.key === 'Enter' ? '=' : e.key);
    }
});

function handleInput(key) {
    if (key === 'C') {
        clearDisplay();
    } else if (key === '=') {
        calculate();
    } else if (['+', '-', '*', '/'].includes(key)) {
        setOperator(key);
    } else {
        appendNumber(key);
    }
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    display.value = '';
}

function appendNumber(num) {
    currentInput += num;
    display.value = currentInput;
}

function setOperator(op) {
    if (currentInput === '') return;
    previousInput = currentInput;
    operator = op;
    currentInput = '';
    display.value = operator;
}

function calculate() {
    if (previousInput === '' || currentInput === '') return;
    const a = parseFloat(previousInput);
    const b = parseFloat(currentInput);
    let result = 0;

    switch (operator) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
        case '/':
            result = a / b;
            break;
    }

    display.value = result;
    currentInput = result.toString();
    previousInput = '';
    operator = '';
}
