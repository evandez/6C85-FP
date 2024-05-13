import { Box } from "@mui/material";
import React from "react";

export default function Page({ children, sx = {} }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        placeItems: "center",
        gap: 4,
        marginTop: 4,
        paddingBottom: 4,
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
        minHeight: "100%",
        "& > p": {
          maxWidth: "1200px",
          paddingLeft: 2,
          paddingRight: 2,
        },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
