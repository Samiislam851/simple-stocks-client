
import { useState } from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast from 'react-hot-toast';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../../feature/User/UserSlice';
import { useMutation } from '@tanstack/react-query';
import { userLoginDataType } from '../../types/user';
import customAxios from '../../util/axiosInstance/axiosInstance';

type Props = {}
type inputObject = {
    email: string,
    password: string
}


export default function Login({ }: Props) {


    const [showPassword, setShowPassword] = useState(false);
    // const { setUser, logOut, emailSignIn, setLoggedIn, setLoading, setToken } = useAuth()!
    const { register, handleSubmit } = useForm<inputObject>()
    const dispatch = useDispatch()
    const { loading, error, user } = useSelector((state: any) => state.user)
    console.log('loading', loading, 'error', error, 'user', user);
    const mutationFn = async (userData: userLoginDataType) => {
        const bodyData = {
            email: userData.userEmail,
            password: userData.password,
        };
        return await customAxios.post('/login', bodyData);
    };
    const mutation = useMutation<any, any, any, any>({ mutationFn });

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };


    console.log('loading state', loading);
    console.log('error', error);
    console.log('user', user);


    const handleLogin = (data: inputObject) => {
        if (/^\s*$/.test(data.email) || /^\s*$/.test(data.password)) {
            toast.error('Please Enter something ')
        } else {
            const dataToSend = {
                userEmail: data.email,
                password: data.password
            }
            dispatch(loginStart());
            mutation.mutateAsync(dataToSend, {
                onSuccess: (data) => {
                    dispatch(loginSuccess(data?.user));
                    localStorage.setItem('jwt', data?.token)
                },
                onError: (error: any) => {
                    console.log('error===>', error);
                    dispatch(loginFailure(error.message));
                },
            })
        }
    }

    return (
        <>
            <div className='background h-full text-center flex flex-col-reverse md:flex-row gap-10 justify-center items-center min-h-[100vh] min-w-[100vw] '>
                <div className='w-fit '>
                    <div className='rounded-lg py-5 bg-white  border-opacity-20 border-gray-400 max-w-md  transition-all ease-in-out duration-500 hover:shadow-2xl shadow-lg '>
                        <div className='w-fit mx-auto'>
                            <h3 className='text-3xl font-bold  text-gray-700'>Simple <span className='text-primary'>Stocks</span></h3>
                        </div>
                        <h3 className='text-lg text-gray-400 font-thin md:font-thin px-5 md:px-10 mb-6'>Sign in to your account</h3>
                        <form className='max-w-md  px-5 md:px-10 mx-auto flex flex-col items-center justify-center gap-1 pb-5' onSubmit={handleSubmit(handleLogin)} >
                            <input {...register('email')} className='p-2 m-2 w-full rounded-lg border border-gray-300 focus:border-gray-500 focus:outline-gray-300' type="text" placeholder='Enter your Email' />
                            <div className="relative m-2 w-full rounded-lg border">
                                <input
                                    {...register('password')}
                                    className="p-2  w-full rounded-lg border border-gray-300 focus:border-gray-500 focus:outline-gray-300"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your Password"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute top-0 right-0 mt-3 pe-1 text-gray-700 mr-2"
                                >
                                    {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
                                </button>
                            </div>
                            {error ?

                                <div className='py-2 text-red-500'>
                                    {error.message}
                                </div>
                                : null}
                            <button className='border py-2 mt-3 w-full rounded-lg bg-[#924fdf] text-white hover:shadow-xl transition-all ease-in-out duration-300 border-0'>
                                {loading ?
                                    <div className='flex gap-2 animate-pulse items-center justify-center mx-auto'>
                                        <div>Login</div>
                                        <AiOutlineLoading3Quarters className='text-lg animate-spin ' />
                                    </div>
                                    :
                                    <span>Login</span>
                                }
                            </button>
                        </form>
                        <div className='max-w-md  px-5 md:px-10'>
                            <h3 className='text-gray-700 text-center  text-sm py-3'> New to Simple Stocks? <span className='animate-pulse text-lg text-blue-500'> <Link to={'/register'} >Create an account!</Link> </span></h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


