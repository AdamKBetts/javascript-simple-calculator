const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

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

function handleNumberClick(number) {
    if (currentInput === '0') {
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
    let buttonToActivate = null;

    buttons.forEach(button => {
        const buttonValue = button.textContent;
        if (
            (key >= '0' && key <= '9' && key === buttonValue) ||
            (key === '.' && buttonValue === '.') ||
            (key === '+' && buttonValue === '+') ||
            (key === '-' && buttonValue === '-') ||
            (key === '*' && buttonValue === '*') ||
            (key === '/' && buttonValue === '/') ||
            ((key === 'Enter' || key === '=') && buttonValue === '=') ||
            ((key === 'Escape' || key === 'AC') && buttonValue === 'AC') ||
            (key === '%' && buttonValue === '%') ||
            (key === '_' && buttonValue === '+/-') ||
            ((key === 'Backspace' || key === 'Delete') && buttonValue === 'AC')
        ) {
            buttonToActivate = button;
        }
    });

    if (buttonToActivate) {
        buttonToActivate.classList.add('active');
        setTimeout(() => {
            buttonToActivate.classList.remove('active');
        }, 100);
    }

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

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonValue = button.textContent;

        // Add the active class
        button.classList.add('active');

        if (buttonValue >= '0' && buttonValue <= '9') {
            handleNumberClick(buttonValue);
        } else if (buttonValue === '.') {
            handleDecimalClick();
        } else if (buttonValue === 'AC') {
            clearCalculator();
        } else if (buttonValue === '=') {
            handleEqualClick();
        } else if (['+', '-', '*', '/'].includes(buttonValue)) {
            handleOperatorClick(buttonValue);
        } else if (buttonValue === '+/-') {
            handlePlusMinus();
        } else if (buttonValue === '%') {
            handlePercentage();
        }

        // Remove the active class after a short delay (e.g. 100 milliseconds)
        setTimeout(() => {
            button.classList.remove('active');
        }, 100);
    });
});

document.addEventListener('keydown', handleKeyboardInput);

// Initial display update
updateDisplay();