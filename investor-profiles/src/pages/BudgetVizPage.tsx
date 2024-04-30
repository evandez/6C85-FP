import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Divider } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Plot from 'react-plotly.js';

const NEXT_PAGE = "/style";

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


const BudgetVizPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const investorType = searchParams.get("investor-type");
  const budget = parseInt(searchParams.get("budget") ?? "750000");
  const article = determineArticle(investorType);
  const inv_color = getColorForInvestorType(investorType);
  const inv_text = (<span>{article} <span style={{ color: inv_color }}>{investorType}</span></span>);
  const inv_text_no_article = (<span style={{ color: inv_color }}>{investorType}</span>);
  // State to hold the data for the second Plotly plot based on the budget
  const [plot_radial, set_plot_radial] = useState({data: [], layout: {}});
  const [plot_contour, set_plot_contour] = useState({data: [], layout: {}, frames: {}});
  const [plot_index, set_plot_index] = useState({data: [], layout: {}});

  useEffect(() => {
    // Fetch for the second visualization based on investor type and budget
    fetch(`/6C85-FP/budget_post/${investorType}_${budget}_radial.json`)
      .then(response => response.json())
      .then(data => {
        set_plot_radial(data);
      })
      .catch(error => console.log(error));

      fetch(`/6C85-FP/budget_post/${investorType}_${budget}_contour.json`)
      .then(response => response.json())
      .then(data => {
        set_plot_contour(data);
      })
      .catch(error => console.log(error));

      fetch(`/6C85-FP/budget_post/${investorType}_${budget}_index.json`)
      .then(response => response.json())
      .then(data => {
        set_plot_index(data);
      })
      .catch(error => console.log(error));

  }, [investorType, budget]);

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
      {/* Introduction Text */}
      <Typography variant="h5">
        With a budget of <b>${budget.toLocaleString()}</b>, you can buy some great properties.
      </Typography>
      
      <Typography variant="p" sx={{textAlign: "left"}}>
        Let us first start by looking at how much {inv_text_no_article} investors with your budget
        of <b>${budget.toLocaleString()}</b> generally spend on a property. The radial plot below
        gives a clear visual indication of the ranges in which this budget is used.
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
        {plot_radial.data.length ? (
          <Plot
            data={plot_radial.data}
            layout={plot_radial.layout}
            style={{ width: "100%"}}
          />
        ) : (
          <Typography>Loading first visualization...</Typography>
        )}
      </Box>

      <Typography variant="p" sx={{textAlign: "left"}}>
        To better understand what a <b>${budget.toLocaleString()}</b> budget can get you,
        the contour plot below shows how many bathrooms and bedrooms can be bought
        with this budget. The contours give a sense of where most {inv_text_no_article} investors
        have bought at. Interact with the budget slider, to see what a changing budget for {inv_text_no_article}
        investors can get you.
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
        {plot_contour.data.length ? (
          <Plot
            data={plot_contour.data}
            layout={plot_contour.layout}
            frames={plot_contour.frames}
            style={{ width: "100%"}}
          />
        ) : (
          <Typography>Loading first visualization...</Typography>
        )}
      </Box>

      <Divider/>

      <Typography variant="p" sx={{textAlign: "left"}}>
        We now go back to our indices to visualize what cossing a budget of 
        <b>${budget.toLocaleString()}</b> has as an impact on housing affordability.
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
        {plot_index.data.length ? (
          <Plot
            data={plot_index.data}
            layout={plot_index.layout}
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
          onClick={() => navigate(`${NEXT_PAGE}/?${searchParams.toString()}`)}
          sx={{
            mt: 2,
          }}
        >
          Next: Pick a style
        </Button>
      </Box>
    </Box>
  );
};

export default BudgetVizPage;
