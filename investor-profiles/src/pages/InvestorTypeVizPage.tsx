import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NEXT_PAGE = "/budget";

const InvestorTypeVizPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const investorType = searchParams.get("investor-type");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h2">
        As an <b>{investorType} investor</b>, you...
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          textAlign: "left",
        }}
      >
        <img src="https://placehold.co/800x600" alt="placeholder" />
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
            properties they are interested in, the neighborhoods they are
            looking at, and the average budget they have.
          </Typography>
          <Typography variant="body1">Here is another paragraph.</Typography>
        </Box>
      </Box>
      <Button
        variant="contained"
        onClick={() => navigate(`${NEXT_PAGE}/?${searchParams.toString()}`)}
        sx={{
          margin: "auto",
        }}
      >
        Next: Choose your budget
      </Button>
    </Box>
  );
};

export default InvestorTypeVizPage;
