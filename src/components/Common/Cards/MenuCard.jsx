import React from 'react';
import { Card, CardMedia, CardContent, Box, IconButton, Typography, Chip, Rating, Tooltip } from '@mui/material';
import { AddShoppingCart, FavoriteBorder, RemoveRedEye } from '@mui/icons-material';
import useCardModal from './useCardModal';
import veg from "../../../assets/veg.png"
import nonVeg from "../../../assets/non_veg.png"
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
              paddingBottom: "10px"
            }}
          >
            {false ? <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
              <Chip
                label="10% OFF"
                size="small"
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.light",
                  borderRadius: "5px",
                  fontWeight: "semibold"
                }}
              />
              <Chip
                label="30-40 min"
                size="small"
                sx={{
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  color: "primary.light",
                  borderRadius: "5px"
                }}
              />
            </Box> : null}
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
          <Tooltip title="Quick View" placement="top" arrow>
            <IconButton onClick={() => handleAddToCartModal(item, menuCategoryId)}>
              <RemoveRedEye />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add To Wishlist" placement="top" arrow>
            <IconButton onClick={() => console.log("Wishlist icon clicked!")} >
              <FavoriteBorder />
            </IconButton>
          </Tooltip>

          {!item?.cartQuantity ?
            <Tooltip title="Add To Cart" placement="top" arrow>
              <IconButton onClick={() => handleAddToCartModal(item, menuCategoryId)} >
                <AddShoppingCart />
              </IconButton>
            </Tooltip>
            : null}
        </Box>
      </Box>


      <CardContent sx={{ padding: "0 0.7rem", display: 'flex', flexDirection: "column", gap: "4px" }}>
        <Box sx={{ color: "secondary.main", fontSize: "1rem", display: "flex" }}>
          <span style={{ marginRight: "4px" }}>{item?.name}</span>
          <Box
            sx={{
              width: '1.5rem',
              height: '1.5rem',
              backgroundImage: `url(${item?.mealType === "non-veg" ? nonVeg : veg})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </Box>
        <Box sx={{ color: "secondary.main", fontSize: ".8rem", display: "flex", alignItems: "center" }}>
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
            {/* <Box color="secondary.main" sx={{ textDecoration: 'line-through', fontWeight: 400 }}>
              ${item?.price ? (item.price * 1.1).toFixed(2) : 'N/A'}
            </Box> */}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default MenuCard;
