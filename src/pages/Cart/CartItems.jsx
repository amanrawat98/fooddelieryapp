import { Box, Divider, Paper, Typography,Container } from '@mui/material'
import React from 'react'
import CartItem from '../../components/Cart/CartItem'

export default function CartItems({ cartitems,cartId,cartItems}) {
    return (
        <>
            <Box sx={{ mb: 3 }}>

                {!cartItems?.length ? (
                    <Container maxWidth="md" sx={{ marginTop: "2rem", textAlign: 'center' }}>
                        <Paper elevation={2} sx={{ padding: '1rem', borderRadius: '1rem' }}>
                            <Box fontSize={"1.25rem"} color={"primary.main"}>
                                No Items in cart
                            </Box>
                        </Paper>
                    </Container>
                ) : (
                    cartItems?.map((item, idx) => (
                        <CartItem key={item.id + "cart_id" + idx} item={item} cartId={cartId} />
                    ))
                )}

            </Box>
            <Box sx={{ mt: 3, color: "secondary.main" }}>
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                        <Box fontSize={"1.25rem"}>Subtotal</Box>
                        <Typography variant="body1">${cartitems?.cartSubTotal}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                        <Box fontSize={"1.25rem"}>Delivery Fee</Box>
                        <Typography>${cartitems?.cartTax}</Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                        <Box fontSize={"1.25rem"}>Total</Box>
                        <Typography>${cartitems?.cartTotal}</Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
