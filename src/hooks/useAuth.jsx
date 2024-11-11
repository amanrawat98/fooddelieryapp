import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserLoginStatus } from "../slices/userSlice";
import { handleUserLogin, handleUserSignUp } from "../utility/apiServices";
import { useSession } from "./useSession";
import useCustomToast from "./Toast/useToast";
import { closeDialog, openDialog } from "../slices/dialogSlice";
import Login from "../components/Login";

const useAuth = () => {
    const toast=useCustomToast()
    const { clearSession, } = useSession()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginMutation = useMutation(
        async (payload) => {
            return await handleUserLogin(payload);
        },
        {
            onSuccess: (restaurantDataVal) => {
                const { result, customerCart, restaurantData } = restaurantDataVal || {};

                if (restaurantDataVal?.detail) {
                    dispatch(setUserLoginStatus(result?.customerId));
                    // queryClient.invalidateQueries("user-data"); 
                    clearSession();
                    dispatch(closeDialog())
                    navigate("/");
                    toast.success(<span>Login successfully</span>);
                }
            },
            onError: (error) => {
                toast.error(<span>Something went wrong</span>);
                console.error("Login failed:", error);
            },
        }
    );
    const signUpMutation = useMutation(
        async (payload) => {
            return await handleUserSignUp(payload);
        },
        {
            onSuccess: (restaurantDataVal) => {
               

                if (restaurantDataVal?.detail) {
                    dispatch(openDialog({ content: <Login />, title: "Login" }))
                    navigate("/");
                    toast.success(<span>Successfully Registered</span>);
                }
            },
            onError: (error) => {
                toast.error(<span>Something went wrong during sign up </span>);
                console.error("Error during sign up:", error);
            },
        }
    );

    return { loginMutation,signUpMutation };
};

export default useAuth;
