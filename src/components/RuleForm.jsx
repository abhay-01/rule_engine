import React, { useState } from 'react';
import { createRule, combineRules, evaluateRule } from '../api/ruleEngineApi.js';
import './RuleForm.css';

const RuleForm = () => {
  const [ruleString, setRuleString] = useState('');
  const [combinedRules, setCombinedRules] = useState([]);
  const [userData, setUserData] = useState({ age: '', department: '', salary: '', experience: '' });
  const [result, setResult] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false); // Modal state

  const handleCreateRule = async () => {
    try {
      console.log("ruleString", ruleString);
      setCombinedRules([...combinedRules, ruleString]);

      const ast = await createRule(ruleString);
      console.log("ast", ast);
      setRuleString('');
      alert('Rule created successfully!');
    } catch (error) {
      console.error('Error creating rule:', error);
    }
  };

  const handleCombineRules = async () => {
    try {
      const requestBody = {
        rules: combinedRules
      };
      
      const combinedAst = await combineRules(requestBody);
      alert('Rules combined successfully!');
      setCombinedRules([combinedAst]);
    } catch (error) {
      console.error('Error combining rules:', error);
    }
  };
  
  const handleEvaluateRule = async () => {
    try {
      const evaluationResult = await evaluateRule(userData,combinedRules[0]);
      console.log("evaluationResult", combinedRules[0], userData);
      setResult(evaluationResult.result);
      setModalOpen(true);
    } catch (error) {
      console.error('Error evaluating rule:', error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setResult(null);
  };

  return (
    <div className="rule-form-container">
      <h2>Create Rule</h2>
      <input
        type="text"
        placeholder="Enter rule string"
        value={ruleString}
        onChange={(e) => setRuleString(e.target.value)}
        className="input-field"
      />
      <button onClick={handleCreateRule} className="action-button">Create Rule</button>

      <h2>Combine Rules</h2>
      <button onClick={handleCombineRules} className="action-button">Combine Rules</button>

      <h2>Evaluate Rule</h2>
      <div className="user-data-inputs">
        <input
          type="number"
          placeholder="Age"
          value={userData.age}
          onChange={(e) => setUserData({ ...userData, age: e.target.value })}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Department"
          value={userData.department}
          onChange={(e) => setUserData({ ...userData, department: e.target.value })}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Salary"
          value={userData.salary}
          onChange={(e) => setUserData({ ...userData, salary: e.target.value })}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Experience"
          value={userData.experience}
          onChange={(e) => setUserData({ ...userData, experience: e.target.value })}
          className="input-field"
        />
      </div>
      <button onClick={handleEvaluateRule} className="action-button">Evaluate Rule</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h3 style ={{
              color: result ? 'green' : 'red'
            }}>Evaluation Result: {result ? 'Eligible' : 'Not Eligible'}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default RuleForm;
