const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

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
    'Backspace': 'AC', // Treat backspace as clear for this simple calculator
    'Delete': 'AC'    // Treat delete as clear as well
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
    } else {
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
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay();
    }
}

function calculateResult() {
    let result;
    const secondOperand = parseFloat(currentInput);
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
    currentInput = result.toString();
    updateDisplay();
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
        }
    });
});

document.addEventListener('keydown', handleKeyboardInput);

// Initial display update
updateDisplay();