import React from "react";
import HeaderCarousel from "../HeaderCarousel";
import { Box } from "@mui/material";
import CategoryHeader from "../CategoryHeader";

const ExploreMenu = ({ menuItems }) => {
  return (
    <Box sx={{ my: 3 }}>
      {menuItems?.length ? (
        <>
          <Box>
            <CategoryHeader {...{
              name: "Explore Our Delicious Menu",
              textButton: menuItems?.length > 5 ? "Explore More" : "",
              path: `/category`
            }} />
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
