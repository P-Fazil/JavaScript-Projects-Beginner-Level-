let currentInput = '';
let currentOperation = null;
let previousInput = '';

const display = document.querySelector('.display-text');
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('number') || value === '.') {
            appendNumber(value);
        } else if (button.classList.contains('operator')) {
            chooseOperation(value);
        } else if (button.classList.contains('equals')) {
            calculate();
        } else if (button.classList.contains('clear')) {
            clearDisplay();
        }
    })
})

function appendNumber(value) {
    if (value === '.' && currentInput.includes('.')) return;
    currentInput += value;
    updateDisplay();
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch(currentOperation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Cannot be divided by zero.");
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    currentOperation = null;
    previousInput = '';
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    currentOperation = null;
    previousInput = '';
    updateDisplay();
}

function updateDisplay() {
    display.textContent = currentInput;
    if (currentOperation != null) {
        display.textContent `${previousInput} ${currentOperation} ${currentInput}`
    }
}

function chooseOperation(operator) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    currentOperation = operator;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
}