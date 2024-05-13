import React from "react";
import { Button } from "@mui/material";

export default function OurButton({ children, sx = {}, ...props }) {
  return (
    <Button
      variant="contained"
      sx={{ minWidth: 400, fontSize: "1.25rem", ...sx }}
      {...props}
    >
      {children}
    </Button>
  );
}
