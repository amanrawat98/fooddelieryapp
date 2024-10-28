import React, { useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import CategoryHeader from "./CategoryHeader";
import CarouselWrapper from "./Common/CarouselWrapper";

import MenuCard from "./Common/Cards/MenuCard";

const CategorySection = ({ menuItems }) => {

return (
    <div className="mb-9 mt-3">
      {menuItems?.map((value, index) => {
        if (value?.menuItems?.length <= 0) {
          return;
        } else {
          return (
            <div className="my-3" key={index}>
              <CategoryHeader  {...{
                name: value?.name,
                textButton: "Explore More",
                path: `/category/${value?.menuCategoryId}`
              }}
              />

              <CarouselWrapper >
                {value?.menuItems?.map((item, index) => {
                  return (
                    // <Link
                    //   to={`/product/${value?.menuCategoryId}/${item?.menuItemId}`}
                    //   key={index}
                    // >
                      <MenuCard key={item.id} item={item} menuCategoryId={value?.menuCategoryId}/>


                    // </Link>
                  );
                })}
              </CarouselWrapper>
            </div>
          );
        }
      })}
    </div>
  );
};

export default CategorySection;
