import React, { useCallback } from "react";
import { assets } from "../../assets/assets";
import {
  deleteCartItem,
  getCartItems,
  getResturantData,
} from "../../utility/apiServices";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../../feature/CartSlice";
import axios from "axios";
import { debounce } from "lodash";

const CartItem = ({ item }) => {
  const cartitems = useSelector((state) => state?.cart?.cartItems);
  const dispatch = useDispatch();

  const { cartItems, cartId } = cartitems || {};
  const outletId = cartitems?.outletId || null;
  const customerId = cartitems?.customerId || null;

  const handleDeleteCartItem = async (itemid, cartid) => {
    const payload = {
      cartId: cartid,
      cartItemId: itemid,
    };

    try {
      await deleteCartItem(payload);

      const updatedItems = cartItems?.filter(
        (item) => item?.cartItemId !== itemid
      );

      console.log(updatedItems);
      dispatch(
        setCartItems({
          ...cartitems,
          cartItems: updatedItems,
        })
      );

      const ResturantData = async () => {
        let response;

        if (customerId && outletId) {
          response = await getCartItems(cartId);
        } else {
          response = await getResturantData();
        }

        return response;
      };

      const resturantdata = await ResturantData();

      const { result, customerCart } = resturantdata || {};

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

  // Add to Cart

  const addToCart = async (payload) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/cart/`,
      payload
    );

    dispatch(setCartItems(response?.data?.result));
  };
  const handleAddToCartDebounced = useCallback(
    debounce(async (type, item) => {
      await addToCart({
        cartId: cartId,
        menuItemId: item?.cartMenuItemId,
        quantity: type === "increment" ? item.quantity + 1 : item.quantity - 1,
      });
    }, 40), // 40ms debounce delay
    []
  );

  return (
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
            handleAddToCartDebounced("decrement", item);
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
            handleAddToCartDebounced("increment", item);
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
  );
};

export default CartItem;
