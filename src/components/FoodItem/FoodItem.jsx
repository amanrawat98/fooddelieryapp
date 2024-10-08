import React, { useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import nonvegimg from "../../assets/non_veg.png";
import vegimg from "../../assets/veg.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { setCartItems } from "../../feature/CartSlice";
import { useDispatch, useSelector } from "react-redux";

const FoodItem = ({ id, name, price, description, image, item, categoryid }) => {
  const [productQuantity, setProductQuantity] = useState(0);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { cartId, cartItems: cartItem } = cartItems;

  console.log("item", item);
  const { menuItemId } = item;
  console.log(menuItemId);

  console.log("cartItems", cartItem);

  // Ensure both cartMenuItemId and menuItemId are defined, trimmed, and of the same type
  const filterCartItem = cartItem?.find((cartItem) => {
    return (
      cartItem.cartMenuItemId &&
      menuItemId &&
      String(cartItem.cartMenuItemId).trim() === String(menuItemId).trim()
    );
  });

  console.log(filterCartItem?.quantity);

  const addToCart = async (payload) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/cart/`,
        payload
      );
      console.log(response?.data?.result);
      dispatch(setCartItems(response?.data?.result));
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleAddToCart = async (type) => {
    let latestQuantity = productQuantity;

    if (type === "increment") {
      latestQuantity = productQuantity + 1;
      setProductQuantity(latestQuantity);
    } else if (type === "decrement" && productQuantity > 0) {
      latestQuantity = productQuantity - 1;
      setProductQuantity(latestQuantity);
    }

    console.log("latestQuantity", latestQuantity);

    if (latestQuantity >= 0) {
      try {
        console.log("Updating cart with quantity:", latestQuantity);
        await addToCart({
          cartId: cartId,
          menuItemId: item.menuItemId,
          quantity: latestQuantity,
        });
      } catch (error) {
        console.error("Error updating cart:", error);
        setProductQuantity(
          type === "increment" ? productQuantity - 1 : productQuantity + 1
        );
      }
    }
  };

  return (
    <>
      <div className="relative">
        <div className="absolute z-40 right-4 cursor-pointer">
          {filterCartItem?.quantity === 0 || filterCartItem?.quantity === undefined ? (
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
            <div className="food-item-counter relative top-5 left-2">
              <img
                src={assets.remove_icon_red}
                alt="remove_icon_red"
                onClick={() => {
                  handleAddToCart("decrement");
                }}
              />
              <p>{filterCartItem?.quantity}</p>
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
