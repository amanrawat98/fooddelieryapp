import React from "react";
import { Link } from "react-router-dom";
import CarouselWrapper from "../Common/CarouselWrapper";
import MenuCard from "../Common/Cards/CategoryCard";

const HeaderCarousel = ({ menuItems }) => {

  return (
    <CarouselWrapper>
      {menuItems?.map(({ menuCategoryId, menuCategoryImageUrl, name, description, ...rest }) => {
        if (!menuCategoryId) return null;
      
        return (
          <Link key={menuCategoryId} to={`/category/${menuCategoryId}`}>
            <MenuCard {...{ menuCategoryImageUrl, name, description }}  />
          </Link>
        );
      })}
    </CarouselWrapper>
  );
};

export default HeaderCarousel;
