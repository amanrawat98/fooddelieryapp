import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FoodItem from "./components/FoodItem/FoodItem";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import GoBackButton from "./components/Common/Buttons/GoBackButton";

const CategoryViewPage = () => {
  const outletData = useSelector((state) => state?.restaurant?.outletData);
  const { menuCategories } = outletData;
  const { categoryId } = useParams();


  const categoryIdData = useMemo(() => {
    if (!menuCategories || !categoryId) return ""
    const categoryIdData = menuCategories?.find((item) => {
      return item?.menuCategoryId?.toString() === categoryId?.toString();
    });

    return categoryIdData;
  }, [categoryId, menuCategories]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <GoBackButton />
      <Typography variant="h5" sx={{ mb: "1rem" }} align="center" gutterBottom>
        {categoryIdData?.name}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)',
          },
          gap: 5,
          px: 2,
        }}
      >
        {categoryIdData?.menuItems?.map((item) => (
          <FoodItem
            item={item}
            key={item?.menuItemId}
            categoryid={categoryId}
          />
        ))}
      </Box>
    </>

  );
};

export default CategoryViewPage;
