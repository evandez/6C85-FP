import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Divider } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Plot from "react-plotly.js";
import Page from "../components/Page";
import NavigationButtons from "../components/NavigationButtons";
import VizContainer from "../components/VizContainer";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";

const NEXT_PAGE = "/flip";

function determineArticle(investorType: string): string {
  // Convert the investorType to lowercase for case-insensitive comparison
  const type = investorType.toLowerCase();

  // Check if the investorType is equal to 'small', 'medium', or 'large'
  if (type === "small" || type === "medium" || type === "large") {
    return "a";
  } else {
    return "an";
  }
}

function getColorForInvestorType(investorType: string): string {
  switch (investorType.toLowerCase()) {
    case "institutional":
      return "red";
    case "small":
      return "blue";
    case "large":
      return "green";
    case "medium":
      return "orange";
    default:
      return ""; // Default to empty string or any other default color
  }
}

const LocVizPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const investorType = searchParams.get("investor-type");
  const budget = parseInt(searchParams.get("budget") ?? "750000");
  const Style = searchParams.get("Style") ?? "Modern";
  const loc = searchParams.get("loc") ?? "ICC";
  const article = determineArticle(investorType);
  const inv_color = getColorForInvestorType(investorType);
  const inv_text = (
    <span>
      {article} <span style={{ color: inv_color }}>{investorType}</span>
    </span>
  );
  const inv_text_no_article = (
    <span style={{ color: inv_color }}>{investorType}</span>
  );
  // State to hold the data for the second Plotly plot based on the budget
  const [plot_dash, set_plot_dash] = useState({ data: [], layout: {} });
  const [plot_index, set_plot_index] = useState({ data: [], layout: {} });

  useEffect(() => {
    // Fetch for the second visualization based on investor type and budget
    fetch(`/6C85-FP/loc_post/${loc}_dashboard.json`)
      .then((response) => response.json())
      .then((data) => {
        set_plot_dash(data);
      })
      .catch((error) => console.log(error));

    fetch(
      `/6C85-FP/loc_post/${investorType}_${budget}_${Style}_${loc}_index.json`
    )
      .then((response) => response.json())
      .then((data) => {
        set_plot_index(data);
      })
      .catch((error) => console.log(error));
  }, [investorType, budget, Style, loc]);

  return (
    <Page>
      <TitleText>
        You chose to invest in the <b>{loc}</b> MAPC subregion.
      </TitleText>

      <BodyText>
        It is important to understand the demographics of the location you are
        investing in as your investment may have a direct impact on their
        housing prices. Here is a dashboad visualization of the demographics of
        the {loc} MAPC subregion.
      </BodyText>

      <VizContainer>
        {plot_dash.data.length ? (
          <Plot
            data={plot_dash.data}
            layout={plot_dash.layout}
            style={{ width: "100%", maxWidth: "1200px" }}
          />
        ) : (
          <Typography>Loading first visualization...</Typography>
        )}
      </VizContainer>

      <Divider />

      <BodyText>
        We come back to the indices for making our choice. The indices plot
        below shows the impact on choosing the {loc} subregions for
        {Style}style of properties with <b>${budget.toLocaleString()}</b> as{" "}
        {inv_text} investor.
      </BodyText>

      <VizContainer>
        {plot_index.data.length ? (
          <Plot
            data={plot_index.data}
            layout={plot_index.layout}
            style={{ width: "100%", maxWidth: "800px" }}
          />
        ) : (
          <Typography>Loading first visualization...</Typography>
        )}
      </VizContainer>

      <NavigationButtons
        nextHref={`${NEXT_PAGE}/?${searchParams.toString()}`}
        nextText="Decide to Flip"
      />
    </Page>
  );
};

export default LocVizPage;
