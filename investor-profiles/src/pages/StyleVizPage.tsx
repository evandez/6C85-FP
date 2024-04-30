import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Divider } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Plot from 'react-plotly.js';

const NEXT_PAGE = "/loc";

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


const StyleVizPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const investorType = searchParams.get("investor-type");
  const budget = parseInt(searchParams.get("budget") ?? "750000");
  const Style = searchParams.get("Style") ?? "Modern";
  const article = determineArticle(investorType);
  const inv_color = getColorForInvestorType(investorType);
  const inv_text = (<span>{article} <span style={{ color: inv_color }}>{investorType}</span></span>);
  const inv_text_no_article = (<span style={{ color: inv_color }}>{investorType}</span>);
  // State to hold the data for the second Plotly plot based on the budget
  const [plot_network, set_plot_network] = useState({data: [], layout: {}});
  const [plot_index, set_plot_index] = useState({data: [], layout: {}});

  useEffect(() => {
    // Fetch for the second visualization based on investor type and budget
    fetch(`/6C85-FP/style_post/${investorType}_${budget}_${Style}_network.json`)
      .then(response => response.json())
      .then(data => {
        set_plot_network(data);
      })
      .catch(error => console.log(error));

      fetch(`/6C85-FP/style_post/${investorType}_${budget}_${Style}_index.json`)
      .then(response => response.json())
      .then(data => {
        set_plot_index(data);
      })
      .catch(error => console.log(error));

  }, [investorType, budget, Style]);

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
        With a <b>{Style}</b> style of property, you get to enjoy multiple amenities.
      </Typography>
      
      <Typography variant="p" sx={{textAlign: "left"}}>
        The network plot below shows which amenities come together for 
        {Style} properties bought by {inv_text_no_article} investors with
        a budget of ${budget.toLocaleString()} in Greater Boston. If two
        nodes in the graph have a thicker line, then they usually come together.
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
        {plot_network.data.length ? (
          <Plot
            data={plot_network.data}
            layout={plot_network.layout}
            style={{ width: "100%"}}
          />
        ) : (
          <Typography>Loading first visualization...</Typography>
        )}
      </Box>

      <Divider/>

      <Typography variant="p" sx={{textAlign: "left"}}>
        We once again need to think about how our choices affect housing for others.
        The indices plot below shows the impact on choosing a {Style} style of property
        with <b>${budget.toLocaleString()}</b> as {inv_text} investor.
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
          Next: Pick a location
        </Button>
      </Box>
    </Box>
  );
};

export default StyleVizPage;
