// MenuCard.js
import React from 'react';
import { Card, CardMedia, CardContent, Box, IconButton, Typography, Chip, Rating } from '@mui/material';
import { AddShoppingCart, Fastfood, FavoriteBorder, Grass, RemoveRedEye } from '@mui/icons-material';
import useCardModal from './useCardModal';

const MenuCard = ({ item, menuCategoryId }) => {
  const { handleAddToCartModal } = useCardModal()
 
  return (
    <Card sx={{
      height: "18rem", position: "relative",
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
          "&:hover .img-container": {
            transform: "scale(1.1)",
          },

        }}
      >
<Card sx={{ position: "relative", width: "100%", height: "100%" }}>
  <CardMedia
    component="img"
    className='img-container'
    
    image={item?.menuItemImageUrl}
    alt={item?.name}
    sx={{
      transition: "transform 0.3s ease-in-out",
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "0.5rem"
    }}
  />
 
  <Box
    sx={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      // backgroundColor: "rgba(0, 0, 0, 0.5)", 
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      paddingBottom:"10px"
      }}
  >
   <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
      <Chip
        label="10% OFF"
        size="small"
        sx={{
          backgroundColor: "primary.main", 
          color: "primary.light",
           borderRadius:"5px",
          fontWeight: "semibold"
        }}
      />
      <Chip
        label="30-40 min"
        size="small"
          sx={{
          backgroundColor: "rgba(0, 0, 0, 0.7)", 
          color: "primary.light",
          borderRadius:"5px"
        }}
      />
    </Box>
</Box>
</Card>


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
          <IconButton onClick={() => handleAddToCartModal(item, menuCategoryId)}>
            <RemoveRedEye />
          </IconButton>
          <IconButton onClick={() => console.log("Wishlist icon clicked!")} >
            <FavoriteBorder />
          </IconButton>

          {!item?.cartQuantity ? <IconButton onClick={() => handleAddToCartModal(item, menuCategoryId)} >
            <AddShoppingCart />
          </IconButton> : null}
        </Box>
      </Box>


      <CardContent sx={{ padding: "0 0.7rem", display:'flex',flexDirection:"column",gap:"4px"}}>
        <Box sx={{ color: "secondary.main", fontSize: "1rem" }}>
          <span style={{ marginRight: "4px" }}>{item?.name}</span>
          {item?.mealType === "non-veg" ? <Fastfood sx={{ color: 'primary.main' }} /> : <Grass sx={{ color: 'green' }} />}
        </Box>
        <Box sx={{ color: "secondary.main", fontSize:".8rem" ,display:"flex",alignItems:"center"}}>
          <span>(3)</span>
        <Rating
        value={4.5} 
        precision={0.5}
        readOnly
        sx={{
          color: "primary.main", 
          fontSize: "1rem"
        }}
      />
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
