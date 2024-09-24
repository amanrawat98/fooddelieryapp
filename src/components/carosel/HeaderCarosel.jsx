import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import React from "react";
import { Link, useNavigate } from "react-router-dom";

const HeaderCarosel = ({ menuItems, category, setCategory }) => {
  const navigate = useNavigate();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 10,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 9,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      autoPlaySpeed={2000}
      transitionDuration={500}
      showDots={false}
      arrows={true}
      renderDotsOutside={true}
      dotListClass="relative"
      infinite={true}
      itemClass="carousel-item-padding header-carosel"
    >
      {menuItems?.length > 0 &&
        menuItems?.map((item, index) => {
          if (!item || !item.menuCategoryId) return null;
          return (
            <Link key={index} to={`/category/${item?.menuCategoryId}`}>
              <div
                key={item?.menuCategoryId}
                className=" flex flex-col justify-center"
              >
                <div className="w-fit rounded-full h-3/4 border-2 border-gray-300 overflow-hidden">
                  <img
                    src={item?.menuCategoryImageUrl}
                    className="size-20 rounded-full"
                    alt={item?.name || "menu_image"} // Add alt text fallback
                  />
                </div>
                <div className="h-1/4 mt-4">
                  <p className="h-full">{item?.name}</p>
                </div>
              </div>
            </Link>
          );
        })}
    </Carousel>
  );
};

export default HeaderCarosel;
