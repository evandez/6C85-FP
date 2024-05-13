import { Box } from "@mui/material";
import React from "react";

export default function ChoiceBoxes({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-around",
        gap: 4,
        padding: 8,
      }}
    >
      {children}
    </Box>
  );
}
