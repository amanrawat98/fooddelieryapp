import React, { useEffect, useMemo } from "react";
import { resturantData } from "./demoData/resturantdata";
import { useNavigate, useParams } from "react-router-dom";
import FoodItem from "./components/FoodItem/FoodItem";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import GoBackButton from "./components/Common/Buttons/GoBackButton";

const CategoryViewPage = () => {
  const outletData = useSelector((state) => state?.restaurant?.outletData);

  const { menuCategories } = outletData;

  const { categoryid } = useParams();
  const navigate = useNavigate();

  const filteredData = useMemo(() => {
    const filteredData = menuCategories?.filter((item) => {
      return item.menuCategoryId?.toString() === categoryid?.toString();
    });

    return filteredData;
  }, []);

  const filterValue = filteredData?.[0];
  filterValue && console.log(filterValue);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
    <GoBackButton />
    <Typography variant="h5" sx={{mb:"1rem"}} align="center" gutterBottom>
      {filterValue?.name}
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
      {filterValue?.menuItems?.map((item) => (
        <FoodItem
          item={item}
          key={item?.menuItemId}
          categoryid={categoryid}
        />
      ))}
    </Box>
  </>
  
  );
};

export default CategoryViewPage;
