import React, { useEffect } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCartItems } from "../../feature/CartSlice";

export const deliveryFee = 2;

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state?.resturant?.resturantdata);
  const cartitems = useSelector((state) => state?.cart?.cartItems);
  const userdata = useSelector((state) => state?.user?.userData);

  console.log(userdata);

  // Use customerId and outletId from the userdata and cartitems if available
  const outletId = cartitems?.outletId || null;
  const customerId = cartitems?.customerId || null;

  const { customerCart } = cartData || {};

  // Assign cartId based on the customerCart or cartitems

  const { cartItems, cartId } = cartitems || {};

  console.log(cartItems, cartId);

  const handleDeleteCartItem = async (itemid, cartid) => {
    let payload;

    payload = {
      cartId: cartid,
      cartItemId: itemid,
    };

    console.log(payload);

    try {
      // Delete the cart item
      const deleteresponse = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/cart`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: payload,
        }
      );

      console.log("Delete response:", deleteresponse.data);

      console.log("cartItems", cartItems, "itemid", itemid);

      const items = cartItems?.filter((item) => {
        return item?.cartItemId !== itemid;
      });

      console.log(items);

      const obj = {
        ...cartitems,
        cartItems: items,
      };

      console.log("obj",obj);

      dispatch(
        setCartItems({
          ...cartitems,
          cartItems: items,
        })
      );

      const getResturantData = async () => {
        let response;
        const sessionid = localStorage.getItem("sessionid");

        console.log(sessionid);
        if (customerId && outletId) {
          console.log(customerId, outletId);
          response = await axios.get(`${import.meta.env.VITE_BASE_URL}/cart/`, {
            params: {
              cartId,
            },
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

      const resturantdata = await getResturantData(); // Await the restaurant data fetching

      console.log(resturantdata, "resturantdata");
      const { result, customerCart } = resturantdata || {};

      console.log(customerCart, "customerCart");


      if (customerCart) {
        dispatch(setCartItems(customerCart));
      }

      if (result) {
        dispatch(setCartItems(result));
      }

      console.log("Updated cart items:", result);
    } catch (error) {
      console.log(error?.response.data);
    }
  };

  return (
    <div className="cart">
      <div className="cart-items space-y-3">
        <div className="cart-items-title cart-heading grid grid-cols-6">
          <p className=" col-span-2 text-lg font-semibold">Title</p>
          <p className=" col-span-1 text-lg font-semibold">Price</p>
          <p className=" col-span-1 text-lg font-semibold">Quantity</p>
          <p className=" col-span-1 text-lg font-semibold">Total</p>
          <p className=" col-span-1 text-lg font-semibold">Remove</p>
        </div>

        {cartItems?.length === 0 ? (
          <p className="NoItems">No Items in cart</p>
        ) : (
          cartItems?.map((item) => {
            return (
              <div
                className="cart-items-title cart-heading grid grid-cols-6"
                key={item?.cartItemId}
              >
                <p className="col-span-2">{item?.cartMenuItemName}</p>
                <p className="col-span-1">${item?.cartMenuItemPrice}</p>
                <p className="col-span-1">{item?.quantity}</p>
                <p className="col-span-1">
                  $
                  {(
                    parseFloat(item?.cartMenuItemPrice) * item?.quantity
                  ).toFixed(2)}
                </p>
                <img
                  src={assets.remove_icon_cross}
                  alt="remove_icon_cross"
                  className="size-8 cursor-pointer col-span-1"
                  onClick={() => {
                    handleDeleteCartItem(item?.cartItemId, cartId);
                  }}
                />
              </div>
            );
          })
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
          <div>
            <p>If you have a promocode, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promo Code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
