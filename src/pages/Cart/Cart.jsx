import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCartItems } from "../../feature/CartSlice";
import { loadStripe } from "@stripe/stripe-js";
import PaymentSheetWrapper from "../../components/PaymentSheetWrapper";
import { MdEdit } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { setSelectedAddress, setUserData } from "../../feature/userSlice";
import { SiTicktick } from "react-icons/si";

export const deliveryFee = 2;

const Cart = ({ setShowLogin, showLoginPage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state?.cart?.cartItems);
  const userData = useSelector((state) => state?.user?.userData);
  const selectedAddress = useSelector((state) => state?.user?.selectedAddress);

  const [deliveryType, setDeliveryType] = useState("takeaway");
  const [page, setPage] = useState("selectAddress");

  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);
  const [isSelectPassword, setIsSelectPassword] = useState(false);
  const [addressValue, setAddressValue] = useState({
    customerId: userData?.customerId,
    addressType: "home",
    receiverName: userData?.firstName,
    receiverPhone: userData?.phone,
    houseNo: "7722",
    floor: "1rd Floor",
    building: "PAU",
    landmark: "Near PAU Gate no. 1",
    areaLocality: "Ludhiana",
    isDefault: true,
  });

  const handleSetAddressValue = (e) => {
    const { name, value } = e.target;
    setAddressValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(addressValue);
  }, [addressValue]);

  const sessionid = localStorage.getItem("sessionid");
  // Use customerId and outletId from the userdata and cartitems if available
  const outletId = cartitems?.outletId || null;
  const customerId = cartitems?.customerId || null;
  const { cartItems, cartId } = cartitems || {};

  let address;
  if (userData.addresses) {
    address = userData.addresses;
  }

  console.log(address[0]);

  const { floor, houseNo, building, areaLocality } = address[0] || {};

  const props = {
    deliveryType,
    cartId,
    paymentIntentId,
    setClientSecret,
  };

  const handleDeleteCartItem = async (itemid, cartid) => {
    const payload = {
      cartId: cartid,
      cartItemId: itemid,
    };

    try {
      const deleteresponse = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/cart`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: payload,
        }
      );

      const updatedItems = cartItems?.filter(
        (item) => item?.cartItemId !== itemid
      );

      dispatch(
        setCartItems({
          ...cartitems,
          cartItems: updatedItems,
        })
      );

      const getResturantData = async () => {
        const sessionid = localStorage.getItem("sessionid");
        let response;

        if (customerId && outletId) {
          response = await axios.get(`${import.meta.env.VITE_BASE_URL}/cart/`, {
            params: { cartId },
          });
        } else {
          response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/restaurant-data/`,
            {
              params: {
                sessionKey: sessionid,
                restaurantId: 5,
              },
            }
          );
        }

        return response.data;
      };

      const resturantdata = await getResturantData();

      const { result, customerCart } = resturantdata || {};

      console.log("customerCart", customerCart);
      console.log("resturantdata", resturantdata);

      if (customerCart) {
        dispatch(setCartItems(customerCart));
      }

      if (result && customerId) {
        dispatch(setCartItems(result));
      }
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  const handleCheckout = async () => {
    try {
      if (deliveryType === "takeaway") {
        console.log("hi");
        if (sessionid !== null) {
          console.log("i m here");
          console.log(sessionid === null);
          showLoginPage();
          navigate("/");
        }
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/create-payment-intent/`,
          {
            outletId: outletId,
            cartId: cartId,
          }
        );

        const { clientSecret, paymentIntentId } = response?.data;

        setClientSecret(clientSecret);
        setPaymentIntentId(paymentIntentId);
      } else {
        if (sessionid !== null) {
          showLoginPage();
          navigate("/");
        }
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/create-payment-intent/`,
          {
            outletId: outletId,
            cartId: cartId,
          }
        );

        const { clientSecret, paymentIntentId } = response?.data;

        setClientSecret(clientSecret);
        setPaymentIntentId(paymentIntentId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (payload) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/cart/`,
      payload
    );

    console.log(response?.data);
    dispatch(setCartItems(response?.data?.result));
  };

  const handleAddToCart = async (type, item) => {
    console.log(item);

    if (type === "increment") {
      let latestQuantity = item?.quantity + 1;

      await addToCart({
        cartId: cartId,
        menuItemId: item?.cartMenuItemId,
        quantity: latestQuantity,
      });
    } else {
      let latestQuantity = item?.quantity - 1;

      await addToCart({
        cartId: cartId,
        menuItemId: item?.cartMenuItemId,
        quantity: latestQuantity,
      });
    }
  };

  const handleSetAddress = (item) => {
    console.log(item);
    dispatch(setSelectedAddress(item));
  };

  const handleAddNewAddress = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/customer-profile`,
        addressValue
      );

      dispatch(setUserData(response?.data?.result));

      setPage("selectAddress");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" relative">
      <div className="cart-items space-y-3">
        <div className="cart-items-title cart-heading grid grid-cols-6">
          <p className="col-span-2 text-lg font-semibold">Title</p>
          <p className="col-span-1 text-lg font-semibold">Price</p>
          <p className="col-span-1 text-lg font-semibold">Quantity</p>
          <p className="col-span-1 text-lg font-semibold">Total</p>
          <p className="col-span-1 text-lg font-semibold">Remove</p>
        </div>

        {cartItems?.length === 0 ? (
          <p className="NoItems">No Items in cart</p>
        ) : (
          cartItems?.map((item) => (
            <div
              className="cart-items-title cart-heading grid grid-cols-6"
              key={item?.cartItemId}
            >
              <p className="col-span-2">{item?.cartMenuItemName}</p>
              <p className="col-span-1">${item?.cartMenuItemPrice}</p>

              <div className="flex align-middle col-span-1 mt-2 space-x-3">
                <img
                  src={assets.remove_icon_red}
                  className="cursor-pointer"
                  alt="remove_icon_red"
                  onClick={() => {
                    handleAddToCart("decrement", item);
                  }}
                />
                <p className="w-9 bg-slate-300 p-2 text-center rounded-md">
                  {item?.quantity}
                </p>
                <img
                  src={assets.add_icon_green}
                  className="cursor-pointer"
                  alt="add_icon_green"
                  onClick={() => {
                    handleAddToCart("increment", item);
                  }}
                />
              </div>
              <p className="col-span-1">
                ${(item?.cartMenuItemPrice * item?.quantity).toFixed(2)}
              </p>
              <img
                src={assets.remove_icon_cross}
                alt="remove_icon_cross"
                className="size-8 cursor-pointer col-span-1 ml-5"
                onClick={() => handleDeleteCartItem(item?.cartItemId, cartId)}
              />
            </div>
          ))
        )}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${cartitems?.cartSubTotal}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${cartitems?.cartTax}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <p>${cartitems?.cartTotal}</p>
            </div>
          </div>
        </div>

        <div className="cart-promocode">
          <p>If you have a promocode, enter it here</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder="Promo Code" />
            <button>Submit</button>
          </div>
        </div>
      </div>

      <div className="flex gap-9 mt-6 pl-[27rem] text-lg">
        <div className="flex items-center gap-1">
          <input
            type="radio"
            id="Takeaway"
            name="radio-6"
            className="radio radio-warning size-4"
            defaultChecked
            value="takeaway"
            onChange={() => setDeliveryType("takeaway")}
          />
          <label htmlFor="Takeaway">Takeaway</label>
        </div>

        <div className="flex items-center gap-1">
          <input
            type="radio"
            name="radio-6"
            id="delivery"
            className="radio radio-warning size-4"
            value="delivery"
            onChange={() => setDeliveryType("delivery")}
          />
          <label htmlFor="delivery">Delivery</label>
        </div>
      </div>

      {!selectedAddress
        ? address &&
          address?.length > 0 &&
          deliveryType === "delivery" && (
            <div className="flex flex-col   justify-center my-8 border-2 py-2 border-orange-400 rounded-lg w-fit  ">
              <div className="mx-auto ">
                <h2 className="text-2xl w-fit">Delivery Address</h2>
                <div className="flex items-center gap-4 cursor-pointer w-fit space-y-3">
                  <CiLocationOn className="text-lg" />
                  <p className="text-lg ">{`${floor} ${houseNo} ${building} ${areaLocality} `}</p>{" "}
                  <MdEdit
                    className="text-lg"
                    onClick={() => setIsSelectPassword((prev) => !prev)}
                  />
                </div>
              </div>
            </div>
          )
        : deliveryType === "delivery" && (
            <div className="flex flex-col justify-center my-8 border-2  border-orange-400 rounded-lg w-fit px-24 py-6 mx-auto">
              <div className="mx-auto ">
                <h2 className="text-2xl w-fit">Delivery Address</h2>
                <div className="flex items-center gap-4 cursor-pointer w-fit space-y-3 ">
                  <CiLocationOn className="size-5 mt-3" />
                  <p className="text-lg ">{`${selectedAddress?.floor} ${selectedAddress?.houseNo} ${selectedAddress?.building} ${selectedAddress?.areaLocality} `}</p>{" "}
                  <MdEdit
                    className="size-6"
                    onClick={() => setIsSelectPassword((prev) => !prev)}
                  />
                </div>
              </div>
            </div>
          )}

      <button
        className="bg-orange-400 px-14 py-2 rounded-3xl text-white"
        onClick={handleCheckout}
      >
        Checkout
      </button>

      {clientSecret && (
        <div className="absolute w-fit h-fit bg-slate-100 p-6 inset-0 m-auto">
          <PaymentSheetWrapper clientSecret={clientSecret} {...props} />
        </div>
      )}

      {isSelectPassword && (
        <>
          <div className="fixed bg-black opacity-75 w-full h-full z-40 inset-0"></div>
          {page === "selectAddress" ? (
            <div className=" absolute mt-2 inset-x-0 inset-y-0 m-auto bg-gray-200 rounded-xl w-fit px-5 py-6 space-y-4 z-50 justify-center items-center flex flex-col h-fit   ">
              <h2 className="text-2xl text-center ">Select Address</h2>
              <button
                className="bg-orange-400 px-14 py-2 rounded-3xl text-white mx-auto relative  !mb-3 "
                onClick={() => setPage("addNewAddress")}
              >
                Add New Address
              </button>

              <div className="gap-3 flex flex-col">
                {address?.map((item) => {
                  return (
                    <div
                      className="mx-auto border-2 cursor-pointer border-orange-500 bg-white p-3 rounded-lg w-[30rem] "
                      onClick={() => {
                        handleSetAddress(item);
                      }}
                    >
                      <h2 className="text-xl w-fit">Delivery Address</h2>
                      <div className="grid grid-cols-7 gap-4 cursor-pointer  space-y-3 w-full">
                        <IoHomeOutline className="size-6 self-center mt-2 col-span-1" />
                        <p className="text-lg col-span-5">{`${item?.floor} ${item?.houseNo} ${item?.building} ${item?.areaLocality} `}</p>{" "}
                        {selectedAddress &&
                          selectedAddress?.addressId &&
                          selectedAddress?.addressId === item?.addressId && (
                            <SiTicktick className="size-7 col-span-1" />
                          )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                className="bg-orange-400 px-14 py-2 rounded-3xl text-white mx-auto !mt-[4rem]"
                onClick={() => setIsSelectPassword(false)}
              >
                Save
              </button>
            </div>
          ) : (
            <div className="fixed inset-0 m-auto bg-gray-200 rounded-xl w-fit px-5 py-6 space-y-4 z-50  flex flex-col h-fit   ">
              {" "}
              <h2 className="text-2xl text-center mb-3 ">Add Address</h2>
              <div className="gap-4 flex items-center flex-col">
                <input
                  type="text"
                  name="houseNo"
                  id="houseNo"
                  className="outline-none py-2 rounded-3xl bg-orange-200 text-gray-800 w-full px-8"
                  placeholder="House number / Block*"
                  onChange={handleSetAddressValue}
                />
                <input
                  type="number"
                  name="floor"
                  id="floor"
                  className="outline-none py-2 rounded-3xl bg-orange-200 text-gray-800 w-full px-8"
                  placeholder="Floor"
                  onChange={handleSetAddressValue}
                />{" "}
                <input
                  type="text"
                  name="building"
                  id="building"
                  className="outline-none  py-2 rounded-3xl bg-orange-200 text-gray-800 w-full px-8"
                  placeholder="Building"
                  onChange={handleSetAddressValue}
                />{" "}
                <input
                  type="text"
                  name="areaLocality"
                  id="areaLocality"
                  className="outline-none  py-2 rounded-3xl bg-orange-200 text-gray-800 w-full px-8"
                  placeholder="Locality*"
                  onChange={handleSetAddressValue}
                />
                <input
                  type="text"
                  name="landmark"
                  id="landmark"
                  className="outline-none  py-2 rounded-3xl bg-orange-200 text-gray-800 w-full px-8"
                  placeholder="Landmark*"
                  onChange={handleSetAddressValue}
                />
              </div>
              <div className="flex gap-3">
                <button
                  className="bg-white text-orange-500 px-14 py-2 rounded-3xl border-2 border-orange-400 mx-auto !mt-[2rem]"
                  onClick={() => setIsSelectPassword(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-orange-400 px-14 py-2 rounded-3xl text-white mx-auto !mt-[2rem]"
                  onClick={handleAddNewAddress}
                >
                  Add Address
                </button>
              </div>
            </div>
          )}{" "}
        </>
      )}
    </div>
  );
};

export default Cart;
