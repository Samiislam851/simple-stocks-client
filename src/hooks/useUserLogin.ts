import { QueryClient, useMutation, UseMutationOptions, useQuery } from "@tanstack/react-query"
import { userLoginDataType } from "../types/user";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../feature/User/UserSlice";
import customAxios from "../util/axiosInstance/axiosInstance";

const useUserLoginMutation = () => {
    const dispatch = useDispatch();
    const mutationFn = async (userData: userLoginDataType) => {
        dispatch(loginStart());
        const bodyData = {
            email: userData.userEmail,
            password: userData.password,
        };
        try {
            console.log('bodyData', bodyData);
            const response = await customAxios.post('/login', bodyData);
            return response.data;
        } catch (error) {
            console.log('error while logging in >>>', error);
        }
    };

    return useMutation<any, any, any, any>({ mutationFn });
}
export default useUserLoginMutation