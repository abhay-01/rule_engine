import React, { useState } from "react";

const RuleForm = ({ onAddRule }) => {
  const [ruleString, setRuleString] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ruleString) {
      onAddRule(ruleString);
      setRuleString("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter rule (e.g., age > 30 AND department = 'Sales')"
        value={ruleString}
        onChange={(e) => setRuleString(e.target.value)}
        required
      />
      <button type="submit">Add Rule</button>
    </form>
  );
};

export default RuleForm;
