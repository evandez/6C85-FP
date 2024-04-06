import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NEXT_PAGE = "/6C85-FP/budget";

const InvestorTypeVizPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const investorType = searchParams.get("investor-type");
  return (
    <Box>
      <Typography>You choice investor type {investorType}!</Typography>
      <Button
        onClick={() => navigate(`${NEXT_PAGE}/?${searchParams.toString()}`)}
      >
        Next: Choose your budget
      </Button>
    </Box>
  );
};

export default InvestorTypeVizPage;
