import React from "react";
import { Box, Typography } from "@mui/material";
import GoBackText from "./GoBackText";

export default function TitleText({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        gap: 1,
      }}
    >
      <Typography variant="h2">{children}</Typography>
      <GoBackText />
    </Box>
  );
}
