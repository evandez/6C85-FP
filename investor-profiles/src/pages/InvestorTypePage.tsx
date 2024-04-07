import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import img_institutional_investor from "../assets/institutional_investor.png";
import img_large_investor from "../assets/large_investor.png";
import img_medium_investor from "../assets/medium_investor.png";
import img_small_investor from "../assets/small_investor.png";

const NEXT_PAGE = "/investor-type/viz";
const INESTOR_TYPES = [
  {
    slug: "institutional",
    title: "Institutional Investor",
    description:
      "An institutional investor is an organization or entity that pools money to purchase securities, real estate, and other investment assets or originates loans.",
    image: img_institutional_investor,
  },
  {
    slug: "large",
    title: "Large Investor",
    description:
      "A large investor typically manages a substantial portfolio, focusing on long-term growth and may engage in diversified, high-volume investments with a strategic approach to risk.",
    image: img_large_investor,
  },
  {
    slug: "medium",
    title: "Medium Investor",
    description:
      "A medium investor typically seeks balanced growth with moderate risk, investing in a diversified portfolio over a medium-term horizon.",
    image: img_medium_investor,
  },
  {
    slug: "small",
    title: "Small Investor",
    description:
      "A small investor typically allocates limited capital towards conservative or low-risk investments, focusing on steady, long-term growth and capital preservation.",
    image: img_small_investor,
  },
];

const InvestorTypeChoice = ({ slug, title, description, image }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "44%",
        margin: "1%",
        gap: 2,
        padding: "2%",
      }}
    >
      <Typography variant="h2">{title}</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
        }}
      >
        <img src={image} style={{ height: "200px", width: "200px" }} />
        <Typography variant="body1" sx={{ textAlign: "left" }}>
          {description}
        </Typography>
      </Box>
      <Button
        sx={{
          margin: "auto",
        }}
        onClick={() => navigate(`${NEXT_PAGE}/?investor-type=${slug}`)}
        variant="contained"
      >
        Follow this path
      </Button>
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
