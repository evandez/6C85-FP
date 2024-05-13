import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import Plot from "react-plotly.js";
import Page from "../components/Page";
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";
import VizContainer from "../components/VizContainer";
import NavigationButtons from "../components/NavigationButtons";

const OutcomePage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const investorType = searchParams.get("investor-type");
  const budget = parseInt(searchParams.get("budget") ?? "750000");
  const Style = searchParams.get("Style") ?? "Modern";
  const loc = searchParams.get("loc") ?? "ICC";
  const flip_var = searchParams.get("flip_var") ?? "Flip";
  // State to hold the data for the second Plotly plot based on the budget
  const [plot_sankey, set_plot_sankey] = useState({ data: [], layout: {} });

  useEffect(() => {
    // Fetch for the second visualization based on investor type and budget

    fetch(
      `/6C85-FP/summary/${investorType}_${budget}_${Style}_${loc}_${flip_var}_sankey.json`
    )
      .then((response) => response.json())
      .then((data) => {
        set_plot_sankey(data);
      })
      .catch((error) => console.log(error));
  }, [investorType, budget, Style, loc, flip_var]);

  return (
    <Page>
      <TitleText>Your final profile</TitleText>

      <BodyText>
        Out of 1152 possible paths, this was the path you took. The sankey
        profile below shows you how common way choice was overall.
      </BodyText>

      <VizContainer>
        {plot_sankey.data.length ? (
          <Plot
            data={plot_sankey.data}
            layout={plot_sankey.layout}
            style={{ width: "100%" }}
          />
        ) : (
          <Typography>Loading first visualization...</Typography>
        )}
      </VizContainer>

      <NavigationButtons
        nextHref="/"
        nextText="Restart"
        showArrow={false}
        showNext={false}
      />
    </Page>
  );
};

export default OutcomePage;
