import { Slider, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Plot from "react-plotly.js";
import Page from "../components/Page";
import NavigationButtons from "../components/NavigationButtons";
import BodyText from "../components/BodyText";
import VizContainer from "../components/VizContainer";
import TitleText from "../components/TitleText";
import VizLoadingDisplay from "../components/VizLoadingDisplay";

const NEXT_PAGE = "/budget/viz";
const INVESTOR_TYPE_TO_BUDGET_RANGES = {
  Institutional: {
    min: 250000,
    max: 1500000,
    step: 250000,
  },
  Large: {
    min: 250000,
    max: 1500000,
    step: 250000,
  },
  Medium: {
    min: 250000,
    max: 1500000,
    step: 250000,
  },
  Small: {
    min: 250000,
    max: 1500000,
    step: 250000,
  },
};

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

const BudgetPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const investorType = searchParams.get("investor-type");
  const budgetRange = INVESTOR_TYPE_TO_BUDGET_RANGES[investorType];
  const [budget, setBudget] = useState(budgetRange.min);
  const article = determineArticle(investorType);
  const inv_color = getColorForInvestorType(investorType);
  const inv_text = (
    <span>
      {article}{" "}
      <span style={{ color: inv_color, fontWeight: "bold" }}>
        {investorType.toLowerCase()}
      </span>
    </span>
  );
  const [plot_selector, set_plot_selector] = useState({ data: [], layout: {} });

  useEffect(() => {
    // Construct the URL based on the current budget
    const url = `/6C85-FP/budget_pre/${investorType}_${budget}_selector.json`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        set_plot_selector(data);
      })
      .catch((error) => console.log("Error loading plot data:", error));
  }, [budget, investorType]);

  return (
    <Page>
      <TitleText>
        What's your <b>budget</b>?
      </TitleText>

      <BodyText>
        You must now choose your budget. Naturally, different types of investors
        have different budgets. You will have to consider the average budget of
        your investor type and decide how much you are willing to spend (and, by
        proxy, how much you are willing to risk).
      </BodyText>

      <VizContainer>
        {plot_selector.data.length ? (
          <Plot
            data={plot_selector.data}
            layout={plot_selector.layout}
            style={{ width: "100%" }}
          />
        ) : (
          <VizLoadingDisplay />
        )}
      </VizContainer>

      <BodyText>
        The plot above shows the distributions of prices that {inv_text}{" "}
        investor has paid when making a property investment. You can use it to
        help inform your choice further. Now select your budget by moving the
        slider.
      </BodyText>

      <Slider
        min={budgetRange.min}
        max={budgetRange.max}
        step={budgetRange.step}
        value={budget}
        valueLabelDisplay="on"
        valueLabelFormat={(value) => `$${value.toLocaleString()}`}
        onChange={(event) => setBudget(event.target.value)}
        marks
        sx={{
          marginTop: 2,
          marginBottom: 2,
          width: "90%",
          maxWidth: "1200px",
          "& .MuiSlider-valueLabel": {
            fontSize: "1.5rem",
          },
        }}
      />
      <NavigationButtons
        nextHref={`${NEXT_PAGE}?${searchParams.toString()}&budget=${budget}`}
        nextText="Set Budget"
      />
    </Page>
  );
};

export default BudgetPage;
