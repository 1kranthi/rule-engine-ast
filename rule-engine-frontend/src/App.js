// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CreateRule from './components/CreateRule';
import CombineRules from './components/CombineRules';
import EvaluateRule from './components/EvaluateRule';
import RuleList from './components/RuleList';
import Navbar from './components/Navbar';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App-header">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/Create" />} /> {/* Redirect to create by default */}
          <Route path="/Create" element={<CreateRule />} />
          <Route path="/Combine" element={<CombineRules />} />
          <Route path="/Evaluate" element={<EvaluateRule />} />
          <Route path="/Rules" element={<RuleList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
