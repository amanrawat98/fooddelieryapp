import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import nonvegimg from "../../assets/non_veg.png";
import vegimg from "../../assets/veg.png";
import { Link } from "react-router-dom";

const FoodItem = ({
  id,
  name,
  price,
  description,
  image,
  item,
  categoryid,
}) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <>
      {" "}
      <div className="relative">
        <div className="absolute z-40">
          {!cartItems[id] ? (
            <div className="absolute z-40">
              <img
                src={assets.add_icon_white}
                alt="add_icon_white"
                className="add absolute"
                onClick={() => addToCart(id)}
              />{" "}
            </div>
          ) : (
            <div className="food-item-counter">
              <img
                src={assets.remove_icon_red}
                alt="remove_icon_red"
                onClick={() => removeFromCart(id)}
              />
              <p>{cartItems[id]}</p>
              <img
                src={assets.add_icon_green}
                alt="add_icon_green"
                onClick={() => addToCart(id)}
              />
            </div>
          )}
        </div>

        <div className="food-item">
          {" "}
          <div className="food-item-img-container ">
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
            </div>{" "}
          </Link>
        </div>
      </div>
    </>
  );
};

export default FoodItem;
