import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NEXT_PAGE = "/outcome";

const BudgetVizPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const budget = parseInt(searchParams.get("budget") ?? "0");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        textAlign: "left",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          textAlign: "left",
        }}
      >
        <Typography variant="h2">
          With a budget of <b>${budget.toLocaleString()}</b>, you can buy some
          great properties.
        </Typography>
        <img src="https://placehold.co/800x400" alt="placeholder" />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="body1">
          This is where the visualization of the investor type would go. It
          would show data relevant to the investor type, such as the types of
          properties they are interested in, the neighborhoods they are looking
          at, and the average budget they have.
        </Typography>
        <Typography variant="body1">Here is another paragraph.</Typography>
      </Box>
      <Button
        variant="contained"
        onClick={() => navigate(`${NEXT_PAGE}/?${searchParams.toString()}`)}
        sx={{
          margin: "auto",
        }}
      >
        Next: Pick a location
      </Button>
    </Box>
  );
};

export default BudgetVizPage;
