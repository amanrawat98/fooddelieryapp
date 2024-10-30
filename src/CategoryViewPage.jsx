import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FoodItem from "./components/FoodItem/FoodItem";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import GoBackButton from "./components/Common/Buttons/GoBackButton";
import MenuCard from "./components/Common/Cards/MenuCard";

const CategoryViewPage = () => {
  const outletData = useSelector((state) => state?.restaurant?.outletData);
  const { menuCategories } = outletData;
  const { menuCategoryId } = useParams();


  const categoryIdData = useMemo(() => {
    if (!menuCategories || !menuCategoryId) return ""
    const categoryIdData = menuCategories?.find((item) => {
      return item?.menuCategoryId?.toString() === menuCategoryId?.toString();
    });

    return categoryIdData;
  }, [menuCategoryId, menuCategories]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

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
          padding: 2,
        }}
      >
        {categoryIdData?.menuItems?.map((item, index) => (
          <MenuCard item={item} menuCategoryId={menuCategoryId} key={"menu_list" + index} />
        ))}
      </Box>
    </>

  );
};

export default CategoryViewPage;
