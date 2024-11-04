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

export const getResturantData = async (customerId, sessionKey) => {

  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/restaurant-data/`,
    {
      params: {
        ...(customerId ? { customerId} : { sessionKey }),

        restaurantId: 5,
      },
    }
  );
  return response.data;
};

export const handleUserLogin = async (payload) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/login`,
    payload
  );
  return response.data;
};
// Delete item from Cart

export const deleteCartItem = async (payload) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_BASE_URL}/cart`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
    }
  );
  return response
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

export const handleFetchOrderDetails = async (orderId) => {
  const response = await axios.get(
    ` ${import.meta.env.VITE_BASE_URL}/order-detail`,
    {
      params: {
        orderId: orderId,
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
