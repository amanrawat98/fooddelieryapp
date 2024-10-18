import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React from "react";
import { CustomArrow } from "../../CustomArrow";
import { defaultResponsive } from "./data";
import { Box } from "@mui/material";

const CarouselWrapper = ({ children, responsiveConfig, ...props }) => {
  
  return (
    <Box   sx={{
        ".carousel-item-padding": {
          padding: "1rem",
        },
      }}>
    <Carousel
      responsive={responsiveConfig || defaultResponsive}
      autoPlaySpeed={2000}
      transitionDuration={500}
      containerClass="container"
      showDots={false}
      arrows={true}
      itemClass="carousel-item-padding"
      dotListClass="relative"
      infinite={false}
      customLeftArrow={<CustomArrow direction="left" />}
      customRightArrow={<CustomArrow direction="right" />}
      {...props}
    >
      {children}
    </Carousel>
    </Box>
  );
};

export default CarouselWrapper;
