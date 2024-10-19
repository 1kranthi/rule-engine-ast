import React, { useState } from 'react';
import ruleService from '../services/ruleService';

const CreateRule = () => {
  const [ruleString, setRuleString] = useState('');
  const [message, setMessage] = useState('');

  const handleCreate = () => {
    ruleService.createRule(ruleString)
      .then(response => {
        setMessage('Rule created successfully!');
      })
      .catch(error => {
        setMessage('Error creating rule.');
      });
  };

  return (
    <div>
      <h2>Create Rule</h2>
      <input
        type="text"
        value={ruleString}
        onChange={(e) => setRuleString(e.target.value)}
        placeholder="Enter rule"
      />
      <button onClick={handleCreate}>Create</button>
      <p>{message}</p>
    </div>
  );
};

export default CreateRule;
