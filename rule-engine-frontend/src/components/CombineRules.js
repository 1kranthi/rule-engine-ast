import React, { useState } from 'react';
import ruleService from '../services/ruleService';

const CombineRules = () => {
  const [ruleIds, setRuleIds] = useState('');
  const [combinedRule, setCombinedRule] = useState(null);
  const [message, setMessage] = useState('');

  const handleCombine = () => {
    const ids = ruleIds.split(',').map(id => parseInt(id.trim()));
    ruleService.combineRules(ids)
      .then(response => {
        setCombinedRule(response.data);
        setMessage('Rules combined successfully!');
      })
      .catch(error => {
        setMessage('Error combining rules.');
      });
  };

  return (
    <div>
      <h2>Combine Rules</h2>
      <input
        type="text"
        value={ruleIds}
        onChange={(e) => setRuleIds(e.target.value)}
        placeholder="Enter rule IDs (comma-separated)"
      />
      <button onClick={handleCombine}>Combine</button>
      {combinedRule && (
        <div>
          <h3>Combined Rule:</h3>
          <pre>{JSON.stringify(combinedRule, null, 2)}</pre>
        </div>
      )}
      <p>{message}</p>
    </div>
  );
};

export default CombineRules;
