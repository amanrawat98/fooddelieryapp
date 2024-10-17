import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import CategoryHeader from "./CategoryHeader";
import { responsive } from "../constaints/constaints";

const CategorySection = ({ menuItems }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mb-9 mt-3">
      {menuItems?.slice(0, 8)?.map((value, index) => {
        if (value?.menuItems?.length <= 0) {
          return;
        } else {
          return (
            <div className="my-3" key={index}>
              <CategoryHeader value={value} />

              <Carousel
                responsive={responsive}
                autoPlaySpeed={2000}
                transitionDuration={500}
                showDots={false}
                arrows={true}
                renderDotsOutside={true}
                dotListClass="relative"
                infinite={true}
                itemClass="carousel-item-padding"
              >
                {value?.menuItems?.map((item, index) => {
                  return (
                    <Link
                      to={`/product/${value?.menuCategoryId}/${item?.menuItemId}`}
                      key={index}
                    >
                      <div className="w-full h-[20rem]">
                        <div className="border-2 border-gray-300 rounded-lg overflow-hidden h-[75%]">
                          <img
                            className="w-full object-contain h-full"
                            src={item?.menuItemImageUrl}
                            alt={item?.name}
                          />
                        </div>

                        <div className="mt-2 font-sans  font-semibold text-center text-lg h-[25%]  py-2">
                          <h2>{item?.name}</h2>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </Carousel>
            </div>
          );
        }
      })}
    </div>
  );
};

export default CategorySection;
