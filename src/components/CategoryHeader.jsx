import { ArrowForward } from "@mui/icons-material";
import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryHeader = ({ name = "", textButton = "Explore More", path = "/" }) => {
  const navigate = useNavigate();
  return (
    <>
      <Divider sx={{ mb: 3 }} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          // padding: '1rem',

        }}
      >
        <Box fontWeight={600} color={"primary.dark"} sx={{ fontSize: "1.2rem" }}>
          {name}
        </Box>

        <Button
          variant="text"
          endIcon={<ArrowForward />}
          size="small"
          onClick={() => {
            navigate(path);
          }}
        >
          {textButton.toLowerCase()}
        </Button>

      </Box>
    </>

  );
};

export default CategoryHeader;
