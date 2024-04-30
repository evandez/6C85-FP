import { Box, Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Plot from 'react-plotly.js';

import img_institutional_investor from "../assets/institutional_investor.png";
import img_large_investor from "../assets/large_investor.png";
import img_medium_investor from "../assets/medium_investor.png";
import img_small_investor from "../assets/small_investor.png";

const NEXT_PAGE = "/investor-type/viz";
const INVESTOR_TYPES = [
  {
    slug: "Institutional",
    title: "Institutional Investor",
    description: "An institutional investor is an organization or \
    entity that pools money to purchase securities, real estate, \
    and other investment assets or originates loans. Check out the profits \
    institutional investors have made in greater boston the last 5 years.",
    image: img_institutional_investor,
  },
  {
    slug: "Large",
    title: "Large Investor",
    description: "A large investor typically manages a substantial portfolio, \
    focusing on long-term growth and may engage in diversified, high-volume \
    investments with a strategic approach to risk. Check out the profits \
    Large investors have made in greater boston the last 5 years.",
    image: img_large_investor,
  },
  {
    slug: "Medium",
    title: "Medium Investor",
    description: "A medium investor typically seeks balanced growth with \
    moderate risk, investing in a diversified portfolio over a medium-term horizon. Check out the profits \
    Medium investors have made in greater boston the last 5 years.",
    image: img_medium_investor,
  },
  {
    slug: "Small",
    title: "Small Investor",
    description: "A small investor typically allocates limited capital towards \
    conservative or low-risk investments, focusing on steady, long-term growth \
    and capital preservation. Despite their low risk profile, the plot below \
    shows that they have incurred significant losses in the last 5 years.",
    image: img_small_investor,
  },
];

const InvestorTypeChoice = ({ slug, title, description, image }) => {
  const navigate = useNavigate();
  const [inv_profit_plot, set_inv_profit_plot] = useState({ data: [], layout: {}, frames: [] });

  useEffect(() => {
    // Fetch for the map visualization
    fetch(`/6C85-FP/inv_pre/${slug}_profit.json`)
      .then(response => response.json())
      .then(data => set_inv_profit_plot(data))
      .catch(error => console.log('Error loading map data:', error));
  }, [slug]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "44%", margin: "1%", gap: 2, padding: "0%" }}>
      <Typography variant="h3">{title}</Typography>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <img src={image} alt={title} style={{ height: "150px", width: "150px" }} />
        <Typography variant="body1" sx={{ flexGrow: 1 }}>{description}</Typography>
      </Box>
      {inv_profit_plot.data.length ? (
        <Plot
          data={inv_profit_plot.data}
          layout={inv_profit_plot.layout}
          frames={inv_profit_plot.frames}
          style={{ width: "100%"}}
        />
      ) : (
        <Typography>Loading map visualization...</Typography>
      )}
      <Button sx={{ margin: "auto" }} onClick={() => navigate(`${NEXT_PAGE}/?investor-type=${slug}`)} variant="contained">
        Follow this path
      </Button>
    </Box>
  );
  
};

const InvestorTypePage = () => {

  const [volume_plot, set_volume_plot] = useState({ data: [], layout: {}, frames: [] });

  useEffect(() => {
    // Fetch for the map visualization
    fetch(`/6C85-FP/inv_pre/inv_trans_volume.json`)
      .then(response => response.json())
      .then(data => set_volume_plot(data))
      .catch(error => console.log('Error loading map data:', error));
  });


  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <Box sx={{ display: "flex", flexDirection: "column", flexWrap: "wrap"}}>
        <Typography variant="h2">Choose your <b>investor</b> type</Typography>
        {volume_plot.data.length ? (
        <Plot
          data={volume_plot.data}
          layout={volume_plot.layout}
          style={{ width: "100%"}}
        />
      ) : (
        <Typography>Loading visualization...</Typography>
      )}
        <Typography variant="body1" sx={{alignSelf: "center", width: "70%", textAlign: "left"}}>
        Start by choosing what type of investor you want to be. You can start by visualizing the Greater Boston
        buyer-seller transactional volume above. From this we can see that there is <i>high
        trade volume between small investors</i> and that <i>large investors sell primarily to 
        institutional investors</i>. Now take a look below to see the profit profiles of each 
        investor type with its description before you decide. {'\n'}
        </Typography>

      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {INVESTOR_TYPES.map((investorType, index) => (
          <InvestorTypeChoice key={`choice-${index}`} {...investorType} />
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

export default InvestorTypePage;
