import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BudgetPage from './pages/BudgetPage';
import OutcomePage from './pages/OutcomePage';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import './App.css'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router basename="/6C85-FP/">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/outcome" element={<OutcomePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
