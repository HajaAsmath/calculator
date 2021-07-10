const numberKeys = ['1','2','3','4','5','6','7','8','9','0'];
const backSpace = 'Backspace';

const screen = document.querySelector("#screen");
const keys = document.querySelectorAll(".operand");
const operator_key = document.querySelectorAll(".operator");
const equal_key = document.querySelector(".equals");
const percentage_key = document.querySelector(".percentage");
const backSpace_key = document.querySelector(".backspace");
const clear_key = document.querySelector(".clear");

let operand1 = 0;
let operand2 = 0;
let operator = '';
let temp = '';
let first = true;

function start() {
    keys.forEach(key => key.addEventListener("click", addToScreenMouse));
    operator_key.forEach(key => key.addEventListener("click", addOperator));
    equal_key.addEventListener("click", equalOperator);
    percentage_key.addEventListener("click", calculatePercentage);
    backSpace_key.addEventListener("click", backSpaceInScreen);
    clear_key.addEventListener("click", clearScreen);
    document.addEventListener("keydown", addToScreenKeyboard);
}

function clearScreen(e) {
    operand1 = 0;
    operand2 = 0;
    screen.innerText = '';
    temp = '';
}

function backSpaceInScreen(e) {
    e.key = backSpace;
    addToScreenKeyboard(e);
}

function addToScreenKeyboard(e) {
    const isNumber = numberKeys.find(key => key === e.key) === undefined?false:true;
    if(isNumber) {
        screen.innerText = temp + e.key;
        temp += e.key;
    } else if (e.key === backSpace) {
        screen.innerText = temp.substr(0, temp.length-1 );
        temp = screen.innerText;
    }
}

function calculatePercentage(e) {
    let number = Number(screen.innerText);
    screen.innerText = number/100;
    temp = screen.innerText;
    operand2 = 0;
    operand1 = 0;
    operator = '';
}

function addToScreenMouse(e) {
    e.key = e.target.innerText;
    addToScreenKeyboard(e);
}

function addOperator(e) {
    if(operand1 !== 0 && operator !== '' && temp !== '') {
        operand2 = Number(temp);
        operand1 = calculate();
        screen.innerText = operand1;
        operand2 = '';
        temp = '';
    } else if(temp !== ''){
        operand1 = Number(temp);
        temp = '';
    }
    operator = e.target.innerText;
    console.log('in operator '+temp+","+operand1+","+operand2+","+operator);
}

function equalOperator(e) {
    if (operand1 !==0 && operator !== '' && temp !== '') {
        operand2 = Number(temp);
        operand1 = calculate();
        screen.innerText = operand1;
        operand2 = '';
        temp = operand1;
        operator = '';
    }
}

 function calculate() {
     let result = 0;
     switch (operator) {
         case '+':
            result = operand1 + operand2;
            break;
        case '-':
            result = operand1 - operand2;
            break;
        case '*':
            result = operand1 * operand2;
            break;
        case '/':
            result = operand1 / operand2;
            if (result === Infinity) {
                alert("Cannot divide by 0");
                result = 0;
            }
            break;
     }
     return result;
 }

start();