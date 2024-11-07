import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { TextField, Button, IconButton, Avatar, Box, MenuItem, Typography, CircularProgress, Tooltip } from "@mui/material";
import axios from "axios";
import { setUserData } from "../../slices/userSlice";
import { Edit } from "@mui/icons-material";
import { GENDER, userFieldEnum } from "./data";
import { convertToFormattedDate } from "../../utility/functions";
import useMutateUser from "../../hooks/useMutateUser";

const User = () => {
  const userData = useSelector((state) => state.user.userData);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, getValues, watch, formState: { errors } } = useForm();
  const { handleUser, isLoading, isError, error } = useMutateUser();

  useEffect(() => {
    if (userData) {
      reset({
        firstName: userData?.firstName || "",
        lastName: userData?.lastName || "",
        email: userData?.email || "",
        phone: userData?.phone || "",
        dateOfBirth: userData?.dateOfBirth || "",
        gender: userData?.gender?.toLowerCase() || "",
      });
    }
  }, [userData, reset]);
  const gender = watch("gender");

  const handleUserEdit = async (data) => {
    handleUser({data,successFunction:()=>{setIsEdit(false)} })
  };

  const toggleEditMode = () => {
    setIsEdit((prev) => !prev);
    reset();
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>

      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", mb: 3 }}>
        <Avatar
          sx={{ width: 100, height: 100, mb: 2 }}
          src={userData?.customerImageUrl || undefined}
          alt="User"
        />
        {!isEdit && (
          <Box display={"flex"} alignItems={"center"} gap={2} sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            <Typography variant="h5" color="secondary.main">{`Hi there, ${userData?.firstName}`}</Typography>

            <Tooltip title="Edit Profile" placement="top" arrow>
              <Edit onClick={toggleEditMode} />
            </Tooltip>
          </Box>
        )}
      </Box>


      <Box component="form" onSubmit={handleSubmit(handleUserEdit)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {isEdit ? (
         

          <>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                "& > *": {
                  flex: "1 1 100%", // Full width by default (single column)
                },
                "@media (min-width: 600px)": {
                  "& > *": {
                    flex: "1 1 calc(50% - 8px)", // Two columns on screens larger than 600px
                  },
                },
              }}
            >
              <TextField
                label="First Name"
                name="firstName"
                {...register("firstName", { required: "Name is required" })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                fullWidth
              />
              <TextField
                label="Last Name"
                name="lastName"
                {...register("lastName")}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                fullWidth
              />
              <TextField
                label="Email"
                type="email"
                name="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
              />
              <TextField
                label="Phone"
                type="tel"
                name="phone"
                {...register("phone", { required: "Phone number is required" })}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                fullWidth
              />
              <TextField
                label="Date of Birth"
                type="date"
                name="dateOfBirth"
                {...register("dateOfBirth")}
                fullWidth
                disabled={!!getValues("dateOfBirth")}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                select
                label="Gender"
                placeholder="Select Gender"
                name="gender"
                {...register("gender", { required: "Please select a gender" })}
                error={!!errors.gender}
                helperText={errors.gender?.message}
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    height: "45px",
                  },
                }}
                value={gender}
              >
                <MenuItem value="" disabled>
                  <em>Select Gender</em>
                </MenuItem>
                {GENDER?.map(({ label, value }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setIsEdit(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                size="small"
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
              >
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </Box>
          </>
          
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {userFieldEnum?.map((field) => {
              let fieldValue = userData?.[field.fieldName]
              if (field.fieldName === "dateOfBirth") {
                fieldValue = convertToFormattedDate(fieldValue)
              }
              return <Box key={field.fieldName} sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="subtitle1" sx={{ flexBasis: "30%", fontWeight: "bold" }}>
                  {field.label}:
                </Typography>
                <Typography variant="body1">
                  {fieldValue || "N/A"}
                </Typography>
              </Box>
            }
            )}
          </Box>

        )}
      </Box>
    </Box>
  );
};

export default User;
