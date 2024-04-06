import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const NEXT_PAGE = "/6C85-FP/investor-type/viz";
const INESTOR_TYPES = [
  {
    slug: "institutional",
    title: "Institutional Investor",
    description: "You are investing as an individual",
    image: "https://via.placeholder.com/150",
  },
  {
    slug: "large",
    title: "Large Investor",
    description: "You are investing as an individual",
    image: "https://via.placeholder.com/150",
  },
  {
    slug: "medium",
    title: "Medium Investor",
    description: "You are investing as an individual",
    image: "https://via.placeholder.com/150",
  },
  {
    slug: "small",
    title: "Small Investor",
    description: "You are investing as an individual",
    image: "https://via.placeholder.com/150",
  },
];

const InvestorTypeChoice = ({ slug, title, description, image }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "48%",
        margin: "1%",
      }}
    >
      <img src={image} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <Typography>{title}</Typography>
        <Typography>{description}</Typography>
        <Button onClick={() => navigate(`${NEXT_PAGE}/?investor-type=${slug}`)}>
          Follow this path
        </Button>
      </Box>
    </Box>
  );
};

const InvestorTypePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {INESTOR_TYPES.map((investorType, index) => (
        <InvestorTypeChoice key={`choice-${index}`} {...investorType} />
      ))}
    </Box>
  );
};

export default InvestorTypePage;
