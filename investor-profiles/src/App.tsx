import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BudgetPage from './pages/BudgetPage';
import OutcomePage from './pages/OutcomePage';
import './App.css'

function App() {
  return (
    <Router basename="/6C85-FP/">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/outcome" element={<OutcomePage />} />
      </Routes>
    </Router>
  )
}

export default App
