import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import OrderCard from "../../components/OrderCard";
import { handleGetOrders } from "../../utility/apiServices";
import { Box, CircularProgress, Typography } from "@mui/material";

const Orders = () => {
  const userData = useSelector((state) => state?.user?.userData);
  const { customerId } = userData;

  const { data, isLoading,  } = useQuery(
    ["order-data", customerId],
    () => handleGetOrders(customerId)
  );

  return (
    <>
    {isLoading && (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    )}

    {data && (
      <Box
        sx={{
          px: { xs: 2, sm: 3, md: 5 },
          py: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {data.length === 0 ? (
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              color: "text.secondary",
              fontSize: { xs: "16px", sm: "18px" },
            }}
          >
            No Orders Available
          </Typography>
        ) : (
          data?.map((item, index) => <OrderCard item={item} key={index} />)
        )}
      </Box>
    )}
  </>
  );
};

export default Orders;
