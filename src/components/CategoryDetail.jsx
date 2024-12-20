import React from "react";
import CategoryHeader from "./CategoryHeader";
import FoodItem from "./FoodItem/FoodItem";
import { Box } from "@mui/material";

const CategoryDetail = ({ menuitem, }) => {
  return (
    <Box className="my-6">
      <CategoryHeader  {...{
        name: menuitem?.name,
        textButton: "Explore More",
        path: `/category/${menuitem?.menuCategoryId}`
      }}
      />
      <Box
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }}
        gap={6}
      >
        {menuitem?.menuItems?.map((item, index) => (
          <FoodItem item={item} key={index} menuCategoryId={menuitem?.menuCategoryId} />
        ))}
      </Box>
    </Box>
  );
};

export default CategoryDetail;
