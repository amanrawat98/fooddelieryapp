import React from "react";
import { Box, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Header = ({ data }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Box>
      { data?.bannerImages?.length > 0 ? (
        <Carousel
          responsive={responsive}
          autoPlaySpeed={2000}
          transitionDuration={500}
          showDots={true}
          autoPlay={true}
          arrows={false}
          renderDotsOutside={false}
          dotListClass="relative"
          infinite={true}
        >
          {data?.bannerImages?.map((item, index) => {
            return (
              <Box
                key={index}
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  height: "450px",
                  width: "100%",
                  backgroundImage: `url(${item?.bannerImageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    left: 16,
                    color: "white",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    padding: 1,
                    borderRadius: 1,
                  }}
                >
               
                  {item?.title}
                </Typography>
              </Box>
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

export default Header;
