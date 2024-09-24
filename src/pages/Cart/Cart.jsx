import React, { useContext, useEffect } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useQuery } from "react-query";
import { setUserData } from "../../feature/userSlice";
import { fetchresturantdata } from "../../utility/FetchResturantData";
import { setCartCount, setCartItems } from "../../feature/CartSlice";
import {
  setOutletData,
  setResturantData,
} from "../../feature/resturantDataSlice";

export const deliveryFee = 2;

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state?.resturant?.resturantdata);
  const cartitems = useSelector((state) => state?.cart?.cartItems);

  console.log(cartitems);

  const { customerCart } = cartData || {};

  let cartId;

  if (customerCart && customerCart.cartId) {
    cartId = customerCart.cartId || {};
  }

  const { cartItems } = cartitems || {};

  if (cartitems && cartitems?.cartId) {
    cartId = cartitems?.cartId;
  }

  console.log(cartItems);

  /*   const { resturantdata, isLoading, isError, refetch } = fetchresturantdata();
  const { customerCart: cartData } = resturantdata || {};

  // Use useEffect to dispatch actions after rendering
  useEffect(() => {
    if (cartData) {
      dispatch(setCartCount(cartData?.cartCount));
      dispatch(setCartItems(cartData?.cartItems));
    }
  }, [cartData, dispatch]); */

  const handleDeleteCartItem = async (itemid, cartid) => {
    const payload = {
      cartId: cartid,
      cartItemId: itemid,
    };
  
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
  
      console.log(deleteresponse);
  
      // After successful deletion, filter out the deleted item locally
      const updatedCartItems = cartItems.filter(
        (item) => item.cartItemId !== itemid
      );
  
      // Update the Redux store with the updated cart items
      dispatch(setCartItems({ cartItems: updatedCartItems, cartId }));
  
      console.log("Updated cart items:", updatedCartItems);
    } catch (error) {
      console.log(error);
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

        {cartitems?.length === 0 ? (
          <p className="NoItems">No Items in cart</p>
        ) : (
          cartItems?.map((item, index) => {
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
              <p>${customerCart?.cartSubTotal}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Free</p>
              <p>${customerCart?.cartTax}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <p>${customerCart?.cartTotal}</p>
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
