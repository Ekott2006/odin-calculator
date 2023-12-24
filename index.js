const CONTROLS = document.querySelector("#controls");
const CURRENT_INPUT = document.querySelector("input#current-input");
const ALL_INPUT = document.querySelector("#all-input");

for (const key of KEYS) {
  const div = document.createElement("div");
  for (const keyName of key) {
    const button = document.createElement("button");
    button.innerHTML = keyName[0];
    button.className = keyName[1];
    button.onclick = () => addUserInput(keyName);
    div.appendChild(button);
  }
  CONTROLS.appendChild(div);
}

CURRENT_INPUT.value = "0";
CURRENT_INPUT.oninput = (event) => {
  if (event.data == "*") addUserInput(MULTIPLY);
  else if (event.data == "/") addUserInput(DIVIDE);
  else addUserInput(event.data);
};
CURRENT_INPUT.onkeydown = (event) => {
  const key = event.keyCode || event.charCode;
  if (key == 8 || key == 46) addUserInput(DELETE);
};

let CURRENT_INPUT_VALUE = FIRST_NUM;
function addUserInput(input) {
  let firstValue = FIRST_NUM;
  let lastValue = LAST_NUM;
  if (
    input === ADD ||
    input === SUBTRACT ||
    input === DIVIDE ||
    input === MULTIPLY
  ) {
    handleBasicOperators(input);
  } else if (Number.parseInt(input) == input) {
    handleNumbers(input);
  } else if (input === EQUALS) {
    handleEquals();
  } else if (input === DECIMAL) {
    handleDecimal();
  } else if (input === PERCENTAGE) {
    handlePercentage();
  } else if (input === CLEAR) {
    handleClear();
  } else if (input === ADD_NEGATIVE) {
    handleAddNegative();
  } else if (input == DELETE) {
    handleDelete();
  }

  ALL_INPUT.value = `${FIRST_NUM} ${OPERATOR ?? ""} ${LAST_NUM ?? ""}`;
  if (lastValue !== LAST_NUM && LAST_NUM != null) {
    CURRENT_INPUT_VALUE = LAST_NUM;
  } else if (firstValue != FIRST_NUM || LAST_NUM == null) {
    CURRENT_INPUT_VALUE = FIRST_NUM;
  }
  CURRENT_INPUT.value = CURRENT_INPUT_VALUE;
}
