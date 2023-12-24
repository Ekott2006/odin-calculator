const ADD = "+";
const DIVIDE = "÷";
const SUBTRACT = "-";
const MULTIPLY = "X";
const EQUALS = "=";
const PERCENTAGE = "%";
const DECIMAL = ".";
const CLEAR = "AC";
const ADD_NEGATIVE = "+/-";
const DELETE = "DEL";

const BASIC = "basic";
const ADVANCED = "advanced";
const NUMBERS = "numbers";

const KEYS = [
  [
    [CLEAR, ADVANCED],
    [DELETE, ADVANCED],
    [PERCENTAGE, ADVANCED],
    [DIVIDE, BASIC],
  ],
  [
    [7, NUMBERS],
    [8, NUMBERS],
    [9, NUMBERS],
    [MULTIPLY, BASIC],
  ],
  [
    [4, NUMBERS],
    [5, NUMBERS],
    [6, NUMBERS],
    [SUBTRACT, BASIC],
  ],
  [
    [1, NUMBERS],
    [2, NUMBERS],
    [3, NUMBERS],
    [ADD, BASIC],
  ],
  [
    [ADD_NEGATIVE, ADVANCED],
    [0, NUMBERS],
    [DECIMAL, ADVANCED],
    [EQUALS, "equals"],
  ],
];

let FIRST_NUM = 0;
let LAST_NUM = null;
let OPERATOR = null;

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

function operate(firstNum, secondNum, operator) {
  if (operator === ADD) return add(firstNum, secondNum);
  if (operator === SUBTRACT) return subtract(firstNum, secondNum);
  if (operator === DIVIDE) return divide(firstNum, secondNum);
  if (operator === MULTIPLY) return multiply(firstNum, secondNum);
  throw new Error("INVALID OPERATOR");
}

function handleDelete() {
  if (LAST_NUM != null) {
    let a = LAST_NUM.toString();
    if (LAST_NUM < 0) {
      LAST_NUM = a.length == 2 ? 0 : Number(a.slice(0, -1));
    } else if (LAST_NUM > 0) {
      LAST_NUM = a.length == 1 ? 0 : Number(a.slice(0, -1));
    } else {
      LAST_NUM = null;
    }
  } else if (OPERATOR) OPERATOR = null;
  else if (FIRST_NUM != null) {
    let a = FIRST_NUM.toString();
    if (FIRST_NUM < 0) {
      FIRST_NUM = a.length == 2 ? 0 : Number(a.slice(0, -1));
    } else if (FIRST_NUM > 0) {
      FIRST_NUM = a.length == 1 ? 0 : Number(a.slice(0, -1));
    } else FIRST_NUM = 0;
  }
}

function handleBasicOperators(input) {
  if (LAST_NUM) {
    FIRST_NUM = operate(FIRST_NUM, LAST_NUM, OPERATOR);
    LAST_NUM = null;
  }
  OPERATOR = input;
}

function handleNumbers(input) {
  if (OPERATOR) {
    LAST_NUM = `${LAST_NUM ?? ""}${input}`;
  } else {
    FIRST_NUM = FIRST_NUM == 0 ? input : `${FIRST_NUM}${input}`;
  }
}

function handleEquals() {
  if (!LAST_NUM) return;
  FIRST_NUM = operate(FIRST_NUM, LAST_NUM ?? FIRST_NUM, OPERATOR);
  LAST_NUM = null;
  OPERATOR = null;
}

function handlePercentage() {
  if (LAST_NUM != null) {
    LAST_NUM *= 0.01;
  } else if (FIRST_NUM) {
    FIRST_NUM *= 0.01;
  }
}

function handleDecimal() {
  if (OPERATOR) {
    if (LAST_NUM && LAST_NUM.toString().includes(".")) return;
    LAST_NUM = `${LAST_NUM ?? 0}.`;
  } else {
    if (FIRST_NUM.toString().includes(".")) return;
    FIRST_NUM = `${FIRST_NUM}.`;
  }
}

function handleClear() {
  FIRST_NUM = 0;
  LAST_NUM = null;
  OPERATOR = null;
}

function handleAddNegative() {
  if (LAST_NUM != null) {
    if (LAST_NUM > 0) {
      LAST_NUM = Number(`-${LAST_NUM}`);
    } else if (LAST_NUM < 0) {
      LAST_NUM = Number(LAST_NUM.toString().replace("-", ""));
    }
  } else {
    if (FIRST_NUM > 0) {
      FIRST_NUM = Number(`-${FIRST_NUM}`);
    } else if (FIRST_NUM < 0) {
      FIRST_NUM = Number(FIRST_NUM.toString().replace("-", ""));
    }
  }
}
