const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
const DISPLAY_LIMIT = 12;

const keyboardMap = {
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '.': '.',
    '+': '+',
    '-': '-',
    '*': '*',
    '/': '/',
    'Enter': '=',
    '=': '=',
    'Escape': 'AC',
    'AC': 'AC', // In case someone types AC
    '%': '%',
    '_': '+/-',
    'Backspace': 'CE', // Treat backspace as clear for this simple calculator
    'Delete': 'CE'    // Treat delete as clear as well
}

let currentInput = '';
let operator = null;
let firstOperand = null;

function updateDisplay() {
    display.value = currentInput;
}

function clearCalculator() {
    currentInput = '';
    operator = null;
    firstOperand = null;
    updateDisplay();
}

function toggleActiveButton(buttonElement) {
    if (buttonElement) {
        buttonElement.classList.add('active');
        setTimeout(() => {
            buttonElement.classList.remove('active');
        }, 100);
    }
}

function handleNumberClick(number) {
    if (currentInput === '0' && number === '0') {
        return;
    } else if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else if (currentInput.length < DISPLAY_LIMIT) {
        currentInput += number;
    }
    updateDisplay();
}

function handleOperatorClick(op) {
    if (operator && firstOperand !== null) {
        calculateResult();
    }
    firstOperand = parseFloat(currentInput);
    operator = op;
    currentInput = '';
}

function handleEqualClick() {
    if (operator && firstOperand !== null) {
        calculateResult();
        operator = null;
        firstOperand = null;
    }
}

function handleDecimalClick() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

function handleClearEntry() {
    currentInput = '';
    updateDisplay();
}

function handlePlusMinus() {
    if (currentInput) {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay();
    }
}

function handlePercentage() {
    if (currentInput) {
        const newValue = (parseFloat(currentInput) * -1).toString();
        if (newValue.length <= DISPLAY_LIMIT) {
            currentInput = newValue;
            updateDisplay();
        } else {
            currentInput = 'Error';
            updateDisplay();
        }
    }
}

function handleSquareRoot() {
    const currentValue = parseFloat(currentInput);
    if (!isNaN(currentValue) && currentValue >= 0) {
        const result = Math.sqrt(currentValue).toString();
        if (result.length <= DISPLAY_LIMIT) {
            currentInput = result;
            updateDisplay();
        } else {
            currentInput = 'Error';
            updateDisplay();
        }
    } else if (currentValue < 0) {
        currentInput = 'Error';
        updateDisplay();
    } else {
        currentInput = 'Error';
        updateDisplay();
    }
}

function calculateResult() {
    let result;
    const secondOperand = parseFloat(currentInput);
    if (operator) { // Add this check
        switch (operator) {
            case '+':
                result = firstOperand + secondOperand;
                break;
            case '-':
                result = firstOperand - secondOperand;
                break;
            case '*':
                result = firstOperand * secondOperand;
                break;
            case '/':
                if (secondOperand === 0) {
                    result = 'Error';
                } else {
                    result = firstOperand / secondOperand;
                }
                break;
            default:
                return;
        }
        const resultString = result.toString();
        if (resultString.length > DISPLAY_LIMIT) {
            currentInput = 'Error';
        } else {
            currentInput = resultString;
        }
        updateDisplay();
    }
}

function handleKeyboardInput(event) {
    const key = event.key;
    const buttonValue = keyboardMap[key];
    let buttonToActivate = null;

    if (buttonValue) {
        buttons.forEach(button => {
            if (button.textContent === buttonValue) {
                buttonToActivate = button;
            }
        });

        toggleActiveButton(buttonToActivate);

        // Call the appropriate handler function
        if (key >= '0' && key <= '9') {
            handleNumberClick(key);
        } else if (key === '.') {
            handleDecimalClick();
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            handleOperatorClick(key);
        } else if (key === 'Enter' || key === '=') {
            handleEqualClick();
        } else if (key === 'Escape' || key === 'AC' || key === 'Backspace' || key === 'Delete') {
            handleClearEntry();
        } else if (key === '%') {
            handlePercentage();
        } else if (key === '_') {
            handlePlusMinus();
        }
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonValue = button.textContent;

        // Add the active class
        toggleActiveButton(button);

        if (buttonValue >= '0' && buttonValue <= '9') {
            handleNumberClick(buttonValue);
        } else if (buttonValue === '.') {
            handleDecimalClick();
        } else if (buttonValue === 'AC') {
            clearCalculator();
        } else if (buttonValue === 'CE'){
            handleClearEntry();
        } else if (buttonValue === '=') {
            handleEqualClick();
        } else if (['+', '-', '*', '/'].includes(buttonValue)) {
            handleOperatorClick(buttonValue);
        } else if (buttonValue === '+/-') {
            handlePlusMinus();
        } else if (buttonValue === '%') {
            handlePercentage();
        } else if (buttonValue === '√') {
            handleSquareRoot();
        }
    });
});

document.addEventListener('keydown', handleKeyboardInput);

// Initial display update
updateDisplay();