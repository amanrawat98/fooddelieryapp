import axios from "axios";

export const getThemeData = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/theme-data`,
    {
      params: {
        restaurantId: 5,
      },
    }
  );

  return response?.data?.result;
};

export const getResturantData = async () => {
  const sessionid = localStorage.getItem("sessionid") || null;
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/restaurant-data/`,
    {
      params: {
        sessionKey: sessionid,
        restaurantId: 5,
      },
    }
  );
  return response.data;
};

// Delete item from Cart

export const deleteCartItem = async (payload) => {
  const deleteresponse = await axios.delete(
    `${import.meta.env.VITE_BASE_URL}/cart`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
    }
  );
};

// Get Cart Items

export const getCartItems = async (cartId) => {
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/cart/`, {
    params: { cartId },
  });

  return response.data;
};

// Create Payment Intent It

export const handleCreateIntentId = async (payload) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/create-payment-intent/`,
    payload
  );

  return response.data;
};

// fetch order details

export const handleFetchOrderDetails = async (orderid) => {
  const response = await axios.get(
    ` ${import.meta.env.VITE_BASE_URL}/order-detail`,
    {
      params: {
        orderId: orderid,
      },
    }
  );

  return response;
};

// Add to Cart Item

export const handleAddToCart = async (payload) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/cart/`,
    payload
  );

  return response;
};

// Get all orders

export const handleGetOrders = async (customerId) => {
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/orders/`, {
    params: {
      customerId,
    },
  });
  return response.data.result;
};
