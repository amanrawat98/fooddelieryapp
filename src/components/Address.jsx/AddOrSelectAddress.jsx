import React, { useState } from "react";
import PropTypes from "prop-types";
import { IoHomeOutline } from "react-icons/io5"; // Ensure you import the icons you need
import { SiTicktick } from "react-icons/si";
import SearchLocationInput from "../mapApi.jsx/SearchLocationInput";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedAddress, setUserData } from "../../feature/userSlice";
import axios from "axios";

const AddOrSelectAddress = ({
  setIsSelectPassword,
  isSelectPassword,
  address,
}) => {
  const userData = useSelector((state) => state?.user?.userData);
  const dispatch = useDispatch();
  const [page, setPage] = useState("selectAddress");

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

  const handleSetAddress = (item) => {
    console.log(item);
    const { addressId } = item;

    const { addresses } = userData;
    const updatedAddresses = addresses?.map((item) => {
      if (item.addressId === addressId) {
        return {
          ...item,
          isDefault: true,
        };
      } else {
        return {
          ...item,
          isDefault: false,
        };
      }
    });

    console.log("updatedAddresses", updatedAddresses);

    console.log("latest", {
      ...userData,
      addresses: updatedAddresses,
    });

    dispatch(
      setUserData({
        ...userData,
        addresses: updatedAddresses,
      })
    );
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

  console.log(address);
  return (
    <div>
      {isSelectPassword && (
        <>
          <div className=" bg-black opacity-75 w-full  z-40 inset-0 fixed h-[100vh] overflow-hidden"></div>
          {page === "selectAddress" ? (
            <div
              className={`fixed mt-6  inset-x-0 m-auto  bg-gray-200 rounded-xl w-fit px-5 py-6 space-y-4 z-50 justify-center items-center flex flex-col h-fit  ${
                userData === null ? "inset-y-[13rem]" : "inset-y-0"
              } `}
            >
              <h2 className="text-2xl text-center ">Select Address</h2>
              <button
                className="bg-orange-400 px-14 py-2 rounded-3xl text-white mx-auto relative  !mb-3 "
                onClick={() => setPage("addNewAddress")}
              >
                Add New Address
              </button>

              {userData !== null ? (
                <div className="gap-3 flex flex-col  h-[25rem]   overflow-y-scroll ">
                  {address &&
                    address.length > 0 &&
                    address?.map((item) => {
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
                            {
                                item && item.isDefault  && (
                                <SiTicktick className="size-7 col-span-1" />
                              )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div className="my-7">
                  <h2>No Address Available </h2>
                </div>
              )}

              <button
                className="bg-orange-400 px-14 py-2 rounded-3xl text-white mx-auto !mt-[4rem]"
                onClick={() => setIsSelectPassword(false)}
              >
                Save
              </button>
            </div>
          ) : (
            <div className="fixed inset-0 m-auto bg-gray-200 rounded-xl w-fit px-5 py-6 space-y-4 z-50  flex flex-col h-fit   ">
              <SearchLocationInput />{" "}
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
                  onClick={() => {
                    setPage("selectAddress");
                    setIsSelectPassword(true);
                  }}
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

export default AddOrSelectAddress;
