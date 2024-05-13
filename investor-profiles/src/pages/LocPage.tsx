import React, { useEffect, useState } from "react";
import { Typography, Divider } from "@mui/material";
import Plot from "react-plotly.js";
import { useLocation, useNavigate } from "react-router-dom";
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";
import VizContainer from "../components/VizContainer";
import NavigationButtons from "../components/NavigationButtons";
import Page from "../components/Page";

const NEXT_PAGE = "/loc/viz";

const LocPage = () => {
  const navigate = useNavigate();
  const [mapc_map, set_mapc_map] = useState({ data: [], layout: {} });
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  useEffect(() => {
    fetch("/6C85-FP/loc_pre/mapc_map.json") // Ensure this path is correct
      .then((response) => response.json())
      .then((data) => set_mapc_map(data))
      .catch((error) => console.error("Error loading GeoJSON data:", error));
  }, []);

  const handlePolygonClick = (event) => {
    const loc = event.points[0].properties.subregion;
    navigate(`${NEXT_PAGE}/?${searchParams.toString()}&loc=${loc}`);
  };

  return (
    <Page>
      <TitleText>Choose an MAPC subregion</TitleText>
      <BodyText>Click on a region to choose it.</BodyText>
      <Divider sx={{ mb: 2 }} />

      <VizContainer>
        {mapc_map.data.length ? (
          <Plot
            data={mapc_map.data}
            layout={mapc_map.layout}
            style={{ width: "100%", maxWidth: "800px" }}
            className="cursor-pointer" // Add class name for cursor style
            onClick={handlePolygonClick}
          />
        ) : (
          <Typography>Loading first visualization...</Typography>
        )}
      </VizContainer>

      <NavigationButtons />
    </Page>
  );
};

export default LocPage;
