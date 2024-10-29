import React from "react";
import { Link } from "react-router-dom";
import CarouselWrapper from "../Common/CarouselWrapper";
import MenuCard from "../Common/Cards/CategoryCard";

const HeaderCarousel = ({ menuItems }) => {

  return (
    <CarouselWrapper responsiveConfig={{ superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
      partialVisibilityGutter: 30
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5, 
      partialVisibilityGutter: 30
    },}}>
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
