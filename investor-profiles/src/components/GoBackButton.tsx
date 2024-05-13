import React from "react";
import { useNavigate } from "react-router";
import OurButton from "./OurButton";

export default function GoBackButton({ sx = {} }) {
  const navigate = useNavigate();
  return (
    <OurButton
      variant="contained"
      onClick={() => navigate(-1)}
      sx={{
        ...sx,
      }}
    >
      &larr; Go Back
    </OurButton>
  );
}
