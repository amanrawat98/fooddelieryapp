import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { IoHomeOutline } from "react-icons/io5";
import { SiTicktick } from "react-icons/si";
import SearchLocationInput from "../mapApi.jsx/SearchLocationInput";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedAddress, setUserData } from "../../feature/userSlice";
import axios from "axios";
import { Box, Button, Typography, TextField, Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { Close as CloseIcon } from '@mui/icons-material';
import { useForm } from "react-hook-form";
import { inputStyles } from "../../theme/utils";

const AddOrSelectAddress = ({
  setIsSelectPassword,
  isSelectPassword,
  address,
}) => {
  const userData = useSelector((state) => state?.user?.userData);
  const cartitems = useSelector((state) => state?.cart?.cartItems);
  const dispatch = useDispatch();
  const [page, setPage] = useState("selectAddress");

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    mode: "onBlur", // Validation will trigger on blur
  });

  const handleAddNewAddress = async (data) => {
    console.warn(cartitems,"dataaaa")
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/customer-profile`,
        {
          ...data,
          customerId: userData?.customerId,
          addressType: "home",
          receiverName: userData?.firstName,
          receiverPhone: userData?.phone,
          isDefault: true,
        }
      );

      dispatch(setUserData(response?.data?.result));
      setPage("selectAddress");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetAddress = (item) => {
    const { addressId } = item;
    const { addresses } = userData;
    const updatedAddresses = addresses?.map((item) => {
      return {
        ...item,
        isDefault: item.addressId === addressId,
      };
    });

    dispatch(
      setUserData({
        ...userData,
        addresses: updatedAddresses,
      })
    );
  };

  useEffect(() => {
    if (userData) {
      reset({
        houseNo: "7722",
        floor: "1rd Floor",
        building: "PAU",
        landmark: "Near PAU Gate no. 1",
        areaLocality: "Ludhiana",
        customerId: userData?.customerId,
        receiverName: userData?.firstName,
        receiverPhone: userData?.phone,
        addressType: "home",
        isDefault: true,
      });
    }
  }, [userData, reset]);

  return (
    <div>
      {/* Dialog Wrapper for Address Form */}
      <Dialog
        open={isSelectPassword}
        onClose={() => setIsSelectPassword(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {page === "selectAddress" ? "Select Address" : "Add New Address"}
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setIsSelectPassword(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {page === "selectAddress" ? (
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
                      border: "2px solid orange",
                      borderRadius: 2,
                      padding: 2,
                      cursor: "pointer",
                      bgcolor: "white",
                      "&:hover": { borderColor: "darkorange" },
                    }}
                    onClick={() => handleSetAddress(item)}
                  >
                    <Typography variant="h6">Delivery Address</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <IoHomeOutline size={24} />
                      <Typography>{`${item.floor} ${item.houseNo} ${item.building} ${item.areaLocality}`}</Typography>
                      {item.isDefault && <SiTicktick size={24} />}
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography>No Address Available</Typography>
              )}

              {/* Add New Address Button */}
              <Button variant="contained" onClick={() => setPage("addNewAddress")}>
                Add New Address
              </Button>
            </Box>
          ) : (
            <>
              {/* Address Form for Adding New Address */}
              <SearchLocationInput />
              <form onSubmit={handleSubmit(handleAddNewAddress)}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                    label="House number / Block*"
                    {...register("houseNo", { required: "House number is required" })}
                    error={!!errors.houseNo}
                    helperText={errors.houseNo?.message}
                    sx={inputStyles}
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    label="Floor"
                    {...register("floor", { required: "Floor is required" })}
                    error={!!errors.floor}
                    helperText={errors.floor?.message}
                    sx={inputStyles}
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    label="Building"
                    {...register("building", { required: "Building is required" })}
                    error={!!errors.building}
                    helperText={errors.building?.message}
                    sx={inputStyles}
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    label="Locality*"
                    {...register("areaLocality", { required: "Locality is required" })}
                    error={!!errors.areaLocality}
                    helperText={errors.areaLocality?.message}
                    sx={inputStyles}
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    sx={inputStyles}
                    variant="outlined"
                    label="Landmark*"
                    {...register("landmark", { required: "Landmark is required" })}
                    error={!!errors.landmark}
                    helperText={errors.landmark?.message}

                  />
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setPage("selectAddress");
                      reset(); // Reset form when canceling
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained">
                    Add Address
                  </Button>
                </Box>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddOrSelectAddress;
