import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const SignUp = ({ setIsSignUp }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const resturantdata = useSelector((state) => state.resturant.resturantdata);

  let restaurantId;
  let cartId;

  if (cartItems?.cartId) {
    cartId = cartItems?.cartId;
  }

  if (resturantdata?.result?.restaurantId) {
    restaurantId = resturantdata?.result?.restaurantId;
  }

  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    resturantId: restaurantId,
    outletId: cartItems?.outletId || null,
    temporaryCartId: cartId,
    role: "customer",
  });

  const handleSetUserData = (e) => {
    const { value, name } = e.target;
    setSignUpData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUserSignUp = async (payload) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/signup`,
      payload
    );
    return response.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await handleUserSignUp(signUpData);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div
            className="text-end text-3xl cursor-pointer"
            onClick={() => setIsSignUp(false)}
          >
            X
          </div>
          <h2 className="text-center text-2xl font-semibold">Sign Up</h2>

          <input
            type="text"
            placeholder="First name"
            name="firstName"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSetUserData}
          />
          <input
            type="text"
            placeholder="Last name"
            name="lastName"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSetUserData}
          />
          <input
            type="email"
            placeholder="Your email"
            name="email"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSetUserData}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSetUserData}
          />
          <input
            type="text"
            placeholder="Phone Number"
            name="phone"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSetUserData}
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-300"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
