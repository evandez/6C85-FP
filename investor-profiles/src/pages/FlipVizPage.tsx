import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import Plot from "react-plotly.js";
import VizContainer from "../components/VizContainer";
import VizLoadingDisplay from "../components/VizLoadingDisplay";
import NavigationButtons from "../components/NavigationButtons";
import Page from "../components/Page";
import TitleText from "../components/TitleText";

const NEXT_PAGE = "/outcome";

const FlipVizPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const investorType = searchParams.get("investor-type");
  const budget = parseInt(searchParams.get("budget") ?? "750000");
  const Style = searchParams.get("Style") ?? "Modern";
  const loc = searchParams.get("loc") ?? "ICC";
  const flip_var = searchParams.get("flip_var") ?? "Flip";
  // State to hold the data for the second Plotly plot based on the budget
  const [plot_profit, set_plot_profit] = useState({ data: [], layout: {} });
  const [plot_holding, set_plot_holding] = useState({ data: [], layout: {} });
  const [plot_index, set_plot_index] = useState({ data: [], layout: {} });

  useEffect(() => {
    // Fetch for the second visualization based on investor type and budget
    fetch(
      `/6C85-FP/flip_post/${investorType}_${budget}_${Style}_${loc}_profit.json`
    )
      .then((response) => response.json())
      .then((data) => {
        set_plot_profit(data);
      })
      .catch((error) => console.log(error));

    fetch(
      `/6C85-FP/flip_post/${investorType}_${budget}_${Style}_${loc}_holding_period.json`
    )
      .then((response) => response.json())
      .then((data) => {
        set_plot_holding(data);
      })
      .catch((error) => console.log(error));

    fetch(
      `/6C85-FP/flip_post/${investorType}_${budget}_${Style}_${loc}_${flip_var}_index.json`
    )
      .then((response) => response.json())
      .then((data) => {
        set_plot_index(data);
      })
      .catch((error) => console.log(error));
  }, [investorType, budget, Style, loc, flip_var]);

  const flipPretty = flip_var.toLowerCase() === "flip" ? "flip" : "not flip";
  return (
    <Page>
      <TitleText>
        You decide to <b>{flipPretty}</b>.
      </TitleText>

      <VizContainer>
        {plot_profit.data.length ? (
          <Plot
            data={plot_profit.data}
            layout={plot_profit.layout}
            style={{ width: "100%", maxWidth: "800px" }}
          />
        ) : (
          <VizLoadingDisplay />
        )}
      </VizContainer>

      <VizContainer>
        {plot_holding.data.length ? (
          <Plot
            data={plot_holding.data}
            layout={plot_holding.layout}
            style={{ width: "100%", maxWidth: "800px" }}
          />
        ) : (
          <Typography>Loading first visualization...</Typography>
        )}
      </VizContainer>

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
        nextText="View Final Profile"
      />
    </Page>
  );
};

export default FlipVizPage;
