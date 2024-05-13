import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Divider } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Plot from "react-plotly.js";
import Page from "../components/Page";
import NavigationButtons from "../components/NavigationButtons";
import VizContainer from "../components/VizContainer";
import BodyText from "../components/BodyText";
import VizLoadingDisplay from "../components/VizLoadingDisplay";
import TitleText from "../components/TitleText";

const NEXT_PAGE = "/loc";

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

const StyleVizPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const investorType = searchParams.get("investor-type");
  const budget = parseInt(searchParams.get("budget") ?? "750000");
  const Style = searchParams.get("Style") ?? "Modern";
  const article = determineArticle(investorType);
  const inv_color = getColorForInvestorType(investorType);
  const inv_text = (
    <span>
      {article}{" "}
      <span style={{ color: inv_color, fontWeight: "bold" }}>
        {investorType?.toLowerCase()}
      </span>
    </span>
  );
  const inv_text_no_article = (
    <span style={{ color: inv_color, fontWeight: "bold" }}>
      {investorType?.toLowerCase()}
    </span>
  );
  // State to hold the data for the second Plotly plot based on the budget
  const [plot_network, set_plot_network] = useState({ data: [], layout: {} });
  const [plot_index, set_plot_index] = useState({ data: [], layout: {} });

  useEffect(() => {
    // Fetch for the second visualization based on investor type and budget
    fetch(`/6C85-FP/style_post/${investorType}_${budget}_${Style}_network.json`)
      .then((response) => response.json())
      .then((data) => {
        set_plot_network(data);
      })
      .catch((error) => console.log(error));

    fetch(`/6C85-FP/style_post/${investorType}_${budget}_${Style}_index.json`)
      .then((response) => response.json())
      .then((data) => {
        set_plot_index(data);
      })
      .catch((error) => console.log(error));
  }, [investorType, budget, Style]);

  return (
    <Page>
      <TitleText>
        With a <b>{Style.toLowerCase()}</b> style of property, you get to enjoy
        multiple amenities.
      </TitleText>

      <BodyText>
        The network plot below shows which amenities come together for
        {Style} properties bought by {inv_text_no_article} investors with a
        budget of ${budget.toLocaleString()} in Greater Boston. If two nodes in
        the graph have a thicker line, then they usually come together.
      </BodyText>

      <VizContainer>
        {plot_network.data.length ? (
          <Plot
            data={plot_network.data}
            layout={plot_network.layout}
            style={{ width: "100%" }}
          />
        ) : (
          <VizLoadingDisplay />
        )}
      </VizContainer>

      <BodyText>
        We once again need to think about how our choices affect housing for
        others. The indices plot below shows the impact on choosing a {Style}{" "}
        style of property with <b>${budget.toLocaleString()}</b> as {inv_text}{" "}
        investor.
      </BodyText>

      <VizContainer>
        {plot_index.data.length ? (
          <Plot
            data={plot_index.data}
            layout={plot_index.layout}
            style={{ width: "100%", maxWidth: "800px" }}
          />
        ) : (
          <VizLoadingDisplay />
        )}
      </VizContainer>

      <NavigationButtons
        nextHref={`${NEXT_PAGE}/?${searchParams.toString()}`}
        nextText="Pick a location"
      />
    </Page>
  );
};

export default StyleVizPage;
