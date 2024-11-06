import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { TextField, Button, IconButton, Avatar, Box, MenuItem, Typography, CircularProgress, Tooltip } from "@mui/material";
import axios from "axios";
import { setUserData } from "../../slices/userSlice";
import { Edit } from "@mui/icons-material";

const User = () => {
  const userData = useSelector((state) => state.user.userData);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();


  useEffect(() => {
    if (userData) {
      reset({
        firstName: userData?.firstName || "N/A",
        email: userData?.email || "N/A",
        phone: userData?.phone || "N/A",
        dateOfBirth: userData?.dateOfBirth ? userData.dateOfBirth.split("T")[0] : "",
        gender: userData?.gender || "N/A",
      });
    }
  }, [userData, reset]);

  const handleUserEdit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/customer-profile`,
        {
          firstName: data.firstName,
          lastName: "",
          gender: data.gender,
          anniversaryDate: "",
          customerId: userData?.customerId,
          phone: data.phone,
          email: data.email,
        }
      );
      dispatch(setUserData(response?.data?.result));
      setIsEdit(false);
    } catch (error) {
      console.error("Error updating user profile:", error);
    } finally {
      setLoading(false);
    }
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
          <Box display={"flex"} alignItems={"center"} gap={2} sx={{fontWeight: 'bold', color: 'primary.main' }}>
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
            <TextField
              label="Name"
              {...register("firstName", { required: "Name is required" })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
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
              label="Mobile No"
              type="tel"
              {...register("phone", { required: "Phone number is required" })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              fullWidth
            />
            <TextField
              label="Date of Birth"
              type="date"
              {...register("dateOfBirth")}
              // error={!!errors.dateOfBirth}
              // helperText={errors.dateOfBirth?.message}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              select
              label="Gender"
              {...register("gender", { required: "Gender is required" })}
              error={!!errors.gender}
              helperText={errors.gender?.message}
              fullWidth
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>


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
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
              >
                {loading ? "Saving..." : "Save"}
              </Button>

            </Box>
          </>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {["firstName", "email", "phone", "dateOfBirth", "gender"].map((field) => (
              <Box key={field} sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="subtitle1" sx={{ flexBasis: "30%", fontWeight: "bold" }}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </Typography>
                <Typography variant="body1">{userData?.[field] || "N/A"}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default User;
