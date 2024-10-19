import Rule from '../models/ruleModel.js';
import { createRule, combineRules, evaluateRule } from '../utils/ruleEngine.js';

// Create a new rule
const _createRule = async (req, res) => {
    try {
        const { ruleString } = req.body;
        const newRule = new Rule({ ruleString });
        await newRule.save();
        res.status(201).json(newRule);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export { _createRule as createRule };

// Get all rules
export async function getRules(req, res) {
  try {
    const rules = await Rule.find();
    res.status(200).json(rules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Combine rules
const _combineRules = (req, res) => {
    const { rules } = req.body;
    const combinedAST = combineRules(rules);
    res.json(combinedAST);
};
export { _combineRules as combineRules };

// Evaluate a rule
const _evaluateRule = (req, res) => {
    const { ast, userData } = req.body;
    const result = evaluateRule(ast, userData);
    res.json({ result });
};
export { _evaluateRule as evaluateRule };

