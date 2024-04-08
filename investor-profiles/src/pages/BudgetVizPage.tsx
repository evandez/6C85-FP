import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Plot from 'react-plotly.js';

const NEXT_PAGE = "/outcome";

const BudgetVizPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const investorType = searchParams.get("investor-type");
  const budget = parseInt(searchParams.get("budget") ?? "1000000");

  // State to hold the data for the second Plotly plot based on the budget
  const [budgetPlotData, setBudgetPlotData] = useState({data: [], layout: {}});

  useEffect(() => {
    // Fetch for the second visualization based on investor type and budget
    fetch(`/6C85-FP/assets/${investorType}_budget_${budget}.json`)
      .then(response => response.json())
      .then(data => {
        setBudgetPlotData(data);
      })
      .catch(error => console.log(error));
  }, [investorType, budget]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0,
        textAlign: "left",
      }}
    >
      {/* Introduction Text */}
      <Typography variant="h3">
        With a budget of <b>${budget.toLocaleString()}</b>, you can buy some great properties.
      </Typography>
      
      {/* First Plotly plot */}
  

      {/* Second Plotly plot based on budget */}
      {budgetPlotData.data.length ? (
        <Plot
          data={budgetPlotData.data}
          layout={budgetPlotData.layout}
          frames={budgetPlotData.frames}
          style={{ width: "800px", height: "400px" }}
        />
      ) : (
        <Typography>Loading visualization...</Typography>
      )}

      {/* Descriptive Text between plots */}
      <Typography variant="body1" sx={{ maxWidth: "800px", textAlign: "center", margin: "auto" }}>
        Now that we know how much you are willing to invest, we have generated a visualization tuned just for you!
        With a budget of <b>${budget.toLocaleString()}</b>, we show what style of properties have been
        commonplace among other <b>{investorType} investors</b>. The bigger the bubble, the more often a {investorType} investor bought that style of property.
        Play around with this bubble plot to see how the profitability and price trends have changed over time!
      </Typography>
      

      {/* Navigation Buttons */}
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
          onClick={() => navigate(`${NEXT_PAGE}/?${searchParams.toString()}`)}
          sx={{
            mt: 2,
          }}
        >
          Next: Pick a location
        </Button>
      </Box>
    </Box>
  );
};

export default BudgetVizPage;
