import React, { useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import CategoryHeader from "./CategoryHeader";
import CarouselWrapper from "./Common/CarouselWrapper";
import MenuCard from "./Common/Cards/MenuCard";
import SmallCard from "./Common/Cards/SmallCard";
import { Box } from "@mui/material";

const CategorySection = ({ menuItems }) => {
  const midLength = parseInt(menuItems?.length / 2)
  return (
    <div className="mb-9 mt-3">
      {menuItems?.map((value, categoryIndex) => {
        if (value?.menuItems?.length <= 0) {
          return;
        } else {
          return (
            <Box sx={{ my: 3 }} key={categoryIndex + "category_container"}>
              <CategoryHeader  {...{
                name: value?.name,
                textButton: value?.menuItems?.length > 4 ? "Explore More" : "",
                path: `/category/${value?.menuCategoryId}`
              }}
              />

              <CarouselWrapper responsiveConfig={{
                desktop: {
                  breakpoint: { max: 3000, min: 1024 },
                  items: categoryIndex < midLength ? 4 : 3,
                  partialVisibilityGutter: 30
                },
                tablet: {
                  breakpoint: { max: 1024, min: 640 },
                  items: categoryIndex < midLength ? 3 : 2,
                  partialVisibilityGutter: 30
                },
                mobile: {
                  breakpoint: { max: 640, min: 0 },
                  items: categoryIndex < midLength ? 2 : 1,
                  partialVisibilityGutter: 30
                },
              }
              }>
                {value?.menuItems?.map((item, index) => {
                  if (categoryIndex < midLength) {
                    return (
                      <MenuCard item={item} menuCategoryId={value?.menuCategoryId} key={value?.menuCategoryId + index} />
                    );
                  }
                  else {
                    return (
                      <SmallCard item={item} menuCategoryId={value?.menuCategoryId} key={value?.menuCategoryId + index} />
                    );
                  }
                })}
              </CarouselWrapper>
            </Box>
          );
        }
      })}
    </div>
  );
};

export default CategorySection;
