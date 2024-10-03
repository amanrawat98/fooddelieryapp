import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import OrderCard from "../../components/OrderCard";

const Orders = () => {
  const userdata = useSelector((state) => state?.user?.userData);
  const { customerId } = userdata;
  console.log("customerId", customerId);
  const getOrdersData = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/orders/`,
      {
        params: {
          customerId,
        },
      }
    );
    return response.data.result;
  };

  const { data, isLoading, isError, refetch } = useQuery(
    "order-data",
    getOrdersData
  );

  console.log("data", data);
  return (
    <div className="px-3 space-y-4">
      {data?.length <= 0 &&  <p> No Orders Available </p> }
      {data && data.length > 0 && data?.map((item, index) => {
        return <OrderCard item={item} key={index} />;
      })}
    </div>
  );
};

export default Orders;
