import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Divider } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Plot from 'react-plotly.js';

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


const OutcomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const investorType = searchParams.get("investor-type");
  const budget = parseInt(searchParams.get("budget") ?? "750000");
  const Style = searchParams.get("Style") ?? "Modern";
  const loc = searchParams.get("loc") ?? "ICC";
  const flip_var = searchParams.get("flip_var") ?? "Flip";
  const article = determineArticle(investorType);
  const inv_color = getColorForInvestorType(investorType);
  const inv_text = (<span>{article} <span style={{ color: inv_color }}>{investorType}</span></span>);
  const inv_text_no_article = (<span style={{ color: inv_color }}>{investorType}</span>);
  // State to hold the data for the second Plotly plot based on the budget
  const [plot_sankey, set_plot_sankey] = useState({data: [], layout: {}});

  useEffect(() => {
    // Fetch for the second visualization based on investor type and budget

      fetch(`/6C85-FP/summary/${investorType}_${budget}_${Style}_${loc}_${flip_var}_sankey.json`)
      .then(response => response.json())
      .then(data => {
        set_plot_sankey(data);
      })
      .catch(error => console.log(error));

  }, [investorType, budget, Style, loc, flip_var]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        textAlign: "left",
        justifyContent: "center"
      }}
    >

      <Typography variant="h3">
        Your final profile
      </Typography>

      <Divider/>

      <Typography variant="p" sx={{textAlign: "left"}}>
        Out of 1152 possible paths, this was the path you took. The sankey
        profile below shows you how common way choice was overall.
      </Typography>

      <Divider/>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          textAlign: "left",
          justifyContent: "center",
        }}
      >
        {plot_sankey.data.length ? (
          <Plot
            data={plot_sankey.data}
            layout={plot_sankey.layout}
            style={{ width: "100%"}}
          />
        ) : (
          <Typography>Loading first visualization...</Typography>
        )}
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
          onClick={() => navigate(`/`)}
          sx={{
            mt: 2,
          }}
        >
          Restart
        </Button>
      </Box>
    </Box>
  );
};

export default OutcomePage;
