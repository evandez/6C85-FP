import React from "react";
import { Box, Typography } from "@mui/material";

export default function CallOut({
  title = "Important Note",
  children,
  sx = {},
}) {
  return (
    <Box
      sx={{
        borderRaidus: 4,
        // backgroundColor: "rgba(152, 203, 177, 0.5)",
        backgroundColor: "lightyellow",
        maxWidth: "1200px",
        padding: 2,
        border: "1px solid darkgrey",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        ...sx,
      }}
    >
      <Typography variant="h5" component="p" sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>
      <Typography variant="body1" component="p">
        {children}
      </Typography>
    </Box>
  );
}
