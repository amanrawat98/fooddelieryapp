import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Box, List, ListItemButton, Typography, IconButton } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import ReorderIcon from '@mui/icons-material/Reorder';
import LogoutIcon from '@mui/icons-material/Logout';

const navItems = [
  { label: "Profile", path: "", icon: <PersonIcon /> },
  { label: "My Orders", path: "orders", icon: <ReorderIcon /> },
  // { label: "Logout", path: "/logout", icon: <LogoutIcon /> }
];

const Profile = () => {

  return (
    <Box
      display="grid"
      gridTemplateColumns={{ xs: "1fr", md: "1fr 4fr" }}
      minHeight={"100vh"}
    >
      <Box sx={{ bgcolor: "primary.light", borderRight: "1px solid gray" }}>
        <List sx={{ padding: 0 }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === ""}
            //  style={({ isActive }) => ({
            //    textDecoration: "none",
            //  })}
            >
              {({ isActive }) => (
                <ListItemButton
                  sx={{
                    gap: 2,
                    bgcolor: isActive ? "primary.main" : "transparent",
                    color: isActive ? "primary.light" : "primary.dark",
                    "&:hover": {
                      bgcolor: "",
                      color: "text.secondary",
                    },
                  }}
                >
                  {item.icon}
                  <Typography variant="h6">{item.label}</Typography>
                </ListItemButton>
              )}
            </NavLink>

          ))}
        </List>
      </Box>

      <Box sx={{ p: 2, bgcolor: "primary.light" }}>
        <Outlet />
      </Box>
    </Box>
  );



};

export default Profile;
