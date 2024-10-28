import { useQuery } from "react-query";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setThemeData } from "../slices/themeSlice";
import { createDynamicTheme } from "../theme";
import { getResturantData, getThemeData } from "../utility/apiServices";
import { useSession } from "./useSession";
import { setRestaurantOutlets } from "../slices/outletSlice";
import { setOutletData, setRestaurantData } from "../slices/restaurantDataSlice";
import { setCartItems } from "../slices/cartSlice";

const useApp = () => {
  const { isUserLogin, userData } = useSelector((state) => state.user);
  const { selectedOutlet } = useSelector((state) => state?.outlet);
  const { sessionId, createSession, clearSession } = useSession();
  const dispatch = useDispatch();
  const { data: themeData, isLoading: isThemeLoading } = useQuery(["theme-data"], getThemeData, {
    refetchOnMount: true,
    staleTime: 5000,
  });
  const updateThemeData = useCallback(() => {
    if (themeData && !isThemeLoading) {
      dispatch(setThemeData(themeData));
    }
  }, [themeData, isThemeLoading, dispatch]);

  const theme = useMemo(() => createDynamicTheme(themeData || {}), [themeData]);

  const { data: fetchResturantData, isLoading: isRestaurantLoading } = useQuery("restaurant-data", async () => {
    if (!isUserLogin || !sessionId) {
       createSession()
    }
    return getResturantData(userData?.customerId, sessionId)
  },
    {
      enabled: !!userData?.customerId || !!sessionId,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      staleTime: 5000,
    });
  const updateRestaurantData = useCallback(() => {
    if (fetchResturantData && !isRestaurantLoading) {
      const { result = {}, customerCart } = fetchResturantData || {};
      dispatch(setRestaurantData(fetchResturantData || {}))
      dispatch(setRestaurantOutlets(result?.restaurantOutlets || []));
      dispatch(setOutletData(result?.restaurantOutlets?.[selectedOutlet]))
      dispatch(setCartItems(customerCart || {}));
    }
  }, [fetchResturantData, isRestaurantLoading, dispatch, selectedOutlet]);

  useEffect(() => {
    updateRestaurantData();
  }, [updateRestaurantData]);

  useEffect(() => {
    updateThemeData();
  }, [updateThemeData]);
console.log("refetch")
  const isLoading = isThemeLoading || isRestaurantLoading;
  return { theme, isLoading  };
};


export default useApp;
