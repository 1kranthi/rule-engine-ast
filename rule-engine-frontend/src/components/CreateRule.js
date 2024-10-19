import React, { useState } from 'react';
import ruleService from '../services/ruleService';

const CreateRule = () => {
  const [age, setAge] = useState('');
  const [operator, setOperator] = useState('AND'); // Default operator
  const [department, setDepartment] = useState('');
  const [message, setMessage] = useState('');

  const handleCreate = () => {
    // Construct the rule string based on user input
    const ruleData = {
      type: 'operator',
      value: operator,
      left: {
        type: 'operand',
        value: `age > ${age}`
      },
      right: {
        type: 'operand',
        value: `department = '${department}'`
      }
    };

    // Send the constructed rule to the backend
    ruleService.createRule(ruleData)
      .then(_response => {
        setMessage('Rule created successfully!');
      })
      .catch(error => {
        setMessage('Error creating rule.');
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
      backgroundColor: '#fff', // Card background color
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Shadow effect
      width: '300px', // Fixed width for the card
    },
    inputContainer: { // Removed unused styles
      display: 'flex', // We'll use flexbox for centering
      alignItems: 'center', // Align vertically
      justifyContent: 'center', // Center horizontally (new)
      marginBottom: '10px', // Margin for spacing between fields
    },
    label: {
      flex: '0 0 auto', // Allow label to shrink-wrap its content
      textAlign: 'left', // Align label text to the left
      marginRight: '10px', // Space between label and input
      fontSize: '16px', // Adjust font size for consistency
      width:'100px',  
    },
    input: {
      flex: 1, // Allow input to take up remaining space (new)
      width: '100%  ', // Removed (redundant with flex: 1)
      padding: '10px',
      margin: '0', // Remove margin for better centering (new)
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '16px',
    },
    button: {
      backgroundColor: '#007BFF', // Primary button color
      color: '#fff',
      border: 'none',
      padding: '10px 15px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s ease',
      marginLeft:"32.5%"
    },
    buttonHover: {
      backgroundColor: '#0056b3', // Darker button color on hover
    },
    message: {
      marginTop: '15px',
      color: '#28a745', // Success message color
      fontWeight: 'bold',
    },
    heading: { // Styles for the heading
      textAlign: 'center', // Center the heading
      marginBottom: '20px', // Add some bottom margin
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Create Rule</h2>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter age"
            style={styles.input}
          />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Operator:</label>
          <input
            type="text"
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
            placeholder="Enter operator (e.g., AND, OR)"
            style={styles.input}
          />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Department:</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Enter department"
            style={styles.input}
          />
        </div>

        <button
          onClick={handleCreate}
          style={styles.button}
          onMouseOver={e => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={e => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
        >
          Create
        </button>

        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

export default CreateRule;