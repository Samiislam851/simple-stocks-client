import { useState } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast from 'react-hot-toast';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useUserRegisterMutation from '../../hooks/useUserRegister';
import { useDispatch } from 'react-redux';
import { registerFailure, registerSuccess } from '../../feature/User/UserSlice';

type Props = {};


const schema = z.object({
    fName: z.string().min(1, 'First name is required'),
    lName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    photoURL: z.string()
});

type InputObject = z.infer<typeof schema>;

const RegisterPage = ({ }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);
    const mutation = useUserRegisterMutation();
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm<InputObject>({
        resolver: zodResolver(schema)
    });

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const handleRegister = (data: InputObject) => {
        setIsLoading(true);

        const userData = { ...data };
        console.log(userData);

        mutation.mutateAsync(userData, {
            onSuccess: (data) => {
                dispatch(registerSuccess(data?.user));
                localStorage.setItem('jwt', data?.token);
                setIsLoading(false);
            },
            onError: (error: any) => {
                dispatch(registerFailure(error.message));
                toast.error(error.message);
                setIsLoading(false);
            },
        });
    };

    return (
        <div className='bg-transparent my-5 min-h-[100vh] text-center flex flex-col-reverse md:flex-row gap-10 justify-center items-center '>
            <div className='w-fit '>
                <div className='shadow-lg rounded-lg py-10 backdrop-blur-sm bg-opacity-20 border border-opacity-20 border-gray-400 max-w-md transition-all ease-in-out duration-500'>
                    <div className='w-fit mx-auto'>
                        <h3 className='text-3xl font-bold text-gray-700'>Simple <span className='text-primary'>Stocks</span></h3>
                    </div>
                    <h3 className='text-lg text-gray-400 font-thin md:font-thin px-5 md:px-10 mb-6'>Create your free account</h3>
                    <form className='max-w-md px-5 md:px-10 mx-auto flex flex-col items-start justify-start gap-0 pb-5' onSubmit={handleSubmit(handleRegister)}>
                        <input {...register('fName')}
                            className={`p-2 m-2 mb-0 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-blue-300
                            ${errors?.fName ? 'border-red-500 ' : ''}`}
                            type="text"
                            placeholder='Enter your first name' />
                        {errors.fName && <p className=" text-red-500 text-xs pl-3 ">{errors.fName.message}</p>}
                        <input {...register('lName')}
                            className={`p-2 m-2 mb-0 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-blue-300 
                            ${errors?.lName ? 'border-red-500 ' : ''}`}
                            type="text"
                            placeholder='Enter your last name' />
                        {errors.lName && <p className="text-red-500 text-xs pl-3">{errors.lName.message}</p>}
                        <input {...register('email')}
                            className={`p-2 m-2 mb-0 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-blue-300 ${errors?.email ? 'border-red-500 ' : ''}`}
                            type="text"
                            placeholder='Enter your Email'
                            autoComplete='current-email' />
                        {errors.email && <p className="text-red-500 text-xs pl-3 mt-0">{errors.email.message}</p>}
                        <input {...register('photoURL')}
                            className={`p-2 m-2 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-blue-300 ${errors?.photoURL ? 'border-red-500 ' : ''}`}
                            type="text"
                            placeholder='Give the URL of one of your photos' />
                        {errors.photoURL && <p className="text-red-500 text-xs pl-3 mt-1 ">{errors.photoURL.message}</p>}
                        <div className="relative m-2 w-full rounded-lg ">
                            <input {...register('password')}
                                className={`p-2 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-blue-300 
                                    ${errors?.password ? 'border-red-500 ' : ''}`}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your Password"
                                autoComplete="current-password" />
                            <button type="button" onClick={togglePasswordVisibility} className="absolute top-0 right-0 mt-3 pe-1 text-gray-700 mr-2">
                                {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
                            </button>
                            {errors.password && <p className=" text-start text-red-500 text-xs pl-1 ">{errors.password.message}</p>}
                        </div>

                        <button className={`w-full mx-2 mt-4 py-2 px-4 rounded-lg bg-[#924fdf] text-white hover:shadow-xl transition-all ease-in-out duration-300 hover:scale-105 border-0 ${isLoading && 'cursor-not-allowed'}`} disabled={isLoading}>
                            {isLoading ?
                                <div className='flex gap-2 items-center animate-pulse justify-center'>
                                    <div>Register</div>
                                    <AiOutlineLoading3Quarters className=' animate-spin' />
                                </div>
                                :
                                <span>Register</span>
                            }
                        </button>
                    </form>
                    <div className='max-w-md px-5 md:px-10'>
                        <h3 className='text-gray-600 text-center md:text-left text-sm py-3'>Already have an account? <span className='text-lg text-blue-500'> <Link to={'/login'}>Login and continue</Link> </span></h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;