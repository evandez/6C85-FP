import React from "react";
import { Button } from "@mui/material"; // Import Button from Material-UI
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const OutcomePage = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook for navigation

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}> {/* Center the content and add some top margin */}
      The end...for now!
      <div style={{ marginTop: "20px" }}> {/* Add spacing above the button */}
        <Button
          variant="contained"
          onClick={() => navigate(-1)} // Navigate back in the browser's history
          sx={{
            mt: 2,
          }}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default OutcomePage;
