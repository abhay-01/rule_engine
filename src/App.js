import React, { useState } from "react";
import RuleForm from "./components/RuleForm";
import RuleList from "./components/RuleList";
import EvaluateForm from "./components/EvaluateForm";
import { combineRules } from "./utils/ruleEngine";

const App = () => {
  const [rules, setRules] = useState([]);
  const [combinedAST, setCombinedAST] = useState(null);

  const addRule = (ruleString) => {
    setRules([...rules, ruleString]);
  };

  const combineAllRules = () => {
    const ast = combineRules(rules);
    setCombinedAST(ast);
  };

  return (
    <div className="App">
      <h1>Rule Engine</h1>
      <RuleForm onAddRule={addRule} />
      <RuleList rules={rules} />
      <button onClick={combineAllRules}>Combine Rules</button>
      {combinedAST && <EvaluateForm ast={combinedAST} />}
    </div>
  );
};

export default App;
