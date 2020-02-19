//running total at first equals 0, then we want the total to run all the time
let runningTotal = 0;
//tracking what user is putting in, a string 0 is a begining
let buffer = "0";
//tracking what user previously pressed
let previousOperator;
const screen = document.querySelector(".screen");

document.querySelector('.calc-container').addEventListener("click", function(event) {
    buttonClick(event.target.innerText);
});

//is value a number or not? isNaN parseInt the value handleSymbol with value or handleNumber with value
function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
}

//running the value you're pressing, handle only with number
function handleNumber(value) {
    if(buffer === "0") {
        buffer = value;
    } else {
        buffer += value;
    }
    rerender();
}

//handle with the operator, null the absence of anything
function handleSymbol(value) {
    switch(value) {
        case 'C':
            buffer = "0";
            runningTotal = 0;
            break;
        //take the value and do this: if there was nothign previously the return nothing otherwise if you have some previous operator do that, turning buffer into a number and pass it into flushOperator
        case "=":
            if (previousOperator === null) {
                return;
            }
            flushOperator (parseInt(buffer));
            previousOperator = null;
            //turning something into a string
            buffer = "" + runningTotal;
            runningTotal = 0;
            break;
        case "⟵":
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
                break;
        default:
            handleMath(value);
            break;
            }
    }

//storing the previous, clicked value, starting with running totsal 0, turning running total into a buffer
function handleMath(value) {
    const intBuffer = parseInt(buffer);
        if (runningTotal === 0) {
            runningTotal = intBuffer;
        } else {
            flushOperator(intBuffer);
        }

    previousOperator = value;

    buffer = "0";
}

//setting symbols
function flushOperator (intBuffer) {
    if (previousOperator === "+") {
        runningTotal += intBuffer;
    } else if (previousOperator === "-") {
        runningTotal -= intBuffer;
    } else if (previousOperator === "x") {
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }
}

function rerender() {
    screen.innerText = buffer;
}