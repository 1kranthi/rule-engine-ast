import React, { useState, useEffect } from 'react';
import ruleService from '../services/ruleService';

const RuleList = () => {
  const [rules, setRules] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch the list of rules from the backend
    ruleService.getRules()
      .then(response => {
        setRules(response.data);
      })
      .catch(error => {
        setMessage('Error fetching rules.');
      });
  }, []);

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
      backgroundColor: '#fff', // Card background color
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Shadow effect
      width: '300px', // Fixed width for the card
    //   textAlign: 'center',
    },
    message: {
      marginTop: '15px',
      color: '#28a745', // Success message color
      fontWeight: 'bold',
    },
    ruleList: {
      listStyleType: 'none', // Remove default list styling
      padding: '0', // Remove default padding
      margin: '20px 0', // Spacing above and below the list
    },
    ruleItem: {
      backgroundColor: '#f5f5f5', // Background color for each rule item
      padding: '10px',
      margin: '10px 0', // Space between rule items
      borderRadius: '4px', // Rounded corners for rule items
      
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Rule List</h2>
        {message && <p style={styles.message}>{message}</p>}
        {rules.length > 0 ? (
          <ul style={styles.ruleList}>
            {rules.map((rule, index) => {
              // Parse the ruleString to get the rule details
              const parsedRule = JSON.parse(rule.ruleString);
              const leftValue = parsedRule.left ? parsedRule.left.value : 'N/A';
              const rightValue = parsedRule.right ? parsedRule.right.value : 'N/A';

              return (
                <li key={index} style={styles.ruleItem}>
                  <strong>Rule ID:</strong> {rule.id} <br />
                  <strong>Rule Condition:</strong> {parsedRule.value} <br />
                  <strong>Operator:</strong> {parsedRule.type} <br />
                  <strong>Left Operand:</strong> {leftValue} <br />
                  <strong>Right Operand:</strong> {rightValue} <br />
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No rules available.</p>
        )}
      </div>
    </div>
  );
};

export default RuleList;
