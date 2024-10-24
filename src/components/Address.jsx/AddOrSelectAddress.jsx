import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { IoHomeOutline } from "react-icons/io5";
import { SiTicktick } from "react-icons/si";
import SearchLocationInput from "../mapApi.jsx/SearchLocationInput";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedAddress, setUserData } from "../../slices/userSlice";
import axios from "axios";
import { Box, Button, Typography, TextField, Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { Close as CloseIcon, Delete, TaskAlt } from '@mui/icons-material';
import { useForm } from "react-hook-form";
import { inputStyles } from "../../theme/utils";
import useCustomToast from "../../hooks/Toast/useToast";
import { closeDialog } from "../../slices/dialogSlice";

const AddOrSelectAddress = ({
  selectedAddressId,
  address,
 
}) => {
  const userData = useSelector((state) => state?.user?.userData);
  const cartitems = useSelector((state) => state?.cart?.cartItems);
  const [activeAddress, setActiveAddress] = useState(selectedAddressId)
  const dispatch = useDispatch();
  const toast = useCustomToast()
  const [page, setPage] = useState("selectAddress");

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    mode: "onBlur", // Validation will trigger on blur
  });
  console.log(userData,"dataaaa of addresss")
  const handleAddNewAddress = async (data) => {

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
  const handleDeleteAddress = async (addressId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/customer-profile?addressId=${addressId}`
      );
      // dispatch(setUserData(response?.data?.result));
      toast.success(<span>Address deleted successfully</span>)
    } catch (error) {
      toast.error(<span>Error deleting address</span>)

    }
  };


  const handleSetAddress = () => {
    const { addresses } = userData;
    const updatedAddresses = addresses?.map((item) => {
      return {
        ...item,
        isDefault: item.addressId === activeAddress,
      };
    });

    dispatch(
      setUserData({
        ...userData,
        addresses: updatedAddresses,
      })
    );
   dispatch(closeDialog())
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
      <>
            <Typography variant="h5" sx={{marginBottom:"1rem"}}>{page === "selectAddress" ? "Select Address" : "Add New Address"}</Typography>
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
                      border: "2px solid var(--primary)",
                      borderRadius: 2,
                      padding: 2,
                      color:item?.addressId === activeAddress?"white":"black",
                      cursor: "pointer",
                      bgcolor: item?.addressId === activeAddress?"var(--primary)":"white",
                      "&:hover": { borderColor: "darkorange" },
                    }}
                    onClick={() =>
                      setActiveAddress(item?.addressId)
                    }
                  >
                    <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant="h6">Delivery Address</Typography>
                  
                        <Delete sx={{ color:item?.addressId === activeAddress?"white":"var(--primary)"}} onClick={() => handleDeleteAddress(item?.addressId)}/>
                     
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <IoHomeOutline size={24} />
                      <Typography>{`${item.floor} ${item.houseNo} ${item.building} ${item.areaLocality}`}</Typography>
                      {item?.addressId === activeAddress &&
                        <TaskAlt sx={{ color:item?.addressId === activeAddress?"white":"black"}}
                        />
                      }
                     
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography>No Address Available</Typography>
              )}


              <Button variant="contained" onClick={() => setPage("addNewAddress")}>
                Add New Address
              </Button>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2, gap: 4 }}>
                <Button variant="outlined" sx={{ flex: 1 }}
                  onClick={()=> dispatch(closeDialog())}
                >
                  Cancel
                </Button>
                <Button variant="contained" sx={{ flex: 1 }} onClick={handleSetAddress}>
                  Save
                </Button>
              </Box>
            </Box>
          ) : (
            <>

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


                <Box sx={{ display: "flex", gap: 2, mt: 4, justifyContent: "flex-end" }}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setPage("selectAddress");
                      reset();
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
          </>
   
  );
};

export default AddOrSelectAddress;
