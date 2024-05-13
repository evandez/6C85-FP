import React from "react";
import { useNavigate } from "react-router-dom";
import OurButton from "./OurButton";

export default function NextPageButton({
  href,
  showArrow = true,
  sx = {},
  children,
}) {
  const navigate = useNavigate();
  return (
    <OurButton
      onClick={() => navigate(href)}
      sx={{
        ...sx,
      }}
    >
      Next: {children}
      {showArrow && <span>&nbsp;&rarr;</span>}
    </OurButton>
  );
}
