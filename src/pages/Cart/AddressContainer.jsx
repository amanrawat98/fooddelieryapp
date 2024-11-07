import { Edit, LocationOn } from '@mui/icons-material'
import { Box, Paper, Tooltip, Typography } from '@mui/material'
import React from 'react'

export default function AddressContainer({ selectedAddress, handleAddAddress }) {
    return (
        <Box sx={{ marginTop: "2rem" }}>
            <Paper elevation={2} sx={{ padding: '1rem', borderRadius: '1rem', maxWidth: "25rem" }}>
                <Box display="flex" justifyContent="space-between" sx={{ color: 'primary.main' }}>
                    <Typography variant="body1" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
                        Delivery Address
                    </Typography>
                    <Tooltip title="Edit address" placement="top" arrow>
                        <Edit onClick={handleAddAddress} />
                    </Tooltip>
                </Box>
                {selectedAddress?.landmark ? (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <LocationOn sx={{ color: "primary.main" }} />
                            <Typography variant="body2" color="secondary.main">
                                {[
                                    selectedAddress?.landmark && selectedAddress?.landmark,
                                    selectedAddress?.areaLocality && selectedAddress?.areaLocality,
                                    selectedAddress?.houseNo && selectedAddress?.houseNo,
                                    selectedAddress?.building && selectedAddress?.building,
                                    selectedAddress?.floor && selectedAddress?.floor,
                                    selectedAddress?.addressType && selectedAddress.addressType.replace(/^([a-z])/, (match) => match.toUpperCase()),
                                ]
                                    ?.filter(Boolean)
                                    ?.join(', ')}
                            </Typography>
                        </Box>
                    </>
                ) : (
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        No address available. Add a New One...
                    </Typography>
                )}
            </Paper>
        </Box>
    )
}
