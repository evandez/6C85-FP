import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Plot from "react-plotly.js";

const NEXT_PAGE = "/flip/viz";

import img_notflip from "../assets/notflip_icon.png";
import img_flip from "../assets/flip_icon.png";
import Page from "../components/Page";
import TitleText from "../components/TitleText";
import VizContainer from "../components/VizContainer";
import BodyText from "../components/BodyText";
import VizLoadingDisplay from "../components/VizLoadingDisplay";
import NavigationButtons from "../components/NavigationButtons";
import ChoiceBoxes from "../components/ChoiceBoxes";
import ChoiceBox from "../components/ChoiceBox";

const FLIP_TYPES = [
  {
    slug: "Flip",
    title: "Flip",
    description:
      "Sell off the property before 2 years, making a tidy profit likely without renting the property.",
    image: img_flip,
  },
  {
    slug: "NoFlip",
    title: "Do Not Flip",
    description:
      "Keep the property for more than 2 years, potentially renting it or changing it in other ways.",
    image: img_notflip,
  },
];

const FlipChoice = ({ slug, title, description, image }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  return (
    <ChoiceBox
      href={`${NEXT_PAGE}/?${searchParams.toString()}&flip_var=${slug}`}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "40%",
        margin: "1%",
        gap: 2,
      }}
    >
      <Typography variant="h3">{title}</Typography>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <img
          src={image}
          alt={title}
          style={{ height: "150px", width: "150px" }}
        />
        <BodyText>{description}</BodyText>
      </Box>
    </ChoiceBox>
  );
};

const FlipPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const investorType = searchParams.get("investor-type");
  const budget = parseInt(searchParams.get("budget") ?? "750000");
  const Style = searchParams.get("Style") ?? "Modern";
  const loc = searchParams.get("loc") ?? "ICC";
  const [plot_dots, set_plot_dots] = useState({ data: [], layout: {} });

  useEffect(() => {
    // Fetch for the map visualization
    fetch(
      `/6C85-FP/flip_pre/${investorType}_${budget}_${Style}_${loc}_dots.json`
    )
      .then((response) => response.json())
      .then((data) => {
        set_plot_dots(data);
      })
      .catch((error) => console.log(error));
  }, [investorType, budget, Style, loc]);

  return (
    <Page>
      <TitleText>To flip or not to flip?</TitleText>

      <BodyText>
        Flipping could have dramatic consequences on housing prices. To see how
        investors in the Greater Boston area with that match yours, the dot
        diagram below shows how often that happens.
      </BodyText>

      <VizContainer>
        {plot_dots.data.length ? (
          <Plot
            data={plot_dots.data}
            layout={plot_dots.layout}
            style={{ width: "100%", maxWidth: "600px" }}
          />
        ) : (
          <VizLoadingDisplay />
        )}
      </VizContainer>

      <BodyText>Now decide whether to flip your property:</BodyText>

      <ChoiceBoxes>
        {FLIP_TYPES.map((flip_var, index) => (
          <FlipChoice key={`choice-${index}`} {...flip_var} />
        ))}
      </ChoiceBoxes>

      <NavigationButtons />
    </Page>
  );
};

export default FlipPage;
