import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, CardMedia, Rating, styled, Typography, useTheme } from "@mui/material";
import { ArrowCircleRight,  } from "@mui/icons-material";
import { useAddToCart } from "../../hooks/useAddToCart";
import QuantityControl from "../Common/QuantityControl";
import veg from "../../assets/veg.png"
import nonVeg from "../../assets/non_veg.png"
const FoodItem = ({ item, menuCategoryId }) => {

  const { isLoading, isError, debouncedAddToCart } = useAddToCart()
  const addToCart = async (quantity, menuItemId) => {
    debouncedAddToCart({ quantity, menuItemId })
  };
  const [ratingValue, setRatingValue] = useState(4);

  const handleRatingChange = (event, newValue) => {
    setRatingValue(newValue);
  };
  const theme = useTheme();
  const StyledRating = styled(Rating)(({ theme }) => ({
    '&.MuiRating-root': {
      color: 'red',
    },
    '&.MuiRating-root .MuiRating-iconEmpty': {
      color: 'lightgrey',
    },
  }));
  return (
    <>
      <Card
        variant="outlined"
        sx={{ ...theme.commonCardStyles, height: '22rem' }}
      >
        <CardMedia
          component="img"

          sx={{
            height: '50%',
            objectFit: 'cover',
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
          image={item?.menuItemImageUrl}
          alt={item?.name}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="body" sx={{ fontWeight: '600' }}>
            {item?.name}
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ marginBlock: "1rem" }}>
            <StyledRating
              name="rating"
              value={ratingValue}
              onChange={handleRatingChange}
              precision={0.5}
            />
            <Box className="size-5">
              <Box width={"1.5rem"}>
                <img src={item?.mealType === "non-veg" ? nonVeg : veg} alt="My PNG" />
              </Box>
            </Box>
          </Box>
          {item?.description ? <Typography
            variant="body2"
            color="gray"
            noWrap
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'wrap',
            }}
          >
            {item?.description?.length > 50 ? `${item?.description?.substring(0, 50)}...` : item?.description}
          </Typography> : null}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Link to={`/product/${menuCategoryId}/${item.menuItemId}`}>
              {item?.price && (
                <Box
                  sx={{
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '.5rem',
                    marginTop: '.5rem',
                  }}
                >
                  <Box>Price:</Box>
                  <Box className="price-color" color="var(--primary)">
                    ${item?.price}
                  </Box>
                  <ArrowCircleRight className="arrow-icon" sx={{ color: 'var(--primary)', textAlign: 'right' }} />
                </Box>
              )}
            </Link>
            <QuantityControl {...{ quantity: item?.cartQuantity, isLoading, updateQuantity: (quantity) => { addToCart(quantity, item?.menuItemId) } }} />
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default FoodItem;
