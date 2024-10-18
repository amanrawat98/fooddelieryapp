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
          sx={{
            background: 'var(--primary)',
            color: '#fff',
            padding: '8px 16px',
            boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
            opacity: 4,
            transform: 'translateY(0)',
            transition: 'all 0.5s ease, transform 0.3s ease',
            '&:hover': {
              backgroundColor: "var(--secondary)",
              boxShadow: 3,
              transform: "scale(1.05)",
            }
          }}
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
