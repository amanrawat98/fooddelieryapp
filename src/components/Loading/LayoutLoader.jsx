import { Box, CircularProgress,  Typography } from "@mui/material";
import React from "react";


const LayoutLoader = () => {
  return (
  
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        // width="100vw"
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading, please wait...
        </Typography>
      </Box>
    );
  
};
export default LayoutLoader
