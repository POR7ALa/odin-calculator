let currentTotal = 0;
let lastOperator = null;
let newEntry = false;
const maxDigits = 15;

const selectDisplay = document.querySelector('.display');
const selectDecimal = document.querySelector('.decimal');
const selectEquals = document.querySelector('.equals');
const selectPercent = document.querySelector('.percent');
const additionButton = document.querySelector('#add');
const minusButton = document.querySelector('#minus');
const multiplyButton = document.querySelector('#multiply');
const divideButton = document.querySelector('#divide');

// clears the display text content
function clearDisplay() {
    selectDisplay.textContent = '';
    console.clear();   
}
// reset tracking and clear display
document.querySelector('.clear').addEventListener('click', () => {
    currentTotal = 0;
    lastOperator = null;
    newEntry = false;
    clearDisplay();
});

// 
document.addEventListener('keydown', function(numKeyInput) {
    // console.log(numKeyInput);
    
    if (numKeyInput.key >= '0' && numKeyInput.key <= '9') {
        
        if (newEntry) {
            clearDisplay();
            newEntry = false;
            console.log(currentTotal)
        }

        let pressedKeyNumber = numKeyInput.key;
        if (selectDisplay.textContent.length < maxDigits) {
            selectDisplay.textContent += pressedKeyNumber;
        } 
        else {
            alert('15 Digits Max');
        }

    };
    
    switch (numKeyInput.key) {
        case 'Backspace':
            let currentDisplay = selectDisplay.textContent;    
            selectDisplay.textContent = currentDisplay.slice(0, -1);  
            break;  
            
        case '+':
            additionButton.click();
            break;
                
        case '*':
            multiplyButton.click();
            break;

        case '/':
            divideButton.click();
            break;

        case '-':
            minusButton.click();
            break;

        case '%':
            selectPercent.click();
            break;

        case '.':
            selectDecimal.click();
            break;
                    
        case 'Enter':
            selectEquals.click();
            break;
                        
    }

});




document.querySelectorAll('.num').forEach(num => {
    num.addEventListener('click', () => {
        

        if (newEntry) {
            clearDisplay();
            newEntry = false;
            console.log(currentTotal)
        }

        let pressedNumber = num.getAttribute('data-number');
        if (selectDisplay.textContent.length < maxDigits) {
            selectDisplay.textContent += pressedNumber;
        } else {
            alert('Too many digits');
        }

    })
});

document.querySelectorAll('.operator').forEach(operator => {
    operator.addEventListener('click', () => {

        let valueAtOperation = selectDisplay.textContent;

        if (lastOperator !== null) {
            operate(lastOperator, currentTotal, valueAtOperation);
        } else if (lastOperator == null && currentTotal == 0) {
            currentTotal += valueAtOperation;
        }

        lastOperator = operator.textContent;
        console.log(currentTotal)
        newEntry = true;
    })
});

document.querySelector('.equals').addEventListener('click', () => {
    

    let valueAtOperation = selectDisplay.textContent;
    operate(lastOperator, currentTotal, valueAtOperation);  
    newEntry = false;
    lastOperator = null;

});

document.querySelector('.sign').addEventListener('click', () => {
    
    let currentNum = parseFloat(selectDisplay.textContent);
    currentNum *= -1;
    selectDisplay.textContent = currentNum;

});

document.querySelector('.percent').addEventListener('click', () => {
    
    let displayedNum = parseFloat(selectDisplay.textContent);
    console.log(displayedNum);
    dividedNumber = (displayedNum/100);
    selectDisplay.textContent = dividedNumber;
    console.log(displayedNum);

});

document.querySelector('.decimal').addEventListener('click', () => {
    
    if (selectDisplay.textContent.includes('.') ) {
        console.log(selectDisplay.textContent);
    } else {
        selectDisplay.textContent += '.';
    }

});

// if currentTotal == textdisplay 
// cant backspace



function operate(selectedOperator, num1, num2) {
    if (selectedOperator == '+') {
        
        currentTotal = (+num1 + +num2).toFixed(4);
        
        if (typeof(currentTotal) == 'float') {
            selectDisplay.textContent = currentTotal;
            return currentTotal
        } else {
            selectDisplay.textContent = parseInt(currentTotal);
            return currentTotal

        }
        

    } else if (selectedOperator == '-') {
        currentTotal = (+num1 - +num2);
        selectDisplay.textContent = currentTotal;
        return currentTotal

    } else if (selectedOperator == '*') {
        currentTotal = (+num1 * +num2);
        selectDisplay.textContent = currentTotal;
        return currentTotal

    } else if (selectedOperator == '/') {
        
        if (num2 == 0) {
            
            
            newEntry = true;
            currentTotal = '';
            clearDisplay();
            alert('Can\'t divide by zero')

        } else {
        currentTotal = (+num1 / +num2).toFixed(2);
        selectDisplay.textContent = currentTotal;
        
        return currentTotal}
    }
};