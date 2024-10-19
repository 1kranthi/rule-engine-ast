import React, { useState } from 'react';
import ruleService from '../services/ruleService';

const EvaluateRule = () => {
  const [ruleId, setRuleId] = useState('');
  const [data, setData] = useState('');
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('');

  const handleEvaluate = () => {
    const ruleData = {
      rule: { id: ruleId }, // Assuming you get rule by ID
      data: JSON.parse(data),
    };

    ruleService.evaluateRule(ruleData)
      .then(response => {
        setResult(response.data);
        setMessage('Evaluation successful!');
      })
      .catch(error => {
        setMessage('Error evaluating rule.');
      });
  };

  return (
    <div>
      <h2>Evaluate Rule</h2>
      <input
        type="text"
        value={ruleId}
        onChange={(e) => setRuleId(e.target.value)}
        placeholder="Enter rule ID"
      />
      <textarea
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder="Enter data as JSON"
      />
      <button onClick={handleEvaluate}>Evaluate</button>
      {result !== null && (
        <div>
          <h3>Evaluation Result:</h3>
          <p>{result ? 'True' : 'False'}</p>
        </div>
      )}
      <p>{message}</p>
    </div>
  );
};

export default EvaluateRule;
