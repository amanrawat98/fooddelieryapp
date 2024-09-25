import React from "react";
import "./Header.css";
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
    <>
      {data?.bannerImages && data.bannerImages.length > 0 ? (
        <Carousel
          responsive={responsive}
          autoPlaySpeed={2000}
          transitionDuration={500}
          showDots={true}
          autoPlay={true}
          arrows={false}
          renderDotsOutside={true}
          dotListClass="relative"
          infinite={true}
        >
          {data.bannerImages.map((item, index) => {
            return (
              <div key={index} className="rounded-xl object-cover">
                <div
                  className="rounded-xl"
                  style={{
                    backgroundImage: `url(${item?.bannerImageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "400px",
                    width: "100%",
                    borderRadius:"10px"
                    
                  }}
                ></div>
              </div>
            );
          })}
        </Carousel>
      ) : (
        <p>No banner images available</p>
      )}
    </>
  );
};

export default Header;
