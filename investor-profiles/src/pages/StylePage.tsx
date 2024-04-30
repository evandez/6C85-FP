import { Box, Button, Typography, Divider } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Plot from 'react-plotly.js';


import img_modern from "../assets/modern_icon.png";
import img_traditonal from "../assets/traditional_icon.png";
import img_multi from "../assets/multi_icon.png";

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

// const NEXT_PAGE = "/style/viz";
const NEXT_PAGE = "/outcome";
const STYLE_TYPES = [
  {
    slug: "Modern",
    title: "Modern Style",
    description: "Modern housing includes contemporary and innovative designs that often emphasize clean lines, open spaces, and integration with the surrounding environment. Styles such as Contemporary, Mid-rise, High-rise, and Low-rise focus on minimalism and functionality. This category also covers unique designs like Tudor, Split Level, Raised Ranch, and Custom-designed homes that often feature creative use of materials and non-traditional layouts.",
    image: img_modern,
  },
  {
    slug: "Traditional",
    title: "Traditional Style",
    description: "This style embodies a range of historically significant and classic architectural designs. Homes in the Traditional category, such as Colonial, Victorian, and Ranch, often feature symmetrical designs and decorative elements that reflect the aesthetics from their respective eras. This category also includes Antique homes, Garrison houses, Federalist styles, and the quaint Salt Box, all of which are celebrated for their historical significance and timeless appeal.",
    image: img_traditonal,
  },
  {
    slug: "Multi-Unit",
    title: "Multi-Unit Style",
    description: "This category encompasses housing styles that typically involve shared structures or are part of a larger complex, making them ideal for urban and suburban settings. It includes Condos, Apartments, Townhouses, and Multi-unit Buildings, as well as more specific styles like Row houses, Duplexes, and Carriage Houses. These homes are designed to maximize space and functionality, often featuring multiple stories and shared amenities, catering to a range of occupants from single families to multiple residents in denser communities.",
    image: img_multi,
  },
];

const StyleChoice = ({ slug, title, description, image }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "44%", margin: "1%", gap: 2, padding: "0%" }}>
      <Typography variant="h3">{title}</Typography>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <img src={image} alt={title} style={{ height: "150px", width: "150px" }} />
        <Typography variant="body1" sx={{ flexGrow: 1 }}>{description}</Typography>
      </Box>
      <Button sx={{ margin: "auto" }} onClick={() => navigate(`${NEXT_PAGE}/?${searchParams.toString()}`)} variant="contained">
        Follow this style
      </Button>
    </Box>
  );
  
};

const StylePage = () => {

  const [ellipse_plot, set_ellipse_plot] = useState({ data: [], layout: {}, frames: [] });
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const investorType = searchParams.get("investor-type");
  const budget = parseInt(searchParams.get("budget") ?? "750000");
  const article = determineArticle(investorType);
  const inv_color = getColorForInvestorType(investorType);
  const inv_text = (<span>{article} <span style={{ color: inv_color }}>{investorType}</span></span>);
  const inv_text_no_article = (<span style={{ color: inv_color }}>{investorType}</span>);
  
  useEffect(() => {
    // Fetch for the map visualization
    fetch(`/6C85-FP/style_pre/${investorType}_${budget}_metadata.json`)
      .then(response => response.json())
      .then(data => set_ellipse_plot(data))
      .catch(error => console.log('Error loading map data:', error));
  }, [investorType, budget]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 5 }}>

    <Typography variant="h2">Choose your <b>style</b></Typography>

    <Box sx={{ display: "flex", flexDirection: "column", flexWrap: "wrap", gap: 5}}>
      <Divider/>

      <Typography variant="body1" sx={{alignSelf: "left", width: "100%", textAlign: "left"}}>
        The the plot below shows the distribution/spready of certain characteristics of 
        different styles of properties bought by {inv_text_no_article} investors with 
        a budget of ${budget.toLocaleString()}. You can look at when properties of each style
        are built and how much internal square footage is there. Modern home typycally tend
        to have less interior space.
        </Typography>
         {ellipse_plot.data.length ? (
        <Plot
          data={ellipse_plot.data}
          layout={ellipse_plot.layout}
          style={{ width: "100%"}}
        />
      ) : (
        <Typography>Loading visualization...</Typography>
      )}
      <Divider/>

      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {STYLE_TYPES.map((Style, index) => (
          <StyleChoice key={`choice-${index}`} {...Style} />
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

export default StylePage;
