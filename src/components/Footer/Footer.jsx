import React from "react";
import { Box, Typography, List, ListItem, Divider, IconButton, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { productLinks, resourceLinks, socialLinks } from "./data";
import { useSelector } from "react-redux";
import useRestaurantInfo from "./useRestaurantInfo";
import { AccessTime, Apple, Call, Google, LocationOn, Mail } from "@mui/icons-material";

const Footer = () => {
  const { address, availableTime, theme, personalInfo } = useRestaurantInfo()

  const navigate = useNavigate();
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.dark",
        color: "primary.light",
        padding: { xs: "10px", md: "20px" },
        textAlign: "center",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 3, my: 3 }}>
        {socialLinks.map(({ name, icon, url }) => (
          <IconButton
            key={name}
            component="a"
            href={url}
            aria-label={name.toLowerCase()}
            size="small"
          >
            {icon}
          </IconButton>
        ))}
      </Box>
      <Box
        sx={{
          display: { xs: "block", md: "flex" },
          justifyContent: "space-between",
          width: "100%",
          padding: "10px",
        }}
      >
        <Box sx={{ flex: "1", textAlign: "left",mr:4, mb: { xs: "10px", md: 0 } }}>
          <Box sx={{ mb: 1 }}>
            <img
              src={theme?.appLogoImageUrl}
              alt="logo"
              style={{ width: '4rem', borderRadius: '50%' }}
            />
            <Typography variant="body1" sx={{ my: 3 }}>
              Bringing flavors you love right to your door. Freshly made, swiftly delivered.
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
              }}
            >
              <Button
                component="a"
                variant="contained"
                href="https://play.google.com/store"
                target="_blank"
                sx={{ padding: 2, backgroundColor: "secondary.main" }}
              >
                <Google />
                Google Play
              </Button>
              <Button
                component="a"
                variant="contained"
                href="https://apps.apple.com/app"
                target="_blank"
                sx={{ padding: 2 , backgroundColor: "secondary.main"}}
              >
                <Apple />
                App Store
              </Button>
            </Box>
          </Box>
        </Box>

        <Box sx={{ flex: "1", textAlign: "left", mb: { xs: "10px", md: 0 } }}>
          <Typography variant="h6" gutterBottom>
            PRODUCT
          </Typography>
          <List>
            {productLinks.map(({ name, path }) => (
              <ListItem
                key={name}
                sx={{ cursor: "pointer", color: "#fff", "&:hover": { color: "#bbb" } }}
                onClick={() => navigate(path)}
              >
                {name}
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ flex: "1", textAlign: "left", mb: { xs: "10px", md: 0 } }}>
          <Typography variant="h6" gutterBottom>
            RESOURCES
          </Typography>
          <List>
            {resourceLinks.map(({ name, path }) => (
              <ListItem
                key={name}
                sx={{ cursor: "pointer", color: "#fff", "&:hover": { color: "#bbb" } }}
                onClick={() => navigate(path)}
              >
                {name}
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ flex: "1", textAlign: "left" }}>
          <Typography variant="h6" gutterBottom>
            GET IN TOUCH
          </Typography>
          <List>
            <ListItem sx={{ display: "flex", }}>
              <Call sx={{ marginRight: "8px" }} />
              {personalInfo?.phone}
            </ListItem>
            <ListItem sx={{ display: "flex", }}>
              <Mail sx={{ marginRight: "8px" }} />
              {personalInfo?.email}
            </ListItem>
            <ListItem sx={{ display: "flex", }}>
              <LocationOn sx={{ marginRight: "8px" }} />
              {address}
            </ListItem>

            <ListItem sx={{ display: "flex", }}>
              <AccessTime sx={{ marginRight: "8px" }} />
              {availableTime}
            </ListItem>
          </List>
        </Box>
      </Box>

      <Divider sx={{ backgroundColor: "#fff", my: 2 }} />

      <Typography variant="body2" sx={{ textAlign: "center", color: "#bbb" }}>
        Copyright 2024 © Tomato.com
      </Typography>
    </Box>
  );
};

export default Footer;
