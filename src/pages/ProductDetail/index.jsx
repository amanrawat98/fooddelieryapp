import React, { useMemo, } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { useAddToCart } from "../../hooks/useAddToCart";
import GoBackButton from "../../components/Common/Buttons/GoBackButton";
import MenuCard from "../../components/Common/Cards/MenuCard";

const ProductDetail = () => {
  const outletData = useSelector((state) => state?.restaurant?.outletData);
  const { menuItemId, menuCategoryId } = useParams();

  const category = useMemo(() => {
    return outletData?.menuCategories?.find(
      (category) => category.menuCategoryId.toString() === menuCategoryId.toString()
    );
  }, [outletData, menuCategoryId]);

  const product = useMemo(() => {
    return category?.menuItems?.find(
      (item) => item.menuItemId?.toString() === menuItemId?.toString()
    ) || null;
  }, [category, menuItemId]);

  const { isLoading, isError, debouncedAddToCart } = useAddToCart()
  const addToCart = async (quantity, menuItemId) => {
    debouncedAddToCart({ quantity, menuItemId })
  };

  return (
    <Box sx={{ height: "100%", }}>
      <GoBackButton />
      <Box
        sx={{
          width: {  xs: "70%",  sm: "60%",  md: "50%",  lg: "40%",},
          margin: "auto",
          padding: "1rem",
        }}
      >
        <MenuCard item={product} menuCategoryId={menuCategoryId} />
      </Box>
 </Box>

  );
};

export default ProductDetail;
