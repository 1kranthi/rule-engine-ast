import React, { useState } from 'react';
import ruleService from '../services/ruleService';

const EvaluateRule = () => {
  const [operator, setOperator] = useState('AND'); // Default operator
  const [age, setAge] = useState('');
  const [department, setDepartment] = useState('');
  const [salary, setSalary] = useState('');
  const [experience, setExperience] = useState('');
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('');

  const handleEvaluate = () => {
    // Construct the rule data based on user input
    const ruleData = {
      rule: {
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
      },
      data: {
        age: parseInt(age, 10),
        department: department,
        salary: parseInt(salary, 10),
        experience: parseInt(experience, 10)
      }
    };

    // Send the constructed rule to the backend
    ruleService.evaluateRule(ruleData)
      .then(response => {
        setResult(response.data);
        setMessage('Evaluation successful!');
      })
      .catch(error => {
        setMessage('Error evaluating rule.');
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
      width: '320px',
    },
    inputContainer: { // Use flexbox for label and input alignment
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between', // Add some horizontal spacing
      width: '100%',
      marginBottom: '10px',
    },
    label: {
      flex: '0 0 auto',
      textAlign: 'left',
      marginRight: '10px',
      fontSize: '16px',
      fontWeight: 'bold', // Make labels bolder
      width: '100px',
    },
    input: {
      flex: 1, // Allow input to take up remaining space
      width: '100%', // Removed (redundant with flex: 1)
      padding: '10px',
      margin: '0', // Remove margin for better alignment
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
      // alignSelf: 'center', // Center button horizontally
      marginLeft:'32.5%',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    message: {
      marginTop: '15px',
      color: '#28a745', // Success message color
      fontWeight: 'bold',
    },
    result: { // Styles for evaluation result
      marginTop: '15px',
      fontSize: '18px',
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
        <h2 style={styles.heading}>Evaluate Rule</h2>

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
          <label style={styles.label}>Department:</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Enter department"
            style={styles.input}
          />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Salary:</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="Enter salary"
            style={styles.input}
          />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Experience:</label>
          <input
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="Enter experience"
            style={styles.input}
          />
        </div>

        <button
          onClick={handleEvaluate}
          style={styles.button}
          onMouseOver={e => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={e => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
        >
          Evaluate
        </button>

        {result !== null && (
          <div>
            <h3>Evaluation Result:</h3>
            <p>{result ? 'True' : 'False'}</p>
          </div>
        )}
        <p style={styles.message}>{message}</p>
      </div>
    </div>
  );
};

export default EvaluateRule;