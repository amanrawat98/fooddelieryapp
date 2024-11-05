// MenuCard.js
import React from 'react';
import { Card, CardMedia,  Box, IconButton,  Chip, Rating, Tooltip } from '@mui/material';
import { AddShoppingCart,FavoriteBorder } from '@mui/icons-material';
import useCardModal from './useCardModal';
import veg from "../../../assets/veg.png"
import nonVeg from "../../../assets/non_veg.png"
const SmallCard = ({ item, menuCategoryId }) => {
    const { handleAddToCartModal } = useCardModal()

    return (
        <Card sx={{
            height: "10rem",
            display: "flex",
            borderRadius: "0.5rem",
            alignItems: "center"
        }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    width: "45%",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover .img-container": {
                        transform: "scale(1.1)",
                    },
                }}
            >
                <Card sx={{ height: "100%", width: "100%", position: "relative" }}>
                    <CardMedia
                        component="img"
                        className='img-container'
                        image={item?.menuItemImageUrl}
                        alt={item?.name}
                        sx={{
                            transition: "transform 0.3s ease-in-out",
                            height: "100%",
                            width: "100%",
                            aspectRatio: 3/2,
                            objectFit: "cover",
                        }}
                    />

                   {false? <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            pb: 1
                        }}
                    >
                        <Chip
                            label="10% OFF"
                            size="small"
                            sx={{
                                backgroundColor: "primary.main",
                                color: "primary.light",
                                borderRadius: "5px",
                                fontWeight: "semibold",
                                width:"fit-content"
                            }}
                        />
                        <Chip
                            label="30-40 min"
                            size="small"
                            sx={{
                                backgroundColor: "rgba(0, 0, 0, 0.7)",
                                color: "primary.light",
                                borderRadius: "5px",
                                width:"fit-content"
                            }}
                        />
                    </Box>:null}
                </Card>
            </Box>
            <Box sx={{ display: 'flex', height: "100%", flex: 1, padding: "1rem", justifyContent: "space-between", gap: 2 }}>
                <Box flex={1} sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                }}>
                    <Box sx={{ color: "secondary.main", fontSize: "1rem",display:"flex" }}>
                        <span style={{ marginRight: "4px" }}>{item?.name}</span>
                        <Box width={"1.5rem"}>
                            <img src={item?.mealType === "non-veg"?nonVeg:veg} alt="My PNG" />
                        </Box>
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
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "column",
                    }}
                >
                    <Tooltip title="Add To Wishlist" placement="top" arrow>
                        <IconButton onClick={() => console.log("Wishlist icon clicked!")} >
                            <FavoriteBorder />
                        </IconButton>
                    </Tooltip>
                    {!item?.cartQuantity ?
                        <Tooltip title="Add To Cart" placement="top" arrow>
                            <IconButton onClick={() => handleAddToCartModal(item, menuCategoryId)}>
                                <AddShoppingCart />
                            </IconButton>
                        </Tooltip>
                        : null}
                </Box>
            </Box>
        </Card>
    );
};

export default SmallCard;
