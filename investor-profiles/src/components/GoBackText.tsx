import React from "react";
import { Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function GoBackText({ sx = {} }) {
  const navigate = useNavigate();
  return (
    <Typography variant="body2" sx={sx}>
      (...or you can{" "}
      <Link
        onClick={() => navigate(-1)}
        sx={{
          textDecoration: "none",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        &larr; go back
      </Link>
      )
    </Typography>
  );
}
