import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu";
import AppDownload from "../../components/AppDownload.jsx/AppDownload";
import CategorySection from "../../components/CategorySection";
import CategoryDetail from "../../components/CategoryDetail";
import { useDispatch, useSelector } from "react-redux";
import {setOutletData,setRestaurantData as reduxSetRestaurantData,
} from "../../slices/restaurantDataSlice";
import { setCartItems } from "../../slices/cartSlice";
import { getResturantData } from "../../utility/apiServices";
import { Box } from "@mui/material";
import { useSession } from "../../hooks/useSession";
import OutletContainer from "../../components/OutletContainer";

const Home = () => {
  const dispatch = useDispatch();
  const outletData = useSelector((state) => state?.restaurant?.outletData);
  const [outletNumber, setOutletNumber] = useState(0);
  const [resturantData, setRestaurantData] = useState({});
  const [restaurantOutlets, setRestaurantOutlets] = useState([]);
  const isUserLogin = useSelector((state) => state.user.isUserLogin);
  const { sessionId, createSession, clearSession } = useSession();

  const fetchResturantData = async () => {
    const response = await getResturantData();
    setRestaurantData(response);
  };

  useEffect(() => {
    if (sessionId)
      fetchResturantData();
  }, [sessionId]);

  useEffect(() => {
    if (!sessionId && !isUserLogin) {
      createSession()
    } else if (!sessionId) {
      console.log("user has login");
    }
  }, []);

  useEffect(() => {
    if (!resturantData) return;
    const { result, customerCart } = resturantData || {};
    const { restaurantOutlets } = result || {};
    setRestaurantOutlets(restaurantOutlets);

    if (!sessionId) {
      if (resturantData && restaurantOutlets) {
        console.log("resturantData", resturantData);

        dispatch(reduxSetRestaurantData(resturantData));

        if (restaurantOutlets?.[outletNumber]) {
          dispatch(setOutletData(restaurantOutlets[outletNumber]));
        }

        if (customerCart) {
          dispatch(setCartItems(customerCart));
        }
      }
    } else {
      if (restaurantOutlets && outletNumber) {
        dispatch(setOutletData(restaurantOutlets?.[outletNumber]));
      }
    }
  }, [resturantData, sessionId, dispatch, outletNumber]);


  return (
    <Box sx={{ px: "1rem" }}>
      <OutletContainer {...{ outletNumber, setOutletNumber, restaurantOutlets }} />
      <Header data={outletData} />
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
  );
};

export default Home;
