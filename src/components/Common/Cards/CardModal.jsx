import { Add, DeleteOutline, Fastfood, Grass, Remove } from '@mui/icons-material'
import { Box, Button, CardMedia, CircularProgress, IconButton, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAddToCart } from '../../../hooks/useAddToCart'
import { useDispatch } from 'react-redux'
import { closeDialog } from '../../../slices/dialogSlice'

export default function CardModal({ cardData }) {

    const [quantity, setQuantity] = useState(cardData?.cartQuantity || 0)
    const { addToCart, isLoading, isError } = useAddToCart()
    const dispatch = useDispatch();
    const handleCloseDialog = () => {
        dispatch(closeDialog())
    }
    const handleAddToCardData = () => {
        console.log("click")
        addToCart({ menuItemId: cardData?.menuItemId, quantity, successFunction: () => handleCloseDialog() });
    }
    return (
        <Box sx={{
            // height: "70vh",
            borderRadius: "0.5rem",
            width: "100%"
        }}>

            <Box
                sx={{

                    // borderRadius: "0.5rem",
                    height: "10rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >

                <CardMedia
                    component="img"
                    image={cardData?.menuItemImageUrl}
                    alt={cardData?.name}
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",

                    }}
                />
            </Box>
            <Stack sx={{ padding: "0 0.7rem", my: 3 }}>
                <Box sx={{ flex: 1 }}>
                    <Box sx={{ color: "secondary.main", fontSize: "1rem", mb: "0.3rem" }}>
                        <span style={{ marginRight: "4px" }}>{cardData?.name}</span>
                        {cardData?.mealType === "non-veg" ? <Fastfood sx={{ color: 'primary.main' }} /> : <Grass sx={{ color: 'green' }} />}
                    </Box>

                    {cardData?.price && (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                mb: 3,
                                gap: ".5rem",
                                fontSize: "1.05rem"
                            }}
                        >

                            <Box color="primary.main" fontWeight={600}>
                                Start Price: ${cardData?.price || "N/A"}
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                {quantity > 0 ? <IconButton onClick={() => { setQuantity((prev) => prev - 1) }}>
                                    {quantity === 1 ? <DeleteOutline /> : <Remove />}
                                </IconButton> : null}
                                {quantity ? <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: '600',
                                        color: 'text.primary',
                                        fontSize: '1rem',
                                    }}
                                >
                                    {quantity}
                                </Typography> : null}
                                <IconButton onClick={() => { setQuantity((prev) => prev + 1) }}>
                                    <Add />
                                </IconButton>
                            </Box>

                        </Box>
                    )}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 3 }}>
                    <Box display={"flex"} gap={1}>
                        <Box>Total Amount:</Box>
                        <Box sx={{ color: "primary.main", fontWeight: 600 }}>${(cardData?.price * quantity).toFixed(2) || 0}</Box>
                    </Box>
                    <Box display={"flex"} gap={2}>
                        <Button
                            variant="outlined"
                            onClick={handleCloseDialog}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleAddToCardData}
                            disabled={isLoading || !!(quantity == cardData?.cartQuantity)}
                            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
                        >
                            {isLoading ? 'Adding...' : 'Add to cart'}
                        </Button>
                    </Box>

                </Box>
            </Stack>
        </Box>
    )
}
