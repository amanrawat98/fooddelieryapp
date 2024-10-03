import React, { useEffect, useState } from "react";
import { resturantData } from "../demoData/resturantdata";
import { useParams } from "react-router-dom";
import nonvegimg from "../assets/non_veg.png";
import vegimg from "../assets/veg.png";
import { useDispatch, useSelector } from "react-redux";

import { assets } from "../assets/assets";
import axios from "axios";
import { setCartCount, setCartItems } from "../feature/CartSlice";

const ProductDetail = () => {
  const outletData = useSelector((state) => state?.resturant?.outletData);
  const resturantdata = useSelector((state) => state?.resturant?.resturantdata);
  const cartitems = useSelector((state) => state?.cart?.cartItems);

  const dispatch = useDispatch();

  const { cartId, cartItems: cartitem } = cartitems || {};

  console.log(cartitem);

  const { menuid, productid } = useParams();
  const [productQuantity, setProductQuantity] = useState(0);

  const filteredbycategoryid = outletData?.menuCategories?.filter((item) => {
    return item.menuCategoryId.toString() === menuid.toString();
  });

  const filteredbyproductid = filteredbycategoryid[0]?.menuItems?.filter(
    (item) => {
      return item?.menuItemId?.toString() === productid?.toString();
    }
  );

  const product = filteredbyproductid[0] || [];

  console.log(cartitem);

  console.log(product?.cartQuantity);

  const item = cartitem?.find((item) => {
    return item?.cartMenuItemId === parseFloat(productid);
  });

  console.log(item);

  useEffect(() => {
    setProductQuantity(product?.cartQuantity);
  }, [product]);

  useEffect(() => {
    console.log(item);

    if (item !== undefined) {
      setProductQuantity(item?.quantity);
    } else {
      setProductQuantity(0);
    }
    console.log(productQuantity);

    console.log(typeof productQuantity);
  }, [item]);

  console.log(product?.cartQuantity);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    console.log(productQuantity);
  }, [productQuantity]);

  const addToCart = async (payload) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/cart/`,
      payload
    );

    console.log(response?.data);
    dispatch(setCartItems(response?.data?.result));
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

    // Only make the API call if latestQuantity is valid
    if (latestQuantity >= 0) {
      try {
        console.log("Updating cart with quantity:", latestQuantity);
        await addToCart({
          cartId: cartId,
          menuItemId: productid,
          quantity: latestQuantity, // Use the updated quantity here
        });
      } catch (error) {
        console.error("Error updating cart:", error);
        // Optionally revert the state if the API call fails
        setProductQuantity(
          type === "increment" ? productQuantity - 1 : productQuantity + 1
        );
      }
    }
  };

  return (
    <div className="flex justify-center mt-3 flex-col ">
      <div className="h-[23rem] w-[47%] self-center ">
        <img
          src={product?.menuItemImageUrl}
          alt={product.name}
          className="rounded-lg h-full w-full object-contain"
        />
      </div>
      <div className="flex flex-col ">
        <div className="mt-4 max-w-[85%] self-center">
          <h2 className="text-2xl font-semibold text-center mb-2">
            {product.name}
          </h2>
          <p>{product.description}</p>
        </div>
        {/* <div className="justify-center flex">
          <button
            className="border-2 py-2 px-8 text-orange-400 border-orange-500"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div> */}

        <div className="justify-center flex">
          {productQuantity === 0 ? (
            <button
              className="border-2 py-2 px-8 text-orange-400 border-orange-500 w-fit mt-3"
              onClick={() => {
                handleAddToCart("increment");
              }}
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex align-middl mt-5 space-x-3">
              <img
                src={assets.remove_icon_red}
                alt="remove_icon_red"
                onClick={() => {
                  handleAddToCart("decrement");
                }}
              />
              <p className="w-9 bg-slate-300 p-2 text-center rounded-md">
                {productQuantity}
              </p>
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

        <div className="mt-3 flex justify-end gap-4  max-w-[85%] self-end">
          <h2 className="text-lg">${product.price}</h2>
          <img
            src={product.mealType === "non-veg" ? nonvegimg : vegimg}
            alt=""
            className="size-8"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
