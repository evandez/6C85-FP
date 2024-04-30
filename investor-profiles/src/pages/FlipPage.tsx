import { Box, Button, Typography, Divider } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Plot from 'react-plotly.js';

// const NEXT_PAGE = "/flip/viz";
const NEXT_PAGE = "/outcome";

import img_notflip from "../assets/notflip_icon.png";
import img_flip from "../assets/flip_icon.png";

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

// const NEXT_PAGE = "/outcome";
const FLIP_TYPES = [
  {
    slug: "Flip",
    title: "Flipping",
    description: "Selling off the property before 2 years",
    image: img_flip,
  },
  {
    slug: "NoFlip",
    title: "Not Flipping",
    description: "Keeping the property for more than 2 years",
    image: img_notflip,
  }
];

const FlipChoice = ({ slug, title, description, image }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "44%", margin: "1%", gap: 2, padding: "0%" }}>
      <Typography variant="h3">{title}</Typography>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <img src={image} alt={title} style={{ height: "150px", width: "150px" }} />
        <Typography variant="body1" sx={{ flexGrow: 1, textAlign : "left"}}>{description}</Typography>
      </Box>
      <Button sx={{ margin: "auto" }} onClick={() => navigate(`${NEXT_PAGE}/?${searchParams.toString()}&flip_var=${slug}`)} variant="contained">
        I choose this
      </Button>
    </Box>
  );
  
};

const FlipPage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const investorType = searchParams.get("investor-type");
    const budget = parseInt(searchParams.get("budget") ?? "750000");
    const Style = searchParams.get("Style") ?? "Modern";
    const loc = searchParams.get("loc") ?? "ICC";
    const article = determineArticle(investorType);
    const inv_color = getColorForInvestorType(investorType);
    const inv_text = (<span>{article} <span style={{ color: inv_color }}>{investorType}</span></span>);
    const inv_text_no_article = (<span style={{ color: inv_color }}>{investorType}</span>);
    const [plot_dots, set_plot_dots] = useState({data: [], layout: {}});

    useEffect(() => {
        // Fetch for the map visualization
        fetch(`/6C85-FP/flip_pre/${investorType}_${budget}_${Style}_${loc}_dots.json`)
        .then(response => response.json())
        .then(data => {
            set_plot_dots(data);
        })
        .catch(error => console.log(error));
    }, [investorType, budget, Style, loc])

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
    <Typography variant="h2">To flip or not to flip</Typography>

    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        textAlign: "left",
        justifyContent: "center"
      }}
    >
    <Divider/>

    <Typography variant="body1" sx={{alignSelf: "left", width: "100%", textAlign: "left"}}>
        Flipping could have dramatic consequences on housing prices. To see how investors
        in the Greater Boston area with that match yours, the dot diagram below
        shows how often that happens.
        </Typography>
            {plot_dots.data.length ? (
            <Plot
            data={plot_dots.data}
            layout={plot_dots.layout}
            style={{ width: "100%"}}
        />
    ) : (
        <Typography>Loading visualization...</Typography>
    )}
    <Divider/>

    </Box>

    <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {FLIP_TYPES.map((flip_var, index) => (
        <FlipChoice key={`choice-${index}`} {...flip_var} />
        ))}
    </Box>


    <Box sx={{ alignSelf: "center", width: "100%", textAlign: "center", marginTop: "20px" }}>
        <Button variant="contained" onClick={() => window.history.back()}>
        Go Back
        </Button>
    </Box>
    </Box>
    );
};

export default FlipPage;
