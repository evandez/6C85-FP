import { Box, Button, Slider, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NEXT_PAGE = "/budget/viz";
const INVESTOR_TYPE_TO_BUDGET_RANGES = {
  institutional: {
    min: 1000000,
    max: 5000000,
    step: 1000000,
  },
  large: {
    min: 1000000,
    max: 5000000,
    step: 1000000,
  },
  medium: {
    min: 1000000,
    max: 5000000,
    step: 1000000,
  },
  small: {
    min: 1000000,
    max: 5000000,
    step: 1000000,
  },
};

const BudgetPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const investorType = searchParams.get("investor-type") ?? "institutional";
  const budgetRange = INVESTOR_TYPE_TO_BUDGET_RANGES[investorType];
  const [budget, setBudget] = useState(budgetRange.min);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Typography variant="h2">What's your budget?</Typography>
      <Slider
        min={budgetRange.min}
        max={budgetRange.max}
        step={budgetRange.step}
        value={budget}
        valueLabelDisplay="on"
        valueLabelFormat={(value) => `$${value.toLocaleString()}`}
        onChange={(event) => setBudget(event.target.value)}
        marks
      />
      <Button
        variant="contained"
        onClick={() =>
          navigate(`${NEXT_PAGE}?${searchParams.toString()}&budget=${budget}`)
        }
        sx={{
          margin: "auto",
        }}
      >
        Set Budget
      </Button>
    </Box>
  );
};

export default BudgetPage;
