import axios from "axios";
import React, { useEffect } from "react";
import { FaHourglassEnd } from "react-icons/fa";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { handleFetchOrderDetails } from "../../utility/apiServices";

const OrderStatus = () => {
  const { orderId } = useParams();

  const fetchOrderData = async () => {
    const response = await handleFetchOrderDetails(orderId);
    return response.data.result;
  };

  const { data, isLoading } = useQuery("order-data", fetchOrderData);

  console.log(data);

  const orderStatus = [
    {
      status: "Payment Pending",
      state: false,
    },
    {
      status: "Order Confirm",
      state: false,
    },
    {
      status: "Order Prepared",
      state: false,
    },
    {
      status: "Ready to Takeaway",
      state: false,
    },
    {
      status: "Order Delivered",
      state: false,
    },
  ];

  const indexvalue = orderStatus?.findIndex((item) => {
    return item?.status === data?.orderStatus;
  });

  const newarr = orderStatus?.map((item, index) => {
    if (index <= indexvalue) {
      return {
        status: item.status,
        state: true,
      };
    } else {
      return { status: item.status, state: false };
    }
  });

  return (
    <>
      {isLoading && (
        <div className="h-full w-full">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      )}

      {data && (
        <>
          <div className="space-y-5">
            <div className="bg-gray-200 shadow-lg shadow-gray-500 rounded-lg py-6 px-5 space-y-2">
              <h2 className="text-lg">
                {`Order reference:`}{" "}
                <span className="font-light  text-gray-500">
                  {data?.orderRef}
                </span>
              </h2>
              <h2 className="text-lg">
                {`Ordered on:`}{" "}
                <span className="font-light  text-gray-500">
                  {data?.orderDate}
                </span>
              </h2>
              <h2 className="text-lg">
                {`Customer Name:`}{" "}
                <span className="font-light  text-gray-500">
                  {data?.customer?.name}
                </span>
              </h2>
              <h2 className="text-lg">
                {`Order Type:`}{" "}
                <span className="font-light  text-gray-500">
                  {data?.orderType}
                </span>
              </h2>
              {data?.orderMenuItems?.map((item) => {
                return (
                  <>
                    {" "}
                    <div className="grid grid-cols-4">
                      <div className="col-span-2">{item?.menuItemName}</div>
                      <div className="col-span-1">{`Q: ${item?.quantity}`}</div>
                      <div className="col-span-1">{`$${item?.menuItemPrice}`}</div>
                    </div>
                    <div className="border bg-gray-800 border-gray-300 w-full"></div>
                  </>
                );
              })}
              <h2 className="text-lg">
                {`Subtotal: `}{" "}
                <span className="font-light  text-gray-500">
                  ${data?.orderSubTotal}
                </span>
              </h2>
              <h2 className="text-lg">
                {`Taxes:`}{" "}
                <span className="font-light  text-gray-500">
                  ${data?.orderTax}
                </span>
              </h2>
              <h2 className="text-lg">
                {`Total:`}{" "}
                <span className="font-light  text-gray-500">
                  ${data?.orderTotal}
                </span>
              </h2>
            </div>
            <div></div>
          </div>

          <div className="bg-gray-200 shadow-lg shadow-gray-500 rounded-lg py-6 px-5 space-y-4">
            <div className="flex flex-col gap-3">
              {newarr?.map((item) => {
                return (
                  <div className="flex items-center  gap-4">
                    {" "}
                    <span className="material-icons ">{` ${
                      item.state ? "check_circle" : "more_time"
                    } `}</span>{" "}
                    <h2 className="text-xl"> {item?.status}</h2>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderStatus;
