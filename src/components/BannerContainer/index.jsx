import React from "react";
import { Box, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { bannerBreakpoint } from "./data";
import BannerImage from "./BannerImage";

const BannerContainer = ({ bannerData }) => {

  return (
    <Box  sx={{
      ".carousel-item": {
        pr: "0.3rem",
      },
      ".react-multi-carousel-dot button":{
        borderColor:"primary.main"
      },
      ".react-multi-carousel-dot--active button":{
        bgcolor:"primary.main"
      }
    }}>
      { bannerData?.length  ? (
        <Carousel
          responsive={bannerBreakpoint}
          autoPlaySpeed={2000}
          transitionDuration={500}
          showDots={true}
          autoPlay={true}
          arrows={false}
          renderDotsOutside={false}
          dotListClass="relative"
          infinite={true}
          itemClass="carousel-item"
        >
          {bannerData?.map(({bannerImageUrl="",title=""}, index) => {
            return (
             <BannerImage key={"banner_image_container"+index} {...{bannerImageUrl,title}}/>
            );
          })}
        </Carousel>
      ) : (
        <Typography variant="h6" align="center" color="textSecondary">
          No banner images available
        </Typography>
      )}
    </Box>
  );
};

export default BannerContainer;
