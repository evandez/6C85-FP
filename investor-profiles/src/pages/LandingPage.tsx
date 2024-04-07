import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography variant="h1">Investor Journey</Typography>
      <Typography>
        What drives investors to the city of Boston? In this "choose your
        adventure," you will put yourself in the shoes of an investor and make
        decisions about purchasing property in Greater Boston. Along the way,
        you will learn what factors drive investors in their decision-making.
      </Typography>
      <Typography sx={{ fontWeight: "bold" }}>
        Your journey to your dream investment starts here.
      </Typography>
      <Button onClick={() => navigate("/investor-type")} variant="contained">
        Start here
      </Button>
    </Box>
  );
};

export default LandingPage;
