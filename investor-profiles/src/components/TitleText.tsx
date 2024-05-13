import React from "react";
import { Box, Typography } from "@mui/material";
import GoBackText from "./GoBackText";

export default function TitleText({ children, sx = {} }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        gap: 1,
        maxWidth: "1500px",
        ...sx,
      }}
    >
      <Typography variant="h2">{children}</Typography>
      <GoBackText />
    </Box>
  );
}
