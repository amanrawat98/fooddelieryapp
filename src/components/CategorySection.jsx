import React, { useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import CategoryHeader from "./CategoryHeader";
import CarouselWrapper from "./Common/CarouselWrapper";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { ArrowCircleRight } from "@mui/icons-material";
import MenuCard from "./Common/Cards/MenuCard";

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

              <CarouselWrapper
              >
                {value?.menuItems?.map((item, index) => {
                  return (
                    <Link
                      to={`/product/${value?.menuCategoryId}/${item?.menuItemId}`}
                      key={index}
                    >
                      <MenuCard key={item.id} item={item} />


                    </Link>
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
