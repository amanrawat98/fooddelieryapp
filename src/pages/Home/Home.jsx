import React from "react";
import BannerContainer from "../../components/BannerContainer";
import ExploreMenu from "../../components/ExploreMenu";
import AppDownload from "../../components/AppDownload.jsx/AppDownload";
import CategorySection from "../../components/CategorySection";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import OutletContainer from "../../components/OutletContainer";

const Home = () => {
  const outletData = useSelector((state) => state?.restaurant?.outletData);
  const filteredMenuCategories = outletData?.menuCategories?.filter((val) => val?.isFeatured||true)
  return (
    <Box position="relative">
      <OutletContainer />
      <Box sx={{ px: "0.7rem" }}>
        <BannerContainer bannerData={outletData?.bannerImages} />
        <ExploreMenu menuItems={filteredMenuCategories} />
        <CategorySection menuItems={filteredMenuCategories} />
        <AppDownload />
      </Box>
    </Box>
  );
};

export default Home;
