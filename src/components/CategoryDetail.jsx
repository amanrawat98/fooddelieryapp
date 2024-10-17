import React from "react";
import CategoryHeader from "./CategoryHeader";
import FoodItem from "./FoodItem/FoodItem";

const CategoryDetail = ({ menuitem, category }) => {
  return (
    <div className="my-6">
      <CategoryHeader value={menuitem} />
      <div className="grid grid-cols-4 gap-4">
        {menuitem?.menuItems?.map((item, index) => {
          return <FoodItem item={item} key={index} categoryid={menuitem?.menuCategoryId} />;
        })}
      </div>
    </div>
  );
};

export default CategoryDetail;
