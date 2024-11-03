import { useQuery } from "react-query";
import {  useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setThemeData } from "../slices/themeSlice";
import { createDynamicTheme } from "../theme";
import { getResturantData, getThemeData } from "../utility/apiServices";
import { useSession } from "./useSession";
import { setRestaurantOutlets } from "../slices/outletSlice";
import { setOutletData, setRestaurantData } from "../slices/restaurantDataSlice";
import { setCartItems } from "../slices/cartSlice";
import useCustomToast from "./Toast/useToast";

const useApp = () => {
  const toast=useCustomToast()
  const {  userData } = useSelector((state) => state.user);
  const { selectedOutlet } = useSelector((state) => state.outlet);
  const { sessionId, createSession } = useSession();
  const dispatch = useDispatch();

  const {
    data: themeData,
    isLoading: isThemeLoading,
    isError: isThemeError,
  } = useQuery("theme-data", getThemeData, {
    refetchOnMount: true,
    staleTime: 5000,
    onSuccess: (data) => {
      dispatch(setThemeData(data)); 
    },
    onError: (error) => {
      console.error("Error fetching theme data:", error); 
      toast.error(<span>Something went wrong while fetching theme data</span>)
    },
  });

  const theme = useMemo(() => createDynamicTheme(themeData || {}), [themeData]);

  const {
    data: fetchRestaurantData,
    isLoading: isRestaurantLoading,
    isError: isRestaurantError,
  } = useQuery(["restaurant-data", userData?.customerId, sessionId], async () => {
    if (!userData?.customerId || !sessionId) {
      await createSession(); 
    }
    return getResturantData(userData?.customerId, sessionId);
  }, {
    enabled: !!userData?.customerId || !!sessionId,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
    onSuccess: (data) => {
      const { result = {}, customerCart } = data || {};
      dispatch(setRestaurantData(data || {}));
      dispatch(setRestaurantOutlets(result?.restaurantOutlets || []));
      dispatch(setOutletData(result?.restaurantOutlets?.[selectedOutlet]));
      dispatch(setCartItems(customerCart || {}));
    },
    onError: (error) => {
      console.error("Error fetching restaurant data:", error); 
      toast.error(<span>Something went wrong while fetching restaurant data data</span>)
    },
  });

  const isLoading = isThemeLoading || isRestaurantLoading;

  return { theme, isLoading, isThemeError, isRestaurantError };
};

export default useApp;
