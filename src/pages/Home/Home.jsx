import React, { useEffect, useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import AppDownload from "../../components/AppDownload.jsx/AppDownload";
import { useQuery } from "react-query";
import CategorySection from "../../components/CategorySection";
import CategoryDetail from "../../components/CategoryDetail";
import { useDispatch, useSelector } from "react-redux";
import {
  setOutletData,
  setResturantData as setresturantdata,
} from "../../feature/resturantDataSlice";
import Outlet from "../../components/Outlet";
import { setCartItems } from "../../feature/CartSlice";
import { getResturantData } from "../../utility/apiServices";
import axios from "axios";
import { v4 } from "uuid";

const Home = () => {
  const dispatch = useDispatch();
  const outletData = useSelector((state) => state?.resturant?.outletData);
  const [outletNumber, setOutletNumber] = useState(0);
  const [resturantData, setResturantData] = useState({});
  const [restaurantOutlets, setRestaurantOutlets] = useState([]);
  const isUserLogin = useSelector((state) => state.user.isUserLogin);

  const sessionid = localStorage.getItem("sessionid") || null;
  /*   const data = resturantData?.result?.restaurantOutlets[0];
   */

  // const {
  //   data: resturantdata,
  //   isLoading,
  //   isError,
  //   refetch,
  // } = useQuery("resturant-data", getResturantData);

  useEffect(() => {
    const fetchResturantData = async () => {
      const response = await getResturantData();
      setResturantData(response);
      console.log(response);
    };

    fetchResturantData();
  }, [sessionid]);

  useEffect(() => {
    const sessionid = localStorage.getItem("sessionid");
    const id = v4();

    if (sessionid === null && isUserLogin === false) {
      localStorage.setItem("sessionid", id);
    } else if (sessionid === "") {
      console.log("user has login");
    }
  }, []);

  useEffect(() => {
    if (!resturantData) return;
    const { result, customerCart } = resturantData || {};
    const { restaurantOutlets } = result || {};
    setRestaurantOutlets(restaurantOutlets);

    if (sessionid !== null) {
      if (resturantData && restaurantOutlets) {
        console.log("resturantData", resturantData);

        dispatch(setresturantdata(resturantData));

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
  }, [resturantData, sessionid, dispatch, outletNumber]);

  // const { result, customerCart } = resturantdata || {};
  // const { restaurantOutlets } = result || {};

  // useEffect(() => {}, [resturantdata, outletNumber, dispatch]);

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
     <AppDownload />
    </div>
  );
};

export default Home;
