// MenuCard.js
import React from 'react';
import { Card, CardMedia, CardContent, Box, IconButton } from '@mui/material';
import { AddShoppingCart, Fastfood, FavoriteBorder, Grass, RemoveRedEye } from '@mui/icons-material';
import useCardModal from './useCardModal';

const MenuCard = ({ item, menuCategoryId }) => {
  const { handleAddToCartModal } = useCardModal()
  return (
    <Card sx={{
      height: "14rem", position: "relative",
      borderRadius: "0.5rem",
      "&:hover .icon-hover": {
        opacity: 1,
      },
    }}>

      <Box
        sx={{
          margin: "5px",
          borderRadius: "0.5rem",
          position: "relative",
          height: "65%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.1)",
          },

        }}
      >

        <CardMedia
          component="img"
          image={item?.menuItemImageUrl}
          alt={item?.name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "0.5rem"
          }}
        />


        <Box
          className="icon-hover"
          sx={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            opacity: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            transition: "opacity 0.3s ease",

          }}
        >
          <IconButton

            onClick={() => console.log("Share icon clicked!")}
          >
            <RemoveRedEye />
          </IconButton>
          <IconButton

            onClick={() => console.log("Wishlist icon clicked!")}
          >
            <FavoriteBorder />
          </IconButton>

          <IconButton

            onClick={() => handleAddToCartModal(item,menuCategoryId)}
          >
            <AddShoppingCart />
          </IconButton>


        </Box>
      </Box>


      <CardContent sx={{ padding: "0 0.7rem", }}>
        <Box sx={{ color: "secondary.main", fontSize: "1rem", mb: "0.3rem" }}>
          <span style={{ marginRight: "4px" }}>{item?.name}</span>
          {item?.mealType === "non-veg" ? <Fastfood sx={{ color: 'primary.main' }} /> : <Grass sx={{ color: 'green' }} />}
        </Box>

        {item?.price && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: ".5rem",
              fontSize: "1.05rem"
            }}
          >

            <Box color="primary.main" fontWeight={600}>
              ${item?.price}
            </Box>
            <Box color="secondary.main" sx={{ textDecoration: 'line-through', fontWeight: 400 }}>
              ${item?.price ? (item.price * 1.1).toFixed(2) : 'N/A'}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default MenuCard;
