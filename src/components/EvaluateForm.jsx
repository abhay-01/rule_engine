import React, { useState } from "react";
import { evaluateRule } from "../utils/ruleEngine";

const EvaluateForm = ({ ast }) => {
  const [userData, setUserData] = useState({ age: "", department: "", salary: "", experience: "" });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const evaluation = evaluateRule(ast, userData);
    setResult(evaluation);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="number" name="age" placeholder="Age" value={userData.age} onChange={handleChange} />
        <input type="text" name="department" placeholder="Department" value={userData.department} onChange={handleChange} />
        <input type="number" name="salary" placeholder="Salary" value={userData.salary} onChange={handleChange} />
        <input type="number" name="experience" placeholder="Experience" value={userData.experience} onChange={handleChange} />
        <button type="submit">Evaluate Rule</button>
      </form>
      {result !== null && <p>Result: {result ? "Eligible" : "Not Eligible"}</p>}
    </div>
  );
};

export default EvaluateForm;
