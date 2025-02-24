

let previousValue = "";
let currentValue = "";
let operator = "";

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, operator) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "x":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

function addNumbersEvent() {
    const numberButtons = document.querySelectorAll(".number");
    numberButtons.forEach((button) => {
        button.addEventListener("click", handleNumberClick)
    })
}

function addOperatorEvent() {
    const operatorButtons = document.querySelectorAll(".operator")
    operatorButtons.forEach((button) => {
        button.addEventListener('click', handleOperatorClick);
    })
}

function handleOperatorClick(event) {
    const newOperator = event.target.textContent;
    if (currentValue) {
        calculate();
    }
    if (!operator) {
        swapValues();
    }
    operator = newOperator;
    updateDisplay();
}

function swapValues() {
    previousValue = currentValue;
    currentValue = "";
}

function handleNumberClick(event) {
    const number = event.target.textContent;
    currentValue += number;
    updateDisplay();
    console.log(previousValue, currentValue, operator)
}

function updateDisplay(text) {
    const display = document.querySelector(".display");
    if (text) {
        display.textContent = text;
    } else if (previousValue) {
        display.textContent = `${previousValue} ${operator} ${currentValue}`;
    } else {
        display.textContent = `${currentValue} ${operator}`;
    }
    scrollDisplay();
}

function addEqualsEvent() {
    const equalsButton = document.querySelector("#equals");
    equalsButton.addEventListener("click", calculate);
}

function calculate() {
    if (!validateOperation()) {
        return;
    }
    const result = operate(Number(previousValue), Number(currentValue), operator);
    if (isNaN(result)) {
        updateDisplay("Invalid Operation");
        reset();
    } else {
        reset();
        currentValue = String(roundThreePlaces(result));
        updateDisplay();
    }
}

function validateOperation() {
    if (!previousValue || !currentValue) {
        return false;
    }
    return true;
}

function addDotEvent() {
    const dotButton = document.querySelector("#dot");
    dotButton.addEventListener("click", handleDotClick);
}

function handleDotClick() {
    if (currentValue.length === 0 || isNaN(currentValue)) {
        return;
    }
    currentValue += ".";
    updateDisplay();
}

function reset() {
    previousValue = "";
    currentValue = "";
    operator = "";
}

function scrollDisplay() {
    const display = document.querySelector(".display");
    if (display.scrollWidth > display.clientWidth) {
        display.scrollLeft = display.scrollWidth;
    }
}

function roundThreePlaces(value) {
    return Math.round(value * 1000) / 1000;
}

addNumbersEvent();
addOperatorEvent();
addEqualsEvent();
addDotEvent();