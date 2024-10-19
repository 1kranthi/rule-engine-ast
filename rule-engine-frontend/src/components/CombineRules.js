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

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      color: '#333',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    card: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      width: '300px',
    },
    inputContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: '10px',
    },
    label: {
      flex: '0 0 auto',
      textAlign: 'left',
      marginRight: '10px',
      fontSize: '16px',
    },
    input: {
      flex: 1,
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '16px',
    },
    button: {
      backgroundColor: '#007BFF',
      color: '#fff',
      border: 'none',
      padding: '10px 15px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s ease',
      marginLeft: '32.5%',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    message: {
      marginTop: '15px',
      color: '#28a745',
      fontWeight: 'bold',
    },
    combinedRuleTable: {
      marginTop: '15px',
      width: '100%',
      borderCollapse: 'collapse',
    },
    combinedRuleTableHeader: {
      backgroundColor: '#f0f0f0',
    },
    combinedRuleTableCell: {
      border: '1px solid #ddd',
      padding: '8px',
      textAlign: 'left',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px',
    },
  };

  const getCleanValue = (value) => {
    // Clean the value by removing any extra characters like quotes and brackets
    return value ? value.replace(/[\{\}'"]/g, '').trim() : '';
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Combine Rules</h2>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Rule IDs:</label>
          <input
            type="text"
            value={ruleIds}
            onChange={(e) => setRuleIds(e.target.value)}
            placeholder="Enter rule IDs"
            style={styles.input}
          />
        </div>

        <button
          onClick={handleCombine}
          style={styles.button}
          onMouseOver={e => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={e => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
        >
          Combine
        </button>

        {combinedRule && (
          <table style={styles.combinedRuleTable}>
            <thead style={styles.combinedRuleTableHeader}>
              <tr>
                <th style={styles.combinedRuleTableCell}>Field</th>
                <th style={styles.combinedRuleTableCell}>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.combinedRuleTableCell}>Type</td>
                <td style={styles.combinedRuleTableCell}>{getCleanValue(combinedRule.type)}</td>
              </tr>
              <tr>
                <td style={styles.combinedRuleTableCell}>Operator</td>
                <td style={styles.combinedRuleTableCell}>{getCleanValue(combinedRule.value)}</td>
              </tr>
              <tr>
                <td style={styles.combinedRuleTableCell}>Left Type</td>
                <td style={styles.combinedRuleTableCell}>{getCleanValue(combinedRule.left?.type)}</td>
              </tr>
              <tr>
                <td style={styles.combinedRuleTableCell}>Left Value</td>
                <td style={styles.combinedRuleTableCell}>{getCleanValue(combinedRule.left?.value)}</td>
              </tr>
              <tr>
                <td style={styles.combinedRuleTableCell}>Right Type</td>
                <td style={styles.combinedRuleTableCell}>{getCleanValue(combinedRule.right?.type)}</td>
              </tr>
              <tr>
                <td style={styles.combinedRuleTableCell}>Right Value</td>
                <td style={styles.combinedRuleTableCell}>{getCleanValue(combinedRule.right?.value)}</td>
              </tr>
            </tbody>
          </table>
        )}

        <p style={styles.message}>{message}</p>
      </div>
    </div>
  );
};

export default CombineRules;
