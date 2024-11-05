import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { handleFetchOrderDetails } from "../../utility/apiServices";
import {
  Box,
  Paper,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useMemo } from "react";

const OrderStatus = () => {
  const { orderId } = useParams();

  const { data, isLoading } = useQuery(
    ["order-data", orderId],
    () => handleFetchOrderDetails(orderId).then((response) => response.data.result),
    { staleTime: 300000 } 
  );

  const orderStatus = useMemo(
    () => [
      { status: "Payment Pending", icon: <HourglassEmptyIcon />, state: false },
      { status: "Order Confirm", icon: <CheckCircleOutlineIcon />, state: false },
      { status: "Order Prepared", icon: <RestaurantMenuIcon />, state: false },
      { status: "Ready to Takeaway", icon: <ShoppingBagIcon />, state: false },
      { status: "Order Delivered", icon: <LocalShippingIcon />, state: false },
    ],
    []
  );

  const currentIndex = useMemo(
    () => orderStatus.findIndex((item) => item.status === data?.orderStatus),
    [data, orderStatus]
  );

  const updatedOrderStatus = useMemo(
    () =>
      orderStatus.map((item, index) => ({
        ...item,
        state: index <= currentIndex,
      })),
    [currentIndex, orderStatus]
  );

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f9f9fb", minHeight: "100vh" }}>
  {isLoading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress size={40} />
    </Box>
  ) : (
    data && (
      <>
        <Box sx={{ marginBottom: 4 }}>
          <Paper
            sx={{
              padding: 3,
              boxShadow: 4,
              borderRadius: 2,
              backgroundColor: "#ffffff",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Order reference:{" "}
              <Typography
                component="span"
                sx={{ fontWeight: "bold", color: "primary.main" }}
              >
                {data?.orderRef}
              </Typography>
            </Typography>
            <Typography variant="h6" gutterBottom>
              Ordered on:{" "}
              <Typography
                component="span"
                sx={{ fontWeight: "bold", color: "text.secondary" }}
              >
                {data?.orderDate}
              </Typography>
            </Typography>
            <Typography variant="h6" gutterBottom>
              Customer Name:{" "}
              <Typography
                component="span"
                sx={{ fontWeight: "bold", color: "text.secondary" }}
              >
                {data.customer?.name}
              </Typography>
            </Typography>
            <Typography variant="h6" mb={2} gutterBottom>
              Order Type:{" "}
              <Typography
                component="span"
                sx={{ fontWeight: "bold", color: "secondary.main" }}
              >
                {data.orderType}
              </Typography>
            </Typography>

            <Divider sx={{ marginY: 2 }} />
            {data.orderMenuItems.map((item, index) => (
              <Box key={index} sx={{ marginBottom: 2 }}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr",
                    gap: 2,
                  }}
                >
                  <Typography variant="body1">{item.menuItemName}</Typography>
                  <Typography variant="body1">{`Quantity: ${item.quantity}`}</Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {`$${item.menuItemPrice}`}
                  </Typography>
                </Box>
                {index < data.orderMenuItems.length - 1 && (
                  <Divider sx={{ marginY: 1 }} />
                )}
              </Box>
            ))}

            <Divider sx={{ marginY: 2 }} />
            <Typography variant="h6" gutterBottom>
              Subtotal:{" "}
              <Typography
                component="span"
                sx={{ fontWeight: "bold", color: "primary.main" }}
              >
                ${data.orderSubTotal}
              </Typography>
            </Typography>
            <Typography variant="h6" gutterBottom>
              Taxes:{" "}
              <Typography
                component="span"
                sx={{ fontWeight: "bold", color: "text.secondary" }}
              >
                ${data.orderTax}
              </Typography>
            </Typography>
            <Typography variant="h6" gutterBottom>
              Total:{" "}
              <Typography
                component="span"
                sx={{ fontWeight: "bold", color: "secondary.main" }}
              >
                ${data.orderTotal}
              </Typography>
            </Typography>
          </Paper>
        </Box>
        <Paper
  sx={{
    padding: 3,
    boxShadow: 4,
    borderRadius: 2,
    backgroundColor: "#ffffff",
  }}
>
  {updatedOrderStatus?.map((item, index) => (
    <Box
      key={index}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        paddingY: 1,
      }}
    >
      <Box
        component="span"
        sx={{
          color: item.state ? "success.main" : "error.main",
          fontSize: 24, 
        }}
      >
        {item.icon}
      </Box>
      <Typography
        variant="h6"
        sx={{
          color: item.state ? "success.main" : "error.main",
          fontWeight: "medium",
        }}
      >
        {item.status}
      </Typography>
    </Box>
  ))}
</Paper>

      </>
    )
  )}
</Box>

  );
};

export default OrderStatus;
