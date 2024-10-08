import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import OrderCard from "../../components/OrderCard";
import { handleGetOrders } from "../../utility/apiServices";

const Orders = () => {
  const userdata = useSelector((state) => state?.user?.userData);
  const { customerId } = userdata;

  const { data, isLoading, isError, refetch } = useQuery(
    ["order-data", customerId],
    () => handleGetOrders(customerId)
  );

  return (
    <>
      {isLoading && (
        <div className="h-full w-full">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      )}
      {data && (
        <div className="px-3 space-y-4 ">
          {data?.length <= 0 && <p> No Orders Available </p>}
          {data &&
            data.length > 0 &&
            data?.map((item, index) => {
              return <OrderCard item={item} key={index} />;
            })}
        </div>
      )}
    </>
  );
};

export default Orders;
