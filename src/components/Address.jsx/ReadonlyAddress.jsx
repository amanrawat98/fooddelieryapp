import { Box, Button, CircularProgress, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog, setDialogTitle } from '../../slices/dialogSlice';
import { Delete, Edit, Home, TaskAlt } from '@mui/icons-material';
import axios from 'axios';
import { useQueryClient } from 'react-query';
import useCustomToast from '../../hooks/Toast/useToast';

export default function ReadonlyAddress({  setPage, handleFormState, isLoading,handleAddNewAddress,reset }) {

    const userData = useSelector((state) => state?.user?.userData);
    const dispatch = useDispatch()
    const queryClient = useQueryClient();
    const toast = useCustomToast()
    const address = userData?.addresses
    const [activeAddress, setActiveAddress] = useState(address?.[0])
    const handleDeleteAddress = async (addressId) => {
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BASE_URL}/customer-profile?addressId=${addressId}`
            );
            if (addressId === activeAddress?.addressId) {
                setActiveAddress(address?.[0])
            }
            queryClient.invalidateQueries("user-data");
            toast.success(<span>Address deleted successfully</span>)
        } catch (error) {
            toast.error(<span>Error deleting address</span>)

        }
    };
    const handleSetAddress = () => {
        if (!activeAddress?.isDefault)
          handleAddNewAddress({ addressId: activeAddress?.addressId }, () => { dispatch(closeDialog()) })
        else {
          dispatch(closeDialog())
        }
      };
      useEffect(() => {
        const defaultAddress = address.find((item) => item?.isDefault);
        if (defaultAddress) {
            setActiveAddress(defaultAddress);
        }
      }, [address]);
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            {/* Select Address List */}
            {userData && address?.length > 0 ? (
                address.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            border: "2px solid gray",
                            borderRadius: 2,
                            padding: 2,
                            color: "secondary.main",
                            cursor: "pointer",
                            // bgcolor: item?.addressId === activeAddress ? "primary.main" : "primary.light",
                            borderColor: item?.addressId === activeAddress?.addressId ? "primary.main" : "secondary.main",
                            "&:hover": { borderColor: "primary.main" },
                        }}
                        onClick={() =>
                            setActiveAddress(item)
                        }
                    >
                        <Box display={"flex"} justifyContent={"space-between"} mb={1} alignItems={"center"}>
                            <Box display={"flex"} gap={2}>
                                <Typography variant="body1">Delivery Address</Typography>
                                {item?.addressId === activeAddress?.addressId ?
                                    <Tooltip title="Edit Address" placement="top" arrow>
                                        <Edit sx={{ color: "primary.main" }}
                                            onClick={() => {
                                                dispatch(setDialogTitle("Edit Address"))
                                                setPage("addNewAddress")
                                                handleFormState(item)
                                                // console.log(item, "valueee")
                                            }}
                                        />
                                    </Tooltip> : null}
                            </Box>

                            {item?.addressId === activeAddress?.addressId ?
                                <Tooltip title="Delete Address" placement="top" arrow>
                                    <Delete sx={{ color: "primary.main" }} onClick={() => handleDeleteAddress(item?.addressId)} /></Tooltip>
                                : null}

                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Home />
                            <Typography variant="body2" color="secondary.main">
                                {[
                                    item?.landmark && item?.landmark,
                                    item?.areaLocality && item?.areaLocality,
                                    item?.houseNo && item?.houseNo,
                                    item?.building && item?.building,
                                    item?.floor && item?.floor,
                                    item?.addressType && item.addressType.replace(/^([a-z])/, (match) => match.toUpperCase()),
                                ]
                                    ?.filter(Boolean)
                                    ?.join(', ')}
                            </Typography>

                            {item?.addressId === activeAddress?.addressId &&
                                <TaskAlt sx={{ color: "primary.main" }}
                                />
                            }

                        </Box>
                    </Box>
                ))
            ) : (
                <Typography>No Address Available</Typography>
            )}


            <Button variant="contained" onClick={() => {
                reset()
                dispatch(setDialogTitle("Add New Address"))
                setPage("addNewAddress")

            }}>
                Add New Address
            </Button>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2, gap: 4 }}>
                <Button variant="outlined" sx={{ flex: 1 }}
                    onClick={() => dispatch(closeDialog())}
                >
                    Cancel
                </Button>
                <Button variant="contained" sx={{ flex: 1 }} onClick={handleSetAddress}
                    startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
                >
                    Save
                </Button>
            </Box>
        </Box>
    )
}
