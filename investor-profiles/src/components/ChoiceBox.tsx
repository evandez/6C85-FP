import { Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ChoiceBox({ href, children, sx = {} }) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        placeItems: "center",
        maxWidth: "44%",
        gap: 4,
        padding: 4,
        border: "4px solid darkgrey",
        borderRadius: 2,
        "&:hover": {
          cursor: "pointer",
          borderColor: "primary.light",
          borderWidth: "4px",
        },
        ...sx,
      }}
      onClick={() => navigate(href)}
    >
      {children}
    </Box>
  );
}
