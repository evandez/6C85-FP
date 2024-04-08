import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Plot from 'react-plotly.js';

const NEXT_PAGE = "/budget";

const InvestorTypeVizPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const investorType = searchParams.get("investor-type");

  // State to hold the data for the first and second Plotly plot
  const [plotData, setPlotData] = useState({data: [], layout: {}});
  const [profitPlotData, setProfitPlotData] = useState({data: [], layout: {}});

  useEffect(() => {
    // Fetch for the map visualization
    fetch(`/6C85-FP/assets/${investorType}_map.json`)
      .then(response => response.json())
      .then(data => {
        setPlotData(data);
      })
      .catch(error => console.log(error));

    // Fetch for the profit visualization
    fetch(`/6C85-FP/assets/${investorType}_profit.json`)
      .then(response => response.json())
      .then(data => {
        setProfitPlotData(data);
      })
      .catch(error => console.log(error));
  }, [investorType]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h2">
        As an <b>{investorType} investor</b>, <br/> this is your location <br/> and profitability profile
      </Typography>
      <Typography variant="h4" sx={{ textAlign: "center", mt: 4 }}>
        Location Spread Analysis
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          textAlign: "left",
          justifyContent: "center",
        }}
      >
        {plotData.data.length ? (
          <Plot
            data={plotData.data}
            layout={plotData.layout}
            frames={plotData.frames}
            style={{ width: "800px", height: "600px" }}
          />
        ) : (
          <Typography>Loading first visualization...</Typography>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center', // Centers the typography horizontally if the screen is wider than 800px
          width: '100%', // Takes up 100% of its parent's width, but...
        }}
      >
        <Typography
          variant="p"
          sx={{
            textAlign: "center",
            mt: 4,
            maxWidth: '800px', // Ensures the text doesn't exceed 800px in width
          }}
        >
        Here we can see the spread of all properties purchased by <b>{investorType} investors </b> 
         every year from 2000 to 2023.  This will give you an idea of where your investor peers are likely to 
        buy properties. Navigate around the map and interact with the time slider!      
        </Typography>
      </Box>


      {/* Descriptive Text */}
      <Typography variant="h4" sx={{ textAlign: "center", mt: 4 }}>
        Profitability Analysis
      </Typography>


      {/* Second Plotly plot */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          textAlign: "left",
          justifyContent: "center",
        }}
      >
        {profitPlotData.data.length ? (
          <Plot
            data={profitPlotData.data}
            layout={profitPlotData.layout}
            frames={profitPlotData.frames}
            style={{ width: "800px", height: "600px" }}
          />
        ) : (
          <Typography>Loading second visualization...</Typography>
        )}
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center', // Centers the typography horizontally if the screen is wider than 800px
          width: '100%', // Takes up 100% of its parent's width, but...
        }}
      >
        <Typography
          variant="p"
          sx={{
            textAlign: "center",
            mt: 4,
            maxWidth: '800px', // Ensures the text doesn't exceed 800px in width
          }}
        >
        Curious about your return on investment as a <b>{investorType} inverstor</b>? Play with this plot 
        to see the spread of percentage profits over time. You can also see what the trend is if you decide to flip
        or not flip your property investment. This shows that not all investments are profitable while some can garner big gains.
      </Typography>
      </Box>

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
          Next: Choose your budget
        </Button>
      </Box>
    </Box>
  );
};

export default InvestorTypeVizPage;
