import { useMutation } from "@tanstack/react-query"
import customAxios from "../../util/axiosInstance/axiosInstance"
import { useDispatch } from "react-redux"
import { loginFailure, loginSuccess } from "../../feature/User/UserSlice"

const fetchUser = (id: string) => {
    const dispatch = useDispatch()
    const mutationFn = async (data: any) => {
        return customAxios.post('/user-data', { id: data })
    }
    const mutation = useMutation<any, any, any, any>({ mutationFn })
   mutation.mutate(id, {
    onSuccess: (data) => {
        dispatch(loginSuccess(data?.user));
    },
    onError: (error: any) => {
        dispatch(loginFailure(error.message));
    }
   })
}
export default fetchUser