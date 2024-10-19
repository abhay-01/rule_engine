export class Node {
    constructor(type, left = null, right = null, value = null) {
      this.type = type;  // 'operator' or 'operand'
      this.left = left;
      this.right = right;
      this.value = value;  // for operands
    }
  }
  
  export const createRule = (ruleString) => {
    if (ruleString.includes("AND")) {
      const [leftPart, rightPart] = ruleString.split("AND");
      return new Node("operator", createRule(leftPart.trim()), createRule(rightPart.trim()));
    } else if (ruleString.includes("OR")) {
      const [leftPart, rightPart] = ruleString.split("OR");
      return new Node("operator", createRule(leftPart.trim()), createRule(rightPart.trim()));
    } else {
      const [attribute, condition] = ruleString.split(/(>|<|=)/);
      const operator = condition[0];
      const value = condition.slice(1).trim();
      return new Node("operand", null, null, { attribute: attribute.trim(), operator, value });
    }
  };
  
  export const combineRules = (rules) => {
    let combinedAST = createRule(rules[0]);
    for (let i = 1; i < rules.length; i++) {
      combinedAST = new Node("operator", combinedAST, createRule(rules[i]), "AND");
    }
    return combinedAST;
  };
  
  export const evaluateRule = (node, userData) => {
    console.log("node", node);
    console.log("userData", userData);
    if (node.type === "operand") {
      const { attribute, operator, value } = node.value;
      const userValue = userData[attribute];
      
      if (operator === ">") return userValue > Number(value);
      if (operator === "<") return userValue < Number(value);
      if (operator === "=") return userValue === value;
    }
  
    if (node.type === "operator") {
      const leftEval = evaluateRule(node.left, userData);
      const rightEval = evaluateRule(node.right, userData);
      return node.value === "AND" ? leftEval && rightEval : leftEval || rightEval;
    }
  };
  