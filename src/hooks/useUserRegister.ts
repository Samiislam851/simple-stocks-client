
import { useDispatch } from "react-redux";

import customAxios from "../util/axiosInstance/axiosInstance";
import { registerStart } from "../feature/User/UserSlice";
import { userRegDataType } from "../types/user";
import { useMutation } from "@tanstack/react-query";

const useUserRegisterMutation = () => {
    const dispatch = useDispatch();
    const mutationFn = async (userData: userRegDataType) => {
        dispatch(registerStart());
        const bodyData = {
            firstName: userData.fName,
            lastName: userData.lName,
            email: userData.email,
            password: userData.password,
            photoURL: userData.photoURL
        };
            console.log('bodyData', bodyData);
           return  await customAxios.post('/signup', bodyData);
        
    };

    return useMutation<any, any, any, any>({ mutationFn });
}
export default useUserRegisterMutation