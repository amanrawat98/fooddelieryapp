import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { handleFetchOrderDetails } from "../../utility/apiServices";
import {
  Box,
  Paper,
  Typography,
  Divider,
  CircularProgress,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
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
                <Typography variant="body1" gutterBottom>
                  Order reference:{" "}
                  <Typography
                    component="span"
                    variant="body2"

                    sx={{ fontWeight: "bold", color: "primary.main" }}
                  >
                    {data?.orderRef}
                  </Typography>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Ordered on:{" "}
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ fontWeight: "bold", color: "text.secondary" }}
                  >
                    {data?.orderDate}
                  </Typography>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Customer name:{" "}
                  <Typography
                    component="span"
                    variant="body2"

                    sx={{ fontWeight: "bold", color: "text.secondary" }}
                  >
                    {data.customer?.name}
                  </Typography>
                </Typography>
                <Typography variant="body1" mb={2} gutterBottom>
                  Order Type:{" "}
                  <Typography
                    component="span"
                    variant="body2"

                    sx={{ fontWeight: "bold", color: "secondary.main" }}
                  >
                    {data.orderType}
                  </Typography>
                </Typography>

                <Divider sx={{ marginY: 2 }} />
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><Typography variant="body1" fontWeight="bold">Item</Typography></TableCell>
                        <TableCell><Typography variant="body1" fontWeight="bold">Quantity</Typography></TableCell>
                        <TableCell><Typography variant="body1" fontWeight="bold">Price</Typography></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.orderMenuItems.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell><Typography variant="body2">{item.menuItemName}</Typography></TableCell>
                          <TableCell><Typography variant="body2">{item.quantity}</Typography></TableCell>
                          <TableCell>
                            <Typography variant="body2" fontWeight="bold">
                              ${item.menuItemPrice}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>


                <Stack alignItems="end" spacing={1} mt={1}>
                  <Typography variant="body1">
                    Subtotal:{" "}
                    <Typography component="span" variant="body2" sx={{ fontWeight: "bold", color: "primary.main" }}>
                      ${data.orderSubTotal}
                    </Typography>
                  </Typography>
                  <Typography variant="body1">
                    Taxes:{" "}
                    <Typography component="span" variant="body2" sx={{ fontWeight: "bold", color: "text.secondary" }}>
                      ${data.orderTax}
                    </Typography>
                  </Typography>
                  <Typography variant="body1">
                    Total:{" "}
                    <Typography component="span" variant="body2" sx={{ fontWeight: "bold", color: "secondary.main" }}>
                      ${data.orderTotal}
                    </Typography>
                  </Typography>
                </Stack>

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
                    variant="body2"

                    sx={{
                      color: item.state ? "success.main" : "error.main",
                      fontSize: 24,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    variant="body1"
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
