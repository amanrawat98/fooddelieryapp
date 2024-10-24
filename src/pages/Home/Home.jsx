import React from "react";
import BannerContainer from "../../components/BannerContainer";
import ExploreMenu from "../../components/ExploreMenu";
import AppDownload from "../../components/AppDownload.jsx/AppDownload";
import CategorySection from "../../components/CategorySection";
import CategoryDetail from "../../components/CategoryDetail";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import OutletContainer from "../../components/OutletContainer";

const Home = () => {
  const outletData = useSelector((state) => state?.restaurant?.outletData);
  return (
    <Box position="relative">
      <OutletContainer />
      <Box sx={{ px: "0.7rem" }}>
        <BannerContainer data={outletData} />
        <ExploreMenu menuItems={outletData?.menuCategories} />
        <CategorySection menuItems={outletData?.menuCategories} />
        {outletData?.menuCategories?.slice(1, 4)?.map((item, index) => {
          if (item?.menuItems?.length <= 0) {
            return;
          } else {
            return (
              <CategoryDetail
                menuitem={item}
                category={outletData?.menuCategories}
                key={index}
              />
            );
          }
        })}
        <AppDownload />
      </Box>
    </Box>
  );
};

export default Home;
