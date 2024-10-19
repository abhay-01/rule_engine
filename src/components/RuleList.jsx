import React from "react";

const RuleList = ({ rules }) => {
  return (
    <ul>
      {rules.map((rule, index) => (
        <li key={index}>{rule}</li>
      ))}
    </ul>
  );
};

export default RuleList;
