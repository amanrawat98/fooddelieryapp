import React, { useEffect, useMemo } from "react";
import { resturantData } from "./demoData/resturantdata";
import { useNavigate, useParams } from "react-router-dom";
import FoodItem from "./components/FoodItem/FoodItem";
import { useSelector } from "react-redux";

const CategoryViewPage = () => {
  const outletData = useSelector((state) => state?.resturant?.outletData);

  const { menuCategories } = outletData;

  const { categoryid } = useParams();
  const navigate = useNavigate();

  const filteredData = useMemo(() => {
    const filteredData = menuCategories?.filter((item) => {
      return item.menuCategoryId.toString() === categoryid.toString();
    });

    return filteredData;
  });

  const filterValue = filteredData[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <h2 className="text-3xl text-center mb-5"> {filterValue?.name}</h2>{" "}
      <div className="grid grid-cols-3 gap-4">
        {filterValue?.menuItems.map((item) => {
          return (
            <FoodItem
              item={item}
              key={item.menuItemId}
              categoryid={categoryid}
            />
          );
        })}
      </div>
    </>
  );
};

export default CategoryViewPage;
