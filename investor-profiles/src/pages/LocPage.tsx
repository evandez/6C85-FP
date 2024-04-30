import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Divider } from "@mui/material";
import Plot from 'react-plotly.js';
import { useLocation, useNavigate } from "react-router-dom";

const NEXT_PAGE = "/loc/viz";

const LocPage = () => {
  const navigate = useNavigate();
  const [mapc_map, set_mapc_map] = useState({data: [], layout: {}});
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  useEffect(() => {
    fetch('/6C85-FP/loc_pre/mapc_map.json')  // Ensure this path is correct
      .then(response => response.json())
      .then(data => set_mapc_map(data))
      .catch(error => console.error('Error loading GeoJSON data:', error));
  }, []);

  const handlePolygonClick = (event) => {
    const loc = event.points[0].properties.subregion; 
    navigate(`${NEXT_PAGE}/?${searchParams.toString()}&loc=${loc}`)
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        textAlign: "left",
        justifyContent: "center"
      }}
    >      <Typography variant="h4" gutterBottom>Choose an MAPC subregion</Typography>
      <Typography variant="body1">
        Click on a region to choose it.
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          textAlign: "left",
          justifyContent: "center",
        }}
      >
        {mapc_map.data.length ? (
          <Plot
            data={mapc_map.data}
            layout={mapc_map.layout}
            style={{ width: "100%"}}
            className="cursor-pointer"  // Add class name for cursor style
            onClick={handlePolygonClick}
          />
        ) : (
          <Typography>Loading first visualization...</Typography>
        )}
      </Box>

      <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
        Go Back
      </Button>
    </Box>
  );
};

export default LocPage;
