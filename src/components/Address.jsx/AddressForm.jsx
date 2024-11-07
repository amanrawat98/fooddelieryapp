import React from 'react'
import SearchLocationInput from '../mapApi.jsx/SearchLocationInput';
import { Box, Button, CircularProgress, MenuItem, TextField } from '@mui/material';
import { ADDRESS_TYPE } from '../../pages/Profile/data';

export default function AddressForm({ handleAddNewAddress, useFormProps, setPage, isLoading }) {

    const { register, handleSubmit, watch, errors, reset } = useFormProps

    const handleLocationAddress = (address) => {
        const modifyAddress = {
            houseNo: address?.name,
            floor: address?.floor || "ground",
            building: address?.building || "",
            addressType: address?.addressType || "home",
            landmark: address?.vicinity,
            areaLocality: address?.city,
        }
        handleFormState(modifyAddress)
    }
    const handleFormState = (address) => {
        reset({ ...address });
    }
    const addressType = watch("addressType");

    return (
        <>

            <SearchLocationInput handleLocationAddress={handleLocationAddress} />

            <form onSubmit={handleSubmit(handleAddNewAddress)}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    <TextField
                        select
                        label="Address Type"
                        placeholder="Select address type"
                        name="addressType"
                        {...register("addressType", { required: "Please select address type" })}
                        error={!!errors.addressType}
                        helperText={errors.addressType?.message}
                        fullWidth
                        sx={{
                            "& .MuiInputBase-root": {
                                height: "45px",
                            },
                        }}
                        value={addressType}
                    >
                        <MenuItem value="" disabled>
                            <em>Select address type</em>
                        </MenuItem>
                        {ADDRESS_TYPE?.map(({ label, value }) => (
                            <MenuItem key={value} value={value}>
                                {label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            flexDirection: { xs: "column", sm: "row" },
                        }}
                    >
                        <TextField
                            label="House number / Block*"
                            {...register("houseNo", { required: "House number is required" })}
                            error={!!errors.houseNo}
                            id="houseNo"
                            helperText={errors.houseNo?.message}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            label="Floor"
                            name="floor"
                            id="floor"
                            {...register("floor", { required: "Floor is required" })}
                            error={!!errors.floor}
                            helperText={errors.floor?.message}
                            fullWidth
                            variant="outlined"
                        />
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            flexDirection: { xs: "column", sm: "row" },
                        }}
                    >
                        <TextField
                            label="Building"
                            name="building"
                            id="building"
                            {...register("building", { required: "Building is required" })}
                            error={!!errors.building}
                            helperText={errors.building?.message}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            label="Locality"
                            {...register("areaLocality", { required: "Locality is required" })}
                            error={!!errors.areaLocality}
                            helperText={errors.areaLocality?.message}
                            fullWidth
                            name="areaLocality"
                            id="areaLocality"
                            variant="outlined"
                        />
                    </Box>

                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Landmark"
                        id="landmark"
                        name="landmark"
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
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                        Save
                    </Button>
                </Box>
            </form>


        </>
    )
}
