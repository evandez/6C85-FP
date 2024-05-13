import React from "react";
import { Box } from "@mui/material";

export default function VizContainer({ children, sx = {} }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyItems: "center",
        alignContent: "center",
        justifyContent: "center",
        width: "100%",
        maxWidth: "1500px",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
