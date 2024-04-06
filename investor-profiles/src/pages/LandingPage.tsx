import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate("/investor-type")}>Start here</Button>
    </div>
  );
};

export default LandingPage;
