const display = document.getElementById("display");
const preDisplay = document.getElementById("preDisplay");



const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});


function handleButtonClick(event) {
  const buttonValue = event.target.textContent;
  const currentDisplayValue = display.value;
  
  let currentPreDisplayValue = preDisplay.textContent.trim(); // Remove trailing spaces

let totalResult = false;
  

  if (!isNaN(buttonValue) || buttonValue === ".") {
    if (currentDisplayValue === "" && (buttonValue === "." || isOperator(buttonValue))) {
      return;
    }

    display.value += buttonValue;
  } else if (buttonValue === "A/C") {
    clearCalculator();
  } else if (buttonValue === "=") {
    let calc = calculateResult();
    totalResult = calc;
  } else {
    if (currentDisplayValue !== "") {
      if (currentPreDisplayValue !== "") {
        currentPreDisplayValue += " " + currentDisplayValue;
      } else {
        currentPreDisplayValue = currentDisplayValue;
      }
      display.value = "";
    }

    if (isOperator(currentPreDisplayValue.slice(-1))) {
      currentPreDisplayValue = currentPreDisplayValue.slice(0, -1).trim();
    }

    currentPreDisplayValue += " " + buttonValue;
  }

  if(!totalResult){
    preDisplay.textContent = currentPreDisplayValue;
  }
}
function isOperator(char) {
  return char === "+" || char === "-" || char === "*" || char === "/" || char === "%";
}



function clearCalculator() {
  display.value = "";
  preDisplay.textContent = "";
}

function calculateResult() {
  const preDisplayText = preDisplay.textContent.trim();
  const displayValue = display.value.trim();

  if (preDisplayText === "" && displayValue === "") {
    return;
  }

  let calculate = preDisplayText;

  if (displayValue !== "") {
    calculate += " " + displayValue;

    try {
      const result = eval(calculate);
      preDisplay.textContent = calculate + " =";
      display.value = result;
    } catch (error) {
      display.value = "Error";
    }
  } else {
    preDisplay.textContent = preDisplayText + " " + preDisplayText.slice(-1);
  }
  return true;
}


