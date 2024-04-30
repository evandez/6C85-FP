import { Box, Button, Slider, Typography } from "@mui/material";
import React, { useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Plot from 'react-plotly.js';

const NEXT_PAGE = "/budget/viz";
const INVESTOR_TYPE_TO_BUDGET_RANGES = {
  Institutional: {
    min: 250000,
    max: 1500000,
    step: 250000,
  },
  Large: {
    min: 250000,
    max: 1500000,
    step: 250000,
  },
  Medium: {
    min: 250000,
    max: 1500000,
    step: 250000,
  },
  Small: {
    min: 250000,
    max: 1500000,
    step: 250000,
  },
};

function determineArticle(investorType: string): string {
  // Convert the investorType to lowercase for case-insensitive comparison
  const type = investorType.toLowerCase();

  // Check if the investorType is equal to 'small', 'medium', or 'large'
  if (type === 'small' || type === 'medium' || type === 'large') {
    return 'a';
  } else {
    return 'an';
  }
}

function getColorForInvestorType(investorType: string): string {
  switch (investorType.toLowerCase()) {
    case 'institutional':
      return 'red';
    case 'small':
      return 'blue';
    case 'large':
      return 'green';
    case 'medium':
      return 'orange';
    default:
      return ''; // Default to empty string or any other default color
  }
}

const BudgetPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const investorType = searchParams.get("investor-type");
  const budgetRange = INVESTOR_TYPE_TO_BUDGET_RANGES[investorType];
  const [budget, setBudget] = useState(budgetRange.min);
  const article = determineArticle(investorType);
  const inv_color = getColorForInvestorType(investorType);
  const inv_text = (<span>{article} <span style={{ color: inv_color }}>{investorType}</span></span>);
  const [plot_selector, set_plot_selector] = useState({data: [], layout: {}});

  useEffect(() => {
    // Construct the URL based on the current budget
    const url = `/6C85-FP/budget_pre/${investorType}_${budget}_selector.json`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        set_plot_selector(data);
      })
      .catch(error => console.log("Error loading plot data:", error));
  }, [budget, investorType]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          textAlign: "left",
          justifyContent: "center",
        }}
      >
        {plot_selector.data.length ? (
          <Plot
            data={plot_selector.data}
            layout={plot_selector.layout}
            style={{ width: "100%"}}
          />
        ) : (
          <Typography>Loading first visualization...</Typography>
        )}
      </Box>

      <Typography variant="p" sx={{textAlign: "centre"}}>
        The plot above shows the distributions of prices that {inv_text} investor
        has paid when making a prperty investment. You can use it to help inform your 
        choice further.
      </Typography>

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
