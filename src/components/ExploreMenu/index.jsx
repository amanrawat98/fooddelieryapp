import React from "react";
import HeaderCarousel from "../Carousel/HeaderCarousel";
import { Box, Container, Paper, Typography } from "@mui/material";

const ExploreMenu = ({ menuItems }) => {
  return (
    <>
      {menuItems?.length ? (
        <>
          <Container maxWidth="md" sx={{ marginTop: "2rem", textAlign: 'center' }}>
            <Paper elevation={3} sx={{ padding: '1rem', borderRadius: '1rem' }}>
              <Typography variant="h6" component="h6"  color={"var(--primary)"}>
                Explore Our Delicious Menu
              </Typography>
            </Paper>
          </Container>

          <Box sx={{ px: "5%" }}>
            <HeaderCarousel
              menuItems={menuItems}
               />
          </Box>
        </>
      ) : null}

    </>
  );
};

export default ExploreMenu;
