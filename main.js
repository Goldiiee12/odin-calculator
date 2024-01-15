// Initializes variables to store the operator, previous value, and current value.
let operator = '';
let previousValue = '';
let currentValue = '';

// Sets up an event listener that waits for the HTML document to fully load.
document.addEventListener("DOMContentLoaded", function(){

    // Selects HTML elements and stores them in variables for later use.
    let clear = document.querySelector("#clear-btn");
    let equal = document.querySelector(".equal");
    let decimal = document.querySelector(".decimal");

    let numbers = document.querySelectorAll(".number");
    let operators = document.querySelectorAll(".operator");

    let previousScreen = document.querySelector(".previous");
    let currentScreen = document.querySelector(".current");

    // Adds click event listeners to number buttons.
    // When a number button is clicked, handleNumber function is called and the screen is updated.
    numbers.forEach((number) => number.addEventListener("click", function(e){
        handleNumber(e.target.textContent)
        currentScreen.textContent = currentValue;
    }))

    // Adds click event listeners to operator buttons.
    // When an operator button is clicked, handleOperator function is called and screens are updated.
    operators.forEach((op) => op.addEventListener("click", function(e){
        handleOperator(e.target.textContent)
        previousScreen.textContent = previousValue + " " + operator;
        currentScreen.textContent = currentValue;
    }))

    // Adds click event listener to clear button.
    // Resets all values and updates the screen when clicked.
    clear.addEventListener("click", function(){
        previousValue = '';
        currentValue = '';
        operator = '';
        previousScreen.textContent = currentValue;
        currentScreen.textContent = currentValue;
    })

    // Adds click event listener to equal button.
    // Performs calculation, include possible more numbers and updates the screen when clicked.
    equal.addEventListener("click", function(){
            if(currentValue != '' && previousValue != ''){
            calculate()
            previousScreen.textContent = '';
            if(previousValue.length <= 5){
                currentScreen.textContent = previousValue;
            } else{
                currentScreen.textContent = previousValue.slice(0,5) + "...";
            }
        } 
    })


    decimal.addEventListener("click", function(){
        addDecimal()
    })

})

// Adds the clicked number to the currentValue. Only allows up to 5 digits to be entered.
function handleNumber(num){
    if(currentValue.length <= 5) {
        currentValue += num;
    }
}

// Sets the current operator and moves the currentValue to previousValue, resetting currentValue.
function handleOperator(op){
    operator = op;
    previousValue = currentValue;
    currentValue = '';
}

// Performs the calculation based on the chosen operator and updates previousValue with the result.
function calculate(){
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);

    if(operator === "+"){
        previousValue += currentValue;
    } else if (operator === "-"){
        previousValue -= currentValue;
    } else if (operator === "x"){
        previousValue *= currentValue;
    } else{
        previousValue /= currentValue;
    }   

    previousValue = roundNumber(previousValue);
    previousValue = previousValue.toString();
    currentValue = previousValue.toString();
}

// Rounds a number to 3 decimal places.
function roundNumber(num){
    return Math.round(num * 1000) / 1000;
}

function addDecimal(){
    if(!currentValue.includes(".")){
        currentValue += '.';
    }
}
