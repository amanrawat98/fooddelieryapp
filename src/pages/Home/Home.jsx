import React, { useEffect, useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import AppDownload from "../../components/AppDownload.jsx/AppDownload";
import { useQuery } from "react-query";
import axios from "axios";
import CategorySection from "../../components/CategorySection";
import CategoryDetail from "../../components/CategoryDetail";
import { useDispatch, useSelector } from "react-redux";
import {
  setOutletData,
  setResturantData,
} from "../../feature/resturantDataSlice";
import { v4 } from "uuid";
import { setUserData } from "../../feature/userSlice";
import Outlet from "../../components/Outlet";
import { setCartItems, setRefetchFunction } from "../../feature/CartSlice";

const Home = () => {
  const [category, setCategory] = useState("All");
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.resturant?.resturantdata);
  const outletData = useSelector((state) => state?.resturant?.outletData);
  const isUserLogin = useSelector((state) => state?.user?.isUserLogin);

  const [outletNumber, setOutletNumber] = useState(0);

  const sessionid = localStorage.getItem("sessionid") || null;
  /*   const data = resturantData?.result?.restaurantOutlets[0];
   */
  const getResturantData = async () => {
    console.log(sessionid);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/restaurant-data/`,
      {
        params: {
          sessionKey: sessionid,
          restaurantId: 5,
        },
      }
    );
    return response.data;
  };

  const {
    data: resturantdata,
    isLoading,
    isError,
    refetch,
  } = useQuery("resturant-data", getResturantData);

  const { result, customerCart } = resturantdata || {};
  const { restaurantOutlets } = result || {};

  useEffect(() => {
    if (sessionid !== null) {
      if (resturantdata && restaurantOutlets) {
        dispatch(setResturantData(resturantdata));

        if (restaurantOutlets[outletNumber]) {
          dispatch(setOutletData(restaurantOutlets[outletNumber]));
        }

        if (customerCart) {
          dispatch(setCartItems(customerCart));
        }
      }
    } else {
      if (restaurantOutlets) {
        console.log("i m here");

        dispatch(setOutletData(restaurantOutlets[outletNumber]));
      }

      console.log("api end here ");

    }
  }, [resturantdata, outletNumber, dispatch]);

  const props = {
    outletNumber,
    setOutletNumber,
  };

  return (
    <div>
      <Outlet restaurantOutlets={restaurantOutlets} {...props} />
      <Header data={outletData} />
      <ExploreMenu menuItems={outletData?.menuCategories} />
      <CategorySection menuItems={outletData?.menuCategories} />{" "}
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
      {/*             <FoodDisplay category={category} menuItems={data?.menuCategories} />
       */}{" "}
      <AppDownload />
    </div>
  );
};

export default Home;
