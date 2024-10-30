import React from "react";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-gray-300 p-3 rounded-xl space-y-2 cursor-pointer"
      onClick={() => navigate(`/profile/orderStatus/${item.orderId}`)}
    >
      <div className="flex gap-3">
        <img
          src={item?.outlet?.imageUrl}
          className="size-16 my-auto"
          alt="baba chicken"
        />

        <div>
          <h2 className="font-light">{item?.orderRef}</h2>
          <h3 className="font-light">{item?.orderDate}</h3>
          <p className="font-semibold">{item?.outlet?.name}</p>
        </div>
      </div>

      <div>
        <h2 className="font-semibold">{`Status: ${item?.orderStatus}`}</h2>
      </div>

      <div>
        <h2 className="font-semibold">{`Total Price: $${item?.orderSubTotal} `}</h2>
      </div>
    </div>
  );
};

export default OrderCard;
