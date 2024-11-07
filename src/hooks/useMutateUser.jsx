import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { updateCustomerProfile } from '../utility/apiServices';
import { setUserData } from '../slices/userSlice';
import useCustomToast from './Toast/useToast';

const useMutateUser = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const toast=useCustomToast()

  const { mutate, isLoading, isError, error } = useMutation(
    async ({data}) => {
      return await updateCustomerProfile({
        customerId: userData?.customerId,
        receiverName: userData?.firstName,
        receiverPhone: userData?.phone,
        ...data,

      });
    },
    {
      onSuccess: (response,variables) => {
        if (variables?.successFunction) {
            variables.successFunction(response?.result);
        }
        dispatch(setUserData(response?.result));
      },
      onError: (error) => {
        console.error("Error fetching user data:", error); 
        toast.error(<span>Something went wrong while updating user data </span>)
      },
    }
  );

  return { handleUser: mutate, isLoading, isError, error };
};

export default useMutateUser;
