import React, { useCallback, useEffect, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import nonvegimg from "../../assets/non_veg.png";
import vegimg from "../../assets/veg.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { setCartItems } from "../../feature/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "@mui/material";

const FoodItem = ({ item, categoryid }) => {
  const [productQuantity, setProductQuantity] = useState(0);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { cartId, cartItems: cartItem } = cartItems || {};

  const { menuItemId } = item;

  // Ensure both cartMenuItemId and menuItemId are defined, trimmed, and of the same type
  const filterCartItem = cartItem?.find((cartItem) => {
    return (
      cartItem.cartMenuItemId &&
      menuItemId &&
      String(cartItem.cartMenuItemId).trim() === String(menuItemId).trim()
    );
  });

  let quantity;
  if (filterCartItem) {
    quantity = filterCartItem?.quantity;
  }

  const debouncedAddToCart = useCallback(
    debounce(async (payload) => {
      try {
        console.log("payload", payload);
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/cart/`,
          payload
        );
        dispatch(setCartItems(response?.data?.result));
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }, 50),
    []
  );

  const handleAddToCart = async (type) => {
    let latestQuantity = quantity;

    console.log("latestQuantity", latestQuantity);
    if (latestQuantity !== undefined) {
      latestQuantity = type === "increment" ? quantity + 1 : quantity - 1;
      setProductQuantity(latestQuantity);
    } else {
      latestQuantity = 1;
    }

    if (latestQuantity >= 0) {
      try {
        await debouncedAddToCart({
          cartId: cartId,
          menuItemId: item.menuItemId,
          quantity: latestQuantity,
        });
      } catch (error) {
        console.error("Error updating cart:", error);
        setProductQuantity(type === "increment" ? quantity - 1 : quantity + 1);
      }
    }
  };

  return (
    <>
      <div className="relative">
        <div className="absolute z-40 right-4 top-2 cursor-pointer">
          {quantity === 0 || quantity === undefined ? (
            <div className="border-2 z-40 rounded-full">
              <img
                src={assets.add_icon_white}
                alt="add_icon_white"
                className="relative"
                onClick={() => {
                  handleAddToCart("increment");
                }}
              />
            </div>
          ) : (
            <div className="food-item-counter relative top-1 left-1">
              <img
                src={assets.remove_icon_red}
                alt="remove_icon_red"
                onClick={() => {
                  handleAddToCart("decrement");
                }}
              />
              <p>{quantity}</p>
              <img
                src={assets.add_icon_green}
                alt="add_icon_green"
                onClick={() => {
                  handleAddToCart("increment");
                }}
              />
            </div>
          )}
        </div>

        <div className="food-item">
          <div className="food-item-img-container">
            <img
              src={item?.menuItemImageUrl}
              alt="image"
              className="food-item-img h-[17rem] object-contain w-[100%]"
            />
          </div>
          <Link to={`/product/${categoryid}/${item.menuItemId}`}>
            <div className="food-item-info">
              <div className="food-item-name-rating">
                <p>{item.name}</p>
              </div>
              <img src={assets.rating_starts} alt="rating_starts" />
              <p className="food-item-desc">{item.description.slice(0, 80)}</p>
              <div className="flex justify-between items-center">
                <p className="food-item-price">${item.price}</p>
                <img
                  src={item.mealType === "non-veg" ? nonvegimg : vegimg}
                  alt=""
                  className="size-5"
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default FoodItem;
