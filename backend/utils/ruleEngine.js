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
const createRule = (ruleString) => {
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
      // Check if the token is a number
      operands.push(new Node("operand", null, null, parseFloat(token)));
    } else if (token[0] === "'" && token[token.length - 1] === "'") {
      // Check if the token is a string
      operands.push(new Node("operand", null, null, token.slice(1, -1))); // Remove quotes
    } else if (token in precedence) {
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
const combineRules = (rules) => {
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
const evaluateRule = (node, userData) => {
  if (!node) return false;

  const { type, left, right, value } = node;

  if (type === "operand") {
    if (value.includes("age")) {
      return userData.age; // Check age
    } else if (value.includes("department")) {
      return userData.department; // Check department
    } else if (value.includes("salary")) {
      return userData.salary; // Check salary
    } else if (value.includes("experience")) {
      return userData.experience; // Check experience
    }
  } else if (type === "operator") {
    const leftEval = evaluateRule(left, userData);
    const rightEval = evaluateRule(right, userData);

    if (value === "AND") return leftEval && rightEval;
    if (value === "OR") return leftEval || rightEval;
  }

  return false; // Default case
};

const ruleEngine = { Node, createRule, combineRules, evaluateRule };

export default ruleEngine;
