import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const [seconds, setSeconds] = useState(30);
  const navigate = useNavigate();

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => setSeconds(seconds - 1), 1000);
      return () => clearInterval(timer);
    } else {
      navigate("/");
    }
  }, [seconds, navigate]);

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        bgcolor: "primary.light", // Light background
        p: 4,
      }}
    >
      <Typography variant="h1" sx={{ fontWeight: "bold", color: "primary.main" }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ mb: 2, color: "secondary.main" }}>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        You will be redirected to the homepage in
        <Box component="span" sx={{ color: "primary.main", fontWeight: 'bold',px:"8px" }}>
          {seconds}
        </Box>
        seconds.
      </Typography>
      <Button
        variant="contained"
       
        onClick={handleGoHome}
    
      >
        Go to Homepage
      </Button>
    </Box>
  );
};

export default NotFoundPage;
