import React from "react";
import { Box, Typography, Button } from "@mui/material";
import GooglePlayIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple'; // You may need to use a specific package for this icon.

const AppDownload = () => {
  return (
    <Box 
      id="app-download"
      sx={{
        backgroundColor: "#f8f8f8",
        borderRadius: 2,
        padding: 4,
        textAlign: "center",
        boxShadow: 2,
        margin: 2,
      }}
    >
      <Typography variant="h4" sx={{ color: "var(--primary)", marginBottom: 1 }}>
        Download the Baba Chicken App
      </Typography>
      <Typography variant="body1" sx={{ color: "var(--primary)", marginBottom: 3 }}>
        For a better experience, download the app now!
      </Typography>
      <Box 
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Button 
          component="a" 
          href="https://play.google.com/store" 
          target="_blank" 
          sx={{
            backgroundColor: "var(--primary)",
            borderRadius: 1,
            padding: 2,
            boxShadow: 1,
            color: "white",
            display: "flex",
            alignItems: "center",
            transition: "background-color 0.3s, transform 0.3s, box-shadow 0.3s",
            '&:hover': {
              backgroundColor: "var(--secondary)", 
              boxShadow: 3,
              transform: "scale(1.05)", 
            }
          }}
        >
          <GooglePlayIcon sx={{ marginRight: 1 }} />
          Google Play
        </Button>
        <Button 
          component="a" 
          href="https://apps.apple.com/app" 
          target="_blank" 
          sx={{
            backgroundColor: "var(--primary)",
            borderRadius: 1,
            padding: 2,
            boxShadow: 1,
            color: "white",
            display: "flex",
            alignItems: "center",
            transition: "background-color 0.3s, transform 0.3s, box-shadow 0.3s",
            '&:hover': {
              backgroundColor: "var(--secondary)", 
              boxShadow: 3,
              transform: "scale(1.05)", 
            }
          }}
        >
          <AppleIcon sx={{ marginRight: 1 }} />
          App Store
        </Button>
      </Box>
    </Box>
  );
};

export default AppDownload;
