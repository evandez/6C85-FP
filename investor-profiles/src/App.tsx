import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import BudgetPage from "./pages/BudgetPage";
import OutcomePage from "./pages/OutcomePage";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import "./App.css";
import InvestorTypePage from "./pages/InvestorTypePage";
import InvestorTypeVizPage from "./pages/InvestorTypeVizPage";
import BudgetVizPage from "./pages/BudgetVizPage";
import StylePage from "./pages/StylePage";
import StyleVizPage from "./pages/StyleVizPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router basename="/6C85-FP/">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/investor-type" element={<InvestorTypePage />} />
          <Route path="/investor-type/viz" element={<InvestorTypeVizPage />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/budget/viz" element={<BudgetVizPage />} />
          <Route path="/style" element={<StylePage />} />
          <Route path="/style/viz" element={<StyleVizPage />} />
          <Route path="/outcome" element={<OutcomePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
