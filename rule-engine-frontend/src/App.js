import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateRule from './components/CreateRule';
import CombineRules from './components/CombineRules';
import EvaluateRule from './components/EvaluateRule';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Rule Engine App</h1>
        <Routes>
          <Route path="/create" element={<CreateRule />} />
          <Route path="/combine" element={<CombineRules />} />
          <Route path="/evaluate" element={<EvaluateRule />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
