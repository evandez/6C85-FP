import { Box, Button, Slider, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NEXT_PAGE = "/budget/viz";
const INVESTOR_TYPE_TO_BUDGET_RANGES = {
  institutional: {
    min: 250000,
    max: 1500000,
    step: 250000,
  },
  large: {
    min: 250000,
    max: 1500000,
    step: 250000,
  },
  medium: {
    min: 250000,
    max: 1500000,
    step: 250000,
  },
  small: {
    min: 250000,
    max: 1500000,
    step: 250000,
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
        <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: 2,
        }}
      >
      <Button
          variant="contained"
          onClick={() => navigate(-1)}
          sx={{
            mt: 2,
          }}
        >
          Go Back
        </Button>
      <Button
        variant="contained"
        onClick={() =>
          navigate(`${NEXT_PAGE}?${searchParams.toString()}&budget=${budget}`)
        }
        sx={{
          mt : 2,
          // margin: "auto",
        }}
      >
        Set Budget
      </Button>
      </Box>
    </Box>
  );
};

export default BudgetPage;
