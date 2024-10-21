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
          variant="contained"
          href="https://play.google.com/store"
          target="_blank"
          sx={{ padding: 2 }}
        >
          <GooglePlayIcon sx={{ marginRight: 1 }} />
          Google Play
        </Button>
        <Button
          component="a"
          variant="contained"
          href="https://apps.apple.com/app"
          target="_blank"
          sx={{ padding: 2 }}
        >
          <AppleIcon sx={{ marginRight: 1 }} />
          App Store
        </Button>
      </Box>
    </Box>
  );
};

export default AppDownload;
