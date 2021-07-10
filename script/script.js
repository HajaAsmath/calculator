const operators = ['+','*','/','-'];
operand1 = 0;
operand2 = 0;
operator = '';
first = true;

function start() {
    const keys = document.querySelectorAll(".keys");
    keys.forEach(key => key.addEventListener("click", addToScreen));
}

function addToScreen(e) {
    console.log(operand1 +" "+operand2+" "+operator);
    const screen = document.querySelector("#screen-input");
    const operand = Number(e.target.innerText);
    if(typeof operand == 'number' && !isNaN(operand)) {
        if(operand1 !== 0 && operator !== ''){
            if(first) {
                screen.value = operand;
                first = false;
            } else {
                screen.value += operand;
            }
        } else {
            screen.value += operand;
        }
    } else if(isOperator(e.target.innerText)) {
        if(operator == '') {
            operand1 = Number(screen.value);
            operator = e.target.innerText;
        }  else {
            operand2 = Number(screen.value);
            operand1 = calculate();
            operator = e.target.innerText;
            first = true;
            operand2 = 0;
            screen.value = operand1;
        }
    }
 }

 function calculate() {
     let result = 0;
     switch (operator) {
         case '+':
            result = operand1 + operand2;
            break;
        case '-':
            result = Math.abs(operand1 - operand2);
            break;
        case '*':
            result = operand1 * operand2;
            break;
        case '/':
            result = operand1 / operand2;
            break;
     }
     return result;
 }

 function isOperator(value) {
    const found = operators.find(operator => operator == String(value));     
    return found === undefined?false:true;
 }

start();