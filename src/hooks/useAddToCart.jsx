import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import { debounce } from 'lodash';
import { setCartItems } from '../slices/cartSlice';
import { deleteCartItem, handleAddToCart } from '../utility/apiServices';
import useCustomToast from './Toast/useToast';

export const useAddToCart = () => {
    const toast = useCustomToast();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state?.cart?.cartItems);
    const queryClient = useQueryClient();
    const { mutate: addToCart, isLoading: isAdding, isError: addError } = useMutation(
        ({ menuItemId, quantity, successFunction }) =>
            handleAddToCart({ cartId: cartItems?.cartId, menuItemId, quantity }),
        {
            onSuccess: (data, variables) => {
                toast.success(<span>Item successfully added to your cart!</span>);
                dispatch(setCartItems(data?.data?.result));
                // if (variables?.restaurantData) {
                    queryClient.invalidateQueries("restaurant-data"); // remove this after
                // }
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

    const { mutate: deleteFromCart, isLoading: isDeleting, isError: deleteError } = useMutation(
        ({ cartItemId, successFunction }) =>
            deleteCartItem({ cartId: cartItems?.cartId, cartItemId }),
        {
            onSuccess: (data, variables) => {
                toast.success(<span>Item successfully removed from your cart!</span>);
                queryClient.invalidateQueries("restaurant-data");
                if (variables?.successFunction) {
                    variables.successFunction(data);
                }
            },
            onError: (error) => {
                console.error('Error updating cart:', error);
                toast.error(<span>Failed to remove item from cart. Please try again.</span>);
            },
        }
    );

    const debouncedAddToCart = useCallback(
        debounce(({ menuItemId, quantity }) => {
            if (quantity >= 0) {
                addToCart({ menuItemId, quantity });
            }
        }, 300),
        [addToCart]
    );

    return {
        addToCart,
        deleteFromCart,
        debouncedAddToCart,
        isLoading: isAdding || isDeleting,
        isError: addError || deleteError,
    };
};
