import React from 'react'
import { useQuery } from 'react-query';
import { getUserData } from '../utility/apiServices';
import { setUserData } from '../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import useCustomToast from './Toast/useToast';

export default function useUser() {
  const toast=useCustomToast()
    const isUserLogin = useSelector((state) => state?.user?.isUserLogin);
    const dispatch=useDispatch()
    const {
        data: fetchUserData,
        isLoading: isUserLoading,
        isError: isUserError,
      } = useQuery(["user-data", isUserLogin,], async () => {
       
        return getUserData(isUserLogin);
      }, {
        enabled: !!isUserLogin ,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
        staleTime: 5000,
        onSuccess: (data) => {
          const { result = {}, customerCart } = data || {};
          dispatch(setUserData(result || {}));
          
        },
        onError: (error) => {
          console.error("Error fetching user data:", error); 
          toast.error(<span>Something went wrong while fetching user data </span>)
        },
      });
  return (
   {fetchUserData,isUserLoading,isUserError}
  )
}
