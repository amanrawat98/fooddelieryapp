import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PaymentSheetWrapper from "../../components/PaymentSheetWrapper";
import { MdEdit } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { handleCreateIntentId } from "../../utility/apiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddOrSelectAddress from "../../components/Address.jsx/AddOrSelectAddress";
import CartItem from "../../components/Cart/CartItem";

export const deliveryFee = 2;

const Cart = ({ showLoginPage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state?.cart?.cartItems);
  const userData = useSelector((state) => state?.user?.userData);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [deliveryType, setDeliveryType] = useState("takeaway");

  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [isSelectPassword, setIsSelectPassword] = useState(false);

  const sessionid = localStorage.getItem("sessionid");
  // Use customerId and outletId from the userdata and cartitems if available
  const outletId = cartitems?.outletId || null;
  const customerId = cartitems?.customerId || null;
  const { cartItems, cartId } = cartitems || {};

  let address;
  if (userData?.addresses) {
    address = userData?.addresses;
  }

  let floor, houseNo, building, areaLocality;

  if (address & address?.[0]) {
    let addr = address?.[0];
    floor = addr;
    houseNo = addr;
    building = addr;
    areaLocality = addr;
  }

  const props = {
    deliveryType,
    cartId,
    paymentIntentId,
    setClientSecret,
  };

  const handleCheckout = async () => {
    try {
      if (cartitems.cartItems.length <= 0) {
        return toast.error("No Item in Cart !");
      }
      const payload = {
        outletId: outletId,
        cartId: cartId,
      };
      const handleCreatePaymentIntent = async () => {
        const response = await handleCreateIntentId(payload);
        return response;
      };

      if (sessionid !== null) {
        showLoginPage();
        navigate("/");
      }

      if (deliveryType === "takeaway" || deliveryType !== "takeaway") {
        const { clientSecret, paymentIntentId } =
          await handleCreatePaymentIntent();

        setClientSecret(clientSecret);
        setPaymentIntentId(paymentIntentId);
        // const response = await axios.post(
        //   `${import.meta.env.VITE_BASE_URL}/create-payment-intent/`,
        //   {
        //     outletId: outletId,
        //     cartId: cartId,
        //   }
        // );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSelectPassword) {
      // Disable scroll
      document.body.style.overflow = "hidden";
    } else {
      // Enable scroll
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSelectPassword]);

  // AddorSelectAddress component props

  const AddorSelectAddressProps = {
    setIsSelectPassword,
    isSelectPassword,
    address,
  };

  useEffect(() => {
    console.log(address);

    const seltectedAddress = address?.find((item) => {
      return item.isDefault === true;
    });

    console.log(seltectedAddress);
    setSelectedAddress(seltectedAddress);
  }, [address]);

  return (
    <div className=" relative">
      <ToastContainer position="top-center" />

      <div className="cart-items space-y-3">
        <div className="cart-items-title cart-heading grid grid-cols-6">
          {["Title", "Price", "Quantity", "Total", "Remove"].map(
            (item, index) => {
              if (item === "Title") {
                return (
                  <p className="col-span-2 text-lg font-semibold" key={index}>
                    {item}
                  </p>
                );
              } else {
                <p className="col-span-1 text-lg font-semibold" key={index}>
                  {item}
                </p>;
              }
            }
          )}
        </div>

        {cartItems?.length === 0 ? (
          <p className="NoItems">No Items in cart</p>
        ) : (
          cartItems?.map((item) => <CartItem item={item} cartId={cartId} />)
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

      {/*  Address Type Selection */}
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
      <div className="flex justify-center">
        {address
          ? address?.length > 0 &&
            deliveryType === "delivery" && (
              <div className="flex flex-col   justify-center my-8 border-2  border-orange-400 rounded-lg w-fit py-5 px-10  ">
                <div className="mx-auto ">
                  <h2 className="text-2xl w-fit">Delivery Address</h2>
                  <div className="flex items-center gap-4 cursor-pointer w-fit space-y-3">
                    <CiLocationOn className="text-lg" />
                    <p className="text-lg ">{`${selectedAddress?.floor} ${selectedAddress?.houseNo} ${selectedAddress?.building} ${selectedAddress?.areaLocality} `}</p>{" "}
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
                  <div className="flex items-center gap-4 cursor-pointer w-fit space-y-3   ">
                    <h2>No address available, Add a New One....</h2>
                    <MdEdit
                      className="size-6 "
                      onClick={() => setIsSelectPassword((prev) => !prev)}
                    />
                  </div>
                </div>
              </div>
            )}{" "}
      </div>

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
          <AddOrSelectAddress {...AddorSelectAddressProps} />
        </>
      )}
    </div>
  );
};

export default Cart;
