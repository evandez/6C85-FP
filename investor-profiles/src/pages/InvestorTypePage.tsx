import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Plot from "react-plotly.js";

import img_institutional_investor from "../assets/institutional_investor.png";
import img_large_investor from "../assets/large_investor.png";
import img_medium_investor from "../assets/medium_investor.png";
import img_small_investor from "../assets/small_investor.png";
import BodyText from "../components/BodyText";
import VizLoadingDisplay from "../components/VizLoadingDisplay";
import Page from "../components/Page";
import TitleText from "../components/TitleText";
import VizContainer from "../components/VizContainer";
import NavigationButtons from "../components/NavigationButtons";

const NEXT_PAGE = "/investor-type/viz";
const INVESTOR_TYPES = [
  {
    slug: "Institutional",
    title: "Institutional Investor",
    description:
      "An institutional investor is an organization or \
    entity that pools money to purchase securities, real estate, \
    and other investment assets or originates loans. Check out the profits \
    institutional investors have made in greater boston the last 5 years.",
    image: img_institutional_investor,
  },
  {
    slug: "Large",
    title: "Large Investor",
    description:
      "A large investor typically manages a substantial portfolio, \
    focusing on long-term growth and may engage in diversified, high-volume \
    investments with a strategic approach to risk. Check out the profits \
    Large investors have made in greater boston the last 5 years.",
    image: img_large_investor,
  },
  {
    slug: "Medium",
    title: "Medium Investor",
    description:
      "A medium investor typically seeks balanced growth with \
    moderate risk, investing in a diversified portfolio over a medium-term horizon. Check out the profits \
    Medium investors have made in greater boston the last 5 years.",
    image: img_medium_investor,
  },
  {
    slug: "Small",
    title: "Small Investor",
    description:
      "A small investor typically allocates limited capital towards \
    conservative or low-risk investments, focusing on steady, long-term growth \
    and capital preservation. Despite their low risk profile, the plot below \
    shows that they have incurred significant losses in the last 5 years.",
    image: img_small_investor,
  },
];

const InvestorTypeChoice = ({ slug, title, description, image }) => {
  const navigate = useNavigate();
  const [inv_profit_plot, set_inv_profit_plot] = useState({
    data: [],
    layout: {},
    frames: [],
  });

  useEffect(() => {
    // Fetch for the map visualization
    fetch(`/6C85-FP/inv_pre/${slug}_profit.json`)
      .then((response) => response.json())
      .then((data) => set_inv_profit_plot(data))
      .catch((error) => console.log("Error loading map data:", error));
  }, [slug]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        placeItems: "center",
        maxWidth: "44%",
        gap: 4,
        padding: 4,
        border: "4px solid darkgrey",
        borderRadius: 2,
        "&:hover": {
          cursor: "pointer",
          borderColor: "primary.light",
          borderWidth: "4px",
        },
      }}
      onClick={() => navigate(`${NEXT_PAGE}/?investor-type=${slug}`)}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          textAlign: "left",
          gap: 2,
        }}
      >
        <img
          src={image}
          alt={title}
          style={{ height: "200px", width: "200px" }}
        />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h3">{title}</Typography>
          <BodyText sx={{ flexGrow: 1, textAlign: "left" }}>
            {description}
          </BodyText>
        </Box>
      </Box>
      <VizContainer>
        {inv_profit_plot.data.length ? (
          <Box
            onClick={(event) => event.stopPropagation()}
            sx={{ width: "100%" }}
          >
            <Plot
              data={inv_profit_plot.data}
              layout={inv_profit_plot.layout}
              frames={inv_profit_plot.frames}
              style={{ width: "100%" }}
            />
          </Box>
        ) : (
          <VizLoadingDisplay />
        )}
      </VizContainer>
    </Box>
  );
};

const InvestorTypePage = () => {
  const [volume_plot, set_volume_plot] = useState({
    data: [],
    layout: {},
    frames: [],
  });

  useEffect(() => {
    // Fetch for the map visualization
    fetch(`/6C85-FP/inv_pre/inv_trans_volume.json`)
      .then((response) => response.json())
      .then((data) => set_volume_plot(data))
      .catch((error) => console.log("Error loading map data:", error));
  });

  return (
    <Page>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
        }}
      >
        <TitleText>
          What <b>investor type</b> will you be?
        </TitleText>
        <VizContainer>
          {volume_plot.data.length ? (
            <Plot
              data={volume_plot.data}
              layout={volume_plot.layout}
              style={{ width: "100%" }}
            />
          ) : (
            <Typography>Loading visualization...</Typography>
          )}
        </VizContainer>
        <BodyText>
          Start by choosing what type of investor you want to be. You can start
          by visualizing the Greater Boston buyer-seller transactional volume
          above. From this we can see that there is{" "}
          <i>high trade volume between small investors</i> and that{" "}
          <i>large investors sell primarily to institutional investors</i>. Now
          take a look below to see the profit profiles of each investor type
          with its description before you decide. {"\n"}
        </BodyText>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-around",
          gap: 4,
          padding: 8,
        }}
      >
        {INVESTOR_TYPES.map((investorType, index) => (
          <InvestorTypeChoice key={`choice-${index}`} {...investorType} />
        ))}
      </Box>
      <NavigationButtons />
    </Page>
  );
};

export default InvestorTypePage;
