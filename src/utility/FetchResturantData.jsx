import axios from "axios";
import { useQuery } from "react-query";

const sessionid = localStorage.getItem("sessionid");

export const fetchresturantdata = () => {
  const getResturantData = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/restaurant-data/`,
      {
        params: {
          sessionKey: sessionid,
          restaurantId: 1,
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

  return { resturantdata, isLoading, isError, refetch };
};
