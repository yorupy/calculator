
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
    if (b === 0) {
        return "ERR DIVISION BY ZERO"
    }
    return a / b;
}

let previousValue = "";
let currentValue = "";
let operand = "";

function operate(a, b, operand) {
    switch (operand) {
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

function handleNumberClick(event) {
    const number = event.target.textContent;
    currentValue += number;
    updateDisplay();
}

function updateDisplay(text) {
    const display = document.querySelector(".display");
    if (text) {
        display.textContent = text;
    } else if (previousValue) {
        display.textContent = `${previousValue} ${operand} ${currentValue}`;
    } else {
        display.textContent = `${currentValue} ${operand}`;
    }
    scrollDisplay();
}

function scrollDisplay() {
    const display = document.querySelector(".display");
    if (display.scrollWidth > display.clientWidth) {
        display.scrollLeft = display.scrollWidth;
    }
}

addNumbersEvent();