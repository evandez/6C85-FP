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

  // State to hold the data for Plotly plot
  const [plotData, setPlotData] = useState({data: [], layout: {}});

  useEffect(() => {
    // Determine the file to fetch based on the investorType, or use a default
    const assetFileName = investorType === 'institutional' ? 'map_1.json' : 'map_1.json';
    
    fetch(`/6C85-FP/assets/${assetFileName}`)
      .then(response => response.json())
      .then(data => {
        setPlotData(data);
      })
      .catch(error => console.log(error));
  }, [investorType]); // Dependency array now includes investorType to refetch when it changes

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h2">
        As an <b>{investorType} investor</b>, you...
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          textAlign: "left",
          justifyContent: "center", // Added to center content
        }}
      >
        {/* Render the Plotly plot */}
        {plotData.data.length ? (
          <Plot
            data={plotData.data}
            layout={plotData.layout}
            style={{ width: "800px", height: "600px" }} // Adjusted size to match the previous iframe
          />
        ) : (
          <Typography>Loading visualization...</Typography>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="body1">
            This is where the visualization of the investor type would go. It
            would show data relevant to the investor type, such as the types of
            properties they are interested in, the neighborhoods they are
            looking at, and the average budget they have.
          </Typography>
          <Typography variant="body1">Here is another paragraph.</Typography>
        </Box>
      </Box>
      <Button
        variant="contained"
        onClick={() => navigate(`${NEXT_PAGE}/?${searchParams.toString()}`)}
        sx={{
          margin: "auto",
        }}
      >
        Next: Choose your budget
      </Button>
    </Box>
  );
};

export default InvestorTypeVizPage;
