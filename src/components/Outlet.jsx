import React from "react";

const Outlet = ({ restaurantOutlets, outletNumber, setOutletNumber }) => {
  const outletdata = restaurantOutlets?.[outletNumber] || [];
  const {street} = outletdata || {};
  return (
    <details className="dropdown cursor-pointer my-3">
      <summary className="btn m-1">{street}</summary>
      <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] p-2 shadow space-y-2">
        {restaurantOutlets?.map((item, index) => {
          return (
            <li
            key={index}
              className={`bg-gray-200 p-2 ${outletNumber === index && 'bg-slate-600 text-white'}`}
              onClick={() => {
                setOutletNumber(index);
              }}
            >
              <a>{item?.street}</a>
            </li>
          );
        })}
      </ul>
    </details>
  );
};

export default Outlet;
