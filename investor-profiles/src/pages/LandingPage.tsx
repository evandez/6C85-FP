import { Box, Typography } from "@mui/material";
import React from "react";
import backgroundImage from "../assets/investor_journey_no_text.png";
import "./LandingPage.css";
import Page from "../components/Page";
import NextPageButton from "../components/NextPageButton";

const LandingPage = () => {
  return (
    <Page
      sx={{
        margin: 0,
        padding: 0,
        gap: 2,
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: "#98cbb1",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 90%",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          marginTop: 2,
          fontFamily: '"Permanent Marker", cursive',
          "-webkit-text-stroke-width": "2px",
          "-webkit-text-stroke-color": "white",
        }}
      >
        Inve<span style={{ letterSpacing: "10px" }}>s</span>tor Journey
      </Typography>
      <Typography
        variant="h6"
        component="p"
        sx={{
          marginTop: "auto",
          paddingTop: 2,
          paddingLeft: 2,
          paddingRight: 2,
          maxWidth: "1200px",
        }}
      >
        What drives investors to the city of Boston? In this "choose your
        adventure," you will put yourself in the shoes of an investor and make
        decisions about purchasing property in Greater Boston. Along the way,
        you will learn what factors drive investors in their decision-making and
        how these decisions impact the communities around them.
      </Typography>
      <Typography variant="h6" component="p" sx={{ fontWeight: "bold" }}>
        Your journey to your dream investment starts here.
      </Typography>
      <NextPageButton href={"/investor-type"} showArrow={false}>
        Start here
      </NextPageButton>
      <Box
        sx={{
          marginTop: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          marginBottom: 2,
        }}
      >
        <Typography variant="body2">
          Created by{" "}
          <a href="https://www.arijitdasgupta.com/" target="_blank">
            Arijit Dasgupta
          </a>
          ,{" "}
          <a
            href="https://www.linkedin.com/in/deepali-kishnani/"
            target="_blank"
          >
            Deepali Kishnani
          </a>
          ,{" "}
          <a href="https://idm.mit.edu/student/azfar-sulaiman/" target="_blank">
            Azfar Sulaiman
          </a>
          , and{" "}
          <a href="https://evandez.com" target="_blank">
            Evan Hernandez
          </a>
        </Typography>
        <Typography variant="body2">
          This project was developed with guidance and feedback from the{" "}
          <a href="" target="_blank">
            Metropolitan Area Planning Commission (MAPC).
          </a>
        </Typography>
      </Box>
    </Page>
  );
};

export default LandingPage;
