class Node {
  constructor(type, left = null, right = null, value = null) {
    this.type = type; // 'operator' or 'operand'
    this.left = left;
    this.right = right;
    this.value = value; // for operands
  }
}

/**
 * Parses a rule string into an AST.
 * @param {string} ruleString - The rule string to be parsed.
 * @returns {Node} - The root node of the AST.
 */
export const createRule = (ruleString) => {
  const tokens = ruleString
    .replace(/\s+/g, "") // Remove whitespace
    .match(/(?:\d+|[A-Za-z]+|'[A-Za-z]+'|>=|<=|!=|==|>|<|AND|OR|\(|\))/g);

  const operators = [];
  const operands = [];

  const precedence = {
    OR: 1,
    AND: 2,
  };

  const applyOperator = () => {
    const operator = operators.pop();
    const right = operands.pop();
    const left = operands.pop();
    operands.push(new Node("operator", left, right, operator));
  };

  for (const token of tokens) {
    if (!isNaN(token)) {
      // It's a number, create a value node (operand)
      operands.push(new Node("operand", null, null, parseFloat(token)));
    } else if (token[0] === "'" && token[token.length - 1] === "'") {
      // It's a string, create a value node (operand)
      operands.push(new Node("operand", null, null, token.slice(1, -1)));
    } else if (token in precedence) {
      // Handle AND/OR operators
      while (
        operators.length &&
        precedence[operators[operators.length - 1]] >= precedence[token]
      ) {
        applyOperator();
      }
      operators.push(token);
    } else if (token === "(") {
      operators.push(token);
    } else if (token === ")") {
      while (operators.length && operators[operators.length - 1] !== "(") {
        applyOperator();
      }
      operators.pop();
    } else if (/[A-Za-z]+[<>!=]=?/.test(token)) {
      // Handle conditions like "age>30"
      const match = token.match(/([A-Za-z]+)([<>!=]+)(.+)/);
      if (match) {
        const [, field, operator, value] = match;
        operands.push(
          new Node("operand", null, null, { field, operator, value })
        );
      }
    }
  }

  while (operators.length) {
    applyOperator();
  }

  return operands.pop();
};

/**
 * Combines multiple rules into a single AST.
 * @param {Array<string>} rules - An array of rule strings.
 * @returns {Node} - The root node of the combined AST.
 */
export const combineRules = (rules) => {
  if (rules.length === 0) return null;

  const root = new Node("operator", null, null, "AND"); // Combine with AND by default
  let currentNode = root;

  for (const rule of rules) {
    const ruleAST = createRule(rule);
    if (currentNode.left === null) {
      currentNode.left = ruleAST; // Set first rule
    } else {
      currentNode.right = ruleAST; // Set second rule
    }

    if (currentNode.right) {
      currentNode = new Node("operator", currentNode, null, "AND"); // Create a new AND node
    }
  }

  return root;
};

/**
 * Evaluates the rule represented by the AST against user data.
 * @param {Node} node - The root node of the AST.
 * @param {Object} userData - An object containing user attributes.
 * @returns {boolean} - True if the user meets the rule conditions, false otherwise.
 */
export const evaluateRule = (node, userData) => {
  if (!node) return false;

  const { type, left, right, value } = node;

  if (type === "operand") {
    const { field, operator, value: operandValue } = value;

    const userValue = userData[field]; // Get the relevant field from user data

    switch (operator) {
      case ">":
        return userValue > operandValue;
      case "<":
        return userValue < operandValue;
      case ">=":
        return userValue >= operandValue;
      case "<=":
        return userValue <= operandValue;
      case "==":
        return userValue === operandValue;
      case "!=":
        return userValue !== operandValue;
      default:
        return false; // Invalid operator
    }
  } else if (type === "operator") {
    const leftEval = evaluateRule(left, userData);
    const rightEval = evaluateRule(right, userData);

    if (value === "AND") return leftEval && rightEval;
    if (value === "OR") return leftEval || rightEval;
  }

  return false;
};

const ruleEngine = { Node};
export default ruleEngine;
