import React from "react";
import GoBackButton from "./GoBackButton";
import NextPageButton from "./NextPageButton";
import { Box } from "@mui/material";

export default function NavigationButtons({
  nextHref = null,
  nextText = "Next",
  sx = {},
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 2,
        ...sx,
      }}
    >
      <GoBackButton />
      {nextHref && <NextPageButton href={nextHref}>{nextText}</NextPageButton>}
    </Box>
  );
}
