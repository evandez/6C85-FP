import React from "react";
import { Typography } from "@mui/material";

export default function BodyText({ children, sx = {} }) {
  return (
    <Typography
      variant="body1"
      component="p"
      sx={{ maxWidth: "1200px", textAlign: "left", fontSize: 18, ...sx }}
    >
      {children}
    </Typography>
  );
}
