import { Box } from "@mui/material";
import React from "react";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Reacts to changes in pathname
}

export default function Page({ children, sx = {} }) {
  useScrollToTop();
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
