import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Divider} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Plot from 'react-plotly.js';

const NEXT_PAGE = "/budget";

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

const InvestorTypeVizPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const investorType = searchParams.get("investor-type");
  const article = determineArticle(investorType);
  const inv_color = getColorForInvestorType(investorType);
  const inv_text = (<span>{article} <span style={{ color: inv_color }}>{investorType}</span></span>);

  // State to hold the data for the first and second Plotly plot
  const [activity_freq, set_activity_freq] = useState({data: [], layout: {}});
  const [cheapest20, set_cheapest20] = useState({data: [], layout: {}});
  const [middle60, set_middle60] = useState({data: [], layout: {}});
  const [expensive20, set_expensive20] = useState({data: [], layout: {}});
  const [plot_map, set_plot_map] = useState({data: [], layout: {}});
  const [plot_index, set_plot_index] = useState({data: [], layout: {}});

  useEffect(() => {
    fetch(`/6C85-FP/inv_post/inv_activity_frequency.json`)
      .then(response => response.json())
      .then(data => {
        set_activity_freq(data);
      })
      .catch(error => console.log(error));

    fetch(`/6C85-FP/inv_post/cheapest_20.json`)
    .then(response => response.json())
    .then(data => {
      set_cheapest20(data);
    })
    .catch(error => console.log(error));

    fetch(`/6C85-FP/inv_post/middle_60.json`)
    .then(response => response.json())
    .then(data => {
      set_middle60(data);
    })
    .catch(error => console.log(error));

    fetch(`/6C85-FP/inv_post/expensive_20.json`)
    .then(response => response.json())
    .then(data => {
      set_expensive20(data);
    })
    .catch(error => console.log(error));

    fetch(`/6C85-FP/inv_post/${investorType}_index.json`)
    .then(response => response.json())
    .then(data => {
      set_plot_index(data);
    })
    .catch(error => console.log(error));

    fetch(`/6C85-FP/inv_post/${investorType}_map.json`)
    .then(response => response.json())
    .then(data => {
      set_plot_map(data);
    })
    .catch(error => console.log(error));

  }, [investorType]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h3">
        You chose to be {article} <span style={{ color: inv_color }}>{investorType}</span> investor
      </Typography>

      <Typography variant="p">
        While you have already chosen to be {inv_text} investor
        take a look at the overall investor activity in the last 24 years in Greater Boston below. It shows
        that small investors have the largest market share in terms of frequency of sales, while institutional
        investors were very active around 2008. That coincides with the time that institutional investors
        were largely responsible for the 2008 housing crisis.
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          textAlign: "left",
          justifyContent: "center",
        }}
      >
        {activity_freq.data.length ? (
          <Plot
            data={activity_freq.data}
            layout={activity_freq.layout}
            style={{ width: "100%"}}
          />
        ) : (
          <Typography>Loading first visualization...</Typography>
        )}
      </Box>

      <Typography variant="p" sx={{textAlign: "left"}}>
        Now if we account for the proportions of investor activity by each type of investor
        by normalizing their activity by their proportion, we can analyze which groups focus on
        cheaper and more expensive properties. The plot below shows that institutional investors
        focus heavily on cheaper properties while medium and large investors focus much more on expensive properties.
        This might start to signal that institutional investors have a larger impact on housing affordability
        for lower income housing.
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          textAlign: "left",
          justifyContent: "center",
        }}
      >
        {cheapest20.data.length ? (
          <Plot
            data={cheapest20.data}
            layout={cheapest20.layout}
            style={{ width: "47%"}}
          />
        ) : (
          <Typography>Loading first visualization...</Typography>
        )}

        {expensive20.data.length ? (
          <Plot
            data={expensive20.data}
            layout={expensive20.layout}
            style={{ width: "47%"}}
          />
        ) : (
          <Typography>Loading first visualization...</Typography>
        )}
      </Box>


      <Typography variant="p" sx={{textAlign: "left"}}>
        As {inv_text} investor, different parts of the Greater Boston area are more popular
        than others. The choropleth map below shows how popular different zip codes in Boston
        are more popular than others. Feel free to zoom and pan around the interactive map to get
        an idea where an investor like you make allocate more resources to.
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          textAlign: "left",
          justifyContent: "center",
        }}
      >
        {plot_map.data.length ? (
          <Plot
            data={plot_map.data}
            layout={plot_map.layout}
            style={{ plot_map: "100%"}}
          />
        ) : (
          <Typography>Loading first visualization...</Typography>
        )}
      </Box>

      <Divider />
      <Typography variant="h5"><u><span style={{ color: "black" }}>Visual Virtuosos Housing <b>Unaffordability</b> and <b>Impact</b> indices on choices <b>you</b> make</span></u></Typography>
      <Typography variant="p" sx={{textAlign: "left"}}>
        To understand how your choice to be {inv_text} investor (or any investment-related choice) affects housing
        affordability and the strength of this impact, we desiged 2 indices. The first is
        the <b>Visual Virtuosos Housing Unaffordability Index</b>, which measures how
        likely your choice is likely to increasing housing prices in a future time period (we use 5 years here).
        This index takes into account the median household income of renters and expected income
        growth in the same period. We also designed the <b>Visual Virtuosos Impact Index</b> which
        gives a sense for how strong this choice will actually affect the housing market. This index
        accounts for the proportion of the choice relative to all other choices. You can see how
        you choice to be {inv_text} investor pans out in these indices.
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          textAlign: "left",
          justifyContent: "center",
        }}
      >
        {plot_index.data.length ? (
          <Plot
            data={plot_index.data}
            layout={plot_index.layout}
            style={{ plot_index: "100%"}}
          />
        ) : (
          <Typography>Loading first visualization...</Typography>
        )}
      </Box>

      <Typography variant="body1"> <b><span style={{ color: "red" }}>Every choice you make from now will show this plot
      above. While it is important for investors to make large returns, it is important
      to be aware of the impact this may have on the wider housing unaffordability crisis
      in Greater Boston.</span></b>
      </Typography>



      {/* Navigation Buttons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={() => navigate(-1)}
          sx={{
            mt: 2,
          }}
        >
          Go Back
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate(`${NEXT_PAGE}/?${searchParams.toString()}`)}
          sx={{
            mt: 2,
          }}
        >
          Next: Choose your budget
        </Button>
      </Box>
    </Box>
  );
};

export default InvestorTypeVizPage;
