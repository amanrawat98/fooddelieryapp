import React from "react";
import HeaderCarousel from "../Carousel/HeaderCarousel";
import { Box, Container, Paper, Typography } from "@mui/material";
import CategoryHeader from "../CategoryHeader";

const ExploreMenu = ({ menuItems }) => {
  return (
    <Box sx={{my:3}}>
      {menuItems?.length ? (
        <>
          <Box>
           <CategoryHeader {...{name:"Explore Our Delicious Menu"}}/>
          </Box>
          <Box sx={{ px: "5%" }}>
            <HeaderCarousel
              menuItems={menuItems}
            />
          </Box>
        </>
      ) : null}

    </Box>
  );
};

export default ExploreMenu;
