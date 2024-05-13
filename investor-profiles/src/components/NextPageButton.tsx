import React from "react";
import { useNavigate } from "react-router-dom";
import OurButton from "./OurButton";

export default function NextPageButton({
  href,
  showNext = true,
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
      {showNext && "Next: "} {children}
      {showArrow && <span>&nbsp;&rarr;</span>}
    </OurButton>
  );
}
