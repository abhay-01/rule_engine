import Rule from '../models/ruleModel.js';
import { createRule, combineRules, evaluateRule } from '../utils/ruleEngine.js';

// Create a new rule
export const _createRule = async (req, res) => {
    try {
        const { ruleString } = req.body;
        const astTree = createRule(ruleString);
        console.log("astTree check", astTree);
        const newRule = new Rule({ ruleString });
        await newRule.save();
        res.status(201).json(newRule);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all rules
export const getRules = async (req, res) => {
  try {
    const rules = await Rule.find();
    res.status(200).json(rules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Combine rules
export const _combineRules = (req, res) => {
    const { rules } = req.body;
    console.log("rules--->", rules)
    const combinedAST = combineRules(rules);
    res.json(combinedAST);
};

// Evaluate a rule
export const _evaluateRule = (req, res) => {
  const { userData, ruleAst } = req.body;

  try {
    console.log('Evaluating rule with AST:', JSON.stringify(ruleAst, null, 2));
    console.log('User data:', userData);

    const result = evaluateRule(userData, ruleAst);
    res.json({ success: true, result });
  } catch (error) {
    console.error("Error evaluating rule:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};


// Export the controller methods
// const ruleControllers = {
//     createRule: _createRule,
//     getRules,
//     combineRules: _combineRules,
//     evaluateRule: _evaluateRule
// };

// export default ruleControllers;
