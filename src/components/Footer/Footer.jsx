import React from "react";
import { Box, Typography, List, ListItem, Divider, IconButton, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";
import { assets } from "../../assets/assets";
import { productLinks, resourceLinks, socialLinks } from "./data";
import { useSelector } from "react-redux";

const Footer = () => {
  const theme = useSelector((state) => state.theme.themeData);
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
      <Box
        sx={{
          display: { xs: "block", md: "flex" },
          justifyContent: "space-between",
          width: "100%",
          padding: "10px",
        }}
      >
        <Box sx={{ flex: "1", textAlign: "left", mb: { xs: "10px", md: 0 } }}>
          <Box sx={{ mb: 1 }}>
          <img
              src={theme?.appLogoImageUrl}
              alt="logo"
              style={{ width: '64px', borderRadius: '50%' }}
            />
            <Typography variant="body2" sx={{ mt: 3 }}>
              Welcome to Tomato, your favorite restaurant! Enjoy delicious meals made from fresh ingredients, served with love. Join us for a delightful dining experience.
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Follow us on:
          </Typography>
          <Box sx={{ display: "flex", gap: "8px" }}>
            {socialLinks.map(({ name, icon, url }) => (
              <IconButton
                key={name}
                component="a"
                href={url}
                aria-label={name.toLowerCase()}

              >
                {icon}
              </IconButton>
            ))}
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
            <ListItem sx={{ display: "flex", alignItems: "center" }}>
              <MdPhone size={20} style={{ marginRight: "8px" }} />
              +1-123-456-7890
            </ListItem>
            <ListItem sx={{ display: "flex", alignItems: "center" }}>
              <MdEmail size={20} style={{ marginRight: "8px" }} />
              contact@tomato.com
            </ListItem>
            <ListItem sx={{ display: "flex", alignItems: "center" }}>
              <MdLocationOn size={20} style={{ marginRight: "8px" }} />
              123 Tomato Lane, Flavor Town, USA
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
