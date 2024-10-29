import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import {debounce} from 'lodash';
import { setCartItems } from '../slices/cartSlice';
import { handleAddToCart } from '../utility/apiServices';
import useCustomToast from './Toast/useToast';

export const useAddToCart = () => {
    const toast = useCustomToast();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const cartItems = useSelector((state) => state?.cart?.cartItems);
    const { mutate: addToCart, isLoading, isError } = useMutation(
        ({ menuItemId, quantity, successFunction }) => 
            handleAddToCart({ cartId: cartItems?.cartId, menuItemId, quantity }),
        {
            onSuccess: (data, variables) => {
                toast.success(<span>Item successfully added to your cart!</span>);
                dispatch(setCartItems(data?.data?.result));
                queryClient.invalidateQueries("restaurant-data"); // remove in future when single card api done

                if (variables?.successFunction) {
                    variables.successFunction(data?.data?.result);
                }
            },
            onError: (error) => {
                console.error('Error updating cart:', error);
                toast.error(<span>Failed to add item to cart. Please try again.</span>);
            },
        }
    );
    
    const debouncedAddToCart = useCallback(
        debounce(( {menuItemId, quantity}) => {
            if (quantity > 0) {
                addToCart({  menuItemId, quantity });
            }
        }, 300),
        [addToCart]
    );

    return { addToCart, debouncedAddToCart, isLoading, isError };
};
