import React from "react";
import BannerContainer from "../../components/BannerContainer";
import ExploreMenu from "../../components/ExploreMenu";
import CategorySection from "../../components/CategorySection";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import OutletContainer from "../../components/OutletContainer";

const Home = () => {
  const { selectedOutletData} = useSelector((state) => state?.outlet);
const filteredMenuCategories = selectedOutletData?.menuCategories?.filter((val) => val?.isFeatured)
  return (
    <Box position="relative">
      <OutletContainer />
      <Box sx={{ px: "0.7rem" }}>
        <BannerContainer bannerData={selectedOutletData?.bannerImages} />
        <ExploreMenu menuItems={filteredMenuCategories} />
        <CategorySection menuItems={filteredMenuCategories} />
      </Box>
    </Box>
  );
};

export default Home;
