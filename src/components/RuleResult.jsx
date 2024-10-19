import React from 'react';

const RuleResult = ({ result }) => {
  return (
    <div>
      <h2>Evaluation Result</h2>
      {result !== null ? <p>{result ? 'Eligible' : 'Not Eligible'}</p> : <p>No result yet.</p>}
    </div>
  );
};

export default RuleResult;
