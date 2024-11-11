import { useQuery } from "react-query";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setThemeData } from "../slices/themeSlice";
import { createDynamicTheme } from "../theme";
import { getRestaurantData as getRestaurantData, getThemeData } from "../utility/apiServices";
import { useSession } from "./useSession";
import { setRestaurantOutlets, setSelectedOutletData } from "../slices/outletSlice";
import { setOutletData, setRestaurantData } from "../slices/restaurantDataSlice";
import { setCartItems } from "../slices/cartSlice";
import useCustomToast from "./Toast/useToast";
import { handleActiveOutletData } from "../utility/functions";

const useApp = () => {
  const toast = useCustomToast()
  const { userData, isUserLogin } = useSelector((state) => state.user);
  const { selectedOutlet, restaurantOutlets } = useSelector((state) => state?.outlet);

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
  } = useQuery(["restaurant-data", isUserLogin, sessionId, selectedOutlet], async () => {
    if (!isUserLogin || !sessionId) {
      await createSession();
    }

    return getRestaurantData({
      customerId: isUserLogin, sessionKey: sessionId, restaurantId: 5, outletId: selectedOutlet,
      //  latitude, longitude, 
    });
  }, {
    enabled: !!isUserLogin || !!sessionId,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
    onSuccess: (data) => {
      const { result = {}, customerCart } = data || {};
      dispatch(setCartItems(customerCart || {}));
      dispatch(setRestaurantData(data || {}));
      dispatch(setRestaurantOutlets(result?.restaurantOutlets || []));

      const restaurantOutlets = result?.restaurantOutlets
      if (!selectedOutlet) {
        dispatch(setSelectedOutletData(restaurantOutlets[0]));

      }
      else {
        const outletData = handleActiveOutletData(restaurantOutlets, selectedOutlet)
        dispatch(setSelectedOutletData(outletData));
      }
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
