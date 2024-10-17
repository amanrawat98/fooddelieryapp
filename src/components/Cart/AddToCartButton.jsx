import React from "react";
import { assets } from "../../assets/assets";

const AddToCartButton = ({ varient, debouncedAddToCart }) => {
  return (
    <div>
      <div className="justify-center flex">
        {productQuantity === 0 && varient === "productDetail" ? (
          <button
            className="border-2 py-2 px-8 text-orange-400 border-orange-500 w-fit mt-3"
            onClick={() => {
              debouncedAddToCart("increment");
            }}
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center mt-5 space-x-3">
            <img
              src={assets.remove_icon_red}
              alt="remove_icon_red"
              onClick={() => {
                debouncedAddToCart("decrement");
              }}
            />
            <p className="w-9 bg-slate-300 p-2 text-center rounded-md">
              {productQuantity}
            </p>
            <img
              src={assets.add_icon_green}
              alt="add_icon_green"
              onClick={() => {
                debouncedAddToCart("increment");
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddToCartButton;
