import { ArrowForward } from "@mui/icons-material";
import { Box, Button, Divider, Grow, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryHeader = ({ value }) => {
  const navigate = useNavigate();
  return (
    <>
      <Divider sx={{ mb: 3 }} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem',

        }}
      >

        <Typography variant="h6" component="h6" fontWeight={500} color={"var(--primary)"}>
          {value?.name}
        </Typography>

        <Button
          variant="contained"
          endIcon={<ArrowForward />}
      
          onClick={() => {
            navigate(`/category/${value?.menuCategoryId}`);
          }}
        >
          Explore All
        </Button>

      </Box>
    </>

  );
};

export default CategoryHeader;
