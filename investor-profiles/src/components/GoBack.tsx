import React from "react";
import { Typography } from "@mui/material";

export default function GoBack({ href }) {
  return (
    <Typography variant="body2">
      (...or you can <a href={href}>&larr; go back</a>)
    </Typography>
  );
}
