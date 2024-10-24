// MenuCard.js
import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, useTheme, IconButton } from '@mui/material';
import ArrowCircleRight from '@mui/icons-material/ArrowCircleRight';
import { AddShoppingCart, FavoriteBorder, RemoveRedEye, Share, ShoppingCart } from '@mui/icons-material';

const MenuCard = ({ item }) => {
  const theme = useTheme();

  return (
 <Card sx={{ ...theme.commonCardStyles, height: "18rem", position: "relative" }}>
         
          <Box
            sx={{
              position: "relative",
              height: "50%", 
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.1)", 
                },
              "&:hover .icon-hover": {
                opacity: 1, 
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
                
              }}
            />
    
        
            <Box
            className="icon-hover"
              sx={{
                position: "absolute",
                display: "flex",
                justifyContent:"center",
                alignItems: "center",
                gap: 2, 
                opacity: 0,
                width:"100%", 
                height:"100%",
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
               
                onClick={() => console.log("Add to Cart icon clicked!")}
              >
                <AddShoppingCart />
              </IconButton>
    
              
            </Box>
          </Box>
    
          {/* Card Content */}
          <CardContent sx={{ textAlign: "center" }}>
            {/* Item Name */}
            <Typography variant="body" sx={{ fontWeight: "600" }}>
              {item?.name}
            </Typography>
    
            {/* Item Description */}
            <Box>
              {item?.description && (
                <Typography
                  variant="body2"
                  color="gray"
                  noWrap
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "wrap",
                  }}
                >
                  {item?.description?.length > 50
                    ? `${item?.description?.substring(0, 50)}...`
                    : item?.description}
                </Typography>
              )}
            </Box>
    
            {/* Item Price */}
            {item?.price && (
              <Box
                sx={{
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: ".5rem",
                  marginTop: ".5rem",
                }}
              >
                <Box>Price:</Box>
                <Box className="price-color" color="var(--primary)">
                  ${item?.price}
                </Box>
                <ArrowCircleRight className="arrow-icon" sx={{ color: "var(--primary)", textAlign: "right" }} />
              </Box>
            )}
          </CardContent>
        </Card>
  
    
  );
};

export default MenuCard;
