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
import LocPage from "./pages/LocPage";
import LocVizPage from "./pages/LocVizPage";
import FlipPage from "./pages/FlipPage";
import FlipVizPage from "./pages/FlipVizPage";

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
          <Route path="/loc" element={<LocPage />} />
          <Route path="/loc/viz" element={<LocVizPage />} />
          <Route path="/flip" element={<FlipPage />} />
          <Route path="/flip/viz" element={<FlipVizPage />} />
          <Route path="/outcome" element={<OutcomePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
