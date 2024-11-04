import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React from "react";
import { CustomArrow } from "../../CustomArrow";
import { defaultResponsive } from "./data";
import { Box } from "@mui/material";

const CarouselWrapper = ({ children, responsiveConfig, ...props }) => {
  
  return (
    <Box   sx={{
      display:"flex",
      justifyContent:"center",
        ".carousel-item-padding": {
          padding: "0.5rem",
        },
      }}>
    <Carousel
      responsive={{...defaultResponsive,...responsiveConfig}}
      autoPlaySpeed={2000}
      transitionDuration={500}
      containerClass="container"
      showDots={false}
      arrows={true}
      itemClass="carousel-item-padding"
      dotListClass="relative"
      infinite={false}
      autoPlay={false}
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
