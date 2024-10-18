import React, { useCallback, useEffect, useState } from "react";
// import "./FoodItem.css";
import { assets } from "../../assets/assets";
import nonvegimg from "../../assets/non_veg.png";
import vegimg from "../../assets/veg.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { setCartItems } from "../../feature/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Box, Card, CardContent, CardMedia, debounce, IconButton, Rating, styled, Typography } from "@mui/material";
import { Add, ArrowCircleRight, Fastfood, Grass, Remove } from "@mui/icons-material";

const FoodItem = ({ item, categoryid }) => {
  const [productQuantity, setProductQuantity] = useState(0);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { cartId, cartItems: cartItem } = cartItems || {};

  const { menuItemId } = item;

  // Ensure both cartMenuItemId and menuItemId are defined, trimmed, and of the same type
  const filterCartItem = cartItem?.find((cartItem) => {
    return (
      cartItem.cartMenuItemId &&
      menuItemId &&
      String(cartItem.cartMenuItemId).trim() === String(menuItemId).trim()
    );
  });

  let quantity;
  if (filterCartItem) {
    quantity = filterCartItem?.quantity;
  }

  const debouncedAddToCart = useCallback(
    debounce(async (payload) => {
      try {
        console.log("payload", payload);
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/cart/`,
          payload
        );
        dispatch(setCartItems(response?.data?.result));
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }, 50),
    []
  );

  const handleAddToCart = async (type) => {
    let latestQuantity = quantity;

    console.log("latestQuantity", latestQuantity);
    if (latestQuantity !== undefined) {
      latestQuantity = type === "increment" ? quantity + 1 : quantity - 1;
      setProductQuantity(latestQuantity);
    } else {
      latestQuantity = 1;
    }

    if (latestQuantity >= 0) {
      try {
        await debouncedAddToCart({
          cartId: cartId,
          menuItemId: item.menuItemId,
          quantity: latestQuantity,
        });
      } catch (error) {
        console.error("Error updating cart:", error);
        setProductQuantity(type === "increment" ? quantity - 1 : quantity + 1);
      }
    }
  };
  const [ratingValue, setRatingValue] = useState(4);

  const handleRatingChange = (event, newValue) => {
    setRatingValue(newValue);
  };
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
        sx={{
          width: '100%',
          height: '22rem',
          borderRadius: 6,
          display: 'flex',

          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.4)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.5)',
            color: 'var(--primary)',
            transform: 'scale(1.05)',
            '& .price-color, & .arrow-icon': {
              color: 'green',
            },
          },
        }}
      >
        <CardMedia
          component="img"

          sx={{
            height: '50%',
            objectFit: 'cover',
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
              {item.mealType === "non-veg" ? (
                <Fastfood style={{ fontSize: '2rem', color: 'red' }} />
              ) : (
                <Grass style={{ fontSize: '2rem', color: 'green' }} />
              )}
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
            <Link to={`/product/${categoryid}/${item.menuItemId}`}>
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
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
            >
              {quantity === 0 || quantity === undefined ? (
                <IconButton
                  onClick={() => handleAddToCart("increment")}
                  sx={{
                    bgcolor: 'var(--primary)',
                    borderRadius: '50%',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      bgcolor: 'var(--secondary)',
                    },
                    transition: 'transform 0.2s ease-in-out',
                  }}
                >
                  <Add sx={{ color: 'white' }} />
                </IconButton>
              ) : (
                <>
                  <IconButton
                    onClick={() => handleAddToCart("decrement")}
                    sx={{
                      bgcolor: 'var(--primary)',
                      borderRadius: '50%',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        bgcolor: 'var(--secondary)',
                      },
                      transition: 'transform 0.2s ease-in-out',
                    }}
                  >
                    <Remove sx={{ color: 'white' }} />
                  </IconButton>
                  <Typography variant="body2" sx={{ mx: 1, fontWeight: "600", color: "green" }}>
                    {quantity}
                  </Typography>
                  <IconButton
                    onClick={() => handleAddToCart("increment")}
                    sx={{
                      bgcolor: 'var(--primary)',
                      borderRadius: '50%',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        bgcolor: 'var(--secondary)',
                      },
                      transition: 'transform 0.2s ease-in-out',
                    }}
                  >
                    <Add sx={{ color: 'white' }} />
                  </IconButton>
                </>
              )}
            </Box>

          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default FoodItem;
