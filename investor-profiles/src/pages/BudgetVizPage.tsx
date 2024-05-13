import React, { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import { useLocation } from "react-router-dom";
import Plot from "react-plotly.js";
import Page from "../components/Page";
import NavigationButtons from "../components/NavigationButtons";
import VizContainer from "../components/VizContainer";
import BodyText from "../components/BodyText";
import VizLoadingDisplay from "../components/VizLoadingDisplay";
import TitleText from "../components/TitleText";

const NEXT_PAGE = "/style";

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

const BudgetVizPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const investorType = searchParams.get("investor-type");
  const budget = parseInt(searchParams.get("budget") ?? "750000");
  const inv_color = getColorForInvestorType(investorType);
  const inv_text_no_article = (
    <span style={{ color: inv_color, fontWeight: "bold" }}>
      {investorType?.toLocaleLowerCase()}
    </span>
  );
  // State to hold the data for the second Plotly plot based on the budget
  const [plot_radial, set_plot_radial] = useState({ data: [], layout: {} });
  const [plot_contour, set_plot_contour] = useState({
    data: [],
    layout: {},
    frames: {},
  });
  const [plot_index, set_plot_index] = useState({ data: [], layout: {} });

  useEffect(() => {
    // Fetch for the second visualization based on investor type and budget
    fetch(`/6C85-FP/budget_post/${investorType}_${budget}_radial.json`)
      .then((response) => response.json())
      .then((data) => {
        set_plot_radial(data);
      })
      .catch((error) => console.log(error));

    fetch(`/6C85-FP/budget_post/${investorType}_${budget}_contour.json`)
      .then((response) => response.json())
      .then((data) => {
        set_plot_contour(data);
      })
      .catch((error) => console.log(error));

    fetch(`/6C85-FP/budget_post/${investorType}_${budget}_index.json`)
      .then((response) => response.json())
      .then((data) => {
        set_plot_index(data);
      })
      .catch((error) => console.log(error));
  }, [investorType, budget]);

  return (
    <Page>
      <TitleText>
        A budget of <b>${budget.toLocaleString()}</b> buys great properties.
      </TitleText>

      <BodyText>
        Let us first start by looking at how much {inv_text_no_article}{" "}
        investors with your budget of <b>${budget.toLocaleString()}</b>{" "}
        generally spend on a property. The radial plot below gives a clear
        visual indication of the ranges in which this budget is used.
      </BodyText>

      <VizContainer>
        {plot_radial.data.length ? (
          <Plot
            data={plot_radial.data}
            layout={plot_radial.layout}
            style={{ width: "100%" }}
          />
        ) : (
          <VizLoadingDisplay />
        )}
      </VizContainer>

      <BodyText>
        To better understand what a <b>${budget.toLocaleString()}</b> budget can
        get you, the contour plot below shows how many bathrooms and bedrooms
        can be bought with this budget. The contours give a sense of where most{" "}
        {inv_text_no_article} investors have bought at. Interact with the budget
        slider, to see what a changing budget for {inv_text_no_article}
        investors can get you.
      </BodyText>

      <VizContainer>
        {plot_contour.data.length ? (
          <Plot
            data={plot_contour.data}
            layout={plot_contour.layout}
            frames={plot_contour.frames}
            style={{ width: "100%" }}
          />
        ) : (
          <VizLoadingDisplay />
        )}
      </VizContainer>

      <Divider />

      <BodyText>
        We now go back to our indices to visualize what cossing a budget of
        <b>${budget.toLocaleString()}</b> has as an impact on housing
        affordability.
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
        nextText="Pick a Style"
      />
    </Page>
  );
};

export default BudgetVizPage;
