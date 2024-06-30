import { useMutation } from "@tanstack/react-query"
import { userLoginDataType } from "../types/user";

import customAxios from "../util/axiosInstance/axiosInstance";

const useUserLoginMutation = () => {

    const mutationFn = async (userData: userLoginDataType) => {

        const bodyData = {
            email: userData.userEmail,
            password: userData.password,
        };
        // try {
        //     const res = 
        //     return res.data
        // } catch (error) {
        //     return error
        // }
   return await customAxios.post('/login', bodyData);
    };

    return useMutation<any, any, any, any>({ mutationFn });
}
export default useUserLoginMutation